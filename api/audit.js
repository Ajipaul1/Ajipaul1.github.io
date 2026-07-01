export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }

    const { url, email } = req.body;

    if (!url || !email) {
        return res.status(400).json({ error: 'Missing required parameters: url and email.' });
    }

    // Clean and validate URL
    let targetUrl = url.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
        targetUrl = 'https://' + targetUrl;
    }

    let parsedUrl;
    try {
        parsedUrl = new URL(targetUrl);
    } catch (e) {
        return res.status(400).json({ error: 'Invalid URL format. Please enter a valid address.' });
    }

    const domain = parsedUrl.hostname;

    // Helper to sanitize environment variables from accidental Markdown link pasting (e.g. [text](url) or text](url))
    const sanitizeEnvVar = (val) => {
        if (!val || typeof val !== 'string') return val;
        let clean = val.trim();
        
        // 1. If it contains the markdown link separator ](
        if (clean.includes('](')) {
            const parts = clean.split('](');
            if (parts[1]) {
                clean = parts[1].replace(/\)$/, '');
            }
        }
        
        // 2. Strip brackets and parentheses
        clean = clean.replace(/^[\[\(\s]+/, '');
        clean = clean.replace(/[\]\)\s]+$/, '');
        
        // 3. Extract the clean HTTP URL if present
        const httpMatch = clean.match(/(https?:\/\/[^\s\)\(]+)/);
        if (httpMatch && httpMatch[1]) {
            clean = httpMatch[1];
        }

        // 4. Remove trailing slashes
        return clean.replace(/\/+$/, '');
    };

    // Retrieve and sanitize API credentials
    const supabaseUrl = sanitizeEnvVar(process.env.SUPABASE_URL || 'https://jgouacaddnkjfftlhjjy.supabase.co');
    const supabaseKey = sanitizeEnvVar(process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnb3VhY2FkZG5ramZmdGxoamp5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjgwNjE2NywiZXhwIjoyMDk4MzgyMTY3fQ.g7K_KybkTDA5dbYS-EX2QHvQ4Ld543CKSIL6TUun-FE');
    const pagespeedApiKey = sanitizeEnvVar(process.env.GOOGLE_PAGESPEED_API_KEY || 'AIzaSyClI764wvlZ0NQPr2Q9WcX6lGAnyg20qAg');
    const dataForSeoAuth = sanitizeEnvVar(process.env.DATAFORSEO_API_AUTHORIZATION || 'Basic aW5mb0B0ZWNoYXVkaXRwcm9zLmNvbTpiNThhODMyOTA0NjBkZjNk');

    try {
        // Run Google PageSpeed Insights & DataForSEO OnPage API concurrently
        const pageSpeedPromise = fetch(
            `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&key=${pagespeedApiKey}&category=performance&category=seo&category=accessibility&category=best-practices&strategy=desktop`
        ).then(async (r) => {
            if (!r.ok) {
                const text = await r.text();
                console.error(`Google PageSpeed API HTTP Error: ${text}`);
                return null;
            }
            return r.json();
        }).catch((err) => {
            console.error(`Google PageSpeed fetch exception:`, err);
            return null;
        });

        // POST raw array with enable_browser_rendering: true to bypass Cloudflare blockages
        const dataForSeoPromise = fetch('https://api.dataforseo.com/v3/on_page/instant_pages', {
            method: 'POST',
            headers: {
                'Authorization': dataForSeoAuth,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([
                {
                    url: targetUrl,
                    enable_browser_rendering: true,
                    enable_javascript: true
                }
            ])
        }).then(async (r) => {
            if (!r.ok) {
                const text = await r.text();
                console.error(`DataForSEO API HTTP Error: ${text}`);
                return null;
            }
            return r.json();
        }).catch((err) => {
            console.error(`DataForSEO fetch exception:`, err);
            return null;
        });

        // Wait for both API payloads
        const [pageSpeedRes, dataForSeoRes] = await Promise.all([
            pageSpeedPromise,
            dataForSeoPromise
        ]);

        // Error if BOTH fail
        if (!pageSpeedRes && !dataForSeoRes) {
            return res.status(502).json({ 
                error: 'Failed to retrieve data from both Google PageSpeed and DataForSEO. The target website might be blocking crawler requests (e.g. Cloudflare firewall) or is currently unreachable.' 
            });
        }

        // Extract and round PageSpeed scores (ranges 0-100)
        const psLighthouse = pageSpeedRes?.lighthouseResult || {};
        const psCategories = psLighthouse.categories || {};
        
        const perfScore = psCategories.performance?.score ? Math.round(psCategories.performance.score * 100) : null;
        const seoScore = psCategories.seo?.score ? Math.round(psCategories.seo.score * 100) : null;
        const accessibilityScore = psCategories.accessibility?.score ? Math.round(psCategories.accessibility.score * 100) : null;
        const bestPracticesScore = psCategories['best-practices']?.score ? Math.round(psCategories['best-practices'].score * 100) : null;

        // Core Web Vitals numeric values
        const audits = psLighthouse.audits || {};
        const lcpVal = audits['largest-contentful-paint']?.numericValue ? parseFloat((audits['largest-contentful-paint'].numericValue / 1000).toFixed(2)) : null;
        const clsVal = audits['cumulative-layout-shift']?.numericValue ? parseFloat(audits['cumulative-layout-shift'].numericValue.toFixed(3)) : null;
        const fcpVal = audits['first-contentful-paint']?.numericValue ? parseFloat((audits['first-contentful-paint'].numericValue / 1000).toFixed(2)) : null;
        const inpVal = audits['interactive']?.numericValue ? parseFloat((audits['interactive'].numericValue / 1000).toFixed(2)) : null;

        // Extract screenshot
        const screenshot = audits['final-screenshot']?.details?.data || null;

        // Parse DataForSEO OnPage crawl analysis metrics
        const dfsTask = dataForSeoRes?.tasks?.[0] || {};
        const dfsResult = dfsTask.result?.[0] || {};
        const dfsItem = dfsResult.items?.[0] || {};
        const dfsMeta = dfsItem.meta || {};
        const dfsChecks = dfsItem.checks || {};

        const metaTitle = dfsMeta.title || null;
        const metaDescription = dfsMeta.description || null;
        const h1Count = Array.isArray(dfsMeta.htags?.h1) ? dfsMeta.htags.h1.length : 0;
        const brokenLinksCount = dfsItem.broken_links ? 1 : 0;

        const metaTitleStatus = dfsChecks.no_title ? 'missing' : (dfsChecks.title_too_long ? 'too_long' : 'good');
        const metaDescStatus = dfsChecks.no_description ? 'missing' : (dfsChecks.description_too_long ? 'too_long' : 'good');

        // Compile payload structure for PostgreSQL database table
        const auditPayload = {
            domain,
            email,
            performance_score: perfScore,
            seo_score: seoScore,
            accessibility_score: accessibilityScore,
            best_practices_score: bestPracticesScore,
            lcp_val: lcpVal,
            cls_val: clsVal,
            fcp_val: fcpVal,
            inp_val: inpVal,
            meta_title: metaTitle,
            meta_description: metaDescription,
            meta_title_status: metaTitleStatus,
            meta_desc_status: metaDescStatus,
            h1_count: h1Count,
            broken_links_count: brokenLinksCount,
            raw_pagespeed_json: pageSpeedRes,
            raw_dataforseo_json: dataForSeoRes
        };

        // Write row record into Supabase website_audits table
        const supabaseRes = await fetch(`${supabaseUrl}/rest/v1/website_audits`, {
            method: 'POST',
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(auditPayload)
        });

        if (!supabaseRes.ok) {
            const errText = await supabaseRes.text();
            console.error('Supabase DB Insert Error:', errText);
        }

        // Return structured payload back to the client
        return res.status(200).json({
            success: true,
            data: {
                domain,
                performance_score: perfScore,
                seo_score: seoScore,
                accessibility_score: accessibilityScore,
                best_practices_score: bestPracticesScore,
                lcp: lcpVal,
                cls: clsVal,
                fcp: fcpVal,
                inp: inpVal,
                meta_title: metaTitle,
                meta_description: metaDescription,
                meta_title_status: metaTitleStatus,
                meta_desc_status: metaDescStatus,
                h1_count: h1Count,
                broken_links: brokenLinksCount,
                screenshot: screenshot
            }
        });

    } catch (error) {
        console.error('Website audit engine exception:', error);
        return res.status(500).json({ error: 'Audit engine failed: ' + error.message });
    }
}
