import os
import re

about_path = r"C:\Users\marke\OneDrive\Documents\GitHub\Ajipaul1.github.io\about.html"

if os.path.exists(about_path):
    with open(about_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update Title & Meta Description in head
    content = re.sub(
        r'<title>.*?</title>',
        '<title>About TechAuditPros | Advanced AI Engineering, SEO (AEO/GEO) & ERP Solutions</title>',
        content
    )
    content = re.sub(
        r'<meta content=".*?" name="description"/>',
        '<meta content="TechAuditPros is an AI-native engineering team. We apply advanced AI capabilities to Technical SEO (AEO/GEO), High-Performance Web Development, and Custom ERP Business Systems for global clients." name="description"/>',
        content
    )

    # 2. Update Hero Section
    new_hero = """<section class="about-hero">
<div class="hero-eyebrow">🤖 AI-Native Engineering Agency</div>
<h1>Advanced AI Engineers.<br/><span>Built for Technical Supremacy.</span></h1>
<p class="hero-sub">We began as a precision technical SEO and software development firm. As AI matured, we made it the core of how we work. Today, we operate as advanced AI engineers delivering high-performance SEO (AEO/GEO), Website Engineering, and Enterprise ERP Solutions.</p>
<div class="hero-location-pill">
      📍 Global AI Engineering Hub | <span>Serving USA, UK, Canada, Australia & Dubai</span>
</div>
</section>"""
    content = re.sub(r'<section class="about-hero">.*?</section>', new_hero, content, flags=re.DOTALL)

    # 3. Update Origin Story Section
    new_origin = """<div class="origin-text">
<div class="section-eyebrow">🌱 Our Evolution</div>
<h2 class="section-title">From Technical SEO Firm<br/>to Advanced AI Engineers</h2>
<p><strong>We started as an engineering-grade technical SEO and software team.</strong> Today, we operate as advanced AI engineers. We don't just "use AI tools" — we deeply understand how to design, prompt, chain, and control AI systems to deliver superior results in technical SEO, website development, and custom ERP solutions.</p>
<p>Most agencies are still stuck in traditional methods or only superficially using basic AI prompts. <strong>We are the ones who actually know how to engineer with AI — and we are proud of it.</strong></p>
<p>As AI matured, we did not treat it as a side tool. We made it the core of how we work. Clients come to us because they want the team that actually understands AI at a high level, not the team that simply pays for AI tools or uses them at a basic level.</p>
</div>"""
    content = re.sub(r'<div class="origin-text">.*?</div>\s*<div class="origin-visual">', new_origin + '\n<div class="origin-visual">', content, flags=re.DOTALL)

    # 4. Update Vision Section
    new_vision = """<div class="vision-text">
<div class="section-eyebrow">🔭 The AI-Native Standard</div>
<h2 class="section-title">We Deliver Results Through Advanced AI Engineering</h2>
<p>We do not sell traditional SEO packages or old-school development hours. We deliver results through advanced AI engineering — something most agencies still do not know how to do properly.</p>
<p>Today, our advanced AI engineering capabilities are applied to three core verticals:</p>
<ul style="color: var(--text-secondary); line-height: 2; margin-top: 15px; margin-left: 20px; font-weight: 500; font-size: 1.05rem;">
  <li><strong>Technical SEO &amp; Search Architecture (AEO &amp; GEO):</strong> Engineering sites to dominate traditional Google rankings as well as AI search engines (ChatGPT, Gemini, Perplexity).</li>
  <li><strong>High-Performance Website Development:</strong> Lightning-fast Next.js and React frontends engineered with 90+ Core Web Vitals performance.</li>
  <li><strong>Custom ERP &amp; Business System Solutions:</strong> Building automated database workflows, enterprise portals, and integrated cloud software.</li>
</ul>
</div>"""
    content = re.sub(r'<div class="vision-text">.*?</div>\s*<div class="vision-pillars">', new_vision + '\n<div class="vision-pillars">', content, flags=re.DOTALL)

    with open(about_path, "w", encoding="utf-8") as f:
        f.write(content)

    print("Successfully updated about.html with complete AI-Native Engineering positioning!")
