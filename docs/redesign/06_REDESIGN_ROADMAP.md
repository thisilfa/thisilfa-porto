# Redesign Roadmap

This roadmap begins only after art-direction approval. It separates facts/assets, structural design, implementation, content migration, and verification so visual polish cannot conceal missing evidence or layout defects.

## Constraints

- Preserve factual project names, organizations, dates, statuses, claims, metrics, descriptions, and attribution boundaries.
- Do not invent product screens, clients, testimonials, metrics, awards, or deployment states.
- Maintain English/Indonesian parity.
- Preserve static performance and accessible semantic structure.
- Do not implement until the owner approves an art direction and any requested adjustments.

## Phase 0 — Approval and factual lock

Priority: blocking  
Dependencies: this documentation review

Tasks:

- Approve Direction 02, Direction 01, Direction 03, or a clearly bounded hybrid.
- Approve positioning language and visible navigation labels.
- Confirm the source of truth for project facts and résumé data.
- Resolve any disputed audit findings.
- Confirm whether the current portrait can be retained.

Acceptance:

- Written approval names the selected direction.
- Open factual questions have owners.
- No implementation starts with unresolved project-status language.

## Phase 1 — Evidence and asset inventory

Priority: blocking for flagship pages  
Dependencies: Phase 0

Tasks:

- Inventory available SIMS, CSSD, and Prophesy artifacts.
- Classify each artifact: public, sanitizable, generalized-only, or unavailable.
- Record source, owner, date, confidentiality constraints, and allowed crop/redaction.
- Define the exact meaning and scope of every displayed metric.
- Create a bilingual technical terminology sheet.
- Identify which current abstract assets should be retired.

Deliverable:

- Asset/evidence manifest with approval status.

Acceptance:

- Every planned evidence plate maps to a real approved artifact or an explicitly generalized diagram.
- No placeholder can be mistaken for production UI.

## Phase 2 — Content architecture and editing

Priority: high  
Dependencies: Phase 0; may overlap Phase 1

Tasks:

- Define structured project fields.
- Assign each page its unique purpose from the IA.
- Edit Home to remove duplicated skill/project text.
- Convert remaining projects to a compact archive structure.
- Restructure flagship case studies into engineering brief, map, decisions, implementation, evaluation, evidence, limitations, and disclosure.
- Edit punctuation/contrast repetition only when technical scope remains unchanged.
- Validate Indonesian meaning and terminology.

Acceptance:

- No duplicated source-of-truth facts across page files.
- Every metric includes definition, scope, and caveat.
- English and Indonesian outlines match semantically.
- Copy lint findings are reviewed individually, not blindly zeroed.

## Phase 3 — Design-system prototype

Priority: high  
Dependencies: Phase 0

Tasks:

- Prototype color, typography, grid, spacing, header, buttons, statuses, archive rows, engineering brief, diagram, decision record, evaluation block, and contextual footers.
- Test 1440px, 768px, and 390px from the start.
- Test contrast, keyboard focus, 44px targets, and long Indonesian labels.
- Prototype one real project diagram in horizontal and mobile-vertical forms.
- Compare one Home section and one case-study section across all three directions if approval requests a tie-break.

Acceptance:

- Chosen type is available with appropriate licenses and multilingual glyphs.
- Tokens pass contrast requirements.
- A case-study rail never compresses reading width below 640px.
- The mobile diagram is understandable without horizontal scrolling.

## Phase 4 — Shared shell implementation

Priority: high  
Dependencies: Phase 3 approval

Tasks:

- Consolidate tokens and remove legacy naming.
- Implement header/navigation, locale switch, grid, typographic primitives, buttons, status labels, and contextual footers.
- Resolve redundant font loading and select a single hosting approach.
- Preserve skip link, focus behavior, semantic landmarks, metadata, and route pairing.

Acceptance:

- Shared shell is identical in intent across routes and locales.
- Navigation is keyboard- and screen-reader-usable.
- Mobile targets meet 44×44px.
- No cumulative layout shift introduced by fonts or navigation.

## Phase 5 — Home and Work

Priority: high  
Dependencies: Phases 1–4

Tasks:

- Implement the new hero and one signature system moment.
- Build three distinct flagship project features.
- Build capability-to-evidence mapping.
- Build compact professional and research archive.
- Implement contextual close/footer behavior.

Acceptance:

- Role/specialization is understood in the first viewport.
- Three flagship projects are visibly differentiated.
- The Work archive is materially shorter and easier to scan than the current mobile card stream.
- No project receives invented evidence.

## Phase 6 — Flagship case studies

Priority: release-blocking  
Dependencies: evidence manifest and system prototype

Tasks:

- Fix explicit grid placement and eliminate the 1440px column-collapse defect.
- Implement engineering briefs, responsive system maps, decision records, evaluation blocks, and evidence plates.
- Preserve all contribution, status, confidentiality, limitation, and evaluation disclosures.
- Add semantic text summaries for diagrams.

Acceptance:

- Screenshots pass at 1440px, 768px, and 390px for all three case studies.
- Reading column ≥640px while any sticky rail is visible.
- Core diagrams require no horizontal panning at 390px.
- Metrics cannot be read without their definitions/caveats.
- All case-study claims match approved source content.

## Phase 7 — About, Resume, Contact, and 404

Priority: medium  
Dependencies: shared shell and edited content

Tasks:

- Refocus About on working method and trajectory.
- Establish résumé/PDF source-of-truth checks.
- Simplify Contact and use the compact footer.
- Adapt 404 to the selected system without turning it into a separate concept.

Acceptance:

- About and Resume no longer repeat full inventories.
- Contact exposes email, LinkedIn, GitHub, location, and résumé without unsupported promises.
- Utility pages do not contain a footer larger than their main task without a deliberate reason.

## Phase 8 — Bilingual, accessibility, and content QA

Priority: release-blocking  
Dependencies: all pages implemented

Tasks:

- Compare route pairs and structured project facts.
- Test keyboard order, menu behavior, locale switching, skip link, focus, headings, alt text, and reduced motion.
- Test zoom/reflow and 320px narrow behavior in addition to required breakpoints.
- Review every checker warning for genuine versus contextual findings.
- Native-language editorial review of Indonesian copy.

Acceptance:

- No missing locale route or mismatched factual field.
- No interaction below the minimum target envelope on mobile.
- No inaccessible diagram or color-only state.
- WCAG 2.2 AA automated checks pass, followed by manual keyboard review.

## Phase 9 — Performance and release gate

Priority: release-blocking  
Dependencies: complete implementation

Required commands/checks:

- Production build.
- Astro typecheck.
- TasteSkill copy lint on production routes only.
- TasteSkill consistency and finish gate.
- TasteSkill performance at 1440px and 390px for Home, Work, and each flagship case study.
- Responsive screenshots at 1440px, 768px, and 390px in both locales for representative routes.
- Broken-link, metadata, and asset checks.

Performance guardrails:

- No new broken requests.
- Zero avoidable long tasks and blocking time.
- CLS below 0.1, target 0.05 or lower on all routes.
- No oversized or eager below-fold images.
- No WebGL unless explicitly approved and justified by a project-specific concept.

Release acceptance:

- No P0/P1 genuine finding remains unresolved.
- Any checker-specific waiver is documented with visual and semantic justification.
- Factual/content owner signs off on English and Indonesian case studies.
- Final desktop/mobile screenshots are approved.

## Dependencies and critical path

```text
Art-direction approval
  → evidence/asset approval
  → design-system prototype
  → shared shell
  → Home + Work
  → flagship case studies
  → secondary pages
  → bilingual/accessibility QA
  → performance/release gate
```

Content restructuring may overlap the evidence inventory. Case-study visual implementation cannot finish before confidentiality and evidence decisions.

## Risk register

| Risk | Impact | Mitigation |
|---|---|---|
| Real project visuals unavailable | Direction loses evidence strength | Use verified project-specific generalized diagrams with explicit labels |
| Confidentiality breach | Severe | Asset manifest and owner approval before repository inclusion |
| Case-study prose remains too long | Mobile scanning degrades | Engineering brief, decision records, figures, and editorial compression |
| Direction becomes generic SaaS | Identity weakens | Retain portrait, mineral ground, authored captions, and avoid dashboards/glows |
| Indonesian layouts diverge | Bilingual credibility drops | Tokenized responsive system and route-pair screenshot QA |
| Metrics lose caveats during redesign | Factual integrity damaged | Structured metric fields and content tests |
| Performance regresses through assets/fonts | Current strength lost | Responsive images, font subsetting/self-host review, TasteSkill perf gate |

## Recommended first implementation slice after approval

Build a non-production prototype containing:

1. the shared header and type/color/grid tokens;
2. the Home hero;
3. one SIMS flagship section;
4. the SIMS engineering brief and responsive system map;
5. the compact footer;
6. English and Indonesian content at 1440px and 390px.

This slice tests identity, evidence style, bilingual behavior, and the hardest responsive diagram before the full site is migrated.

