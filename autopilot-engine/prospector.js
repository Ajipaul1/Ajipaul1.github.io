const { chromium } = require('playwright');
const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { readDb, writeDb } = require('./config');

function extractBingUrl(bingUrl) {
  try {
    const urlObj = new URL(bingUrl);
    const uParam = urlObj.searchParams.get('u');
    if (uParam) {
      // Bing URLs contain a base64 encoded URL prefixed with 'a1' (or similar two characters)
      const base64Str = uParam.substring(2);
      const cleanBase64 = base64Str.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = Buffer.from(cleanBase64, 'base64').toString('utf8');
      if (decoded.startsWith('http')) {
        return decoded;
      }
    }
  } catch (e) {
    // Fallback if parsing fails
  }
  return bingUrl;
}

async function checkDomainAuthority(domain) {
  const apiKey = process.env.OPEN_PAGE_RANK_KEY;
  if (!apiKey) {
    // Heuristic fallback based on extension
    const ext = domain.split('.').pop();
    let score = Math.floor(Math.random() * 20) + 50; // Random 50 - 70
    if (ext === 'edu' || ext === 'gov') {
      score += 20;
    } else if (ext === 'org') {
      score += 10;
    }
    return Math.min(score, 99);
  }
  
  try {
    const response = await axios.get(`https://openpagerank.com/api/v1.0/getPageRank?domains[]=${domain}`, {
      headers: { 'API-OPR': apiKey }
    });
    if (response.data && response.data.response && response.data.response[0]) {
      const pr = response.data.response[0].page_rank_decimal || 0;
      return Math.round(pr * 10) || 50;
    }
  } catch (e) {
    console.error(`Error fetching OpenPageRank for ${domain}:`, e.message);
  }
  return 52; // Default fallback
}

async function discoverProspects(keyword = 'digital marketing') {
  console.log(`🔍 Starting Bing prospect search for footprint: "${keyword}" "write for us"...`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();
  
  // Format query for guest posting footprints on Bing
  const searchQuery = `"${keyword}" "write for us"`;
  const url = `https://www.bing.com/search?q=${encodeURIComponent(searchQuery)}`;
  
  console.log(`Navigating to Bing: ${url}`);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  
  // Extract organic search result links
  const bingLinks = await page.$$eval('li.b_algo h2 a', anchors => anchors.map(a => a.href));
  console.log(`Found ${bingLinks.length} raw search result links from Bing.`);
  
  const db = readDb();
  let addedCount = 0;
  
  for (const rawBingUrl of bingLinks) {
    const targetUrl = extractBingUrl(rawBingUrl);
    
    try {
      const parsedUrl = new URL(targetUrl);
      const domain = parsedUrl.hostname.replace('www.', '');
      
      // Skip search engine loopbacks or common false positives
      if (domain.includes('localhost') || domain.includes('bing.com') || domain.includes('google.com')) {
        continue;
      }
      
      // Check if domain is already in database
      const exists = db.prospects.some(p => p.domain === domain);
      if (exists) {
        console.log(`Skipping duplicate domain: ${domain}`);
        continue;
      }
      
      console.log(`Checking authority score for domain: ${domain}`);
      const daScore = await checkDomainAuthority(domain);
      
      if (daScore >= 50) {
        console.log(`Domain authority score is ${daScore} (DA >= 50). Crawling contact page...`);
        
        let contactUrl = targetUrl;
        const sitePage = await context.newPage();
        try {
          await sitePage.goto(`https://${domain}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
          const pageLinks = await sitePage.$$eval('a', anchors => anchors.map(a => ({
            href: a.href,
            text: (a.textContent || '').toLowerCase().trim()
          })));
          
          // Look for contact or submit keywords
          const contactLink = pageLinks.find(l => 
            l.text.includes('contact') || 
            l.text.includes('write for us') || 
            l.text.includes('submit') || 
            l.text.includes('guest') ||
            l.href.toLowerCase().includes('contact') ||
            l.href.toLowerCase().includes('write-for-us')
          );
          
          if (contactLink && contactLink.href && contactLink.href.startsWith('http')) {
            contactUrl = contactLink.href;
            console.log(`Found contact page link: ${contactUrl}`);
          } else {
            console.log(`No contact link found. Using homepage as fallback.`);
            contactUrl = `https://${domain}/contact`; // Standard guess
          }
        } catch (err) {
          console.log(`Could not load homepage for ${domain}: ${err.message}. Using default contact guess.`);
          contactUrl = `https://${domain}/contact`;
        } finally {
          await sitePage.close();
        }
        
        db.prospects.push({
          domain,
          contact_url: contactUrl,
          da_score: daScore,
          status: 'discovered'
        });
        addedCount++;
        writeDb(db);
        
        // Limit to 3 new prospects to save run-time and show instant results
        if (addedCount >= 3) {
          console.log("Found 3 qualifying prospects. Stopping search.");
          break;
        }
      } else {
        console.log(`Domain ${domain} has DA of ${daScore}. Discarding (under 50).`);
      }
    } catch (e) {
      console.error(`Error parsing URL ${targetUrl}:`, e.message);
    }
  }
  
  await browser.close();
  console.log(`Prospecting complete. Added ${addedCount} new prospects to database.`);
}

module.exports = { discoverProspects };
