import os
import re

base_dir = r"C:\Users\marke\OneDrive\Documents\GitHub\Ajipaul1.github.io"
files = [
    os.path.join(base_dir, "index.html"),
    os.path.join(base_dir, "us", "index.html"),
    os.path.join(base_dir, "ca", "index.html"),
    os.path.join(base_dir, "uk", "index.html"),
    os.path.join(base_dir, "au", "index.html"),
    os.path.join(base_dir, "ae", "index.html"),
]

new_title = "TechAuditPros | Offshore SEO (AEO/GEO), Web Development & ERP Solutions"
new_meta_desc = "TechAuditPros is your dedicated offshore technical team. We provide complete SEO (Technical, AEO, GEO, On-Page & Link Building), Custom Website Design & Development, and Enterprise ERP Software Solutions & Web Portals for digital agencies and growing businesses worldwide."

og_tags_template = """<title>{title}</title>
<meta name="description" content="{desc}" />
<!-- WhatsApp, LinkedIn, Facebook Open Graph Meta Tags -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="TechAuditPros" />
<meta property="og:url" content="{url}" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{desc}" />
<meta property="og:image" content="https://techauditpros.com/assets/images/og-share-cover.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<!-- Twitter / X Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@techauditpros" />
<meta name="twitter:title" content="{title}" />
<meta name="twitter:description" content="{desc}" />
<meta name="twitter:image" content="https://techauditpros.com/assets/images/og-share-cover.jpg" />"""

for fpath in files:
    if not os.path.exists(fpath):
        continue

    with open(fpath, "r", encoding="utf-8") as f:
        content = f.read()

    # Determine page URL
    rel = os.path.relpath(fpath, base_dir).replace("\\", "/")
    if rel == "index.html":
        page_url = "https://techauditpros.com/"
    else:
        country_code = rel.split("/")[0]
        page_url = f"https://techauditpros.com/{country_code}/"

    og_block = og_tags_template.format(title=new_title, desc=new_meta_desc, url=page_url)

    # 1. Replace <title> and <meta name="description"> with the complete Open Graph block
    content = re.sub(
        r"<title>.*?</title>\s*<meta content=\".*?\" name=\"description\"/>",
        og_block,
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r"<title>.*?</title>\s*<meta name=\"description\" content=\".*?\" />",
        og_block,
        content,
        flags=re.DOTALL
    )

    # 2. Add X (Twitter) link to footer social icons if missing
    footer_social_old = '<a href="https://linkedin.com/in/ajipaul-officia/" target="_blank" rel="noopener"'
    footer_social_new = '<a href="https://x.com/techauditpros" target="_blank" rel="noopener" style="color: rgba(255,255,255,0.7); font-size: 1.1rem; text-decoration: none; transition: color 0.2s;">X (Twitter)</a>\n                    ' + footer_social_old
    
    if "x.com/techauditpros" not in content and footer_social_old in content:
        content = content.replace(footer_social_old, footer_social_new)

    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Successfully updated metadata & social tags in: {rel}")

print("All meta tags updated!")
