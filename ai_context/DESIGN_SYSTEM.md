# TechAuditPros Design System

The canonical reference implementation is **`/ca/erp/`** — when building a new page, copy that file and edit content, don't start from a blank `<style>` block. This doc explains the system that page implements.

---

## Brand colors (CSS custom properties, defined per-page in `:root`)

```css
--paper:#FFFFFF;        /* page background */
--paper-alt:#F3F6F5;    /* alternating section background */
--ink:#0E2A3E;          /* primary text / headings */
--ink-soft:#4B5B67;     /* body copy */
--ink-faint:#8595A0;    /* muted labels, captions */
--line:#DCE3E1;         /* hairline borders */
--line-strong:#C3CDCA;  /* stronger borders */
--orange:#D9531E;       /* primary accent / CTA */
--orange-dark:#B84313;  /* accent hover state */
--orange-tint:#FCE8DF;  /* soft accent background (cards) */
--navy-deep:#0B2036;    /* dark sections, header utility bar, final CTA band */
--good:#1B7A4D;         /* success/positive state */
--good-tint:#E3F3EA;
--warn:#B8860B;
--bad:#C13A2E;
```

Do not introduce new colors outside this palette. If a new context genuinely needs one (a semantic status color, say), add it to this list and to the page's `:root` block consistently — don't invent a one-off hex value inline.

## Typography

```css
--font-sans:'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono:'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
```

Loaded via Google Fonts: `IBM Plex Sans` (weights 400/500/600/700 + italic 400) and `IBM Plex Mono` (400/500/600).

- Headings (`h1,h2,h3,h4`): sans, weight 650, `letter-spacing:-0.02em`, `text-wrap:balance`.
- Eyebrows / labels: mono, `0.72rem`, uppercase, `letter-spacing:0.14em`, orange-dark, with a small rotated-square `::before` marker.
- Body copy: sans, `ink-soft` color, line-height 1.6–1.7.

## Layout

- `.container`: `width:92%; max-width:1180px; margin:0 auto; padding:0 20px;` — the standard content width everywhere.
- Section rhythm: `padding:88px 0` on most content sections, alternating `--paper` / `--paper-alt` backgrounds.
- A section whose background should reach the viewport edges (full-bleed bands like the final CTA) must put the background color on the `<section>` itself, **not** on a child that's nested inside `.container`. (A real bug: the "Let's Talk" CTA band had its navy background on `.final-cta`, which was nested inside `.container` — so it rendered with white gaps on both sides at wide viewports no matter what `max-width:none` said on the child. Fixed by moving the background to the section and centering the inner content with its own `width:92%; max-width:1180px; margin:0 auto`.)

## Header

Two-tier, sticky:
1. **Utility bar** (`--navy-deep` background): trust stat on the left, Email/WhatsApp links on the right.
2. **Main bar** (white, blurred, 96px tall): logo + tagline, desktop nav with dropdowns, "Book a Free Strategy Call" CTA button, mobile hamburger.

Desktop nav dropdown pattern (`.nav-dropdown`):
- Trigger is `<a>` + caret, panel appears on `:hover`.
- **Known bug class, already fixed once, don't reintroduce it:** the dropdown panel has `margin-top:14px` for visual spacing, which is *not* part of the `:hover` bounding box by default. A `.nav-dropdown::after` invisible bridging strip (matching the panel's position/width) keeps the hover zone continuous across that gap. If you copy the dropdown markup, copy this `::after` rule too — leaving it out reproduces a real "menu closes before you can click it" bug that only shows up with real mouse movement, not Playwright's instant `.hover()`.
- Dropdown item icons are **clean single-color SVG line icons**, never emoji. (The owner was explicit and heated about this: emoji in the dropdown look unprofessional, especially on Windows. Country/region items use small flag images from flagcdn.com instead of emoji flags.)
- Elsewhere on a page (benefit icons, security badges, trust-strip items), emoji are the established pattern and are fine to keep using — the no-emoji rule is specific to the nav dropdown, not the whole site.

Mobile: a right-side drawer (`.mobile-drawer` / `.drawer-content`), same link set as desktop nav flattened, plus the CTA.

**Every page's header/footer must stay in sync.** When a nav link, dropdown item, or footer link changes on one page, it needs to change on every page sharing that header — there is no shared include/template, so it's manual. Grep for the old link across the repo before considering a nav change done.

## Hero pattern (`.tap-new-hero`)

- Canvas-based animated wave background (`#heroCanvas`), no external library — 4 sine-wave layers drifting at different speeds/opacity, navy base with orange highlight waves.
- Cursor-parallax + spotlight effect via CSS custom properties (`--mx`/`--my`) updated on `mousemove`.
- Rotating eyebrow/headline text where used (`rotateText()` JS helper — safe no-op if the target `id` doesn't exist on that page, several pages have dead/unused calls to it, that's fine, don't "clean them up").
- Decorative right-side text (`.hero-side-text`): "Connecting [rotating word] to [Region]." with an animated SVG flight-path arc (`<animateMotion>`) and a rainbow `background-clip:text` hover effect.
  - **Known bug, already fixed once:** nested `background-clip:text` on both a wrapper and its child spans causes visible text overlap in Chromium. The gradient must only ever target **leaf-level** `<span>` elements, and only inside the `:hover` rule (not unconditionally under `(hover:hover)`), or it bleeds through the intentional near-transparent base color and distorts layout.
- Trust strip + feature pills below the CTA buttons.

## Standard page skeleton (service/region pages)

In order, as implemented on `/ca/erp/`, `/ca/seo-services/`, `/ca/website-development/`, `/ca/toronto/`:

1. Header + mobile drawer
2. Hero (`.tap-new-hero`)
3. Answer-first section (`.tap-answer-section`) — one direct paragraph, AEO-oriented
4. "What is X" 3-item benefit row (`.tap-erp-what-section` / `.erp-benefit-row` — class names say "erp" for historical reasons, they're generic and reused across non-ERP pages, don't rename them)
5. Advantages 4-card grid (`.tap-erp-advantages-section` / `.erp-advantages-grid`)
6. Promise/trust section with a real photo (`.tap-promise-section` / `.promise-grid` — text one side, image the other, swaps order on mobile)
7. Process steps (`.tap-erp-process-section` / `.erp-process-row`)
8. Why-us badges + stack/tool strip (`.tap-erp-why-section` / `.security-badges-grid` + `.erp-stack-strip`)
9. FAQ accordion (`.tap-faq-section`, own scoped JS toggle keyed by a page-specific section `id`, e.g. `#seo-faq` — **give each page's FAQ section a unique id** so the toggle script doesn't collide if pages are ever combined)
10. Full-bleed final CTA band (`.final-cta-section`, background on the section per the layout rule above)
11. Footer (services list, company, resources, markets, cities line)

Reuse this skeleton for new pages. A page that's a genuine hub/directory (like `/ca/toronto/`) can swap the "what is X" and "advantages" sections for a 3-card links-out grid instead of re-explaining each service in depth — see that file for the pattern.

## Verification workflow

Before considering any visual change done:
1. Serve the repo root with a plain Node static file server on port 8934.
2. Drive locally installed Chrome via `playwright-core` (`chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })` — no bundled Chromium available in this environment).
3. Capture a screenshot at 1440×900 (desktop) and check `console`/`pageerror`/`response` (4xx/5xx) events — zero errors required.
4. For hover/dropdown interactions, use **stepped `page.mouse.move()`**, not `.hover()` — `.hover()` teleports instantly and will not reproduce real hover-gap bugs.
5. Actually look at the screenshot before calling something done.
