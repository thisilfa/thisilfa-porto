# Homepage Content & Design Blueprint

## Editorial Engineering --- Intelligence with Intent

**Project:** Silfaradila Mei --- Professional Portfolio\
**Document type:** Homepage content and implementation specification\
**Version:** 1.0\
**Date:** 16 November 2026

------------------------------------------------------------------------

## 1. Purpose

The homepage should function as a **professional introduction and
technical showcase**, not as a traditional online CV.

Within approximately 30 seconds, a recruiter, hiring manager, or
engineering peer should understand:

1.  Who I am as an engineer.
2.  What kinds of engineering problems I work on.
3.  What I have actually built.
4.  How I approach engineering problems.
5.  Where to explore my work and contact me.

### Core positioning

> **I understand problems. I engineer intelligent solutions. I can take
> them beyond experimentation.**

The visual and content direction is **Editorial Engineering**: technical
credibility, editorial sophistication, and a restrained personal
identity.

### Primary audience

-   Hiring managers recruiting AI Engineers, Machine Learning Engineers,
    and Computer Vision Engineers.
-   Technical interviewers who want evidence of engineering depth.
-   Potential collaborators interested in applied AI and intelligent
    systems.

### Primary homepage goal

Encourage visitors to explore the detailed project case studies and
understand the engineering contribution behind each project.

------------------------------------------------------------------------

## 2. Agreed design and content direction

  Dimension              Decision
  ---------------------- --------------------------------------------
  Content density        Balanced
  Project presentation   Detailed editorial project cards
  Personality            Professional with subtle personal details
  Language               Bilingual English--Indonesian
  Visual identity        Editorial Engineering
  Homepage role          Introduction + selected technical evidence
  Primary CTA            Explore My Work
  Secondary CTA          About Me

The homepage should provide enough substance to establish credibility
without becoming a long technical report. Detailed implementation
evidence belongs in the individual case studies.

------------------------------------------------------------------------

## 3. Homepage information architecture

Recommended section order:

1.  Hero / Introduction
2.  Technical Identity
3.  Selected Work
4.  Engineering Philosophy
5.  Technical Ecosystem
6.  About Me
7.  Contact

The navigation should remain simple:

-   Work
-   About
-   Notes (optional; only if there is meaningful content)
-   Contact

The homepage should not duplicate the full CV. It should provide context
and guide visitors toward deeper evidence.

------------------------------------------------------------------------

# 4. Section specifications and content

## 4.1 Hero --- establish professional identity

**Purpose:** Communicate professional positioning immediately.

### Recommended copy

**Eyebrow**

`AI ENGINEER · COMPUTER VISION · APPLIED AI`

# Engineering Intelligence Into Real-World Systems.

I build intelligent systems that bridge machine learning research and
practical engineering --- from computer vision pipelines and model
optimization to AI-powered applications and system integration.

**Primary CTA:** Explore My Work\
**Secondary CTA:** About Me

Optional metadata:

-   Based in Indonesia
-   Open to opportunities (show only while accurate)

### Layout

-   Two-column composition on desktop.
-   Copy on the left; professional headshot on the right.
-   The portrait should support the introduction, not overpower the
    headline.
-   Use a circular or softly rounded crop.
-   Keep the hero spacious and readable.
-   On mobile, stack the content with the text first and portrait
    second, unless the existing design system suggests a better order.

### Image usage

Use the generated professional headshot for the homepage hero and small
identity/avatar treatments.

Keep the portrait treatment consistent with the warm editorial palette.
Avoid heavy borders, strong shadows, or excessive decoration.

### Content constraints

-   Do not add a long biography to the hero.
-   Do not use generic phrases such as "passionate AI enthusiast."
-   Do not claim expertise beyond the evidence in the project case
    studies.
-   Keep the headline focused on engineering intelligent systems, not on
    AI hype.

------------------------------------------------------------------------

## 4.2 Technical Identity --- what I work on

**Purpose:** Give visitors a concise map of the technical areas
represented in the portfolio.

Use four capability categories. These are categories of work, not claims
of equal expertise across every listed tool.

### A. Computer Vision & Perception

Object detection, image segmentation, feature extraction, visual
recognition, and anomaly analysis.

**Relevant technologies:** YOLO, OpenCV, SAM, DINOv2, PyTorch.

### B. Machine Learning Engineering

Model experimentation, evaluation, optimization, inference pipelines,
and deployment-oriented engineering.

**Relevant technologies:** PyTorch, ONNX, Ultralytics, Python.

### C. AI Systems & Integration

Backend integration, API development, asynchronous processing, vector
search, and data pipelines.

**Relevant technologies:** FastAPI, PostgreSQL, pgvector, Redis, FAISS,
ChromaDB.

### D. Applied AI & Automation

RAG applications, LLM integration, knowledge retrieval, and intelligent
workflow automation.

**Relevant technologies:** OpenAI, Claude, n8n, AnythingLLM.

### Presentation

-   Four concise cards or editorial columns.
-   Each card contains a capability title, one-sentence explanation, and
    a small technology line.
-   Avoid long logo walls.
-   Link each capability to relevant projects or case-study sections
    where possible.

------------------------------------------------------------------------

## 4.3 Selected Work --- show evidence

**Purpose:** Move from claims to concrete engineering work.

Feature three projects:

1.  SIMS --- Smart Inventory Management System
2.  CSSD --- Surgical Instrument Identification & Analysis
3.  Prophesy AI Prime --- AI-Powered Market Intelligence

Use detailed editorial cards with:

-   Project name and type/status.
-   Short problem or system description.
-   My contribution.
-   A few technical highlights.
-   A result or meaningful implementation detail, where supported.
-   Link to the full case study.

### Project 01 --- SIMS

**Title:** Smart Inventory Management System\
**Type:** Industry project

**Short description:**\
A computer vision-based inventory monitoring system designed to automate
item counting across shelf environments.

**Contribution highlights:**

-   Developed the FastAPI server and integrated the YOLO inference
    pipeline.
-   Worked on detection experiments and monitored daily detection
    results.
-   Configured Redis-based queue processing.
-   Worked with a Raspberry Pi camera deployment setup across multiple
    shelves and devices.

**Technology line:**\
Python · YOLOv8 · OpenCV · ONNX · PyTorch · FastAPI · Redis · MQTT ·
Amazon S3

**Metric:**\
`98.6%` --- reported metric for correctly counted inventory items.

**Metric presentation rule:**\
Preserve the metric's original evaluation scope. Do not relabel it as
general model accuracy, mAP, or another metric unless the underlying
project evidence explicitly supports that interpretation.

### Project 02 --- CSSD

**Title:** Surgical Instrument Identification & Analysis\
**Type:** Engineering project\
**Status:** Staging / experimental

**Short description:**\
A computer vision system for surgical instrument recognition, similarity
search, measurement, and abnormality analysis.

**Contribution highlights:**

-   Developed the end-to-end computer vision and backend workflow.
-   Used YOLO-based detection and DINOv2 embeddings.
-   Integrated PostgreSQL with pgvector and FAISS-based similarity
    search.
-   Used SAM for mask refinement.
-   Explored instrument length estimation using pixel-to-centimeter
    calibration.
-   Implemented experimental abnormality analysis using image features
    and classical machine learning.

**Technology line:**\
YOLO · DINOv2 · SAM · Python · PostgreSQL · pgvector · FAISS · OpenCV ·
Isolation Forest · SVM

**Status and attribution rules:**

-   Clearly label the project as staging / experimental.
-   Do not imply production deployment.
-   Do not present the anomaly-detection approach as a validated
    clinical or medical diagnostic system.
-   Distinguish implemented components from experiments and planned
    work.

### Project 03 --- Prophesy AI Prime

**Title:** AI-Powered Market Intelligence\
**Type:** Applied AI project

**Short description:**\
An AI-powered knowledge retrieval and market-sensing application
combining a RAG pipeline with automated news collection.

**Contribution highlights:**

-   Implemented the RAG pipeline.
-   Integrated ChromaDB for vector storage.
-   Integrated AnythingLLM.
-   Developed the FastAPI backend.
-   Used n8n for news collection workflows.
-   Integrated OpenAI and Anthropic Claude models.

**Technology line:**\
RAG · ChromaDB · AnythingLLM · FastAPI · n8n · OpenAI · Anthropic Claude

**Scope rule:**\
Emphasize the RAG implementation and market-sensing workflow. Do not
position time-series forecasting as a major hands-on achievement unless
there is additional verified work to support it.

### Project card design rules

-   Give each project a distinct visual or diagram.
-   Keep the contribution summary readable.
-   Use metrics only when their meaning and scope are clear.
-   Include project status labels where relevant.
-   Use consistent card structure, but allow different project visuals.
-   Link to detailed case studies for architecture, decisions,
    experiments, limitations, and results.

------------------------------------------------------------------------

## 4.4 Engineering Philosophy --- how I think

**Purpose:** Demonstrate engineering judgment beyond a list of
technologies.

### Recommended heading

# Beyond Building Models. Engineering Complete Systems.

### Introductory copy

I approach AI engineering as a process that connects problem
understanding, experimentation, implementation, and continuous
evaluation. A model is only one part of a useful system.

### Four-stage approach

#### 01 --- Understand the Problem

Identify operational constraints, requirements, available data, and the
actual problem worth solving.

#### 02 --- Experiment & Evaluate

Explore approaches, establish baselines, validate assumptions, and
measure performance.

#### 03 --- Engineer the Solution

Build pipelines, integrate models, develop APIs, and consider deployment
constraints.

#### 04 --- Validate & Improve

Monitor system behavior, investigate failures, document limitations, and
iterate.

### Presentation

-   Use a horizontal process diagram on wide screens.
-   Stack the four stages vertically on mobile.
-   Use a restrained technical diagram or annotated workflow.
-   Avoid implying that every project followed an identical process if
    the case-study evidence differs.

------------------------------------------------------------------------

## 4.5 Technical Ecosystem --- the toolkit

**Purpose:** Provide a scannable overview of the tools used across the
work.

  Category                     Technologies
  ---------------------------- ---------------------------------------
  Languages                    Python, SQL
  Computer Vision              YOLO, OpenCV, SAM, DINOv2
  ML Frameworks                PyTorch, Ultralytics
  Model & Inference            ONNX
  Backend                      FastAPI, Flask
  Data & Search                PostgreSQL, pgvector, FAISS, ChromaDB
  Infrastructure & Messaging   Docker, Redis, MQTT, Amazon S3
  Applied AI & Automation      RAG, OpenAI, Claude, n8n, AnythingLLM

### Presentation rules

-   Organize technologies by category.
-   Avoid arbitrary skill percentages or proficiency bars.
-   Do not imply mastery based solely on having used a tool once.
-   Prioritize technologies supported by project case studies.
-   Keep the list maintainable as the portfolio evolves.

------------------------------------------------------------------------

## 4.6 About Me --- the person behind the engineering

**Purpose:** Add personality and context without distracting from the
technical evidence.

### Recommended heading

# Curious by Nature. Engineer by Practice.

### Suggested copy

I'm an AI Engineer interested in turning complex technical problems into
practical, well-engineered solutions.

My experience spans computer vision, machine learning, backend
development, and applied AI. I enjoy understanding how individual
components work together to create systems that solve real-world
problems.

I'm particularly interested in the intersection of intelligent systems,
automation, and emerging technologies.

### Image usage

Use the full-body editorial portrait in this section.

Recommended layout:

-   Two columns on desktop.
-   Portrait on one side; introduction and background on the other.
-   Stack on mobile.
-   Keep the portrait visually secondary to the written content.

### Optional content

-   Short professional timeline.
-   Link to the full CV.
-   Link to LinkedIn and GitHub.
-   A short note about current learning interests, if kept current.

Do not turn this section into an unrelated lifestyle profile. Personal
details should support a coherent professional introduction.

------------------------------------------------------------------------

## 4.7 Contact --- make the next step easy

### Recommended heading

# Have an Interesting Problem to Solve?

I'm interested in meaningful engineering challenges, collaborative
projects, and opportunities to build intelligent systems.

### Links

-   Email
-   LinkedIn
-   GitHub
-   Download CV

### Rules

-   Make contact links obvious and functional.
-   Do not invent contact information.
-   Only display "Open to opportunities" while it is accurate.
-   Avoid a complicated contact form unless there is a real need for
    one.

------------------------------------------------------------------------

# 5. Visual identity and art direction

## 5.1 Design concept

**Editorial Engineering --- Intelligence with Intent**

The website should feel like an independent engineering publication:
thoughtful, technically credible, editorial, and personal without
looking like a generic developer template.

## 5.2 Color palette

  --------------------------------------------------------------------------
  Token                Name              HEX               Suggested use
  -------------------- ----------------- ----------------- -----------------
  `color-mineral`      Mineral           `#F3F1EA`         Main background

  `color-stone`        Stone             `#D9D7CE`         Secondary
                                                           surfaces

  `color-graphite`     Graphite          `#292D2B`         Main text and
                                                           structure

  `color-muted`        Muted Grey        `#747870`         Secondary text

  `color-steel-blue`   Steel Blue        `#344D68`         Primary technical
                                                           action

  `color-dusty-rose`   Dusty Rose        `#D8A7B1`         Personal accent

  `color-burgundy`     Burgundy          `#6B2D3B`         Emphasis and
                                                           selected
                                                           interactions

  `color-amber`        Amber             `#C18B51`         Experimental /
                                                           attention accent

  `color-success`      Muted Green       `#617C68`         Verified /
                                                           success states

  `color-rust`         Rust              `#A65E4D`         Limitations /
                                                           error states
  --------------------------------------------------------------------------

### Approximate color balance

-   65% neutral backgrounds.
-   25% graphite, typography, and structural elements.
-   10% accent colors.

The dusty rose should remain a supporting signature, not the dominant
color.

## 5.3 Typography

Recommended type system:

  Role                 Typeface           Use
  -------------------- ------------------ ---------------------------------
  Editorial headings   Instrument Serif   Hero and section headlines
  Body and interface   IBM Plex Sans      Paragraphs, navigation, UI
  Technical details    IBM Plex Mono      Code, metrics, labels, diagrams

Typography should prioritize legibility. Avoid using the display serif
for long paragraphs or dense technical content.

## 5.4 Photography

Use the two coordinated editorial portraits consistently:

-   **Headshot:** homepage hero and small identity/avatar uses.
-   **Full-body portrait:** About section and selected personal
    introduction areas.

Photography treatment:

-   Warm, natural lighting.
-   Cream and beige environment.
-   Soft, restrained crop shapes.
-   No heavy filters or decorative frames.
-   Keep personal photography visually distinct from actual project
    screenshots and technical evidence.

The generated portraits are visual assets, not evidence of a real
project environment or workplace.

------------------------------------------------------------------------

# 6. Ambient Sakura --- decorative animation

A subtle falling-petal animation may be used as a small personal
signature.

### Intended behavior

-   A few pale dusty-rose petals drift slowly through the homepage hero.
-   Petals vary slightly in size, rotation, duration, and horizontal
    movement.
-   The animation should feel ambient rather than attention-seeking.
-   It must never block clicks or obscure text.
-   Keep the effect primarily on the homepage; do not carry it into
    dense technical case studies.

### Implementation constraints

-   Prefer lightweight CSS or a similarly lightweight implementation.
-   Use `pointer-events: none` for the decorative layer.
-   Respect `prefers-reduced-motion`.
-   Reduce or disable the effect on mobile or low-performance contexts
    when appropriate.
-   Avoid excessive particle counts, large libraries, or continuous
    expensive rendering.
-   The site must remain fully usable if the animation is disabled.

Suggested visual settings:

  Property        Direction
  --------------- -------------------------------------------------
  Petal color     `#D8A7B1`
  Opacity         Approximately 0.3--0.55
  Visible count   Approximately 8--12 desktop; fewer on mobile
  Motion          Slow fall, gentle drift, subtle rotation
  Interaction     Decorative only; never intercept pointer events

------------------------------------------------------------------------

# 7. Interaction and responsive behavior

## 7.1 Responsive layout

Use the existing design system and established breakpoints where
possible. If a new system is needed, use these as starting reference
widths:

-   Desktop: 1440px
-   Tablet: 768px
-   Mobile: 390px

Requirements:

-   Hero content must reflow cleanly.
-   Project cards should become a single-column list on narrow screens.
-   Technical capability cards should stack without cramped text.
-   Diagrams must remain readable or provide an alternate mobile
    presentation.
-   Portrait crops must preserve the subject.
-   Navigation must remain accessible.
-   Avoid horizontal overflow.

## 7.2 Motion

-   Motion should communicate hierarchy or add atmosphere, not exist
    merely to make the site feel modern.
-   Avoid scroll-jacking and unnecessary parallax.
-   Keep transitions short and restrained.
-   Respect reduced-motion preferences.
-   Ensure all content remains available without animation.

## 7.3 Accessibility

-   Meet WCAG AA contrast for normal text wherever possible.
-   Provide meaningful alt text for informative images.
-   Mark decorative petals and purely decorative imagery appropriately.
-   Maintain keyboard accessibility and visible focus states.
-   Do not communicate project status or results through color alone.
-   Use semantic heading order and descriptive link text.

------------------------------------------------------------------------

# 8. Content integrity and evidence rules

The portfolio must remain honest, specific, and defensible in an
interview.

1.  Distinguish personal contribution from team contribution.
2.  Distinguish implemented features from experiments and planned work.
3.  Preserve project status labels.
4.  Scope every metric to what it actually measures.
5.  Do not claim production deployment where the project was only staged
    or experimental.
6.  Do not add technologies simply because they are fashionable.
7.  Do not imply that using a framework once establishes deep expertise.
8.  Link technical claims to detailed case-study evidence wherever
    possible.
9.  Do not invent dates, performance numbers, users, business impact, or
    deployment scale.
10. Keep the English and Indonesian versions factually equivalent.

If a claim cannot be supported by the existing project documentation,
omit it or label it as an area being explored.

------------------------------------------------------------------------

# 9. Bilingual content strategy

The portfolio should preserve its bilingual experience.

Recommended behavior:

-   Provide a clear language switcher.
-   Keep section order and information architecture consistent between
    languages.
-   Translate meaning naturally rather than word-for-word.
-   Keep technical names, framework names, and standard engineering
    terminology unchanged where appropriate.
-   Maintain equivalent contribution boundaries, project status,
    metrics, and limitations.
-   Do not allow one language version to contain stronger claims than
    the other.

English can be the default if that matches the existing portfolio, but
preserve the current established behavior unless there is a deliberate
reason to change it.

------------------------------------------------------------------------

# 10. What not to do

-   Do not turn the homepage into a second CV.
-   Do not add a wall of technology logos.
-   Do not use generic AI marketing language.
-   Do not overload the hero with biography or technical detail.
-   Do not make sakura animation a dominant visual feature.
-   Do not use pink as the primary interface color.
-   Do not sacrifice technical readability for visual effects.
-   Do not add animations just to make the website feel modern.
-   Do not hide project limitations or inflate results.
-   Do not present experimental work as production-ready.
-   Do not let decorative photography replace actual project visuals.

------------------------------------------------------------------------

# 11. Implementation priorities

## Phase 1 --- Homepage foundation

-   [ ] Hero section and professional positioning.
-   [ ] Technical identity section.
-   [ ] Selected work cards for SIMS, CSSD, and Prophesy AI Prime.
-   [ ] Clear links to detailed case studies.
-   [ ] Contact section.
-   [ ] Responsive layout and accessible navigation.

## Phase 2 --- Depth and context

-   [ ] Engineering philosophy section.
-   [ ] Technical ecosystem.
-   [ ] About section with full-body portrait.
-   [ ] Professional timeline, if supported by accurate dates.
-   [ ] Bilingual content parity.
-   [ ] CV and external profile links.

## Phase 3 --- Visual polish

-   [ ] Final typography and spacing refinement.
-   [ ] Subtle Ambient Sakura effect.
-   [ ] Restrained hover and transition behavior.
-   [ ] Image crop and performance optimization.
-   [ ] Reduced-motion and mobile checks.
-   [ ] Accessibility and contrast audit.

------------------------------------------------------------------------

# 12. Definition of done

The homepage is ready when:

-   [ ] A first-time visitor can identify my professional direction
    within five seconds.
-   [ ] The hero communicates what I build and the problems I work on.
-   [ ] The three selected projects are visible and linked to detailed
    case studies.
-   [ ] Each project card accurately represents my contribution and
    project status.
-   [ ] The 98.6% SIMS metric is described within its correct scope.
-   [ ] CSSD is clearly labeled as staging / experimental where
    appropriate.
-   [ ] Prophesy AI Prime is focused on the RAG and market-sensing work
    I actually implemented.
-   [ ] Technical capabilities are organized and scannable.
-   [ ] The homepage does not duplicate the full CV.
-   [ ] The headshot and full-body portrait have distinct, intentional
    roles.
-   [ ] English and Indonesian content remain factually equivalent.
-   [ ] The layout works at desktop, tablet, and mobile widths.
-   [ ] Text contrast, keyboard navigation, and reduced-motion behavior
    are addressed.
-   [ ] Decorative animation does not interfere with reading or
    interaction.
-   [ ] All links, CTAs, and downloads work.
-   [ ] No unsupported claims, dates, metrics, or deployment statements
    have been introduced.

------------------------------------------------------------------------

## Final design principle

> **Make the homepage memorable enough to invite exploration, and make
> the engineering evidence strong enough to reward it.**

The visual identity earns attention. The project case studies earn
trust.
