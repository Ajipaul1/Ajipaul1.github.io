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

        // Send email via Resend if API key is configured
        const resendApiKey = process.env.RESEND_API_KEY;
        if (resendApiKey) {
            try {
                const getScoreColor = (score) => {
                    if (score === null || score === undefined) return '#9ca3af';
                    if (score >= 90) return '#22c55e';
                    if (score >= 50) return '#eab308';
                    return '#ef4444';
                };

                const emailHtml = `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #030712; color: #f3f4f6; padding: 45px 25px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #1f2937; box-sizing: border-box;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h2 style="color: #38bdf8; margin: 0 0 5px 0; font-size: 26px; letter-spacing: -0.5px;">TechAuditPros</h2>
                            <p style="color: #9ca3af; margin: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Automated Audit Engine</p>
                        </div>
                        
                        <div style="background-color: #111827; border: 1px solid #1f2937; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
                            <h3 style="color: #ffffff; font-size: 18px; margin: 0 0 10px 0; text-align: center;">Website Analysis Report</h3>
                            <p style="color: #38bdf8; font-size: 16px; font-weight: bold; margin: 0 0 20px 0; text-align: center; word-break: break-all;">${domain}</p>
                            
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 25px;">
                                <tr>
                                    <td align="center" style="width: 25%; padding: 5px;">
                                        <div style="background-color: #030712; border: 1px solid #1f2937; padding: 12px 5px; border-radius: 6px; min-width: 100px;">
                                            <div style="font-size: 22px; font-weight: 800; color: ${getScoreColor(perfScore)};">${perfScore !== null ? perfScore : '--'}</div>
                                            <div style="font-size: 10px; color: #9ca3af; margin-top: 4px; text-transform: uppercase;">Performance</div>
                                        </div>
                                    </td>
                                    <td align="center" style="width: 25%; padding: 5px;">
                                        <div style="background-color: #030712; border: 1px solid #1f2937; padding: 12px 5px; border-radius: 6px; min-width: 100px;">
                                            <div style="font-size: 22px; font-weight: 800; color: ${getScoreColor(seoScore)};">${seoScore !== null ? seoScore : '--'}</div>
                                            <div style="font-size: 10px; color: #9ca3af; margin-top: 4px; text-transform: uppercase;">SEO Score</div>
                                        </div>
                                    </td>
                                    <td align="center" style="width: 25%; padding: 5px;">
                                        <div style="background-color: #030712; border: 1px solid #1f2937; padding: 12px 5px; border-radius: 6px; min-width: 100px;">
                                            <div style="font-size: 22px; font-weight: 800; color: ${getScoreColor(accessibilityScore)};">${accessibilityScore !== null ? accessibilityScore : '--'}</div>
                                            <div style="font-size: 10px; color: #9ca3af; margin-top: 4px; text-transform: uppercase;">Accessibility</div>
                                        </div>
                                    </td>
                                    <td align="center" style="width: 25%; padding: 5px;">
                                        <div style="background-color: #030712; border: 1px solid #1f2937; padding: 12px 5px; border-radius: 6px; min-width: 100px;">
                                            <div style="font-size: 22px; font-weight: 800; color: ${getScoreColor(bestPracticesScore)};">${bestPracticesScore !== null ? bestPracticesScore : '--'}</div>
                                            <div style="font-size: 10px; color: #9ca3af; margin-top: 4px; text-transform: uppercase;">Best Practices</div>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            ${lcpVal ? `
                                <div style="text-align: center; font-size: 14px; color: #e5e7eb; border-top: 1px solid #1f2937; padding-top: 15px;">
                                    Mobile Load Time (LCP): 
                                    <span style="font-weight: bold; color: ${lcpVal <= 2.5 ? '#22c55e' : (lcpVal <= 4.0 ? '#eab308' : '#ef4444')};">${lcpVal}s</span>
                                    ${lcpVal > 2.5 ? ' <span style="color: #ef4444; font-size: 12px;">(Needs Optimization)</span>' : ' <span style="color: #22c55e; font-size: 12px;">(Good)</span>'}
                                </div>
                            ` : ''}
                        </div>

                        <p style="color: #9ca3af; font-size: 14px; line-height: 1.6; margin: 0 0 30px 0; text-align: center;">
                            We identified critical optimization areas on your website. View your full interactive dashboard containing desktop screenshots, broken link crawl maps, and developer recommendations.
                        </p>

                        <div style="text-align: center; margin-bottom: 35px;">
                            <a href="https://techauditpros.com/?domain=${encodeURIComponent(domain)}" style="background-color: #0ea5e9; color: #ffffff; text-decoration: none; padding: 14px 35px; font-weight: bold; border-radius: 6px; display: inline-block; font-size: 15px; box-shadow: 0 4px 10px rgba(14, 165, 233, 0.3);">
                                View Full Interactive Report
                            </a>
                        </div>

                        <div style="border-top: 1px solid #1f2937; padding-top: 20px; text-align: center;">
                            <p style="color: #6b7280; font-size: 11px; margin: 0; line-height: 1.5;">
                                This report was requested for ${email}. If you did not request this audit, please ignore this email.<br/>
                                &copy; 2026 TechAuditPros. All rights reserved.
                            </p>
                        </div>
                    </div>
                `;

                await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${resendApiKey}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        from: 'TechAuditPros <info@techauditpros.com>',
                        to: email,
                        bcc: 'info@techauditpros.com',
                        subject: `Your Website Audit Report for ${domain}`,
                        html: emailHtml
                    })
                }).then(async (res) => {
                    if (!res.ok) {
                        const errText = await res.text();
                        console.error('Resend API Send Error:', errText);
                    } else {
                        console.log('Resend Audit Report Sent to:', email);
                    }
                }).catch((err) => {
                    console.error('Resend fetch exception:', err);
                });
            } catch (err) {
                console.error('Failed to trigger Resend notification:', err);
            }
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
