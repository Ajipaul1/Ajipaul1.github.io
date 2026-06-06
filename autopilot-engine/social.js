const { chromium } = require('playwright');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { readDb, writeDb } = require('./config');

// Helper to query Gemini API for a custom caption (free tier)
async function generateAiCaption(topic) {
  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    console.log("No GEMINI_API_KEY found in .env. Using template caption.");
    return `🚀 Exciting news! We just released our latest analysis on: "${topic}". Read the full breakdown on techauditpros.com and learn how to optimize your digital systems. #SEO #TechAuditPros #GrowthHacking`;
  }

  try {
    const prompt = `Write a short, engaging, professional social media post caption (suitable for LinkedIn and Facebook) about the following topic: "${topic}". Include relevant hashtags and a call-to-action to visit techauditpros.com. Return only the caption text.`;
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    if (response.data && response.data.candidates && response.data.candidates[0].content.parts[0].text) {
      return response.data.candidates[0].content.parts[0].text.trim();
    }
  } catch (err) {
    console.error("Gemini API error generating caption:", err.message);
  }
  return `🚀 Check out our latest insights on "${topic}"! Discover actionable strategies to scale your site. #SEO #Growth #WebPerf #TechAuditPros`;
}

// Generate the marketing banner visual locally
async function generateAdBanner(category, title, description, tag = 'Growth Autopilot') {
  console.log("🎨 Generating visual marketing banner image...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Load the local HTML template
  const templatePath = 'file:///' + path.join(__dirname, 'social-template.html').replace(/\\/g, '/');
  await page.goto(templatePath);

  // Inject dynamic text content
  await page.evaluate(({ category, title, description, tag }) => {
    document.getElementById('card-category').innerText = category;
    document.getElementById('card-title').innerText = title;
    document.getElementById('card-desc').innerText = description;
    document.getElementById('card-tag').innerText = tag;
  }, { category, title, description, tag });

  // Wait for Google Font to render
  await page.waitForTimeout(1000);

  // Set screenshot folder
  const screenshotDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir);
  }

  const timestamp = Date.now();
  const filename = `social-post-${timestamp}.png`;
  const imagePath = path.join(screenshotDir, filename);

  // Take screenshot of the exact body bounds (1200x630)
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.screenshot({ path: imagePath, type: 'png' });
  await browser.close();

  console.log(`✅ Ad banner image generated successfully: ${imagePath}`);
  return { imagePath, filename };
}

// Post directly to LinkedIn Page/Profile
async function postToLinkedIn(caption, imagePath) {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const personUrn = process.env.LINKEDIN_PERSON_URN; // e.g. urn:li:person:abcdefg

  if (!token || !personUrn) {
    console.log("⚠️ LinkedIn credentials missing. Skipping LinkedIn publish.");
    return false;
  }

  console.log("📤 Publishing to LinkedIn...");
  // Note: LinkedIn API requires multiple steps (register upload, upload image binary, create post share).
  // For standard automated posting without complexity, we can do a text+link post or full asset upload.
  try {
    // 1. Register image upload
    const registerResponse = await axios.post(
      'https://api.linkedin.com/v2/assets?action=registerUpload',
      {
        registerUploadRequest: {
          recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
          owner: personUrn,
          supportedUploadMechanisms: ['SYNCHRONOUS_UPLOAD']
        }
      },
      { headers: { 'Authorization': `Bearer ${token}` } }
    );

    const uploadUrl = registerResponse.data.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
    const assetId = registerResponse.data.value.asset;

    // 2. Upload image binary
    const imageBinary = fs.readFileSync(imagePath);
    await axios.put(uploadUrl, imageBinary, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'image/png'
      }
    });

    // 3. Create Share containing image asset
    const shareResponse = await axios.post(
      'https://api.linkedin.com/v2/shares',
      {
        owner: personUrn,
        subject: "TechAuditPros Growth Update",
        text: { text: caption },
        content: {
          contentEntities: [{ entity: assetId }],
          title: "Growth Insights from TechAuditPros",
          shareMediaCategory: "IMAGE"
        },
        distribution: {
          targetEntities: [],
          type: "CLIENT_UNTARGETED"
        }
      },
      { headers: { 'Authorization': `Bearer ${token}` } }
    );

    console.log(`✅ Published to LinkedIn! Post ID: ${shareResponse.data.id}`);
    return true;
  } catch (err) {
    console.error("LinkedIn publish error:", err.response ? err.response.data : err.message);
    return false;
  }
}

// Post directly to Facebook Page
async function postToFacebook(caption, imagePath) {
  const token = process.env.META_ACCESS_TOKEN;
  const pageId = process.env.FB_PAGE_ID;

  if (!token || !pageId) {
    console.log("⚠️ Meta Graph API credentials missing. Skipping Facebook Page publish.");
    return false;
  }

  console.log("📤 Publishing to Facebook Page...");
  try {
    // Meta supports posting images directly via multi-part form data uploads
    const FormData = require('form-data');
    const form = new FormData();
    form.append('source', fs.createReadStream(imagePath));
    form.append('message', caption);
    form.append('access_token', token);

    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${pageId}/photos`,
      form,
      { headers: form.getHeaders() }
    );

    console.log(`✅ Published to Facebook! Post/Photo ID: ${response.data.id}`);
    return true;
  } catch (err) {
    console.error("Facebook publish error:", err.response ? err.response.data : err.message);
    return false;
  }
}

async function runSocialAutopilot(topic = "Core Web Vitals Performance") {
  console.log(`🚀 Starting Social Media Autopilot for Topic: "${topic}"`);

  // Generate copywriting parameters dynamically using Gemini
  const caption = await generateAiCaption(topic);
  
  // Design details based on topic
  let category = "SEO Strategy";
  if (topic.toLowerCase().includes('speed') || topic.toLowerCase().includes('vital') || topic.toLowerCase().includes('performance')) {
    category = "Web Performance";
  } else if (topic.toLowerCase().includes('backlink') || topic.toLowerCase().includes('outreach')) {
    category = "Link Building";
  } else if (topic.toLowerCase().includes('ai') || topic.toLowerCase().includes('autopilot')) {
    category = "Automation";
  }

  const tag = "Growth Autopilot";
  const desc = caption.split('\n')[0] || `An overview of our latest findings on ${topic}.`;

  // Render Image
  const { imagePath, filename } = await generateAdBanner(category, topic, desc, tag);

  // Publish
  const fbOk = await postToFacebook(caption, imagePath);
  const liOk = await postToLinkedIn(caption, imagePath);

  // Log to local DB
  const db = readDb();
  db.social_posts = db.social_posts || [];
  db.social_posts.unshift({
    topic,
    caption,
    image_file: filename,
    published_fb: fbOk ? "Success" : "Skipped/Failed",
    published_linkedin: liOk ? "Success" : "Skipped/Failed",
    date: new Date().toISOString()
  });
  writeDb(db);

  console.log("🎉 Social Media Autopilot task completed!");
}

module.exports = { runSocialAutopilot };
