import os

base_dir = r"C:\Users\marke\OneDrive\Documents\GitHub\Ajipaul1.github.io"
countries = ["us", "ca", "uk", "au", "ae"]

target = '"https://linkedin.com/in/ajipaul-officia/",'
replacement = '"https://linkedin.com/in/ajipaul-officia/",\n    "https://x.com/techauditpros",'

for c in countries:
    fpath = os.path.join(base_dir, c, "index.html")
    if os.path.exists(fpath):
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()
        if "x.com/techauditpros" not in content:
            content = content.replace(target, replacement)
            with open(fpath, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Updated {c}/index.html")

print("Finished updating schema social links!")
