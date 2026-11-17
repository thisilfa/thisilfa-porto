# Information Architecture

Status: proposed for approval  
Primary audiences: recruiters, engineering managers, technical peers, and potential collaborators  
Locales: English and Indonesian with one-to-one route parity

## IA objective

The current content is strong but repeated across routes. The proposed architecture keeps the existing five destinations while giving each a distinct responsibility. It does not add a blog, chatbot, dashboard, testimonials, or unsupported service claims.

## Proposed sitemap

```text
Home /
├── Work /projects/
│   ├── Smart Inventory Management System /projects/sims/
│   ├── CSSD Surgical Instrument Identification /projects/cssd-instrument-id/
│   ├── Prophesy AI Prime /projects/prophesy-ai-prime/
│   └── Other professional work and research (compact archive on Work)
├── About /about/
├── Resume /resume/
└── Contact /contact/

Indonesian mirror /id/...
```

“Projects” may remain the URL for continuity, but the visible navigation label should be **Work** in English and **Karya** or **Proyek** in Indonesian after a native-language editorial decision. Do not change project slugs without a redirect plan.

## Global navigation

### Desktop

- Wordmark/name links to Home.
- Work.
- About.
- Resume.
- Contact as the single emphasized action.
- EN/ID switch with both options inside a 44px-high control.

### Tablet and mobile

- Wordmark/name.
- EN/ID switch.
- 44×44px menu control.
- Menu sheet contains Work, About, Resume, Contact, Email, LinkedIn, and GitHub.
- Contact does not need a second persistent header button when it would duplicate the first-screen action.

### Footer

- Home may use the expressive closing section.
- Work and About use a medium closing band.
- Case studies, Resume, Contact, and 404 use a compact utility footer.
- All footer links receive at least a 44px interaction envelope on mobile.

## Page responsibilities

## Home — answer “Why this engineer?”

Target: 5–6 desktop screens, 7–8 mobile screens maximum.

Proposed sequence:

1. **Hero / positioning**
   - Name and applied-AI systems positioning.
   - Computer vision identified as the deepest demonstrated specialization.
   - One primary route to Work; one secondary contact action only if not duplicated by the header.
   - Portrait plus a compact system-range visual.
2. **Flagship evidence: SIMS**
   - Operational problem.
   - Silfaradila’s contribution.
   - Correctly scoped 98.6% operational counting metric.
   - One project-specific evidence figure.
3. **Two complementary systems**
   - CSSD: vision, segmentation, embedding retrieval, geometric measurement.
   - Prophesy: retrieval, LLM orchestration, API/back-end integration.
   - Different visual formats, not cloned cards.
4. **Demonstrated engineering range**
   - Capability → project evidence mapping, not a free-standing tool cloud.
5. **Professional path**
   - Biologic Technik, Quick Tractor, independent research.
   - Compact and visualized as a connected progression.
6. **Close**
   - Direct invitation to discuss a relevant system or role.

Remove from Home:

- exhaustive stack lists;
- duplicated project disclosures already available on Work;
- repeated About biography;
- repeated full résumé history.

## Work — answer “What has she built, and how strong is the evidence?”

Target: 3–4 desktop screens, 5–6 mobile screens.

Proposed sequence:

1. Intro and legend for status/evidence language.
2. Three flagship case studies, each with a unique evidence plate.
3. Compact professional archive for the remaining projects.
4. Separate research/experiments row with clearly different status treatment.
5. Contact or résumé next step.

### Flagship project summary anatomy

- Domain and date.
- Project title.
- One-sentence operational problem.
- Role/contribution summary.
- Status.
- Strongest available evidence.
- Relevant stack, limited to the technologies necessary to understand the system.
- Case-study action.

### Compact archive anatomy

Use rows or a compact two-column index rather than large repeated cards:

- Project name.
- Domain.
- Date.
- Verified status.
- One-line contribution.
- Available action, if any.

Do not give projects without public evidence a false screenshot, disabled-looking “case study” action, or implied deployment status.

## Case study — answer “How did she reason and what can be verified?”

Target: content-led; no forced screen count. Desktop reading measure 64–72 characters.

Proposed sequence:

1. **Engineering brief**
   - Title, domain, organization/context, date, status.
   - Problem in one paragraph.
   - Role and contribution boundaries.
   - Outcome/evidence and most important limitation.
2. **System map**
   - Input → transformation → output → operational consumer.
   - Legend for implemented, contributed, contextual, and unverified.
3. **Problem and constraints**
4. **Decision records**
   - Constraint.
   - Choice.
   - Reason.
   - Consequence/trade-off.
5. **Implementation**
6. **Experiments and failure modes**
7. **Evaluation**
   - Metric name and definition.
   - Evaluation set/time window.
   - Result.
   - What it does not prove.
8. **Evidence**
   - Sanitized artifact, generalized figure, or explicit “not publicly available” note.
9. **Limitations and reflection**
10. **Disclosure and related work**

### Desktop case-study navigation

- A sticky contents rail may appear only when it does not reduce the article below a 640px readable column.
- Every article section must be explicitly placed in the main grid column.
- The rail collapses before the content column becomes narrow; do not wait until mobile.

### Mobile case-study transformation

- The engineering brief becomes stacked key-value rows.
- System maps redraw vertically; panning is a fallback, not the primary interaction.
- The table of contents becomes a disclosure or horizontal section index with 44px targets.
- Tables become cards/key-value lists where necessary.
- Every figure includes a short text summary.

## About — answer “How does she work?”

Proposed sequence:

1. Portrait and concise professional story.
2. Working method: problem framing, experimentation, end-to-end thinking, practical engineering.
3. Experience trajectory, limited to context not repeated résumé bullets.
4. Areas of technical curiosity, edited to 3–4 themes and tied to the direction of future work.
5. Resume and Contact actions.

Move out of About:

- duplicate tool inventory;
- full project summaries;
- résumé-style responsibility bullets.

## Resume — answer “Can I verify the formal record quickly?”

Proposed sequence:

1. Name, role, location, concise summary.
2. Download PDF and contact actions.
3. Experience with verified dates, organizations, titles, and selected responsibilities.
4. Three selected projects with links.
5. Technical capabilities in compact groups.
6. Education/certifications only if present in the source of truth.

The web résumé and PDF must have an explicit source-of-truth process so dates and titles cannot drift.

## Contact — answer “How do I start a conversation?”

Proposed sequence:

1. Direct invitation.
2. Email as primary action.
3. LinkedIn and GitHub.
4. Location.
5. Resume download.
6. Compact footer.

Do not add a response-time promise, availability status, phone number, calendar link, or form unless the owner supplies and approves it.

## User journeys

### Recruiter: 60-second qualification

Home positioning → flagship proof → Work scan → Resume PDF or Contact.

Success criteria:

- Role and specialization understood within one screen.
- Three strongest systems visible within two screens.
- Role/status/evidence visible without opening every case study.
- Resume and contact reachable in one action from any page.

### Engineering manager: technical depth

Home/Work → case study engineering brief → system map → decisions/evaluation → limitations → Contact.

Success criteria:

- Contribution boundary is visible before detailed prose.
- Metric definition and deployment status cannot be mistaken.
- Architecture is comprehensible without horizontal panning at 390px.

### Technical peer/collaborator: methods and interests

About → Work → relevant case study → GitHub/Contact.

Success criteria:

- Working principles connect to actual project decisions.
- Research/experiments are clearly separated from professional delivery.

### Indonesian reader

Any EN route → equivalent ID route → same evidence and navigation location.

Success criteria:

- No route resets to Home.
- Technical status and limitations retain meaning.
- Project names and factual figures remain identical where translation is not appropriate.

## Content model

The implementation should draw shared project facts from structured content, not repeated page literals.

Required project fields:

- slug and locale pair;
- factual project name;
- organization/context;
- date range;
- domain;
- status;
- public summary;
- contribution categories;
- constraints;
- decisions;
- stack;
- metrics with definitions and caveats;
- evidence assets and confidentiality state;
- limitations;
- disclosure;
- related project links.

Every metric should be represented as `{value, label, definition, scope, source, caveat}` rather than a display string alone.

## Bilingual governance

- Keep a one-to-one route map.
- Use a small glossary for recurring terms: staging, deployment, retrieval, embedding, inference, evaluation, unverified, contributed, and implemented.
- Translate meaning, not sentence shape.
- Preserve model names, framework names, product names, and metric values.
- Run parity checks on headings, links, project status, dates, and evidence availability.
- Give both locales equal QA at 1440px, 768px, and 390px.

## IA acceptance criteria

- No page repeats another page’s primary purpose.
- Three flagship projects are visually and structurally prioritized.
- The compact archive does not imply evidence that does not exist.
- Every case study exposes role, status, evidence, and limitation before the long narrative.
- All routes have locale equivalents and context-preserving switches.
- Home, Resume, and Contact each provide a short recruiter path without duplicated first-screen actions.

