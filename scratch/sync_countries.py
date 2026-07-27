import os
import re

base_dir = r"C:\Users\marke\OneDrive\Documents\GitHub\Ajipaul1.github.io"

# 1. Read parent index.html
with open(os.path.join(base_dir, "index.html"), "r", encoding="utf-8") as f:
    parent_content = f.read()

# Extract Mobile CSS Overrides
css_pattern = r"(/\* =====================================================\s+MOBILE 10/10 OVERRIDES.*?</style>)"
css_match = re.search(css_pattern, parent_content, re.DOTALL)
if not css_match:
    print("Error: Could not find Mobile CSS Overrides in parent index.html")
    exit(1)
mobile_css = css_match.group(1)

# Extract Sticky CTA & Bottom script
cta_pattern = r"(<!-- ============================================================.*?</html>)"
cta_match = re.search(cta_pattern, parent_content, re.DOTALL)
if not cta_match:
    print("Error: Could not find Mobile Sticky CTA block in parent index.html")
    exit(1)
mobile_cta = cta_match.group(1)

# Clean 16:9 Video wrapper html block (absolute path to video /assets/videos/india-team-ad.mp4)
video_block = """        <!-- Middle column: 16:9 Clean Uncropped Video Card -->
        <div class="savings-video-wrapper" style="width: 100%; aspect-ratio: 16 / 9; position: relative; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.12); background: #070b19; overflow: hidden; box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 0 0 25px rgba(99, 102, 241, 0.15); display: flex; align-items: center; justify-content: center; align-self: center;">
            <video autoplay loop muted playsinline preload="metadata" style="width: 100%; height: 100%; object-fit: contain; border-radius: 15px; display: block;">
                <source src="/assets/videos/india-team-ad.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
        
"""

countries = ["us", "ca", "uk", "au", "ae"]

for country in countries:
    c_file = os.path.join(base_dir, country, "index.html")
    if not os.path.exists(c_file):
        print(f"File not found: {c_file}")
        continue
    
    with open(c_file, "r", encoding="utf-8") as f:
        content = f.read()

    # Apply align-items: center to savings-grid
    content = re.sub(
        r"\.savings-grid\s*\{\s*display:\s*grid;\s*grid-template-columns:\s*1\.1fr 1\.3fr 1\.1fr;\s*gap:\s*40px;\s*align-items:\s*stretch;\s*\}",
        ".savings-grid {\n        display: grid;\n        grid-template-columns: 1.1fr 1.3fr 1.1fr;\n        gap: 40px;\n        align-items: center;\n    }",
        content
    )
    
    # 1. Replace CSS overrides block (insert before the </style> at the end of first style tag)
    content = re.sub(
        r"@keyframes fadeInPopover\s*\{\s*from\s*\{\s*opacity:\s*0;\s*transform:\s*translateX\(10px\);\s*\}\s*to\s*\{\s*opacity:\s*1;\s*transform:\s*translateX\(0\);\s*\}\s*\}\s*</style>",
        "@keyframes fadeInPopover {\n        from { opacity: 0; transform: translateX(10px); }\n        to { opacity: 1; transform: translateX(0); }\n    }\n\n" + mobile_css,
        content
    )

    # 2. Replace the video section safely (locate start tag and stop before right column start tag)
    video_start_marker = "<!-- Middle column: Gateway photo with Play overlay -->"
    right_col_marker = "<!-- Right column Cost Comparison vertical bars"
    
    start_idx = content.find(video_start_marker)
    end_idx = content.find(right_col_marker)
    
    if start_idx != -1 and end_idx != -1:
        content = content[:start_idx] + video_block + content[end_idx:]
    else:
        print(f"Warning: Could not safely find video markers in {country}/index.html")

    # 3. Replace the footer CTA and bottom scripts
    content = re.sub(
        r"// End of Gmail Popover\s*</script>\s*</body>\s*</html>",
        mobile_cta.replace("</html>", ""),
        content,
        flags=re.DOTALL
    )

    with open(c_file, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"Successfully synced: {country}/index.html")

print("Sync completed!")
