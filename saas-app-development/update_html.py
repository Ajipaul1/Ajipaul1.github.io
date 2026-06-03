import os
import re

base_dir = r"C:\Users\marke\OneDrive\Documents\GitHub\Ajipaul1.github.io\saas-app-development"

files_to_update = [
    ("index.html", "saas_hero.png"),
    ("mvp-development/index.html", "mvp_hero.png"),
    ("b2b-dashboards/index.html", "b2b_hero.png"),
    ("custom-crm-portals/index.html", "crm_hero.png"),
    ("erp-integrations/index.html", "erp_hero.png")
]

nav_html = """            <nav class="desktop-nav">
                <a href="/#services">Services</a>
                <div class="nav-dropdown">
                    <a href="#" class="dropdown-trigger" onclick="return false;">Categories <span class="arrow">▼</span></a>
                    <div class="dropdown-menu">
                        <div class="dropdown-silo">
                            <h4>Technical SEO</h4>
                            <a href="/technical-seo-audit/">Technical Audit</a>
                            <a href="/seo-services/enterprise-seo/">Enterprise SEO</a>
                            <a href="/seo-services/saas-seo-strategy/">SaaS SEO</a>
                            <a href="/seo-services/ecommerce-seo/">E-commerce SEO</a>
                            <a href="/seo-services/geo-aeo-optimisation/">GEO & AEO</a>
                        </div>
                        <div class="dropdown-silo">
                            <h4>Custom SaaS</h4>
                            <a href="/saas-app-development/custom-crm-portals/">Custom CRM</a>
                            <a href="/saas-app-development/erp-integrations/">ERP Integrations</a>
                            <a href="/saas-app-development/b2b-dashboards/">B2B Dashboards</a>
                            <a href="/saas-app-development/mvp-development/">MVP Development</a>
                        </div>
                        <div class="dropdown-silo">
                            <h4>Web Design</h4>
                            <a href="/website-seo-audit/">Website Audit</a>
                            <a href="/website-design-development/b2b-corporate-websites/">B2B Corporate</a>
                            <a href="/website-design-development/core-web-vitals-optimization/">Core Web Vitals</a>
                            <a href="/website-design-development/nextjs-development/">Next.js Dev</a>
                            <a href="/website-design-development/headless-cms/">Headless CMS</a>
                        </div>
                        <div class="dropdown-silo">
                            <h4>Markets</h4>
                            <a href="/seo-audit-kochi/">Kochi HQ</a>
                            <a href="/seo-agency-kerala/">Kerala Agency</a>
                            <a href="/seo-audit-india/">India National</a>
                            <a href="/seo-company/mumbai/">Mumbai Office</a>
                            <a href="/seo-company/bangalore/">Bangalore Office</a>
                            <a href="/seo-company/london-uk/">London UK</a>
                            <a href="/seo-audit-usa/">USA Market</a>
                            <a href="/seo-audit-canada/">Canada Market</a>
                        </div>
                        <div class="dropdown-silo">
                            <h4>Blog & Guides</h4>
                            <a href="/blog/">Blog Hub</a>
                            <a href="/blog/what-is-serp-in-seo/">What is SERP?</a>
                            <a href="/blog/seo-friendly-web-design-guide/">SEO Web Design</a>
                            <a href="/blog/saas-vs-custom-software/">SaaS vs Custom</a>
                            <a href="/blog/how-to-fix-crawlability-issues/">Fix Crawlability</a>
                            <a href="/blog/generative-engine-optimization-geo/">GEO Guide</a>
                            <a href="/blog/react-vs-nextjs-for-seo/">React vs Next.js</a>
                        </div>
                    </div>
                </div>
                <a href="/case-studies.html">Case Studies</a>
                <a href="/about.html">About</a>
                <a href="/#contact">Contact</a>
            </nav>"""

footer_html = """    <footer class="site-footer" id="contact">
        <div class="footer-container">
            <div class="footer-content">
                <div class="footer-column">
                    <h3>TechAuditPros</h3>
                    <p>Enterprise-grade technical SEO audits for businesses that demand clarity.</p>
                </div>
                <div class="footer-column">
                    <h3>Services</h3>
                    <p><a href="/technical-seo-audit/" class="footer-link">Technical Audit</a></p>
                    <p><a href="/website-seo-audit/" class="footer-link">Website Audit</a></p>
                    <p><a href="/seo-agency-kerala/" class="footer-link">Kerala SEO</a></p>
                </div>
                <div class="footer-column">
                    <h3>Markets</h3>
                    <p><a href="/seo-audit-kochi/" class="footer-link">Kochi</a></p>
                    <p><a href="/seo-audit-usa/" class="footer-link">USA</a></p>
                    <p><a href="/seo-audit-canada/" class="footer-link">Canada</a></p>
                </div>
                <div class="footer-column">
                    <h3>Company</h3>
                    <p><a href="/about.html" class="footer-link">About Us</a></p>
                    <p><a href="/case-studies.html" class="footer-link">Case Studies</a></p>
                    <p><a href="mailto:info@techauditpros.com" class="footer-link">Contact</a></p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 TechAuditPros. All rights reserved.</p>
            </div>
        </div>
    </footer>
"""

for rel_path, img_name in files_to_update:
    file_path = os.path.join(base_dir, rel_path)
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update Navigation
    content = re.sub(r'<nav class="desktop-nav">.*?</nav>', nav_html, content, flags=re.DOTALL)
    
    # 2. Update Footer if missing
    if '<footer class="site-footer" id="contact">' not in content:
        content = re.sub(r'</body>', f'{footer_html}</body>', content, flags=re.IGNORECASE)
        
    # 3. Update Hero Image
    depth = rel_path.count('/')
    prefix = "../" if depth == 0 else "../../"
    new_src = f"{prefix}assets/images/services/{img_name}"
    
    # It might be in saas-floating-mockup or saas-hero mockup
    content = re.sub(r'(<div class="saas-floating-mockup">\s*<img\s+src=")[^"]+(")', r'\g<1>' + new_src + r'\g<2>', content)
    # Also support if it is background image, though user says "<img> tag or background-image"
    content = re.sub(r'(background-image:\s*url\([\'"]?)[^\'"\)]+([\'"]?\))', r'\g<1>' + new_src + r'\g<2>', content)
    # Generic hero img tag fallback just in case
    content = re.sub(r'(class="hero-image"[^>]*src=")[^"]+(")', r'\g<1>' + new_src + r'\g<2>', content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {rel_path}")
