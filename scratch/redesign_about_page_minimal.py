import os

about_path = r"C:\Users\marke\OneDrive\Documents\GitHub\Ajipaul1.github.io\about.html"

new_about_html = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<meta content="index, follow" name="robots"/>
<title>About TechAuditPros | Advanced AI Engineering, SEO (AEO/GEO) & ERP Solutions</title>
<meta content="TechAuditPros is an AI-native engineering team. We apply advanced AI capabilities to Technical SEO (AEO/GEO), High-Performance Web Development, and Custom ERP Business Systems for global clients." name="description"/>
<link href="https://techauditpros.com/about.html" rel="canonical"/>
<!-- Favicons -->
<link href="assets/favicon-32.png" rel="icon" sizes="32x32" type="image/png"/>
<link href="assets/favicon-16.png" rel="icon" sizes="16x16" type="image/png"/>
<link href="assets/favicon-48.png" rel="icon" sizes="48x48" type="image/png"/>
<link href="assets/favicon-64.png" rel="icon" sizes="64x64" type="image/png"/>
<link href="assets/logoonly.svg" rel="icon" type="image/svg+xml"/>
<!-- Open Graph -->
<meta content="website" property="og:type"/>
<meta content="https://techauditpros.com/about.html" property="og:url"/>
<meta content="About TechAuditPros | Advanced AI Engineering, SEO (AEO/GEO) & ERP Solutions" property="og:title"/>
<meta content="TechAuditPros is an AI-native engineering team. We apply advanced AI capabilities to Technical SEO (AEO/GEO), High-Performance Web Development, and Custom ERP Business Systems for global clients." property="og:description"/>
<meta content="https://techauditpros.com/assets/images/og-share-cover.jpg" property="og:image"/>
<!-- Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800;900&display=swap" rel="stylesheet"/>
<!-- Schema: Organization -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TechAuditPros",
  "url": "https://techauditpros.com/",
  "logo": "https://techauditpros.com/assets/logoonly.svg",
  "email": "info@techauditpros.com",
  "telephone": "+916282520339",
  "sameAs": [
    "https://www.facebook.com/techauditpros/",
    "https://www.instagram.com/techauditpros/",
    "https://www.linkedin.com/company/techauditpros/",
    "https://linkedin.com/in/ajipaul-officia/",
    "https://x.com/techauditpros",
    "https://github.com/Ajipaul1"
  ],
  "description": "TechAuditPros is an AI-native engineering team applying advanced AI capabilities to Technical SEO (AEO/GEO), High-Performance Web Development, and Custom ERP Solutions for agencies and enterprise leaders worldwide."
}
</script>
<style>
    :root {
      --bg-dark: #070a13;
      --bg-surface: #0b0f19;
      --bg-card: rgba(255,255,255,0.02);
      --border-light: rgba(255,255,255,0.08);
      --text-primary: #ffffff;
      --text-secondary: #94a3b8;
      --text-muted: #64748b;
      --accent-indigo: #6366f1;
      --accent-emerald: #10b981;
      --accent-cyan: #38bdf8;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: var(--bg-dark);
      color: var(--text-primary);
      line-height: 1.6;
      overflow-x: hidden;
    }
    h1,h2,h3,h4 { font-family: 'Plus Jakarta Sans', sans-serif; color: var(--text-primary); }
    a { text-decoration: none; color: inherit; }

    /* HEADER */
    .main-header-bar {
      background: rgba(7, 10, 19, 0.92);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-light);
      position: sticky; top: 0; z-index: 1000;
      padding: 16px 0;
    }
    .header-container {
      max-width: 1200px; margin: 0 auto; padding: 0 20px;
      display: flex; justify-content: space-between; align-items: center;
    }
    .header-logo {
      display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 1.25rem;
    }
    .desktop-nav { display: flex; gap: 24px; align-items: center; font-size: 0.95rem; font-weight: 500; color: var(--text-secondary); }
    .desktop-nav a:hover { color: var(--text-primary); }
    .book-audit-btn {
      padding: 10px 20px; background: var(--accent-indigo); color: #fff; font-weight: 700; border-radius: 8px; font-size: 0.9rem; transition: background 0.2s;
    }
    .book-audit-btn:hover { background: #4f46e5; }

    /* FOOTER */
    .site-footer {
      background: #04060d; border-top: 1px solid var(--border-light); padding: 60px 0 30px 0; color: var(--text-secondary); font-size: 0.9rem;
    }
    .footer-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .footer-content { display: grid; grid-template-columns: 2fr repeat(4, 1fr); gap: 40px; margin-bottom: 40px; }
    @media (max-width: 900px) { .footer-content { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 600px) { .footer-content { grid-template-columns: 1fr; } .desktop-nav { display: none; } }
</style>
</head>
<body>

<!-- HEADER -->
<header class="main-header-bar">
<div class="header-container">
<a class="header-logo" href="/">
<img alt="TechAuditPros Logo" height="32" src="assets/logoonly.svg" width="32"/>
<span>TechAuditPros</span>
</a>
<nav class="desktop-nav">
<a href="/#services">Services</a>
<a href="/case-studies.html">Case Studies</a>
<a href="/about.html" style="color: var(--accent-indigo);">About</a>
<a href="/#contact">Contact</a>
</nav>
<div>
<a class="book-audit-btn" href="/#contact">Get Free Audit</a>
</div>
</div>
</header>

<!-- HERO SECTION -->
<section style="padding: 90px 0 60px 0; background: radial-gradient(circle at 50% 0%, rgba(99,102,241,0.15) 0%, rgba(7,10,19,1) 70%); text-align: center;">
<div style="max-width: 900px; margin: 0 auto; padding: 0 20px;">
<div style="display: inline-block; padding: 6px 16px; background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.3); border-radius: 30px; color: #818cf8; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 24px;">
    🤖 AI-Native Engineering Agency
</div>
<h1 style="font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 900; color: #ffffff; line-height: 1.15; margin-bottom: 20px;">
    Advanced AI Engineers.<br/><span style="color: #6366f1; text-shadow: 0 0 30px rgba(99,102,241,0.4);">Built for Technical Supremacy.</span>
</h1>
<p style="font-size: 1.15rem; color: #94a3b8; line-height: 1.7; margin-bottom: 35px; max-width: 780px; margin-left: auto; margin-right: auto;">
    We began as a precision technical SEO and software development firm. As AI matured, we made it the core of how we work. Today, we operate as advanced AI engineers delivering high-performance SEO (AEO/GEO), Website Engineering, and Enterprise ERP Solutions.
</p>
<div style="display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; margin-top: 30px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.08);">
    <div><strong style="font-size: 1.8rem; color: #ffffff; display: block;">128+</strong><span style="color: #64748b; font-size: 0.85rem;">Global Clients</span></div>
    <div><strong style="font-size: 1.8rem; color: #10b981; display: block;">97%</strong><span style="color: #64748b; font-size: 0.85rem;">Client Retention</span></div>
    <div><strong style="font-size: 1.8rem; color: #38bdf8; display: block;">5</strong><span style="color: #64748b; font-size: 0.85rem;">Global Hubs (US, UK, CA, AU, UAE)</span></div>
</div>
</div>
</section>

<!-- MAIN ESSAY / OUR STORY -->
<section style="padding: 80px 0; background: var(--bg-surface); border-top: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light);">
<div style="max-width: 820px; margin: 0 auto; padding: 0 20px;">
<div style="text-align: center; margin-bottom: 30px;">
<span style="color: var(--accent-indigo); font-weight: 700; font-size: 0.85rem; letter-spacing: 0.08em; text-transform: uppercase;">🌱 Our Story</span>
<h2 style="font-size: 2.2rem; color: #ffffff; font-weight: 800; margin-top: 10px;">From Technical SEO Firm to Advanced AI Engineers</h2>
</div>

<p style="font-size: 1.1rem; color: #cbd5e1; line-height: 1.85; margin-bottom: 24px;">
<strong>We started as an engineering-grade technical SEO and software team.</strong> Today, we operate as advanced AI engineers. We don't just "use AI tools" — we deeply understand how to design, prompt, chain, and control AI systems to deliver superior results in technical SEO, website development, and custom ERP solutions.
</p>

<div style="margin: 35px 0; padding: 28px 32px; background: rgba(99, 102, 241, 0.08); border-left: 4px solid var(--accent-indigo); border-radius: 12px;">
<p style="margin: 0; color: #ffffff; font-size: 1.15rem; font-weight: 600; line-height: 1.7; font-style: italic;">
    "Most agencies are still stuck in traditional methods or only superficially using basic AI prompts. We are the ones who actually know how to engineer with AI — and we are proud of it."
</p>
</div>

<p style="font-size: 1.1rem; color: #cbd5e1; line-height: 1.85;">
As AI matured, we did not treat it as a side tool. We made it the core of how we work. Clients come to us because they want the team that actually understands AI at a high level, not the team that simply pays for AI tools or uses them at a basic level.
</p>
</div>
</section>

<!-- 3 VERTICALS GRID -->
<section style="padding: 80px 0; background: var(--bg-dark);">
<div style="max-width: 1100px; margin: 0 auto; padding: 0 20px;">
<div style="text-align: center; margin-bottom: 50px;">
<span style="color: var(--accent-emerald); font-weight: 700; font-size: 0.85rem; letter-spacing: 0.08em; text-transform: uppercase;">⚙️ What We Deliver</span>
<h2 style="font-size: 2.2rem; color: #ffffff; font-weight: 800; margin-top: 10px;">Our 3 Core AI Engineering Verticals</h2>
<p style="color: var(--text-secondary); font-size: 1.05rem; max-width: 620px; margin: 10px auto 0 auto;">We do not sell traditional SEO packages or old-school development hours. We deliver results through advanced AI engineering.</p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
    <!-- Card 1 -->
    <div style="background: var(--bg-card); border: 1px solid var(--border-light); padding: 35px; border-radius: 20px;">
        <div style="width: 50px; height: 50px; background: rgba(99,102,241,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 20px; color: #818cf8;">📈</div>
        <h3 style="color: #ffffff; font-size: 1.3rem; margin-bottom: 12px; font-weight: 700;">Technical SEO &amp; Search Architecture</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 15px;">Engineering sites to dominate traditional Google search rankings as well as AI search engines (Generative Engine Optimization &amp; AEO for ChatGPT, Gemini, Perplexity).</p>
        <a href="/seo-services/" style="color: var(--accent-cyan); font-size: 0.9rem; font-weight: 600;">Learn About Search Architecture &rarr;</a>
    </div>

    <!-- Card 2 -->
    <div style="background: var(--bg-card); border: 1px solid var(--border-light); padding: 35px; border-radius: 20px;">
        <div style="width: 50px; height: 50px; background: rgba(16,185,129,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 20px; color: #34d399;">💻</div>
        <h3 style="color: #ffffff; font-size: 1.3rem; margin-bottom: 12px; font-weight: 700;">High-Performance Web Development</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 15px;">Lightning-fast Next.js, React, and headless CMS web platforms engineered for 90+ Core Web Vitals mobile performance scores and seamless conversions.</p>
        <a href="/website-design-development/" style="color: var(--accent-emerald); font-size: 0.9rem; font-weight: 600;">Learn About Web Engineering &rarr;</a>
    </div>

    <!-- Card 3 -->
    <div style="background: var(--bg-card); border: 1px solid var(--border-light); padding: 35px; border-radius: 20px;">
        <div style="width: 50px; height: 50px; background: rgba(245,158,11,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 20px; color: #fbbf24;">⚡</div>
        <h3 style="color: #ffffff; font-size: 1.3rem; margin-bottom: 12px; font-weight: 700;">Custom ERP &amp; Business Systems</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 15px;">Building custom business software, client portal dashboards, database workflows, and automated ERP integrations that eliminate manual labor.</p>
        <a href="/saas-app-development/" style="color: #fbbf24; font-size: 0.9rem; font-weight: 600;">Learn About ERP Solutions &rarr;</a>
    </div>
</div>
</div>
</section>

<!-- GLOBAL HUBS & CTA -->
<section style="padding: 80px 0; background: var(--bg-surface); border-top: 1px solid var(--border-light);">
<div style="max-width: 1000px; margin: 0 auto; padding: 45px 30px; background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(16,185,129,0.1)); border: 1px solid rgba(99,102,241,0.3); border-radius: 24px; text-align: center;">
<h2 style="color: #ffffff; font-size: 2.2rem; font-weight: 800; margin-bottom: 15px;">Serving Agencies &amp; Enterprises Worldwide</h2>
<p style="color: #cbd5e1; font-size: 1.05rem; max-width: 700px; margin: 0 auto 30px auto;">Whether you are an agency in New York, London, Toronto, Sydney, or Dubai, TechAuditPros operates as your dedicated offshore AI technical backend.</p>

<div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-bottom: 35px;">
    <a href="/us/" style="padding: 10px 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-light); border-radius: 30px; color: #ffffff; font-size: 0.9rem;">🇺🇸 USA Hub</a>
    <a href="/ca/" style="padding: 10px 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-light); border-radius: 30px; color: #ffffff; font-size: 0.9rem;">🇨🇦 Canada Hub</a>
    <a href="/uk/" style="padding: 10px 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-light); border-radius: 30px; color: #ffffff; font-size: 0.9rem;">🇬🇧 UK Hub</a>
    <a href="/au/" style="padding: 10px 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-light); border-radius: 30px; color: #ffffff; font-size: 0.9rem;">🇦🇺 Australia Hub</a>
    <a href="/ae/" style="padding: 10px 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-light); border-radius: 30px; color: #ffffff; font-size: 0.9rem;">🇦🇪 Dubai (UAE) Hub</a>
</div>

<a href="/#contact" style="display: inline-block; padding: 16px 36px; background: var(--accent-indigo); color: #ffffff; font-weight: 700; border-radius: 12px; font-size: 1.05rem; box-shadow: 0 10px 25px rgba(99,102,241,0.4);">Get Your Free Technical AI Audit &rarr;</a>
</div>
</section>

<!-- FOOTER -->
<footer class="site-footer">
<div class="footer-container">
<div class="footer-content">
<div>
    <div style="display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 1.2rem; color: #ffffff; margin-bottom: 12px;">
        <img alt="TechAuditPros Logo" height="28" src="assets/logoonly.svg" width="28"/>
        TechAuditPros
    </div>
    <p style="line-height: 1.6; margin-bottom: 20px; color: var(--text-secondary);">TechAuditPros is an AI-native engineering team delivering Full-Spectrum SEO (AEO/GEO), Website Development, and Custom ERP Solutions for global agencies and enterprises.</p>
    <div style="display: flex; gap: 14px; align-items: center;">
        <a href="https://x.com/techauditpros" target="_blank" rel="noopener" style="color: var(--text-secondary);">X (Twitter)</a>
        <a href="https://www.linkedin.com/company/techauditpros/" target="_blank" rel="noopener" style="color: var(--text-secondary);">LinkedIn</a>
        <a href="https://github.com/Ajipaul1" target="_blank" rel="noopener" style="color: var(--text-secondary);">GitHub</a>
    </div>
</div>
<div>
    <h4 style="color: #ffffff; margin-bottom: 15px;">Services</h4>
    <p><a href="/seo-services/" style="color: var(--text-secondary);">Technical SEO</a></p>
    <p><a href="/website-design-development/" style="color: var(--text-secondary);">Web Development</a></p>
    <p><a href="/saas-app-development/" style="color: var(--text-secondary);">ERP Solutions</a></p>
</div>
<div>
    <h4 style="color: #ffffff; margin-bottom: 15px;">Markets</h4>
    <p><a href="/us/" style="color: var(--text-secondary);">🇺🇸 USA</a></p>
    <p><a href="/uk/" style="color: var(--text-secondary);">🇬🇧 UK</a></p>
    <p><a href="/ca/" style="color: var(--text-secondary);">🇨🇦 Canada</a></p>
    <p><a href="/au/" style="color: var(--text-secondary);">🇦🇺 Australia</a></p>
    <p><a href="/ae/" style="color: var(--text-secondary);">🇦🇪 Dubai (UAE)</a></p>
</div>
<div>
    <h4 style="color: #ffffff; margin-bottom: 15px;">Company</h4>
    <p><a href="/about.html" style="color: var(--text-secondary);">About Us</a></p>
    <p><a href="/case-studies.html" style="color: var(--text-secondary);">Case Studies</a></p>
    <p><a href="/#contact" style="color: var(--text-secondary);">Contact</a></p>
</div>
</div>
<div style="border-top: 1px solid var(--border-light); padding-top: 20px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
    &copy; 2026 TechAuditPros. All rights reserved. Built for Technical AI Supremacy.
</div>
</div>
</footer>

</body>
</html>
"""

with open(about_path, "w", encoding="utf-8") as f:
    f.write(new_about_html)

print("Redesigned about.html into a minimal, ultra-professional dark mode executive page!")
