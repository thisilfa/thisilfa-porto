# Design Audit

Audit date: 15 November 2026  
Scope: the current English and Indonesian production implementation at 1440px, 768px, and 390px  
Method: source inspection, production build, browser screenshots, TasteSkill copy/consistency/performance checks, and manual review  
Status language: **Verified** means observed in source or a browser capture. **Recommendation** is a proposed response. **Assumption** is explicitly unverified.

## Executive assessment

The portfolio has unusually strong factual discipline for a personal AI-engineering site. Its three primary case studies disclose contribution boundaries, deployment status, excluded confidential material, limitations, and evaluation caveats. English and Indonesian routes are paired, the static Astro implementation is fast, and the homepage has a recognizable warm editorial identity.

Its main weakness is not a lack of polish. It is that the system does not yet turn engineering evidence into a coherent visual argument. The homepage feels like a considered redesign; most secondary pages still behave like a conventional card-based portfolio. The project archive gives nine materially different systems the same abstract image. The longest case studies contain the best evidence, but their diagrams are small and their desktop layout breaks at 1440px. As a result, credibility is present in the content but is not consistently expressed by the interface.

Overall rating: **strong content foundation, credible implementation, incomplete design-system consolidation, and one release-blocking desktop case-study defect.**

## Evidence set

The browser evidence is stored in [`evidence/screenshots/`](./evidence/screenshots/). It includes:

- English: Home, About, Projects, SIMS, CSSD, Prophesy, Resume, and Contact at 1440px where relevant.
- Responsive samples at 768px for Home, Projects, and SIMS.
- Mobile samples at 390px for Home, About, Projects, SIMS, Resume, and Contact.
- Indonesian mobile samples for Home, Projects, and SIMS.

Representative captures:

- [`home-1440.png`](./evidence/screenshots/home-1440.png)
- [`projects-1440.png`](./evidence/screenshots/projects-1440.png)
- [`sims-1440.png`](./evidence/screenshots/sims-1440.png)
- [`home-390.png`](./evidence/screenshots/home-390.png)
- [`projects-390.png`](./evidence/screenshots/projects-390.png)
- [`sims-390.png`](./evidence/screenshots/sims-390.png)
- [`id-home-390.png`](./evidence/screenshots/id-home-390.png)

## 1. Positioning and content credibility

### What works

- **Verified:** the homepage immediately identifies the subject as an AI engineer working across computer vision, model experimentation, APIs, retrieval systems, and deployment.
- **Verified:** project status is explicit (`delivered`, `staging`, `unverified`, or `research`) instead of implying every artifact is a shipped product.
- **Verified:** the three full case studies distinguish implemented work, contributed work, and work not individually attributed.
- **Verified:** the SIMS figure of 98.6% is correctly described as an operational counting metric, not model accuracy.
- **Verified:** confidentiality exclusions and missing evidence are named. This is a meaningful professional differentiator.
- **Verified:** no testimonials, invented clients, inflated awards, or unsupported outcome metrics were found.

### What weakens the message

- **Verified:** the homepage headline narrows the first impression to computer vision even though retrieval, LLM applications, backend systems, and deployment are also central to the actual work.
- **Verified:** broad skill inventories recur on Home, About, Resume, and Projects. Repetition makes the portfolio feel less edited.
- **Verified:** several project entries contain more disclosure and stack text than visual evidence. The truthfulness is valuable, but the presentation makes caveats compete with the main project claim.
- **Recommendation:** position Silfaradila as an **applied AI systems engineer** whose strongest proof is computer vision in operational environments, supported by retrieval, LLM, backend, and edge-deployment experience.

## 2. Information architecture and user journeys

### What works

- **Verified:** the main navigation is small and comprehensible: About, Projects, Resume, Contact, and a locale switch.
- **Verified:** each English page has an Indonesian counterpart, and the language switch preserves route context.
- **Verified:** a recruiter can reach the résumé or contact details without navigating through a case study.
- **Verified:** three projects have substantive long-form case studies; six additional projects remain honestly compact.

### Problems

- **Verified:** About and Resume duplicate professional experience and technical skills.
- **Verified:** Home and Projects repeat the same three featured projects with similar summaries and stack lists.
- **Verified:** the Projects page gives nine entries nearly equal visual weight despite large differences in evidence quality and status.
- **Verified:** the Research & Experiments entry is visually presented as another large card even though its evidentiary status is materially different.
- **Recommendation:** make each route answer one question: Home = why Silfaradila; Work = what she built; case study = how she reasoned; About = how she works; Resume = formal scan/download; Contact = how to start a conversation.

## 3. Visual identity

### What works

- **Verified:** the cream, ochre, and near-black palette is distinctive without falling into generic neon-AI styling.
- **Verified:** the portrait provides a human anchor and is the only large photographic asset, which makes it memorable.
- **Verified:** the homepage uses scale, dark/light ground changes, and restrained animation to create an authored rhythm.
- **Verified:** the serif/sans combination conveys warmth and seriousness.

### Problems

- **Verified:** the homepage and secondary pages feel like adjacent systems. The homepage has large editorial sections and custom composition; secondary pages return to kicker-heading-card patterns.
- **Verified:** all nine project cards use essentially the same four-block abstract mark. It acts as decoration rather than project-specific evidence.
- **Verified:** legacy token names such as `neon-*` coexist with the current warm palette, indicating incomplete system consolidation even when the rendered result is acceptable.
- **Verified:** small uppercase metadata, pills, thin borders, and repeated cards form a generic portfolio layer underneath the stronger editorial homepage.
- **Recommendation:** retain the existing restraint and warmth as brand equity, but evolve the system toward technical evidence: system maps, evaluation fragments, sanitized interface crops, and project-specific diagrams.

## 4. Typography and readability

### What works

- **Verified:** the main prose is generally readable and contrast passes the TasteSkill checker.
- **Verified:** heading scale is clear on Home, About, Resume, and Contact.
- **Verified:** paragraph measure is comfortable at tablet and mobile sizes.

### Problems

- **Verified:** 13px and 15px text is used for disclosures, metadata, and stack lists. TasteSkill flags running text below 16px.
- **Verified:** project cards combine dates, status, title, description, stack, disclosure, and action in a narrow column. Each item is legible in isolation but dense as a repeated archive.
- **Verified:** architecture-diagram labels are approximately 11–13px and become hard to parse on a phone.
- **Verified:** the display serif carries personality but sometimes softens the precision expected from systems engineering, especially when paired with extensive card UI.
- **Recommendation:** use a technical humanist sans for primary reading and reserve a mono face for labels/data. If a serif is retained, confine it to editorial statements rather than interface hierarchy.

## 5. Layout and composition

### Critical/high-priority findings

1. **High — verified:** at 1440px, long case-study content collapses into a very narrow right column while large unused space remains on the left. The tablet and mobile layouts do not show the same failure. Source inspection indicates that the desktop table-of-contents grid reserves one column but does not explicitly place all subsequent article sections in the intended main column. See [`sims-1440.png`](./evidence/screenshots/sims-1440.png).
2. **High — verified:** the mobile Projects page is approximately 8 screens of nearly identical cards. Scannability declines after the first few entries because visual priority and imagery do not change.
3. **Medium — verified:** diagrams use a fixed wide canvas with horizontal overflow. This preserves information but asks mobile users to pan while reading tiny labels.

### Additional findings

- **Verified:** Contact contains a short utility section followed by a full-screen promotional footer, making the footer visually larger than the page’s primary task.
- **Verified:** the same large footer appears on every page. It is a strong close on Home but disproportionate on utility pages and long case studies.
- **Verified:** About becomes a single-column sequence of portrait, interests, philosophy cards, and experience cards. It is clear but compositionally repetitive.
- **TasteSkill signal:** Home has uneven section gaps, empty areas in capabilities/journey, and two neighboring headings sharing a viewport more often than the checker’s target.
- **Recommendation:** use one shared 12-column system, make content placement explicit at every breakpoint, and define compact utility-page and case-study footer variants.

## 6. Technical storytelling

### What works

- **Verified:** each primary case study covers constraints, architecture, implementation, engineering challenges, evaluation, evidence, limitations, and disclosure.
- **Verified:** the writing makes deployment boundaries and incomplete evaluation visible.
- **Verified:** specific tools and architectural decisions are named rather than hidden behind generic “AI solution” language.

### Problems

- **Verified:** the diagrams are generic boxes and connectors with limited visual distinction between implemented, contributed, and contextual components.
- **Verified:** “Demonstration and evidence” often describes evidence that cannot be shown rather than presenting a sanitized artifact.
- **Verified:** long prose arrives before a fast visual summary of input, transformation, output, operational constraint, and result.
- **Recommendation:** open each case study with a one-screen engineering brief, then use project-specific visual evidence throughout. Never fabricate missing UI; a carefully labeled generalized flow is better than a false product screenshot.

## 7. Responsive behavior

### Desktop — 1440px

- **Verified:** Home, Projects, About, Resume, and Contact render without horizontal overflow.
- **Verified:** the primary case-study grid fails at this breakpoint as described above.
- **Verified:** the Projects page forms a reasonable three-column grid but its equal-weight cards flatten hierarchy.

### Tablet — 768px

- **Verified:** the header converts to a compact menu while retaining the contact action.
- **Verified:** Home’s featured projects become stacked and remain readable.
- **Verified:** the SIMS case study returns to a single readable article column; this confirms that the 1440px issue is not intrinsic to the content.

### Mobile — 390px

- **Verified:** core content, navigation, and CTAs remain usable without viewport overflow.
- **Verified:** the project archive is too long and repetitive, not technically broken.
- **Verified:** case-study diagrams require horizontal panning and contain small labels.
- **Verified:** TasteSkill identifies sub-44px targets for the wordmark, locale link, and footer links.
- **Verified:** Indonesian pages preserve layout and content parity.

## 8. Accessibility

### Passes

- **Verified in source/checker:** semantic landmarks, a skip link, document language, page metadata, image alt text, visible focus styles, heading order, menu naming, and `aria-expanded` are present.
- **Verified:** reduced-motion handling exists for the homepage moment.
- **TasteSkill:** contrast, text contrast, accessible naming, image alt, heading order, skip link, menu toggle, and focus checks passed.

### Issues

- **Verified/TasteSkill:** several mobile navigation and footer links have a visual target height below 44px.
- **Verified:** horizontal-scroll diagrams place a cognitive and motor burden on mobile readers.
- **Verified:** small labels and disclosures reduce readability for low-vision users even when contrast is sufficient.
- **Recommendation:** treat 44×44px as the minimum interactive envelope, keep running text at 16px or larger, and provide stacked/semantic diagram alternatives on narrow screens.

## 9. Bilingual experience

### What works

- **Verified:** English and Indonesian routes have structural parity.
- **Verified:** the switch changes to the equivalent route, not merely the homepage.
- **Verified:** project names and technical product terms remain factually consistent.

### Risks

- **Verified:** Indonesian copy appropriately retains many English technical nouns, but terminology is not visibly governed by a glossary or editorial rule.
- **Verified:** copy lint flags different contrast-pattern behavior in English and Indonesian, which shows that checker totals cannot be compared as a direct translation-quality score.
- **Recommendation:** establish a short bilingual terminology sheet and validate content parity by meaning and evidence, not identical line length.

## 10. Performance and implementation quality

- **Verified:** `npm run build` completed successfully and generated all 17 routes.
- **Verified:** `npm run typecheck` completed with 0 errors and 0 warnings; it reported 7 unused-symbol hints in existing moment assets and an i18n test import.
- **Verified:** TasteSkill performance passed Home at 1440px and 390px with 0 failures and 0 warnings: 173KiB/149.7KiB transfer, zero long tasks, zero blocking time, zero CLS, and no broken requests.
- **Verified:** Projects also passed at both sizes with zero performance warnings; desktop CLS was 0.095 and mobile CLS was 0.000.
- **Verified:** Home loads two font families and three font files totaling about 87KiB.
- **Verified:** JavaScript and image weight are modest; the design is not performance-constrained.
- **Verified:** Google Fonts are loaded while Astro font configuration is also present, which should be reviewed for redundancy and privacy/hosting consistency during implementation.

## 11. TasteSkill findings and interpretation

### Direct checker results

- Production copy set: one failure on the English CSSD case study for repeated contrast constructions; recurring warnings for em-dash frequency on long-form and résumé/project pages.
- Home consistency report: 5 failures and 26 warnings across sampled desktop/mobile checks. Salient findings include missing visual evidence in the professional-path section, small text, uneven section rhythm, repeated first-screen contact action, small mobile targets, and low visual coverage.
- Performance: pass on Home and Projects at desktop and mobile.

### Genuine findings to carry forward

- Small mobile target sizes.
- Small running text in disclosures.
- Weak visual evidence in project/capability/journey sections.
- Uneven section rhythm and excessive empty areas.
- Repeated contact action within one viewport.
- Generic project visuals and long mobile archive.

### Checker-specific or contextual findings

- The copy checker’s “contrast frame” failure includes necessary statements such as staging versus production and centimeters versus pixels. These are not rhetorical tics; they prevent factual misinterpretation. Edit for rhythm only where meaning is unchanged.
- Repeated project names across Home, Projects, and detail pages are correct information architecture, not accidental heading duplication.
- The dealt word-highlight moment is intentionally an entrance effect and already has a reduced-motion state; it should be reviewed, not automatically removed.
- The checker’s one-heading-per-screen preference is a TasteSkill composition ideal, not an accessibility requirement. It should guide major sections without forcing artificial height.

## Prioritized issue register

| Priority | Finding | Type | Required response |
|---|---|---|---|
| P0 | Case-study desktop column collapse at 1440px | Verified defect | Fix before release or redesign implementation |
| P1 | Repetitive project archive with identical visuals | Verified UX/design issue | Establish featured/compact hierarchy and project-specific evidence |
| P1 | Mobile diagrams require panning and use tiny labels | Verified accessibility/UX issue | Provide responsive vertical diagrams and text fallback |
| P1 | Small mobile tap targets | Verified accessibility issue | Enforce 44×44px interaction envelopes |
| P1 | Homepage and secondary pages use different composition systems | Verified system issue | Consolidate shared grid, type, tokens, and section grammar |
| P2 | About/Resume/Home duplicate skills and history | Verified IA issue | Assign distinct page roles and edit repetition |
| P2 | Running disclosures below 16px | Verified readability issue | Raise size and separate evidence metadata from prose |
| P2 | Full-height footer dominates utility pages | Verified composition issue | Define contextual footer variants |
| P2 | Copy-lint punctuation/contrast density | Checker signal | Editorial pass without weakening factual boundaries |
| P3 | Legacy token naming and possible font-loading duplication | Verified maintainability issue | Clean during design-system implementation |

## Release implication

The current site is content-credible and fast, but the 1440px case-study layout defect prevents calling it fully release-ready. The redesign should not discard the existing truthfulness, bilingual parity, restrained palette, portrait, or static performance. It should concentrate on system consolidation, evidence-first storytelling, and responsive comprehension.
