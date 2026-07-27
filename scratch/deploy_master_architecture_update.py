import os
import re

base_dir = r"C:\Users\marke\OneDrive/Documents/GitHub/Ajipaul1.github.io"

page_configs = {
    "index.html": {
        "h1": "Raw AI Gives You Code. <span>We Give You Master Architecture.</span>",
        "subtitle": "Everybody knows AI exists. But raw AI lacks human vision, creative strategy, and enterprise security. We combine <strong>110% Elite Human System Architecture</strong> with <strong>AI-Speed Fulfillment</strong> to engineer <strong>Full-Spectrum SEO (AEO/GEO)</strong>, <strong>Custom Web Development</strong>, and <strong>Enterprise ERP Solutions</strong>—built for digital agencies, brand managers, and business owners worldwide across the USA, UK, Canada, Australia & Dubai.",
    },
    "us/index.html": {
        "h1": "Raw AI Gives You Code. <span>We Give You Master Architecture in the USA.</span>",
        "subtitle": "Everybody knows AI exists. But raw AI lacks human vision, creative strategy, and enterprise security. We combine <strong>110% Elite Human System Architecture</strong> with <strong>AI-Speed Fulfillment</strong> to engineer <strong>Full-Spectrum SEO (AEO/GEO)</strong>, <strong>Custom Web Development</strong>, and <strong>Enterprise ERP Solutions</strong>—tailored for USA digital agencies & American business owners.",
    },
    "ca/index.html": {
        "h1": "Raw AI Gives You Code. <span>We Give You Master Architecture in Canada.</span>",
        "subtitle": "Everybody knows AI exists. But raw AI lacks human vision, creative strategy, and enterprise security. We combine <strong>110% Elite Human System Architecture</strong> with <strong>AI-Speed Fulfillment</strong> to engineer <strong>Full-Spectrum SEO (AEO/GEO)</strong>, <strong>Custom Web Development</strong>, and <strong>Enterprise ERP Solutions</strong>—tailored for Canadian agencies & business owners.",
    },
    "uk/index.html": {
        "h1": "Raw AI Gives You Code. <span>We Give You Master Architecture in the UK.</span>",
        "subtitle": "Everybody knows AI exists. But raw AI lacks human vision, creative strategy, and enterprise security. We combine <strong>110% Elite Human System Architecture</strong> with <strong>AI-Speed Fulfillment</strong> to engineer <strong>Full-Spectrum SEO (AEO/GEO)</strong>, <strong>Custom Web Development</strong>, and <strong>Enterprise ERP Solutions</strong>—tailored for UK agencies & British enterprise owners.",
    },
    "au/index.html": {
        "h1": "Raw AI Gives You Code. <span>We Give You Master Architecture in Australia.</span>",
        "subtitle": "Everybody knows AI exists. But raw AI lacks human vision, creative strategy, and enterprise security. We combine <strong>110% Elite Human System Architecture</strong> with <strong>AI-Speed Fulfillment</strong> to engineer <strong>Full-Spectrum SEO (AEO/GEO)</strong>, <strong>Custom Web Development</strong>, and <strong>Enterprise ERP Solutions</strong>—tailored for Australian agencies & business leaders.",
    },
    "ae/index.html": {
        "h1": "Raw AI Gives You Code. <span>We Give You Master Architecture in Dubai & UAE.</span>",
        "subtitle": "Everybody knows AI exists. But raw AI lacks human vision, creative strategy, and enterprise security. We combine <strong>110% Elite Human System Architecture</strong> with <strong>AI-Speed Fulfillment</strong> to engineer <strong>Full-Spectrum SEO (AEO/GEO)</strong>, <strong>Custom Web Development</strong>, and <strong>Enterprise ERP Solutions</strong>—tailored for Dubai & UAE agencies & Gulf enterprise owners.",
    },
}

message_box_html = """
                    <div class="direct-owner-message-box" style="margin: 20px 0 25px 0; padding: 16px 20px; background: rgba(99, 102, 241, 0.08); border-left: 4px solid #10b981; border-radius: 12px; backdrop-filter: blur(10px);">
                        <p style="margin: 0; color: #e2e8f0; font-size: 0.98rem; font-weight: 500; line-height: 1.6;">
                            💬 <strong style="color: #10b981;">Message to Business Owners & Agencies:</strong> 
                            <em>"You already know AI can replace most digital work. We give you the system that actually does it—and we stand behind 100% performance execution."</em>
                        </p>
                    </div>"""

comparison_grid_html = """
<!-- AI-ERA CHOICE COMPARISON SECTION -->
<section class="ai-era-choice-section" style="padding: 50px 0; background: #070a13; border-top: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08);">
    <div class="container">
        <h2 style="text-align: center; color: #ffffff; font-size: 2rem; margin-bottom: 35px; font-family: 'Plus Jakarta Sans', sans-serif;">
            Why Global Brands Choose the <span style="color: #6366f1; text-shadow: 0 0 20px rgba(99,102,241,0.4);">TechAuditPros Hybrid Model</span>
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
            
            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(239,68,68,0.3); padding: 25px; border-radius: 16px;">
                <h3 style="color: #ef4444; font-size: 1.2rem; margin-bottom: 15px;">❌ Raw AI Tools Alone</h3>
                <ul style="color: #94a3b8; font-size: 0.9rem; line-height: 1.8; margin: 0; padding-left: 18px;">
                    <li>Robotic, template code</li>
                    <li>Hallucinated security bugs</li>
                    <li>Zero business strategy</li>
                    <li>Fails complex ERP & DB integrations</li>
                </ul>
            </div>

            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(245,158,11,0.3); padding: 25px; border-radius: 16px;">
                <h3 style="color: #f59e0b; font-size: 1.2rem; margin-bottom: 15px;">⏳ Old Legacy IT Agencies</h3>
                <ul style="color: #94a3b8; font-size: 0.9rem; line-height: 1.8; margin: 0; padding-left: 18px;">
                    <li>Inflated $10,000/mo manual billing</li>
                    <li>Slow 3 to 6 month delivery times</li>
                    <li>Heavy local payroll overhead</li>
                    <li>Outdated traditional SEO tactics</li>
                </ul>
            </div>

            <div style="background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(16,185,129,0.12)); border: 2px solid #6366f1; padding: 25px; border-radius: 16px; box-shadow: 0 10px 30px rgba(99,102,241,0.2);">
                <h3 style="color: #10b981; font-size: 1.2rem; margin-bottom: 15px;">⚡ TechAuditPros (110% Hybrid)</h3>
                <ul style="color: #ffffff; font-size: 0.9rem; line-height: 1.8; margin: 0; padding-left: 18px;">
                    <li><strong>110% Human Creative System Design</strong></li>
                    <li><strong>AI-Speed Fulfillment (10x Delivery)</strong></li>
                    <li><strong>Generative AI Search (GEO/AEO) Dominance</strong></li>
                    <li><strong>Enterprise ERP & Web App Architecture</strong></li>
                    <li><strong>Up to 70% Cost Overhead Savings</strong></li>
                </ul>
            </div>

        </div>
    </div>
</section>
"""

h1_pattern = r'<h1>Even if you were working in space\.\.\. <span>.*?</span></h1>'
sub_pattern = r'<p class="hero-subtitle">.*?</p>'

for rel_path, config in page_configs.items():
    fpath = os.path.join(base_dir, rel_path.replace('/', os.sep))
    if not os.path.exists(fpath):
        continue

    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update H1
    new_h1 = f"<h1>{config['h1']}</h1>"
    content = re.sub(h1_pattern, new_h1, content, flags=re.DOTALL)
    # Also handle if H1 was previously updated
    content = re.sub(r'<h1>Raw AI Gives You Code\..*?</h1>', new_h1, content, flags=re.DOTALL)

    # 2. Update Subtitle + Message Box
    new_subtitle_block = f'<p class="hero-subtitle">{config["subtitle"]}</p>{message_box_html}'
    if '<div class="direct-owner-message-box"' in content:
        content = re.sub(r'<p class="hero-subtitle">.*?</p>\s*<div class="direct-owner-message-box".*?</div>', new_subtitle_block, content, flags=re.DOTALL)
    else:
        content = re.sub(sub_pattern, new_subtitle_block, content, flags=re.DOTALL)

    # 3. Add Comparison Grid Section right after hero section if not already present
    if 'class="ai-era-choice-section"' not in content:
        # Insert after hero section closing tag </section>
        content = content.replace('</section>\n\n<!-- WHY INDIA', f'</section>\n\n{comparison_grid_html}\n\n<!-- WHY INDIA')
        content = content.replace('</section>\n<!-- WHY INDIA', f'</section>\n\n{comparison_grid_html}\n\n<!-- WHY INDIA')

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Successfully updated master architecture positioning on {rel_path}")

print("Master architecture update completed for all pages!")
