const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { readDb, writeDb } = require('./config');
const { discoverProspects } = require('./prospector');
const { runSocialAutopilot } = require('./social');

// Smart Form-Filling Outreach Task
async function runOutreachAutopilot() {
  console.log("🚀 Starting Playwright Outreach Auto-Filler...");
  
  const db = readDb();
  const queue = db.prospects.filter(p => p.status === 'discovered');
  
  if (queue.length === 0) {
    console.log("⚠️ No new prospects in the queue with status 'discovered'.");
    console.log("💡 Run 'node run.js --prospect \"your-keyword\"' first to find opportunities!");
    return;
  }
  
  console.log(`Found ${queue.length} prospects in queue. Launching browser...`);
  
  // Set headless: false so the user can see the browser window and live filling!
  const browser = await chromium.launch({ headless: false });
  
  for (const prospect of queue) {
    console.log(`\n--------------------------------------------`);
    console.log(`Processing Target: ${prospect.domain}`);
    console.log(`Navigating to Contact Page: ${prospect.contact_url}`);
    
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
      await page.goto(prospect.contact_url, { waitUntil: 'networkidle', timeout: 30000 });
      
      console.log("🔍 Scanning form elements...");
      
      // Auto-detect inputs & textareas
      const inputs = await page.$$('input, textarea');
      
      for (const input of inputs) {
        const type = (await input.getAttribute('type') || '').toLowerCase();
        const name = (await input.getAttribute('name') || '').toLowerCase();
        const id = (await input.getAttribute('id') || '').toLowerCase();
        const placeholder = (await input.getAttribute('placeholder') || '').toLowerCase();
        
        // Match name fields
        if (name.includes('name') || id.includes('name') || placeholder.includes('name')) {
          await input.fill('Aji Paul');
          console.log(`Filled Name field: name="${name}", id="${id}"`);
        }
        // Match email fields
        else if (type === 'email' || name.includes('email') || id.includes('email') || placeholder.includes('email')) {
          await input.fill('info@techauditpros.com');
          console.log(`Filled Email field: name="${name}", id="${id}"`);
        }
        // Match website/URL fields
        else if (name.includes('web') || name.includes('url') || name.includes('site') || id.includes('url') || id.includes('site') || placeholder.includes('website')) {
          await input.fill('https://techauditpros.com');
          console.log(`Filled Website field: name="${name}", id="${id}"`);
        }
        // Match message / pitch textareas
        else if (await input.evaluate(el => el.tagName === 'TEXTAREA') || name.includes('message') || name.includes('pitch') || id.includes('message') || placeholder.includes('message') || placeholder.includes('comment')) {
          const pitch = "Hello Editor,\n\nI read your site and found your article on Core Web Vitals very helpful. We've published a detailed audit showing how local Kochi businesses can speed up LCP scores by 300%.\n\nI think your readers would find this highly valuable. Let me know if you would be open to guest featuring this on your site!\n\nBest,\nAji Paul\nTechAuditPros.com";
          await input.fill(pitch);
          console.log(`Filled Message field: name="${name}", id="${id}"`);
        }
      }
      
      // Capture form screenshot pre-submit for verification
      const screenshotDir = path.join(__dirname, 'screenshots');
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
      }
      const screenshotPath = path.join(screenshotDir, `${prospect.domain}.png`);
      await page.screenshot({ path: screenshotPath });
      console.log(`Saved proof screenshot: ${screenshotPath}`);
      
      // Locate and click submit button
      const submitBtn = await page.$('button[type="submit"], input[type="submit"], button:has-text("Submit"), button:has-text("Send"), button:has-text("Send Message")');
      if (submitBtn) {
        console.log("Clicking submit button...");
        await submitBtn.click();
        await page.waitForTimeout(5000); // Wait for submission handling
      } else {
        console.log("No submit button found. Saved as a drafted screenshot.");
      }
      
      // Update prospect status in DB
      prospect.status = 'completed';
      
      // Log successful outreach
      db.outreach_logs.unshift({
        domain: prospect.domain,
        method: "Contact Form Fill",
        status: "Completed",
        date: new Date().toISOString()
      });
      
      writeDb(db);
      console.log(`Successfully completed outreach for ${prospect.domain}`);
      
    } catch(err) {
      console.error(`❌ Error processing ${prospect.domain}:`, err.message);
      prospect.status = 'failed';
      writeDb(db);
    } finally {
      await page.close();
      await context.close();
    }
  }
  
  await browser.close();
  console.log("🎉 Outreach Autopilot Run completed!");
}

// Help menu
function showHelp() {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║             GROWTH AUTOPILOT ENGINE COMMANDS                 ║
╚══════════════════════════════════════════════════════════════╝
Usage: node run.js [options]

Options:
  --prospect "[keyword]"  Search Google/DuckDuckGo for backlink opportunities.
  --outreach              Run form filler on discovered prospects (opens browser).
  --social "[topic]"      Generate visual banner & post marketing updates to socials.
  --all "[keyword]"       Run Prospector, Outreach, and Social poster in sequence.
  --help                  Show this help menu.

Examples:
  node run.js --prospect "Kochi SEO"
  node run.js --outreach
  node run.js --social "Core Web Vitals Boost"
  node run.js --all "digital marketing"
`);
}

// Main execution parsing
async function main() {
  const args = process.argv.slice(2);
  const flag = args[0];
  const value = args[1];

  if (!flag || flag === '--help') {
    showHelp();
    return;
  }

  try {
    if (flag === '--prospect') {
      const keyword = value || 'digital marketing';
      await discoverProspects(keyword);
    } else if (flag === '--outreach') {
      await runOutreachAutopilot();
    } else if (flag === '--social') {
      const topic = value || 'Core Web Vitals Optimization';
      await runSocialAutopilot(topic);
    } else if (flag === '--all') {
      const keyword = value || 'digital marketing';
      console.log(`🏁 Starting Full Autopilot Run for: "${keyword}"`);
      await discoverProspects(keyword);
      await runOutreachAutopilot();
      await runSocialAutopilot(`Growth Strategies in ${keyword}`);
      console.log("🏁 Full Autopilot Run Completed successfully!");
    } else {
      console.log(`Unknown flag: ${flag}`);
      showHelp();
    }
  } catch (error) {
    console.error("An error occurred during execution:", error.message);
  }
}

main().catch(console.error);
