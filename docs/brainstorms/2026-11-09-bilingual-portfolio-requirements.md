---
date: 2026-11-09
topic: bilingual-portfolio
---

# Bilingual Portfolio Site — Requirements

## Summary

Build a bilingual (English `/`, Indonesian `/id/`) static portfolio for Silfaradila Mei Fizahidah with Astro, React and TypeScript, content authored as markdown in the repo. v1 ships the recruiter path complete — Home, About, Projects, Resume, Contact — under begaya-here's contribution workflow adapted for a solo static site, with merge-to-main deploying straight to production.

---

## Problem Frame

Silfaradila is an AI/Computer Vision engineer in Yogyakarta looking for her next opportunity, but she has no web presence: all professional material sits in untracked reference documents. Those documents are unusually careful — they separate verified claims from resume-only claims, flag every employer project as partially redacted, and forbid publishing company data. A portfolio built carelessly from them would either understate her work or breach those gates. design.md already fixes the content structure (a 7-page blueprint with a final sitemap), so the work is implementing that blueprint faithfully, bilingually, and honestly — not inventing content. The site must also grow: Personal Lab and Engineering Journal are part of the blueprint's identity but have no real material yet.

---

## Key Decisions

- **Full bilingual parity at launch.** Every v1 page exists in both locales from day one. The Indonesian source material already covers all nine projects, and a half-translated face is worse than a smaller one.
- **Compact tier for non-flagship projects.** The six professional projects beyond the three flagship case studies ship as compact entries, not full write-ups. Recruiters see the whole career; each entry can graduate to a full case study later.
- **Begaya spine, adapted.** Issue-first, one branch, one PR, Conventional Commits, rebase-merge — but without the organization ceremony (project board, milestones, priority/effort fields) and without a staging tier; merge-to-main deploys production.
- **Education lives only in the downloadable PDF.** No education content renders anywhere on the site, in either locale. This overrides design.md's About section 5 and the Resume page's education block.
- **Dark with restrained cyberpunk character.** The owner chose a dark surface with cyberpunk-flavored effects — enough to read "developer" at a glance, never so much that it hurts readability or professional credibility. design.md specifies no visual design, so planning picks the concrete palette, typography, and effects within this direction.

---

## Requirements

**Site and stack**

- R1. The site is built with Astro, React and TypeScript and produces a fully static output — no server, no backend, no database; content is authored as markdown in the repo.
- R2. English is served at `/` and Indonesian at `/id/`; every v1 page exists in both locales, with a visible language switcher that maps between locale equivalents of the same content.
- R3. Navigation shows only live sections; Personal Lab and Engineering Journal nav entries appear only when those sections launch with real content.

**Pages (v1)**

- R4. Home implements design.md's blueprint: hero (headline, tagline, expertise chips, availability note, Explore Projects / Download Resume / Contact Me CTAs), brief introduction, three featured projects, technical expertise table, professional journey timeline, closing CTA.
- R5. About carries the draft about-text, areas of interest, engineering philosophy, and professional experience linking to relevant projects — with no education section.
- R6. The Projects listing shows, for every professional project: title, category, short overview, role, tech stack, disclosure status, and a case-study link where a full case study exists.
- R7. Three full case studies — SIMS, CSSD Surgical Instrument Identification, and Prophesy AI Prime — follow design.md's per-project structure (Overview, My Responsibilities, Technical Implementation, Results, What I Learned, Disclosure Note) and carry the "Professional Project" and "Partially Redacted" labels.
- R8. The remaining six professional projects ship as compact entries — role, stack, one-paragraph overview, honest status label — each eligible to graduate to a full case study later: Clinical Laboratory Staff Scheduling & Optimization, WorkGuard (Workplace Violation Detection), Face Attendance System, CBIR TokoQuick Visual Product Search, YOLOv5 Materials Counting, and the Internal AI Agent research. Where the reference doc states no role or status, the entry states only what is confirmed.
- R9. The Resume page renders professional summary, work experience, selected projects, and technical skills, plus a PDF download — no education section. The English PDF ships at launch; the Indonesian PDF is added when produced, and until then the Indonesian page serves the English PDF labeled as English.
- R10. Contact carries the headline "Let's build something meaningful.", the open-to description, and Yogyakarta, Indonesia • silfaradilamei@gmail.com • www.linkedin.com/in/silfaradila/ • github.com/thisilfa.

**Content honesty**

- R11. Every published claim follows the reference doc's verification gates: resume-only metrics stay out of case studies until their definitions are confirmed; CSSD is never described as production-ready; the Internal AI Agent entry is labeled exploratory research and never presented as a built or deployed system.
- R12. No confidential material is published — company data, proprietary business logic, internal screenshots, source code, or client information — and each case study carries its disclosure note.
- R13. The distinction between company work, independent work, and experiments is visible on every project entry, in both locales.

**Contributor workflow**

- R14. A CONTRIBUTING.md adopts the begaya spine: one piece of work is one issue, one branch, and one PR sharing the same title; Conventional Commits with a `Refs #N` footer; rebase-merge so commits land as written; merged branches are deleted.
- R15. The workflow is adapted for a solo repository: no project board, milestones, or priority/effort fields; simplified area labels (`area: site`, `area: content`, `area: docs`, `area: deps`, `area: ci`).
- R16. CI runs on every PR and on main — lint, format, typecheck, and a build that produces both locales — and merges happen only when it is green.
- R17. Merge to main deploys production directly; PRs receive build checks; there is no staging environment.

**Findability**

- R18. Every page carries locale-correct meta title and description, Open Graph tags, a generated sitemap.xml, and hreflang alternates pairing the English and Indonesian versions.

*No Key Flows section: the site is conventional page navigation; the only conditional behaviors — language switching and per-locale PDF download — are covered by the acceptance examples below.*

---

## Acceptance Examples

- AE1. A visitor reading the Indonesian SIMS case study clicks the language switcher and lands on the English SIMS case study — not the English home page. **Covers R2.**
- AE2. During v1, no route exists for Personal Lab or Engineering Journal in either locale, and the nav shows exactly five entries: Home, About, Projects, Resume, Contact. **Covers R3.**
- AE3. Searching every rendered page in both locales finds no degree, institution, or coursework text; the downloadable PDF does contain it. **Covers R5, R9.**
- AE4. The Internal AI Agent entry shows an exploratory-research status label and no claim of delivery, deployment, or employer ownership. **Covers R8, R11.**

---

## Success Criteria

- A recruiter landing on Home in either locale grasps who Silfaradila is, her field, and what the site offers within 5–10 seconds — design.md's stated goal for the page.
- Every v1 page is fully rendered in both locales; no half-translated state ever ships.
- The site is fast on mobile; interactivity stays limited to what the content needs (language switcher, navigation, download links).
- CI is green on every merge, and the CONTRIBUTING.md flow is followed from the first commit — the repo currently has none.
- No confidential material or unverified claim appears anywhere on the site.

---

## Scope Boundaries

**Deferred for later**

- Personal Lab — returns when at least one personal project has real publishable material (repo, write-up, or demo). Note: design.md's ideas table lists five Personal Lab projects but its final sitemap lists four (Edge AI Benchmarking is dropped); resolve the list when the section launches.
- Engineering Journal — returns when the first article exists.
- Graduating compact entries (R8) into full case studies.

**Outside this product's identity**

- No backend, CMS, comments, or dynamic server features — a portfolio is static content.
- No staging environment or release-tag machinery — a personal site deploys on merge.
- No claim inflation — the site never presents unverified metrics, employer systems as personal work, or experiments as delivered products. Honesty is positioning, not just a rule.

---

## Dependencies / Assumptions

- Canonical content sources, all in `content/`: `design.md` (page blueprint and sitemap), `Silfaradila_Project_Experience_Reference.md` (English, 9 projects), `Referensi_Pengalaman_Proyek_Silfaradila_Bahasa_Indonesia.md` (Indonesian, same 9 projects), and `Silfaradila Mei_AI Engineer_Resume.pdf` (English resume).
- Hosting is GitHub Pages on `thisilfa/thisilfa-porto` at the default github.io URL — a custom domain can be pointed later without rework. The repo's visibility must be checked during planning, because Pages on private repositories requires a paid plan.
- The Indonesian resume PDF does not exist yet; producing it is a launch content task for full parity.
- Contact details come from the owner: Yogyakarta, Indonesia; silfaradilamei@gmail.com; linkedin.com/in/silfaradila; github.com/thisilfa.

---

## Outstanding Questions

**Deferred to planning**

- Concrete visual system within the chosen direction — palette, typography, and which cyberpunk effects ship (glow, grid, scanlines) and where.
- Astro i18n routing approach and language-switcher mechanics.
- CI and deploy pipeline details (workflow shape, Pages configuration).
- Issue and PR template set — adapt begaya's Bug/Feature/Task split or use a single template.
- Where the resume PDF lives in the build output and how download links resolve per locale.

---

## Sources / Research

- `content/design.md` — the content blueprint: 7 pages plus final sitemap; explicitly excludes visual design (its opening line says so); sitemap at the end of the file; per-case-study structure with "Partially Redacted" labels and disclosure notes.
- `content/Silfaradila_Project_Experience_Reference.md` — 9 projects with ownership/evidence summary table, verification gates on resume-only claims, presentation guidance, and an independent portfolio roadmap (proposed projects A–D).
- `content/Referensi_Pengalaman_Proyek_Silfaradila_Bahasa_Indonesia.md` — the Indonesian counterpart; same 9 projects, same fields; slightly longer, with extra subsections under projects 5, 6, and 9.
- `content/Silfaradila Mei_AI Engineer_Resume.pdf` — the English resume PDF, renamed at the owner's request.
- Verified repo state: `content/` (4 files) is the only directory; zero commits; origin `github.com/thisilfa/thisilfa-porto`.
- The contribution workflow is adapted from the `CONTRIBUTING.md` of the begaya-here/begaya repository (a sibling project outside this repo).
