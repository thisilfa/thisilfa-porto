# Design Decisions

Status: proposal log for approval. “Recommended” decisions are not implementation authorization.

## Decision 01 — Treat the site as an engineering dossier, not an AI startup landing page

Status: recommended  
Decision: organize visual storytelling around project evidence, decisions, evaluation, and limitations.

Why:

- The strongest existing differentiator is factual discipline.
- Product-style hype would conflict with contribution and confidentiality boundaries.
- Technical reviewers need to inspect reasoning, not merely recognize AI keywords.

Rejected alternatives:

- Dark cyber/AI startup theme.
- Generic personal-brand brochure.

## Decision 02 — Recommend “System Evidence” as the primary direction

Status: recommended, awaiting owner approval  
Decision: use Direction 02 with editorial pacing borrowed from Direction 01.

Why:

- It makes verified engineering judgment visible most quickly.
- It addresses the current generic project imagery and cross-page inconsistency.
- It supports responsive diagrams and clear status/evaluation language.

Alternative retained:

- Direction 01 for a more conservative evolution of the current identity.
- Direction 03 for a more austere catalogue identity.

## Decision 03 — Preserve warmth without preserving every current token

Status: recommended  
Decision: retain the human portrait, mineral/paper ground, near-black text, and amber memory while introducing a clearer action blue and semantic evaluation colors.

Why:

- The current warmth is recognizable brand equity.
- Ochre alone is not sufficient as both brand accent and accessible action color.
- Semantic states need distinct, labeled treatment.

Rejected alternative:

- Full dark mode as the default identity.

## Decision 04 — Replace repeated abstract project marks with evidence

Status: recommended  
Decision: each flagship project receives a unique approved artifact or generalized technical figure; compact projects do not require a decorative thumbnail.

Why:

- The current four-block mark makes nine different systems look interchangeable.
- Evidence improves comprehension and credibility.

Guardrail:

- No fabricated dashboard or synthetic client screen.

## Decision 05 — Keep five primary destinations, but give each one job

Status: recommended  
Decision: retain Home, Work/Projects, About, Resume, and Contact.

Why:

- The routes already match common recruiter expectations.
- The problem is duplication, not route count.

Rejected alternatives:

- Merge everything into one long homepage.
- Add a blog, lab, services page, or testimonial page without source content.

## Decision 06 — Prioritize three flagship systems

Status: recommended  
Decision: feature SIMS, CSSD, and Prophesy; present other professional work in a compact archive and research in a distinct group.

Why:

- These three have the deepest verified narratives.
- Equal cards hide evidence differences and create mobile fatigue.

Guardrail:

- Compact treatment must not imply that other work is unimportant or unverifiable beyond its documented status.

## Decision 07 — Use one sans family plus one mono family

Status: recommended  
Decision: use IBM Plex Sans and IBM Plex Mono for the proposed system.

Why:

- Clear family responsibilities improve navigation and interface consistency.
- The pair supports technical material and multilingual use.
- It removes the current nav-family mismatch.

Alternative:

- Retain an editorial serif only if Direction 01 is chosen; do not mix it into control labels.

## Decision 08 — Mobile diagrams must be redrawn, not merely scrollable

Status: recommended  
Decision: provide a vertical mobile representation and prose summary for each core system map.

Why:

- Current fixed-width diagrams require panning and use small labels.
- System comprehension is core content, not an optional enhancement.

Fallback:

- A zoomable/full map may remain as a secondary action.

## Decision 09 — Keep attribution and limitation language even when copy lint dislikes it

Status: retained intentionally  
Decision: do not remove factual contrasts such as staging versus production or centimeters versus pixels solely to clear a stylistic checker.

Why:

- These phrases prevent material misunderstanding.
- Checker budgets identify rhetorical habits, not truth requirements.

Action:

- Edit excessive em dashes and repeated contrast syntax where meaning remains exact.

## Decision 10 — Use contextual footers

Status: recommended  
Decision: retain an expressive Home close but introduce medium and compact variants.

Why:

- The current full-screen footer is effective on Home but dominates Contact, Resume, and long case studies.
- Footer size should match the route’s purpose.

## Decision 11 — Do not add an AI assistant as a portfolio feature

Status: rejected unless separately briefed with real user need  
Why:

- It would expand scope, cost, privacy, accessibility, and maintenance.
- Connecting an LLM does not by itself prove system judgment.
- Current content already provides richer evidence.

## Decision 12 — Treat performance as a constraint to preserve

Status: retained intentionally  
Decision: keep the static Astro architecture and current low JavaScript/image weight unless a specific evidence interaction justifies a change.

Why:

- TasteSkill performance currently passes with no warnings.
- Visual redesign should not trade away fast access to content.

## Decision 13 — Maintain route-level bilingual symmetry

Status: retained intentionally  
Decision: every public route and major evidence object remains available in English and Indonesian.

Why:

- Current route pairing is a strength.
- It demonstrates editorial care and improves regional accessibility.

Guardrail:

- Parity means equal facts and intent, not identical line length.

## Decision 14 — Resolve the desktop case-study layout before any release

Status: verified blocker  
Decision: explicitly place article content in the desktop grid and collapse the rail before readable width is compromised.

Why:

- The 1440px capture shows severe column collapse and unused space.
- This is a usability defect, not an art-direction preference.

## Decision 15 — Separate recommendations, facts, and assumptions

Status: process rule  

Verified facts:

- Current content, code, screenshots, route behavior, checker output, and build results.

Recommendations:

- Direction 02, new type/palette details, compact archive, contextual footer, and restructured case studies.

Assumptions requiring confirmation:

- Permission to retain the portrait.
- Availability and allowed use of sanitized project artifacts.
- Preferred visible label “Work” versus “Projects.”
- Whether any new résumé facts or credentials exist beyond the repository source.

No assumption may be implemented as a public claim without confirmation.

## Approval questions

The owner’s approval should answer:

1. Which direction should proceed: Editorial Engineering, System Evidence, or Swiss Technical Minimalism?
2. Should the warm current palette be closely retained, or may it evolve to the proposed mineral/blue/amber system?
3. Are sanitized artifacts available for SIMS, CSSD, and Prophesy, and who approves them?
4. Should the visible navigation label remain “Projects,” or change to “Work” while preserving URLs?
5. Is the current portrait approved for continued use?

## Decision log state

No production implementation has been authorized or performed in this phase. On approval, this file should be updated with chosen/rejected status, date, and owner for every material decision.

