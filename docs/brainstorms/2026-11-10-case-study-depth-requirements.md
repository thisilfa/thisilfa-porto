---
date: 2026-11-10
topic: case-study-depth
---

# Case-Study Depth — Requirements

## Summary

Restructure the three professional case studies to the full template from `content/portfolio_improvement_guide.md` — problem & constraints, three-group contribution split, decision rationale, experiments & challenges, limitations & reflection — with **SIMS as the gold standard first**, then replication to CSSD and Prophesy. Add explicit project-category metadata, generalized architecture diagrams, and employment-period dates. Both locales stay in parity throughout.

---

## Problem Frame

The shipped case studies describe what was built but not how problems were approached, who owned what, or what evidence supports the results — the gap the improvement guide (§1, §5, §13) identifies between a developer portfolio and an engineering portfolio. The guide is the strategy source; a P0 audit with the owner (2026-11-10) pinned the factual backbone: contribution splits from documented material only, the SIMS metric's real definition, employment dates from the resume PDF, and disclosure labels (all three professional case studies remain Redacted). The goal is not a bigger site — it is more convincing content.

---

## Key Decisions

- **SIMS first, then replicate.** The owner reviews the gold standard once before the structure copies to CSSD and Prophesy — one round of correction instead of three.
- **Documented material only.** Sections render from what the reference documents record; components the docs do not attribute (camera setup, frontend, reporting, CSSD's dataset collection) stay explicitly unattributed rather than assumed. The guide's "alternatives considered" appears only where a source records one.
- **The 98.6% publishes with its definition — conditionally.** Shelf-level counting accuracy (the share of monitored shelves whose count was correct), per the owner's answer, provided the definition matches the original evaluation; if drafting shows it does not, the figure drops and results go qualitative.
- **The AI agent is Research category**, not professional (owner confirmed "for now").
- **Diagrams are generalized and author-drafted** — real flows, no confidential names, endpoints, or topology. Sanitized screenshots await owner-produced approved material; the template reserves evidence places without shipping broken-looking placeholders.
- **Dates at employment-period granularity**, from the resume PDF — not reconstructed per-project windows.

---

## Requirements

**Case-study template**

- R1. Each professional case study renders the full template in both locales: Overview; Problem & constraints; My contribution (three groups: implemented / contributed to / not individually attributed); System architecture (generalized diagram plus a written explanation); Technical implementation with decision rationale (requirement → approach → alternative when documented → trade-off → outcome); Experiments & engineering challenges (symptom → investigation → change → observation → decision → remaining limitation); Results & evaluation (metrics with definition and scope); Limitations & reflection; Disclosure note.
- R2. Sections without documented material are omitted or carry one honest sentence — never padded, never invented.
- R3. SIMS ships first as the gold standard; CSSD and Prophesy replicate the approved structure in the immediate follow-up round.

**SIMS content (from the audit)**

- R4. The metric publishes as "shelf-level counting accuracy — the share of monitored shelves whose count was correct — 98.6% across the deployment's shelves", conditional on the owner confirming the definition matches the original evaluation; otherwise the figure drops and results go qualitative.
- R5. The contribution split: **implemented** — YOLOv8 retraining, experimentation and evaluation; geometry-based counting logic; FastAPI inference server; Redis-based queue processing; daily detection monitoring and discrepancy review; targeted data collection; integration of the YOLO inference pipeline. **Contributed to** — AWS deployment (with infrastructure engineers); MQTT integration (with the infrastructure team); integration of the CV inference service into the broader inventory system. **Designed/proposed** — the centralized inference architecture. **Not individually attributed** — camera setup and image acquisition, frontend/dashboard/reporting layer.
- R6. Case-study and compact headers carry employment-period dates: Biologic Technik July 2025 – Present; Quick Tractor Jun 2023 – Jun 2024 (intern) and Jun 2024 – Jun 2025 (Junior ML Engineer).

**Metadata**

- R7. The project schema gains a required `category` enum — professional / independent / research — on every entry; all 18 files updated (8 professional, the AI agent research).
- R8. The listing pages reflect the category without breaking the nine-entry census in either locale.

**Diagrams and evidence**

- R9. SIMS gets a generalized architecture diagram (camera capture → edge inference → YOLOv8 segmentation → counting logic → FastAPI service → Redis queue → inventory results; AWS and MQTT as marked integration points) with no confidential names; CSSD and Prophesy diagrams follow in the replicate round.
- R10. Sanitized screenshots and sample imagery are future evidence additions gated on owner-produced approved material — the design reserves their place without faking content.

**Content honesty**

- R11. The guide's §10 quality checklist applies before publishing each case study: problem understandable without specialist context, contribution explicit, team work represented fairly, metrics defined, status accurate, limitations acknowledged, confidentiality reviewed.

---

## Acceptance Examples

- AE1. A visitor finishing the SIMS page can state the problem, the system's flow, which parts the owner implemented versus contributed to, and what the metric measures — without specialist context.
- AE2. The SIMS results section carries the metric with its shelf-level definition (per R4's condition) — no hedged or undefined figure remains anywhere.
- AE3. Both locales carry every template section; a section omitted for missing documentation is omitted in both.
- AE4. The listings still render nine entries per locale, with the AI agent under the research category.

---

## Success Criteria

- A visitor finishes the SIMS page understanding the problem, the system, the ownership boundaries, the design decisions, the evidence, and the limitations — the guide's §13 standard.
- The approved SIMS structure is the reusable standard for every future case study.
- Each published case study passes the guide's §10 checklist.

---

## Scope Boundaries

**Deferred for later**

- CSSD and Prophesy replication — the immediate follow-up round after SIMS approval.
- Personal Lab projects and Engineering Journal — unchanged from the v1 scope; gated on real material.
- Sanitized screenshots, sample imagery, demonstration videos — owner-produced evidence.

**Outside this product's identity**

- No invented alternatives, experiments, or metrics without definitions.
- No implying sole ownership of team-wide systems.
- No confidential names, endpoints, or topology in diagrams.

---

## Dependencies / Assumptions

- The owner confirmed the shelf-level metric definition (conditional, per R4) and the research classification of the AI agent.
- Diagrams are author-drafted as generalized flows and verified by the owner during PR review.
- Source documents in `content/` remain the sole factual basis; the resume PDF supplies the employment dates.

---

## Outstanding Questions

**Deferred to planning**

- How "designed/proposed" renders inside the contribution section — a fourth group or a note within "implemented".
- The diagram rendering medium (in-markdown vs image asset) and where diagram source files live.
- How category grouping presents on the listing pages (grouped sections vs filters vs labels-only).

---

## Sources / Research

- `content/portfolio_improvement_guide.md` — the strategy source: template (§5), case-study plans (§6), classification and disclosure (§3–4), quality checklist (§10), standard (§13).
- Owner audit answers, 2026-11-10 — contribution split (SIMS), the metric's definition ("counting accuracy over all shelves"), the phone-in-PDF decision (keep as-is), research classification of the AI agent.
- `content/Silfaradila_Project_Experience_Reference.md` + Indonesian twin — responsibilities, verification gates, the documented experiments material (discrepancy categorization, occlusion/overexposure data collection, the centralized-inference proposal).
- Resume PDF text extract — employment dates (Biologic July 2025 – Present; Quick Tractor Jun 2023 – Jun 2024 and Jun 2024 – Jun 2025), education (SMK N 2 Klaten, 2020–2024, PDF-only).
- `docs/brainstorms/2026-11-09-bilingual-portfolio-requirements.md` — the v1 origin; its honesty requirements (R11–R13) carry forward unchanged.
- Verifier pass, 2026-11-10 — all seven repo claims confirmed (current template sections, schema shape, the hedged 98.6% wording, 18 content files, label dictionary keys, PDF text, single v1 brainstorm/plan).
