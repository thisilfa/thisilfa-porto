---
title: CSSD Surgical Instrument Identification
category: Computer Vision
type: professional
overview: A computer vision system designed to identify surgical instruments through object detection, visual embeddings, similarity search and image analysis.
role: Computer Vision Engineer
company: Biologic Technik
stack:
  [Python, YOLO, SAM, DINOv2, FAISS, PostgreSQL, pgvector, FastAPI, OpenCV, Isolation Forest, SVM]
status: Staging / experimental validation
statusKind: staging
ownership: employer
disclosure: Real operational data, proprietary workflows and internal implementation details are not included.
kind: case-study
featured: true
order: 2
period: July 2025 – Present
diagram: cssd
contribution:
  - group: implemented
    items:
      - End-to-end development — data collection and annotation of ~200 instrument images (personally collected), model experimentation, and image processing.
      - The identification pipeline — YOLO detection, SAM mask refinement, geometric length estimation, and DINOv2 embedding retrieval.
      - Abnormality-detection exploration across three approaches (HSV processing, PatchCore, and a custom patch-feature method).
      - The FastAPI backend with SQLAlchemy and asyncio; models loaded once and reused across requests.
      - Staging deployment on AWS EC2 with Uvicorn.
  - group: unattributed
    items:
      - The provenance of the instrument reference metadata in PostgreSQL; the exact instrument-category count.
---

## Problem and constraints

In the hospital's Central Sterile Services Department, surgical instruments arrive on trays
that must be identified and checked for surface abnormalities — blood stains, rust, damage —
before reuse. Identification was manual and error-prone: many instruments look nearly
identical, and visual inspection competes with workload. The system's goal: photograph a
tray, identify each instrument automatically, and explore automated abnormality flagging.

The constraints that shaped the approach:

- **Visually similar instruments** — clamps and forceps differ in small geometry; generic
  classification is not enough, so the pipeline combines detection, geometry, and embedding
  retrieval.
- **Fixed camera setup** — images were captured in a controlled setup with consistent
  lighting and positioning, which made a one-time pixel-to-centimeter calibration possible.
- **Small-data reality** — approximately 200 personally collected and annotated instrument
  images; no large operational dataset exists for this problem.
- **Staging boundary** — the system targets staging validation, not production deployment.

## System architecture

The diagram above shows the generalized identification pipeline. YOLO detects and localizes
each instrument with an initial mask; the crop is preprocessed with background suppression
and white-background illumination; SAM refines the mask; instrument length is estimated from
polygon and point geometry with PCA, converted to centimeters through the fixed-camera
calibration, and filtered against instrument metadata in PostgreSQL as candidates narrow.
DINOv2 embeddings compared by cosine similarity identify the instrument, with FAISS serving
in-memory search and PostgreSQL/pgvector providing persistent embedding storage — two
complementary roles, both implemented. The metadata node is muted: its provenance is not
individually attributed.

## Technical implementation

**Retrieval over classification.** Requirement: instruments differ in small geometry, and a
closed-set classifier would need retraining for every new instrument. Approach: treat
identification as retrieval — DINOv2 embeddings, cosine similarity, FAISS in-memory search,
pgvector for persistent storage. Outcome: new instruments join by adding reference embeddings,
and top-5 retrieval makes near-matches inspectable.

**Fixed-camera calibration.** Requirement: instrument length in centimeters, not pixels.
Approach: a one-time calibration for the fixed camera setup, with polygon/point geometry and
PCA for length estimation — not a calibration object in every image. Outcome: length becomes
a filter against instrument metadata in PostgreSQL, narrowing candidates before embedding
comparison.

**Complementary storage.** Requirement: fast search and durable embeddings. Approach: FAISS
for in-memory similarity search, PostgreSQL/pgvector as the persistent embedding store.
Outcome: each storage serves the role it is built for.

**Backend efficiency.** Requirement: staging API without per-request model loading.
Approach: FastAPI with SQLAlchemy and asyncio; models loaded into memory once and reused.
Outcome: staging deployment on AWS EC2 via Uvicorn — explicitly without Docker, Nginx, or API
authentication/authorization, which were out of the staging scope.

## Experiments and engineering challenges

- **Abnormality detection — three approaches explored.** Requirement: flag blood stains, rust,
  and surface damage. Approaches: traditional HSV image processing; PatchCore-based patch
  anomaly detection; and a custom patch-based method extracting HSV/grayscale/LAB features
  with Isolation Forest and SVM. Documented state: the custom approach patched images, saved
  patch-level features to CSV, and repeated patching at inference to bound anomalous regions;
  the same models were used across abnormality types, and whether separate per-type models
  were used is unconfirmed. Status: still under development and testing — presented at
  staging validation only, with deployment to production out of scope.
- **Small-test-set evaluation.** Eleven instrument types were evaluated: approximately 10 of
  11 identified correctly at top-1 (about 90.9% on that test set). Top-5 analysis inspected
  whether the correct or a visually similar candidate appeared among the top results — 7 of
  11 types had very similar-looking candidates in the top five. This is a small test set, not
  a broad benchmark or generalized production accuracy.
- **A remembered misidentification.** One case may have involved a clamp versus forceps
  confusion, but the exact case and root cause are unconfirmed — recorded here as an
  unverified memory, not a finding.

## Results and evaluation

- Approximately 10/11 instrument types correctly identified at top-1 (≈90.9%) — on a small
  test set of 11 types, not a broad benchmark.
- Top-5 retrieval analysis documented: 7 of 11 types showed very similar-looking candidates
  in the top five, motivating the metadata-length filter in the pipeline.
- The abnormality-detection approaches remained experimental; the identification pipeline
  reached staging validation.
- No claim of generalized production accuracy is made — the evaluation scope is the collected
  dataset and the 11-type test set.

## Demonstration and evidence

Sanitized pipeline screenshots, sample instrument imagery, and embedding-retrieval
visualizations await owner-approved material and are intentionally not faked here.

## Limitations and reflection

- The dataset (~200 images, 11 evaluated types) supports staging validation only — not
  generalized production accuracy.
- Abnormality detection remained experimental; which per-type modeling strategy is correct is
  unconfirmed.
- Staging deployment deliberately omitted Docker, Nginx, and API authentication/authorization;
  productionization would need all three.
- Retrieval quality depends on reference metadata whose provenance is not individually
  attributed here.
- Future investigation, not yet performed: larger multi-site datasets, per-type anomaly
  modeling decisions, and production hardening.

## Disclosure note

Real operational data, proprietary workflows and internal implementation details are not
included.
