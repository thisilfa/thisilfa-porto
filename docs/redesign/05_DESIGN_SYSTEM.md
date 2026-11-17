# Preliminary Design System

Status: proposed specification for **Direction 02 — System Evidence**  
This is an implementation brief, not production code. Values should be validated in browser prototypes before final token lock.

## 1. System principles

1. One visual system across Home and every secondary route.
2. Evidence objects carry more weight than decorative cards.
3. One major argument and one proof object per section.
4. Equal outer edges and explicit grid placement at every breakpoint.
5. Role, status, evidence, and limitations are visible, not hidden in footnotes.
6. No fabricated UI, metrics, testimonials, or client marks.
7. Mobile components transform; they do not merely shrink.
8. Motion is quiet, finite, and nonessential.

## 2. Color

Proposed palette:

| Token | Value | Use |
|---|---:|---|
| `canvas` | `#F4F3EE` | Primary page ground |
| `surface` | `#E8E9E4` | Evidence plates and grouped content |
| `surface-strong` | `#D9DDD8` | Selected states and diagram grouping |
| `ink` | `#121820` | Primary text and dark ground |
| `ink-soft` | `#4C5963` | Secondary text |
| `rule` | `#BEC5C2` | Structural lines and borders |
| `blue` | `#1746C6` | Links, focus, implemented path |
| `green` | `#0B7157` | Verified/evaluated state |
| `amber` | `#9B6500` | Experimental, constrained, or current accent |
| `rust` | `#A43E2F` | Risk, limitation, destructive/error state only |
| `white` | `#FFFFFF` | Text/icons on dark/action grounds |

Rules:

- Blue is the action color; amber is not used as a second competing action color.
- Semantic states always pair color with a label, line pattern, or icon.
- Large dark sections use `ink` with `canvas` text; avoid gradients and glows.
- Validate all pairings to WCAG AA: 4.5:1 for normal text, 3:1 for large text and interface boundaries.
- Preserve the current ochre memory through `amber`, but do not use ochre for small low-contrast text.

## 3. Typography

### Families

- **IBM Plex Sans Variable:** display, headings, body, navigation, controls.
- **IBM Plex Mono:** metadata, statuses, dates, figure labels, code-adjacent content.

Rationale: both families are open, technically credible, multilingual, and designed to work together. A single sans family removes the current navigation-family mismatch. Mono is used as a semantic voice, not across running prose.

### Scale

Use fluid type with capped ranges:

| Role | Desktop | Mobile | Line height | Notes |
|---|---:|---:|---:|---|
| Display | 72–96px | 44–56px | 0.95–1.02 | Hero only |
| H1 | 56–72px | 38–48px | 1.0–1.08 | One per page |
| H2 | 36–48px | 30–36px | 1.08–1.15 | Major section |
| H3 | 24–30px | 22–26px | 1.15–1.25 | Subsection/card title |
| Lead | 20–24px | 18–21px | 1.45 | Introductory prose |
| Body | 17–18px | 16–17px | 1.6–1.7 | Never below 16px |
| Small | 14–15px | 14–15px | 1.45 | Metadata only, not running prose |
| Mono label | 12–13px | 12–13px | 1.35 | Short labels; uppercase sparingly |

Rules:

- Body measure: 64–72 characters; lead measure: 45–60 characters.
- Avoid uppercase paragraphs and letter spacing above 0.08em.
- Project names remain written as factual names, not rewritten as marketing headlines.
- Use sentence case for navigation, controls, and section headings.
- Do not use font weight alone to distinguish status.

## 4. Spacing and rhythm

Base unit: 4px.

| Token | Value |
|---|---:|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-5` | 24px |
| `space-6` | 32px |
| `space-7` | 48px |
| `space-8` | 64px |
| `space-9` | 96px |
| `space-10` | 128px |

Section padding:

- Desktop: 112–144px block padding; hero may use 96px beneath the header and 128px at the bottom.
- Tablet: 88–112px.
- Mobile: 64–88px.
- Neighboring section content should have 128–420px of visible air on desktop and 112–320px on mobile, adjusted by actual content rather than forced blank height.
- Utility pages use smaller opening/closing spacing than Home.

## 5. Grid

### Desktop — 1440px

- Max content width: 1280px.
- Outer gutter: 80px minimum.
- 12 columns, 24px gutters.
- Reading column: 6 columns, minimum 640px where a sticky rail is present.
- Evidence plate: 6–12 columns depending on importance.
- Sticky case-study rail: 2–3 columns; article begins after a one-column gap.

### Tablet — 768px

- Outer gutter: 32px.
- 8 columns, 20px gutters.
- Most sections use 8 columns; paired content may use 3/5 or 4/4.
- Sticky case-study rail is removed; navigation becomes inline/disclosure.

### Mobile — 390px

- Outer gutter: 20px (16px absolute minimum for dense figures).
- 4 columns, 12px gutters.
- Components span 4 columns unless a deliberate two-column metadata group remains readable.
- No fixed-width 960px diagrams as the primary representation.

## 6. Shape, rules, and elevation

- Primary radius: 2px or square; 8px allowed for touch controls/evidence crops where necessary.
- Avoid a page made of rounded cards.
- Use 1px structural rules and changes of ground to group content.
- Shadows are reserved for floating mobile navigation or a demonstrably layered artifact; never for every card.
- Buttons are rectangular with clear 44px minimum height and one primary style per ground.

## 7. Core components

### Header

- Height: 72px desktop, 64px mobile.
- One type family and consistent label size.
- Current-page indication uses underline/rule plus `aria-current`.
- Locale switch and menu meet 44×44px targets.
- Header action may be omitted on a screen where the same primary action is already dominant.

### Buttons and links

- Primary: blue ground, white text, 44–48px height.
- Secondary: transparent with ink border.
- Text link: visible underline or directional affordance; not color alone.
- Focus: 2px blue outline with 3px offset, visible on every ground.
- One primary action per component/section.

### Status label

- Mono text plus icon/shape.
- Values are factual: delivered, staging, research, unverified, partially attributed, or the approved source labels.
- Never convert “unverified” into a euphemistic positive status.

### Project feature

- 7–8 columns visual, 4–5 columns copy on desktop; stacked on mobile.
- Unique evidence object for each flagship project.
- Contains claim, role/status, evidence, and case-study action.
- Stack appears last and is visually secondary.

### Project archive row

- Desktop: aligned columns for title, domain, date, status, contribution, action.
- Tablet: title/contribution first; metadata wraps below.
- Mobile: stacked row with a single 44px action target; no decorative thumbnail required.

### Engineering brief

- A high-priority case-study component containing problem, role, status, context, outcome, and limitation.
- Desktop: 7-column narrative plus 5-column key facts.
- Mobile: narrative followed by labeled facts.

### Technical diagram

- SVG or semantic HTML; every node has a text label.
- Contribution states use color plus line/fill pattern.
- Minimum diagram label equivalent: 14px desktop and mobile.
- Desktop: horizontal or spatial map.
- Mobile: purpose-built vertical sequence; optional “open full map” is secondary.
- Include a caption and short prose summary.

### Decision record

- Four fields: constraint, choice, reason, consequence.
- Desktop: four aligned columns or two-by-two structure.
- Mobile: vertically ordered with explicit labels.
- Avoid nesting inside a generic card grid.

### Evaluation block

- Metric value never appears without definition and scope.
- Required fields: metric, value, evaluation set/window, result meaning, limitation.
- Use green only for verified results; amber for partial/operational/experimental scope.

### Evidence plate

- Real sanitized screenshot, sample output, input frame, retrieval trace, or generalized diagram.
- Caption must say what is real, sanitized, generalized, redacted, or unavailable.
- No browser chrome or dashboard shell unless it existed in the source product.

### Tags

- Use only for filtering or compressed metadata.
- Maximum visible stack tags per project summary: 5; remainder may be shown on detail pages.
- Tags are not buttons unless interactive.

### Timeline

- One continuous rule with date, organization, and role.
- Avoid separate cards for every job.
- Mobile order: date → organization → role → concise context.

### Footer

- Expressive Home close: up to 75vh desktop, content-driven mobile height.
- Medium close: 40–55vh.
- Compact utility footer: 160–280px desktop, content-driven mobile.
- Never force a full viewport of empty footer.

## 8. Imagery and technical assets

Priority order:

1. Real, approved, sanitized project artifact.
2. Project-specific generalized diagram based on verified architecture.
3. Carefully framed code/data shape when it clarifies a decision.
4. Abstract geometry only as a supporting brand element, never as the only project image.

Portrait treatment:

- Keep natural color and professional crop.
- Do not apply AI-generated scenery or synthetic retouching.
- Use one portrait prominently; avoid repeating it on multiple pages without purpose.

## 9. Motion

- Hero entrance: 400–700ms, one sequence, transform/opacity only where content remains available without animation.
- Diagram path reveal: maximum one per page and only if the final static diagram is fully understandable.
- Hover: color, underline, or 1–2px translation; no cursor-following spotlight.
- No infinite marquee, particle field, type scramble, or autoplay loop.
- `prefers-reduced-motion` removes nonessential movement and shows the final state immediately.

## 10. Accessibility requirements

- WCAG 2.2 AA target.
- 44×44px minimum interaction envelope on mobile.
- Body text 16px minimum; diagram labels 14px minimum.
- Keyboard access to every menu, locale control, project action, and disclosure.
- Persistent visible focus.
- Semantic heading hierarchy and one H1 per route.
- Every visual has useful alt text or a text summary; decorative visuals are hidden from assistive technology.
- Color is never the sole carrier of status or contribution.
- No primary information behind hover.
- Horizontal scrolling is not required to understand core project architecture.

## 11. Responsive behavior by component

| Component | 1440px | 768px | 390px |
|---|---|---|---|
| Header | Full nav and one action | Wordmark, locale, action/menu based on space | Wordmark, locale, menu; action inside menu if duplicated |
| Hero | Split composition, portrait/system visual | 3/5 or stacked split | Portrait or visual first only when it helps orientation; concise copy |
| Project feature | Visual/copy split | Stacked or 4/4 | Full-width visual, then claim/evidence/action |
| Archive | Column-aligned index | Two-level rows | Stacked compact rows |
| Case study | Rail + ≥640px article + optional evidence margin | Single article; inline index | Single column; disclosure index |
| Diagram | Horizontal/spatial map | Simplified map | Redrawn vertical flow plus text summary |
| Decision record | Four fields across/two-by-two | Two-by-two | Four labeled blocks |
| Timeline | Continuous horizontal metadata alignment | Continuous vertical rule | Compact vertical sequence |
| Footer | Contextual expressive/medium/compact | Reduced height | Content-driven, 44px links |

## 12. System acceptance criteria

- All pages use the same tokens, type responsibilities, header, and grid.
- No running text below 16px.
- Every mobile action meets 44×44px.
- Every flagship project has a distinct verified/generalized evidence object.
- No case-study reading column is narrower than 640px when a rail is active.
- Mobile diagrams are understandable without panning.
- Color and statuses pass automated contrast checks and manual review.
- Home has one/two deliberate visual moments; secondary pages do not accumulate effects.
- Performance remains within the current TasteSkill pass envelope.

