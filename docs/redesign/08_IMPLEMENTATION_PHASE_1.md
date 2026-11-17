# PHASE 1 — DESIGN SYSTEM & FLAGSHIP PROTOTYPE

## Objective

Implement the first validated slice of the newly approved portfolio art direction.

The approved direction is:

**System Evidence × Editorial Engineering**

The goal is to establish the visual foundation and demonstrate its effectiveness through the homepage hero and SIMS case study.

This is not yet a full website redesign.

## 1. Read the design documentation

Before implementation, read:

- `docs/redesign/01_DESIGN_AUDIT.md`
- `docs/redesign/03_ART_DIRECTION.md`
- `docs/redesign/04_INFORMATION_ARCHITECTURE.md`
- `docs/redesign/05_DESIGN_SYSTEM.md`
- `docs/redesign/06_REDESIGN_ROADMAP.md`
- `docs/redesign/07_DESIGN_DECISIONS.md`

Also read the complete TasteSkill skill instructions.

Follow the approved design decisions.

Do not independently introduce a competing art direction.

## 2. Protect the existing implementation

Before making changes:

- Inspect Git status.
- Preserve all existing uncommitted changes.
- Do not discard or overwrite existing work.
- Establish a safe implementation checkpoint.
- Identify existing components that should be reused or refactored.

Do not assume the working tree is clean.

## 3. Implementation scope

Implement only:

### A. Shared design foundation

- Color tokens.
- Typography.
- Spacing.
- Responsive grids.
- Container widths.
- Navigation.
- Buttons and links.
- Project metadata.
- Footer variants.
- Reusable layout primitives.

### B. Homepage hero

Implement the new AI Engineer positioning.

Prioritize:
- Strong headline hierarchy.
- Professional introduction.
- Portrait integration.
- Clear primary and secondary actions.
- Appropriate whitespace.
- Responsive composition.

### C. SIMS featured project

Implement:
- Project introduction.
- Project-specific visual treatment.
- Engineering overview.
- Technical contribution.
- System architecture.
- Engineering brief.
- Evidence and results.
- Project limitations.

Use only verified existing project information.

### D. Responsive architecture diagram

The architecture must:

- Represent the actual system.
- Be readable on desktop and mobile.
- Avoid requiring horizontal scrolling on mobile.
- Use meaningful labels.
- Preserve architectural relationships.

Do not invent system components.

## 4. Bilingual implementation

Implement both English and Indonesian versions.

Preserve:
- Meaning.
- Technical terminology.
- Factual accuracy.
- Navigation consistency.
- Visual hierarchy.

Do not simply translate text mechanically if the resulting composition becomes awkward.

## 5. TasteSkill evaluation

Use TasteSkill throughout implementation.

Evaluate the actual rendered implementation, not hypothetical design concepts.

Prioritize:

1. Overall composition.
2. Typography.
3. Information hierarchy.
4. Grid consistency.
5. Responsive behavior.
6. Accessibility.
7. Visual storytelling.
8. Performance.

Do not spend excessive iterations polishing minor details before the overall composition is approved.

## 6. Validation requirements

Test:

- 1440px desktop.
- 768px tablet.
- 390px mobile.

Verify:
- No case-study grid collapse.
- No horizontal overflow.
- Minimum 44×44px interaction targets.
- Readable technical diagrams.
- Consistent typography.
- Accessible contrast.
- Keyboard navigation.
- Reduced-motion support.
- No broken requests.
- No unexpected layout shift.

Run production build, Astro typecheck, copy lint, and relevant TasteSkill checks.

## 7. Scope restrictions

Do not:

- Redesign all remaining pages.
- Add new projects.
- Add an AI chatbot.
- Invent product interfaces.
- Add fictional testimonials.
- Add unsupported metrics.
- Introduce unnecessary animations.
- Change factual project claims.
- Remove existing functionality.

## 8. Deliverables

Provide:

- Updated implementation.
- Screenshots at 1440px, 768px and 390px.
- English and Indonesian screenshots.
- TasteSkill evaluation results.
- Build and typecheck results.
- List of design decisions.
- Remaining issues.
- Comparison against the previous implementation.

## Completion criteria

The first implementation slice must demonstrate that the approved design system works across the homepage and a complete flagship project section.

Stop after this milestone.

Do not continue redesigning the remaining pages without approval.