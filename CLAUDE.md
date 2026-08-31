# TechAuditPros (techauditpros.com) — AI Session Bootstrap

**Before doing any task in this repository, read the `ai_context/` folder in this order:**

1. `ai_context/RULES.md` — the non-negotiable rules: no duplicate content (SEO/AEO/GEO), brand identity, security, image usage, design consistency.
2. `ai_context/DESIGN_SYSTEM.md` — brand colors, typography, header/hero/page-skeleton patterns, and the bugs already fixed once that shouldn't be reintroduced. `/ca/erp/` is the canonical reference page — copy it when building a new page, don't start from scratch.
3. `ai_context/PROGRESS.md` — what's live, what's pending, decisions already made (and why, so they don't get re-litigated), and the running dated session log. **Append a dated entry here describing what you did before you commit.**
4. `ai_context/COMMANDS.md` — how to work: local verification workflow (static server + Playwright/Chrome), git commit conventions, the image-library intake process, and the keyword-research workflow.

**Workflow note:** unlike some of the owner's other projects, this repo does **not** require waiting for an explicit "Approved" before coding — the owner (Aji Paul) expects direct action once a request is clear. Still verify locally (screenshot + zero console/network errors) before every push, and state your understanding first for any large or costly-to-redo request.

**Owner communicates in heavily informal, typo-heavy English/Hinglish.** Read requests for intent, not literal spelling — but if genuinely ambiguous or large in scope, say what you understood before building, rather than guessing silently.

This file and the `ai_context/` folder are living documents. Any AI session (Claude or otherwise) that works in this repo should update them — add rules that got clarified, log what was built, note new bugs found and fixed, keep the design system doc accurate as the site evolves. Don't let this drift out of sync with reality.
