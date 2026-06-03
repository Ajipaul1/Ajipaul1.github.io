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

for rel_path, img_name in files_to_update:
    file_path = os.path.join(base_dir, rel_path)
    if not os.path.exists(file_path):
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    depth = rel_path.count('/')
    prefix = "../" if depth == 0 else "../../"
    new_src = f"{prefix}assets/images/services/{img_name}"
    
    # More robust regex for the hero image in the saas-floating-mockup div
    # Match <div class="saas-floating-mockup"[^>]*>\s*<img[^>]*src="([^"]+)"
    def replace_img(match):
        full_match = match.group(0)
        old_src = match.group(1)
        return full_match.replace(old_src, new_src)

    content = re.sub(r'(<div class="saas-floating-mockup"[^>]*>\s*<img[^>]*src=")([^"]+)(")', replace_img, content)
    
    # For background-image just in case
    content = re.sub(r'(background-image:\s*url\([\'"]?)[^\'"\)]+([\'"]?\))', r'\g<1>' + new_src + r'\g<2>', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated images for {rel_path}")
