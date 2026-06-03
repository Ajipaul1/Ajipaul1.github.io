import os
import re

files_info = [
    ("website-design-development/index.html", "../assets/images/services/web_design_hero.png"),
    ("website-design-development/headless-cms/index.html", "../../assets/images/services/headless_cms_hero.png"),
    ("website-design-development/nextjs-development/index.html", "../../assets/images/services/nextjs_dev_hero.png"),
    ("website-design-development/core-web-vitals-optimization/index.html", "../../assets/images/services/core_web_vitals_hero.png"),
    ("website-design-development/b2b-corporate-websites/index.html", "../../assets/images/services/b2b_corporate_hero.png"),
]

nav_menu = """            <nav class="desktop-nav">
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
    </footer>"""

for file_path, img_path in files_info:
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Replace the img tag in hero section
    # Use non-greedy match to find the first img after wd-hero-image
    new_content = re.sub(r'(<div class="wd-hero-image">\s*<img src=")[^"]+(")', r'\g<1>' + img_path + r'\g<2>', content)
    
    # Replace nav
    new_content = re.sub(r'<nav class="desktop-nav">.*?</nav>', nav_menu, new_content, flags=re.DOTALL)
    
    # Check if footer exists
    if '<footer class="site-footer" id="contact">' not in new_content:
        new_content = new_content.replace('</body>', footer_html + '\n</body>')
        
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
        
    print(f"Processed {file_path}")
