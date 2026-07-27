import os
import re

base_dir = r"C:\Users\marke\OneDrive\Documents\GitHub\Ajipaul1.github.io"

subtitles = {
    "index.html": '<p class="hero-subtitle">We serve as your premier <strong>white label SEO agency</strong> and <strong>dedicated offshore development center</strong>. Hire <strong>dedicated offshore developers</strong> and SEO engineers for <strong>Full-Spectrum SEO (Technical, AEO & GEO)</strong>, <strong>Custom Web Development</strong>, and <strong>Enterprise ERP Solutions</strong>—serving agencies & businesses worldwide across the USA, UK, Canada, Australia & Dubai.</p>',
    "us/index.html": '<p class="hero-subtitle">We serve as your premier <strong>white label SEO agency</strong> and <strong>dedicated offshore development center</strong> for USA agencies. Hire <strong>dedicated offshore developers</strong> and SEO engineers for <strong>Full-Spectrum SEO (Technical, AEO & GEO)</strong>, <strong>Custom Web Development</strong>, and <strong>Enterprise ERP Solutions</strong> tailored for North American businesses.</p>',
    "ca/index.html": '<p class="hero-subtitle">We serve as your premier <strong>white label SEO agency</strong> and <strong>dedicated offshore development center</strong> for Canadian agencies. Hire <strong>dedicated offshore developers</strong> and SEO engineers for <strong>Full-Spectrum SEO (Technical, AEO & GEO)</strong>, <strong>Custom Web Development</strong>, and <strong>Enterprise ERP Solutions</strong> across Canada.</p>',
    "uk/index.html": '<p class="hero-subtitle">We serve as your premier <strong>white label SEO agency</strong> and <strong>dedicated offshore development center</strong> for UK agencies. Hire <strong>dedicated offshore developers</strong> and SEO engineers for <strong>Full-Spectrum SEO (Technical, AEO & GEO)</strong>, <strong>Custom Web Development</strong>, and <strong>Enterprise ERP Solutions</strong> for British businesses.</p>',
    "au/index.html": '<p class="hero-subtitle">We serve as your premier <strong>white label SEO agency</strong> and <strong>dedicated offshore development center</strong> for Australian agencies. Hire <strong>dedicated offshore developers</strong> and SEO engineers for <strong>Full-Spectrum SEO (Technical, AEO & GEO)</strong>, <strong>Custom Web Development</strong>, and <strong>Enterprise ERP Solutions</strong> across Australia.</p>',
    "ae/index.html": '<p class="hero-subtitle">We serve as your premier <strong>white label SEO agency</strong> and <strong>dedicated offshore development center</strong> in Dubai & UAE. Hire <strong>dedicated offshore developers</strong> and SEO engineers for <strong>Full-Spectrum SEO (Technical, AEO & GEO)</strong>, <strong>Custom Web Development</strong>, and <strong>Enterprise ERP Solutions</strong> for Gulf businesses.</p>',
}

pattern = r'<p class="hero-subtitle">.*?</p>'

for rel_path, new_sub in subtitles.items():
    fpath = os.path.join(base_dir, rel_path.replace('/', os.sep))
    if os.path.exists(fpath):
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if re.search(pattern, content, flags=re.DOTALL):
            content = re.sub(pattern, new_sub, content, flags=re.DOTALL)
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Successfully updated hero subtitle in {rel_path}")
        else:
            print(f"Pattern not found in {rel_path}")

print("All hero subtitles updated successfully!")
