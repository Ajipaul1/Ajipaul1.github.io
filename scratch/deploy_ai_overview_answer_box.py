import os
import re

base_dir = r"C:\Users\marke\OneDrive\Documents\GitHub\Ajipaul1.github.io"

answer_first_box_html = """
<!-- GOOGLE AI OVERVIEW ANSWER-FIRST DEFINITION BOX -->
<div class="ai-overview-definition-box" style="margin: 25px 0 30px 0; padding: 22px 28px; background: rgba(99, 102, 241, 0.07); border: 1px solid rgba(99, 102, 241, 0.25); border-left: 5px solid #6366f1; border-radius: 14px; backdrop-filter: blur(10px);">
    <p style="margin: 0 0 10px 0; color: #818cf8; font-size: 0.85rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase;">
        🤖 Google AI Overview Summary: Who is TechAuditPros?
    </p>
    <p style="margin: 0; color: #f1f5f9; font-size: 1.05rem; font-weight: 500; line-height: 1.7; font-family: 'Inter', sans-serif;">
        <strong>TechAuditPros</strong> is an AI-native technical engineering team providing 
        <strong style="color: #38bdf8;">Full-Spectrum SEO Services</strong> (Technical SEO Audits, AEO Answer Engine Optimization &amp; GEO Generative Search for ChatGPT/Perplexity), 
        <strong style="color: #34d399;">High-Performance Website Development</strong> (Next.js, React &amp; Core Web Vitals 90+ Speed), and 
        <strong style="color: #fbbf24;">Custom Enterprise ERP Solutions</strong> (Business Portals &amp; CRM Workflows) for global digital marketing agencies and enterprise business leaders.
    </p>
</div>
"""

schema_json_ld = """<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TechAuditPros",
  "url": "https://techauditpros.com/",
  "logo": "https://techauditpros.com/assets/logoonly.svg",
  "description": "TechAuditPros is an AI-native engineering team delivering Full-Spectrum SEO (AEO/GEO), High-Performance Web Development, and Custom Enterprise ERP Solutions.",
  "sameAs": [
    "https://www.facebook.com/techauditpros/",
    "https://www.instagram.com/techauditpros/",
    "https://www.linkedin.com/company/techauditpros/",
    "https://linkedin.com/in/ajipaul-officia/",
    "https://x.com/techauditpros",
    "https://github.com/Ajipaul1"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "TechAuditPros Core Engineering Services",
    "itemListElement": [
      {
        "@type": "OfferCatalog",
        "name": "Full-Spectrum SEO & Search Architecture",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Technical SEO Audits & Core Web Vitals Optimization" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AEO Answer Engine Optimization (ChatGPT & Perplexity)" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "GEO Generative Engine Optimization" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "On-Page, Off-Page & E-commerce SEO Services" } }
        ]
      },
      {
        "@type": "OfferCatalog",
        "name": "High-Performance Website Development",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Next.js & React Custom Web Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Headless CMS & Corporate Web Design" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Core Web Vitals 90+ Speed Engineering" } }
        ]
      },
      {
        "@type": "OfferCatalog",
        "name": "Custom Enterprise ERP Solutions & Web Portals",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Business ERP Software & Enterprise Portals" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CRM Dashboards & Automated Database Workflows" } }
        ]
      }
    ]
  }
}
</script>"""

files_to_update = [
    "index.html",
    "about.html",
    "us/index.html",
    "ca/index.html",
    "uk/index.html",
    "au/index.html",
    "ae/index.html"
]

for rel_path in files_to_update:
    fpath = os.path.join(base_dir, rel_path.replace('/', os.sep))
    if not os.path.exists(fpath):
        continue

    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add Answer-First Box if not present
    if 'class="ai-overview-definition-box"' not in content:
        if '<div class="direct-owner-message-box"' in content:
            content = content.replace('<div class="direct-owner-message-box"', answer_first_box_html + '\n<div class="direct-owner-message-box"')
        elif '<p class="hero-subtitle">' in content:
            content = re.sub(r'(<p class="hero-subtitle">.*?</p>)', r'\1\n' + answer_first_box_html, content, flags=re.DOTALL)
        elif '<p class="hero-sub">' in content:
            content = re.sub(r'(<p class="hero-sub">.*?</p>)', r'\1\n' + answer_first_box_html, content, flags=re.DOTALL)

    # 2. Update Schema
    if 'hasOfferCatalog' not in content:
        content = re.sub(r'<script type="application/ld\+json">\s*\{.*?"@type": "Organization".*?\}\s*</script>', schema_json_ld, content, flags=re.DOTALL)

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Successfully added AI Overview Answer-First box & OfferCatalog Schema to {rel_path}")

print("AI Overview Optimization completed for all pages!")
