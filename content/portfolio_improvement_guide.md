# Portfolio Improvement Guide

## Silfaradila --- AI Engineering Portfolio

**Purpose:** Turn the existing portfolio into a credible, evidence-led
engineering portfolio that communicates not only what was built, but how
problems were approached, what was personally contributed, and what was
learned.

------------------------------------------------------------------------

## 1. Strategic vision

The portfolio should position you as:

> **An AI Engineer with strong Computer Vision foundations and practical
> experience building end-to-end AI systems.**

The site should demonstrate four things:

1.  **Technical depth** --- you understand models, data, pipelines,
    APIs, deployment and system trade-offs.
2.  **Engineering ownership** --- visitors can distinguish your direct
    contributions from team or company work.
3.  **Evidence and credibility** --- claims are supported by diagrams,
    metrics, sanitized screenshots, experiments or code where disclosure
    permits.
4.  **Learning and initiative** --- personal projects and engineering
    notes show how you explore problems independently.

The goal is not to make the site bigger. The goal is to make the
existing content more convincing.

## 2. Recommended site structure

Keep the current overall structure, but make the content categories
explicit.

``` text
Home
├── Short professional introduction
├── Featured projects
├── Technical capabilities
└── Contact

About
├── Professional background
├── Engineering interests
├── Working principles
└── Career timeline

Projects
├── Professional experience
│   ├── Smart Inventory Management System (SIMS)
│   ├── CSSD Surgical Instrument Identification
│   └── Prophesy AI Prime
├── Independent projects
└── Research & experiments

Engineering Journal
├── Computer Vision
├── Machine Learning & Anomaly Detection
├── LLM & RAG Engineering
├── Backend & System Design
└── Edge AI & Deployment

Resume
└── Web resume + downloadable PDF

Contact
└── Email, LinkedIn, GitHub
```

Do not automatically classify every historical project as a professional
achievement. Confirm the project context, your ownership and its
completion status first.

## 3. Project classification and status

Every project should have structured metadata.

### Project category

-   **Professional experience:** work undertaken as part of employment
    or a company team.
-   **Independent project:** personally initiated and developed outside
    company work.
-   **Research & experiment:** exploration, prototype, benchmark or
    feasibility study.

### Project status

Use one primary status, with an optional secondary descriptor:

  -----------------------------------------------------------------------
  Status                              Meaning
  ----------------------------------- -----------------------------------
  Completed                           The planned implementation or scope
                                      was completed.

  Deployed                            Running in an operational
                                      environment.

  Staging                             Implemented and undergoing staging
                                      or validation.

  Experimental                        A prototype or experimental
                                      implementation.

  Research                            Investigation or feasibility
                                      exploration.

  Unverified                          Historical information or results
                                      still need confirmation.
  -----------------------------------------------------------------------

A project can be both completed and deployed, or staging and
experimental. Do not use a status that implies production deployment
unless that is accurate.

## 4. Disclosure and confidentiality policy

Create a disclosure label for each professional project.

  -----------------------------------------------------------------------
  Label                   Meaning                 Publishing approach
  ----------------------- ----------------------- -----------------------
  Public                  Approved or safe to     Explain the work in
                          disclose                detail and link public
                                                  code if available.

  Redacted                Some details are        Use generalized
                          sensitive               diagrams, sanitized
                                                  screenshots and
                                                  approved metrics.

  Restricted              Not approved for        Omit technical
                          disclosure              specifics; publish only
                                                  an approved high-level
                                                  description, or omit
                                                  the project.
  -----------------------------------------------------------------------

For each project, document:

-   What can be shared.
-   What has been generalized or redacted.
-   What is intentionally excluded.
-   Whether any metrics or screenshots have approval for publication.

Never publish company source code, credentials, customer information,
internal datasets, private prompts, proprietary workflows or
infrastructure details without authorization. Being the developer does
not automatically grant permission to publish company-owned work.

## 5. Standard case-study template

Use a consistent template for every substantial project. Adapt the depth
to the amount of evidence available.

### 5.1 Project header

Include:

-   Project name.
-   One-sentence description.
-   Category: Professional / Independent / Research.
-   Role and dates, where appropriate.
-   Status.
-   Disclosure label.
-   Technology tags.

### 5.2 Overview

Explain the product or system in plain language.

Answer: - What is it? - Who or what is it for? - What does it do? - What
was the project's scope?

### 5.3 Problem and constraints

Describe the actual problem, not just the proposed solution.

Include: - Existing workflow or limitation. - Technical challenge. -
Data or hardware constraints. - Operational requirements. - Scope
boundaries.

### 5.4 My contribution

Be precise about ownership.

Use three groups where relevant:

-   **I implemented:** components directly developed by you.
-   **I contributed to:** components developed collaboratively.
-   **Handled by other teams:** infrastructure, frontend, data
    collection or other work not owned by you.

Avoid implying sole ownership of a team-wide system.

### 5.5 System architecture

Add a diagram showing the real high-level flow.

For each diagram: - Label the inputs and outputs. - Show the main
processing stages. - Identify APIs, queues, databases and external
services. - Distinguish components you built from components supplied by
other teams. - Remove confidential names, endpoints, topology and
configuration.

Add a short written explanation below the diagram.

### 5.6 Technical implementation

Explain the important components and why they were used.

For each major decision, cover:

1.  Requirement or problem.
2.  Chosen approach.
3.  Alternative considered, if known.
4.  Trade-off.
5.  Outcome or limitation.

Do not invent alternatives or claim experiments that were not performed.

### 5.7 Experiments and engineering challenges

This is a high-value section.

For each challenge, explain:

-   Symptom or failure.
-   Likely cause or investigation.
-   Experiment or change.
-   Observation.
-   Final decision.
-   Remaining limitation.

A failed experiment can be useful evidence of engineering reasoning if
described honestly.

### 5.8 Results and evaluation

Use metrics only when their meaning is clear.

For every metric, state: - What was measured. - How it was calculated. -
Dataset or evaluation scope. - Test conditions. - Whether it is a model
metric, system metric or operational metric. - Whether publication is
approved.

If a result is not verified or cannot be disclosed, say so rather than
presenting an unsupported number.

### 5.9 Demonstration and evidence

Use evidence appropriate to the disclosure level:

-   Sanitized screenshots.
-   Synthetic or public sample data.
-   Architecture diagrams.
-   Short demonstration videos.
-   Public repository.
-   Reproducible experiment results.

Do not use screenshots containing confidential data or identifying
information.

### 5.10 Limitations and reflection

Explain: - What remains incomplete? - What is not yet validated? - What
would you improve? - What would you investigate next?

This section makes the case study more credible, not less.

------------------------------------------------------------------------

## 6. Priority case-study plans

### A. Smart Inventory Management System (SIMS)

**Portfolio objective:** Demonstrate practical computer vision
engineering, edge deployment and integration with backend processing.

Recommended content:

1.  System overview and inventory-counting problem.
2.  Camera and edge-device context, described at an approved level.
3.  Your role in the detection and inference pipeline.
4.  Detection/segmentation and counting workflow.
5.  Geometry-based counting logic, if approved.
6.  FastAPI integration and Redis queue processing.
7.  Edge deployment considerations.
8.  Engineering challenges and troubleshooting.
9.  Results with a precise definition of any published metric.
10. Disclosure note and limitations.

**Evidence to prepare:** - Sanitized architecture diagram. - Example
input and output images. - Generic processing-flow diagram. - Approved
performance figures and their definitions. - Clear ownership breakdown.

**Important:** Do not imply that a reported 98.6% figure is model
accuracy unless that is exactly what was measured. Identify whether it
represents inventory counting correctness, item-level accuracy or
another metric.

### B. CSSD Surgical Instrument Identification

**Portfolio objective:** Demonstrate a multi-stage computer vision
pipeline, visual retrieval and experimentation.

Recommended content:

1.  Instrument identification problem.
2.  Dataset scope and collection/annotation work.
3.  YOLO detection stage.
4.  DINOv2 embedding extraction.
5.  FAISS and pgvector similarity retrieval.
6.  SAM segmentation refinement.
7.  Pixel-to-centimeter calibration.
8.  Feature-based anomaly detection experiments.
9.  Validation status and limitations.
10. Next steps.

**Evidence to prepare:** - Sanitized pipeline diagram. - Synthetic or
approved instrument examples. - Embedding retrieval illustration. -
Anomaly heatmap or feature visualization, if available. - Dataset and
evaluation limitations.

**Important:** Make it clear that approximately 200 collected images
describe the experimental dataset, not necessarily a validated
production-scale dataset. Explain what was tested and what remains
unvalidated.

### C. Prophesy AI Prime

**Portfolio objective:** Demonstrate end-to-end RAG and LLM application
engineering.

Recommended content:

1.  Market-intelligence use case.
2.  Your role and scope.
3.  News collection and ingestion workflow.
4.  Document processing and embedding.
5.  ChromaDB retrieval.
6.  AnythingLLM and model-provider integration.
7.  FastAPI backend.
8.  OpenAI and Anthropic integration.
9.  Evaluation approach, if performed.
10. Limitations and disclosure note.

**Evidence to prepare:** - Generalized RAG architecture. - Sanitized
ingestion-to-answer flow. - Example using public documents. - Retrieval
and citation behavior, if implemented. - Clear distinction between
implemented features and proposed improvements.

------------------------------------------------------------------------

## 7. Personal projects: build fewer, deeper projects

Aim for two or three substantial independent projects rather than many
small demos.

Suggested priorities:

### 1. Visual Anomaly Detection Platform

A strong continuation of your computer vision and anomaly-detection
interests.

Possible scope: - Public dataset selection. - Data exploration and
preprocessing. - Baseline methods. - Compare suitable approaches such as
PatchCore, PaDiM and autoencoders. - Anomaly localization and
heatmaps. - Evaluation and error analysis. - Inference API and simple
UI.

Document what you actually implement. Do not claim a model comparison
unless you run it under a reasonably consistent evaluation setup.

### 2. Visual Search Engine

Demonstrate visual representation and retrieval: - Image ingestion. -
DINOv2 or CLIP embeddings. - Vector similarity search. - Ranking and
filtering. - Search API. - Evaluation examples.

### 3. AI Business Operations Agent

Demonstrate broader AI application engineering: - Define a narrow
business workflow. - Create agents or tools with explicit
responsibilities. - Orchestrate tasks. - Add human approval for
consequential actions. - Log tool calls and decisions. - Handle errors
and retries. - Evaluate reliability.

Start with one workflow that works end-to-end. Avoid building a large
collection of agents before proving the workflow is useful.

------------------------------------------------------------------------

## 8. Engineering Journal plan

Publish technical articles that explain real engineering work.

Suggested initial topics:

1.  From Object Detection to Inventory Counting: Handling Occlusion with
    Geometry-Based Logic.
2.  Building a Visual Retrieval Pipeline with DINOv2 and FAISS.
3.  Anomaly Detection with Limited Data: Experiments, Challenges and
    Findings.
4.  Deploying Computer Vision on Edge Devices: Practical Considerations.
5.  Building an End-to-End RAG Pipeline: From Ingestion to Retrieval.

Recommended article structure:

-   Context.
-   Problem.
-   Approach.
-   Implementation.
-   Experiments.
-   Findings.
-   Limitations.
-   References or repository.

Articles should be based on work you actually performed. Clearly label
retrospective explanations, reproductions and new experiments.

------------------------------------------------------------------------

## 9. Homepage content priorities

The homepage should answer these questions quickly:

1.  Who are you professionally?
2.  What kind of engineering problems do you work on?
3.  What are your strongest examples?
4.  Where can visitors inspect your work?
5.  How can they contact you?

Recommended sections:

1.  Hero and concise professional positioning.
2.  Featured professional projects.
3.  Selected independent work.
4.  Technical capabilities grouped by domain.
5.  Short career timeline.
6.  Engineering Journal highlights.
7.  Contact call-to-action.

Avoid turning the homepage into a full CV. Give visitors a clear path to
deeper project pages.

## 10. Technical content quality checklist

Before publishing any case study, verify:

-   [ ] The problem is understandable without specialist context.
-   [ ] My personal contribution is explicit.
-   [ ] Team contributions are represented fairly.
-   [ ] Architecture matches the actual implementation.
-   [ ] Technologies are listed only if genuinely used.
-   [ ] Metrics have definitions and evaluation context.
-   [ ] Project status is accurate.
-   [ ] Limitations are acknowledged.
-   [ ] Confidentiality has been reviewed.
-   [ ] Images and diagrams are approved or independently created.
-   [ ] Links and repositories work.
-   [ ] The page is readable on mobile.

## 11. Recommended improvement backlog

### P0 --- Credibility and accuracy

-   [ ] Audit project ownership and classification.
-   [ ] Verify project status and dates.
-   [ ] Review all performance claims and metric definitions.
-   [ ] Review disclosure permissions.
-   [ ] Separate professional, independent and research work.

### P1 --- Technical evidence

-   [ ] Create a SIMS architecture diagram.
-   [ ] Create a CSSD pipeline diagram.
-   [ ] Create a Prophesy AI RAG diagram.
-   [ ] Add sanitized input/output examples.
-   [ ] Add engineering challenges and decision rationale.
-   [ ] Add evaluation methodology and limitations.

### P2 --- Depth and differentiation

-   [ ] Publish the first two engineering articles.
-   [ ] Build one independent project to a demonstrable state.
-   [ ] Add a public repository or reproducible demo where appropriate.
-   [ ] Add a consistent project metadata and status system.

### P3 --- Polish

-   [ ] Review mobile reading experience.
-   [ ] Check navigation and project discovery.
-   [ ] Synchronize web resume and PDF.
-   [ ] Check accessibility, page metadata and loading performance.
-   [ ] Test all external links.

------------------------------------------------------------------------

## 12. Suggested working sequence

1.  **Audit:** verify facts, ownership, project status and disclosure
    permissions.
2.  **Set the standard:** finish the SIMS case study as the reference
    template.
3.  **Replicate:** bring CSSD and Prophesy AI to the same documentation
    standard.
4.  **Reorganize:** separate professional, independent and research
    projects.
5.  **Add evidence:** diagrams, sanitized visuals, evaluation and
    limitations.
6.  **Publish insights:** start the Engineering Journal.
7.  **Build independently:** complete one personal project with a public
    demo.
8.  **Polish:** review the entire site as a recruiter and a technical
    interviewer would.

## 13. The standard to aim for

A visitor should finish reading a project page understanding:

-   What problem was being solved.
-   What the system actually did.
-   Which parts you personally built.
-   How the system was designed.
-   Why key technical decisions were made.
-   What evidence supports the results.
-   What limitations remain.

**The guiding principle: show engineering judgment, not just technology
exposure.**

A convincing portfolio does not need to make every project look perfect.
It needs to make your work understandable, attributable, technically
grounded and honest.
