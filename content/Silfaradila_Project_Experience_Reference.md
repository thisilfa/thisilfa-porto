# Project Experience --- Silfaradila Mei Fizahidah

A working reference for resume refinement, portfolio planning, and
technical interviews. This document distinguishes personal
implementation, collaboration, exploratory work, and unverified details.
Do not publish confidential company data, proprietary business logic,
internal screenshots, source code, or client information.

------------------------------------------------------------------------

## 1. Smart Inventory Management System (SIMS)

**Domain:** Computer Vision, segmentation, inventory monitoring,
edge/cloud integration\
**Role:** Computer Vision Engineer --- Biologic Technik Pte. Ltd.\
**Status:** Deployed in a hospital inventory environment\
**Technologies:** Python, YOLOv8, PyTorch, Ultralytics, OpenCV, FastAPI,
Redis, MQTT, AWS, Raspberry Pi 4, Roboflow

### Overview

A computer-vision inventory monitoring and counting system. Cameras
capture shelf images periodically and when detected quantities change.
The system identifies visible surfaces of stacked boxes and uses spatial
relationships to estimate the number of boxes, including partially
hidden boxes. It also supports PAR (Periodic Automatic Replenishment)
monitoring.

### My responsibilities

-   Experimented with and improved an existing CV system, including
    model retraining and daily performance evaluation.
-   Trained and evaluated custom YOLOv8 segmentation models using
    pretrained YOLOv8 weights.
-   Developed geometry-based counting logic using bounding-box
    coordinates, adjacency, and spatial relationships to estimate hidden
    boxes.
-   Reviewed daily discrepancies and categorized failures as
    model-related, counting-logic-related, or environmental
    (e.g. occlusion).
-   Collected additional overexposed and occluded-box samples; applied
    targeted augmentation and counting-logic refinements.
-   Monitored operational performance and prepared monthly reports
    covering accuracy, PAR performance, failure categories, and
    improvements.
-   Proposed a centralized inference architecture to reduce duplicate
    YOLO loading and instability on Raspberry Pi devices.
-   Personally developed the FastAPI inference server, integrated YOLO
    execution, and configured Redis-based task processing.
-   Collaborated with infrastructure engineers on AWS deployment and
    integration with existing MQTT communication.

### Technical approach

1.  Capture shelf images from cameras.
2.  Run custom YOLOv8 segmentation to identify visible surfaces of
    stacked boxes.
3.  Analyze detected regions, bounding-box coordinates, adjacency, and
    spatial relationships.
4.  Count visible top surfaces and infer hidden boxes from relationships
    between top, side, and bottom surfaces.
5.  Use the resulting count in inventory monitoring and PAR workflows.

Describe this as geometry-/spatial-reasoning-based counting, not full 3D
reconstruction.

### Data and evaluation

-   Fewer than 500 images used overall; approximately 800 "instances"
    collected (the exact meaning of this count is not confirmed).
-   Annotated using Roboflow; class imbalance was addressed during
    preparation.
-   Augmentations included rotation, flipping, brightness/contrast and
    exposure changes, plus selective random cutout (less than 3% of
    training data).
-   Training monitored loss and mAP; testing included segmentation-mask
    evaluation, mask mAP, precision, and confusion matrix.
-   Exact model-level scores are not currently available.
-   Reported peak average daily operational inventory-counting accuracy:
    **98.6% for the whole month of October**. This is an operational
    counting metric (correctly counted inventory items compared with
    actual inventory), not model mAP. The year is unconfirmed.

### Deployment and collaboration

The previous setup ran the same program twice for two cameras on one
Raspberry Pi, loading YOLO twice and contributing to resource
inefficiency and crashes. I proposed moving inference to an AWS-hosted
server while Raspberry Pi devices captured and sent images.

-   Personally implemented: FastAPI inference server, YOLO integration,
    Redis task processing.
-   Collaborative/existing: AWS deployment was collaborative; MQTT was
    an existing component handled by infrastructure; Amazon S3 was part
    of the wider system but was not personally implemented.
-   Deployment used seven cameras across seven shelves and four
    Raspberry Pi 4 devices. One Pi handled two cameras; exact
    distribution is unknown.
-   Images were captured every 30 minutes and on `qty_change` events.
-   Deployed in a hospital inventory environment. The exact meaning of
    an earlier reference to "two inventory" areas/locations is unclear.

### Independent portfolio recreation

Use public or self-collected data, not company images, labels, code, or
proprietary rules. Build a shelf-object detector/segmenter, a
transparent geometry-assisted counting baseline, occlusion and lighting
tests, a FastAPI inference endpoint, and a small discrepancy dashboard.
Report model metrics separately from end-to-end counting accuracy.

------------------------------------------------------------------------

## 2. CSSD Surgical Instrument Identification & Abnormality Detection

**Domain:** Computer Vision, visual search, segmentation, anomaly
detection, backend engineering\
**Role:** Computer Vision Engineer --- Biologic Technik Pte. Ltd.\
**Status:** Staging; abnormality-detection methods remained under
development\
**Technologies:** Python, YOLO, SAM, DINOv2, cosine similarity, FAISS,
PostgreSQL, pgvector, SQLAlchemy, FastAPI, asyncio, AWS EC2, OpenCV,
HSV, grayscale, LAB, Isolation Forest, SVM, PatchCore

### Overview and ownership

A system intended to identify metal surgical instruments on trays and
investigate surface abnormalities such as blood stains, rust, and
damage. I handled end-to-end development: data collection and
annotation, model experimentation, image processing,
identification/retrieval, abnormality-detection exploration, FastAPI
backend, integration, and staging deployment.

### Identification pipeline

1.  YOLO detects/localizes instruments and provides an initial mask.
2.  Crop the instrument and preprocess the image, including background
    suppression and white-background illumination.
3.  Use Segment Anything Model (SAM) to refine the mask.
4.  Estimate instrument length using polygon/point geometry and PCA.
5.  Convert pixels to centimeters using calibration for the fixed camera
    setup (not a calibration object in every image).
6.  Compare estimated length with instrument metadata in PostgreSQL to
    filter candidates.
7.  Generate image embeddings with DINOv2 and compare them using cosine
    similarity.
8.  Use FAISS for in-memory similarity search and PostgreSQL/pgvector
    for persistent embedding storage.

FAISS and pgvector had complementary roles: in-memory search and
persistent embedding storage, respectively.

### Data

-   Approximately 200 instrument images personally collected and
    annotated.
-   Multiple instrument types; exact category count is unknown.
-   Images were captured in a controlled setup with consistent lighting
    and camera positioning.
-   Images were labeled using filenames.

### Abnormality-detection exploration

Targets included blood stains, rust, and other surface damage. Three
approaches were explored: 1. Traditional HSV image processing. 2.
PatchCore-based patch anomaly detection. 3. A custom patch-based
approach using image-processing features and ML.

The custom approach divided images into patches, extracted numerical
HSV/grayscale/LAB features, saved patch-level features to CSV, and used
Isolation Forest and SVM. At inference, patching and feature extraction
were repeated, and anomalous patches were indicated using bounding-box
coordinates. The same Isolation Forest and SVM models were used across
abnormality types; separate models per type were not confirmed.

**Status caveat:** These methods were still under development/testing.
Do not claim production readiness.

### Backend and deployment

-   Personally developed the FastAPI backend and integrated the
    pipeline.
-   Used SQLAlchemy for PostgreSQL interaction and Python asyncio for
    asynchronous request handling.
-   Loaded models into memory once and reused them to avoid per-request
    model initialization.
-   Deployed the staging application on AWS EC2 using Uvicorn.
-   No Docker, Nginx, or API authentication/authorization was
    implemented.

### Evaluation

-   Evaluated 11 instrument types; approximately 10/11 were correctly
    identified at top-1 on the small test set (about 90.9% for that test
    set).
-   Top-5 retrieval analysis helped inspect whether the correct or
    visually similar candidate appeared among the top results.
-   Seven of 11 cases had very similar-looking candidates in the top
    five.
-   A remembered misidentification may have involved a clamp versus
    forceps, but the exact case and root cause were not confirmed.

This is a small test set, not a broad benchmark or generalized
production accuracy.

### Independent portfolio recreation

Use a public industrial anomaly dataset or independently collected
non-confidential objects. Build segmentation, DINOv2 embeddings, FAISS
retrieval, optional geometric metadata filtering, top-1/top-5
evaluation, and a clearly labeled patch-anomaly experiment. Separate
working retrieval features from experimental anomaly detection.

------------------------------------------------------------------------

## 3. Prophesy AI Prime --- LLM Market Sensing & Website AI Assistant

**Domain:** Applied AI, LLM applications, RAG, workflow automation, SQL
agent\
**Role:** AI/Computer Vision Engineer --- Biologic Technik Pte. Ltd.\
**Technologies:** Python, FastAPI, n8n, OpenAI API, Anthropic Claude,
AnythingLLM API, ChromaDB, PostgreSQL, JavaScript, Cron, DeepEval,
TruLens

### Overview and ownership

My main responsibilities were the LLM-powered market-sensing workflow
and the website chat assistant. I did not own the downstream
forecasting/RSL stage.

### A. Automated market-sensing workflow

-   Built an n8n-based daily news collection workflow monitoring
    medical, national, geopolitical, and environmental news potentially
    related to Singapore.
-   Captured article details and metadata, including original article
    URLs.
-   Used OpenAI to extract structured JSON describing each article's
    relationship to Singapore.
-   Filtered for relevance to the Singapore market and deduplicated
    multiple articles about the same event.
-   Stored filtered records in PostgreSQL.
-   Implemented a local weekly cron job for scheduled signal processing.
-   Combined external news with internal SKU and supplier information to
    derive impact, severity, signal strength, and related attributes.

**Confidentiality:** Proprietary rule-based signal-calculation logic and
internal client data are excluded. The downstream stage consuming
signals for forecasting/RSL was owned by another contributor.

### B. Website RAG assistant

I independently implemented the RAG workflow end to end: document
ingestion, chunking, embedding generation, retrieval, and response
generation.

-   Built website chat integration using a FastAPI backend connected to
    the AnythingLLM API.
-   Used ChromaDB as the retrieval layer.
-   Supported user-selectable OpenAI and Anthropic Claude models.
-   Ingested JSON, TXT, and CSV files containing forecast results and
    market-sensing information.
-   Used JavaScript to extract the currently viewed webpage and send its
    content to FastAPI with the chat request.
-   Chunked and embedded webpage content dynamically at runtime using
    the same embedding configuration as static sources.
-   Used ChromaDB semantic similarity retrieval to supply relevant
    context.

No keyword/hybrid retrieval was confirmed. Persistent conversational
memory between separate requests was not implemented.

### C. Custom SQL agent

-   Built a custom LLM-powered SQL agent directly with Python and API
    calls, without a dedicated framework such as LangChain or LangGraph.
-   Integrated it with FastAPI and PostgreSQL.
-   Translated natural-language questions about live forecast data into
    SQL and executed queries.
-   Application users shared a read-only database account restricted to
    relevant forecast tables.
-   There was no per-user database authorization.

### D. Evaluation

-   Performed manual testing and structured dataset-based evaluation.
-   Prepared expected facts and supporting reference documents; checked
    generated answers against expected facts and cited sources.
-   Used DeepEval for faithfulness, completeness, and instruction
    following.
-   Used TruLens for relevancy.
-   Did not separately evaluate the retrieval stage or retrieved
    ChromaDB chunks.
-   No application-level logging/monitoring of chat requests, answers,
    retrieved context, errors, or evaluation results was implemented.

### Independent portfolio recreation

Build a public-data market intelligence assistant: public news
collection, LLM structured extraction, event deduplication, PostgreSQL
storage, ChromaDB RAG, a synthetic read-only SQL agent, and
source-grounded evaluation. Do not reuse company prompts, datasets,
proprietary signal rules, or client information.

------------------------------------------------------------------------

## 4. Clinical Laboratory Staff Scheduling & Optimization System

**Domain:** Operations Research, constraint programming, workforce
scheduling, backend engineering\
**Technologies:** Python, Greedy Algorithms, Heuristic Scoring, Google
OR-Tools, CP-SAT, FastAPI, PostgreSQL, Gini coefficient

### Overview

A workforce scheduling and optimization system for clinical laboratory
operations. It automates staff allocation across departments based on
skills, qualifications, availability, shift preferences, and
working-hour constraints. Scheduling is performed directly through the
Scheduler page; there is no Pipeline Generator.

### Scheduling engine

-   Developed a Greedy Algorithm scheduling engine with multi-factor
    heuristic scoring.
-   Assigned staff to shifts based on skills, qualifications,
    availability, preferences, and working-hour constraints.
-   Implemented an optional Google OR-Tools CP-SAT engine using Boolean
    decision variables, hard constraints, and objective maximization.
-   Supported comparison between heuristic scheduling and
    constraint-programming approaches.

### Leave management

-   Developed an urgent-leave workflow to identify affected shifts.
-   Identified qualified replacement staff.
-   Validated replacement availability and weekly working-hour limits.

### Roster analytics

Designed a seven-metric evaluation framework covering staff utilization,
skill matching, shift coverage, workload fairness (Gini coefficient),
shift preferences, supervisor allocation, and cost efficiency. Built
workload analytics and recommendations to identify understaffing, skill
gaps, workload imbalances, and inefficient resource allocation.

### Application features

-   Scheduler supports date presets/custom ranges, department rules,
    templates, shift history, automatic generation, and automatic
    saving.
-   Includes dashboards/analytics, leave management, staff management,
    and department/skill management.
-   Pages included login, dashboard, scheduler, analytics, leaves,
    staff, and departments/skills.
-   Authentication included JWT/SSO integration via Sims Plus.
-   Role-based access supported Staff, Manager, and Admin.
-   Backend used FastAPI and PostgreSQL, with SQLModel-style
    endpoint/service patterns.
-   Included multi-level caching and a responsive UI.

### Limitations

No confirmed numerical performance improvement, runtime reduction, or
production-scale metric is available. This is an optimization/software
engineering project, not an AI/ML model. Do not claim a globally optimal
real-world roster without the solver's optimality status for that run.

### Independent portfolio recreation

Use synthetic staff, shift, qualification, availability, and preference
data. Implement a greedy baseline and CP-SAT model, compare
coverage/fairness/preference satisfaction/cost, demonstrate urgent leave
replacement, and explain hard constraints, soft preferences, and solver
outcomes.

------------------------------------------------------------------------

## 5. WorkGuard --- Workplace Violation Detection

**Domain:** Computer Vision, object detection, video analytics, backend
integration\
**Role:** Junior Machine Learning Engineer --- CV. Karya Hidup Sentosa
(Quick Tractor)\
**Technologies listed in existing resume:** Python, YOLOv8, FastAPI,
Celery, Optuna, CometML, REST APIs, SMTP, PDF reporting

The existing resume describes a real-time workplace violation detection
system using YOLOv8 to identify unauthorized phone use, unsafe loads,
and restricted-area violations.

Existing resume claims (retained as written and not independently
re-verified): - Designed system infrastructure, data pipeline,
model-training workflow, and deployment architecture. - Collected,
annotated, and processed 10K+ images across violation categories. -
Applied class-balanced augmentation including rotation, brightness
adjustment, and noise injection. - Used Optuna for hyperparameter tuning
and CometML for experiment tracking. - Reported 92% mAP and 45 ms
inference time. - Built FastAPI/Celery backend for concurrent CCTV
streaming from 15+ cameras. - Deployed REST endpoints for real-time
monitoring and SMTP email alerts. - Integrated automated PDF reports and
violation analytics. - Resume reports a 25% reduction in workplace
violations.

**Verification note:** Confirm metric definitions, evaluation setup, and
exact personal ownership before detailed public claims or technical
interviews.

------------------------------------------------------------------------

## 6. Face Attendance System

**Domain:** Face recognition, anti-spoofing, model serving, backend
APIs\
**Role:** Junior Machine Learning Engineer --- CV. Karya Hidup Sentosa
(Quick Tractor)\
**Technologies listed in existing resume:** TensorFlow, TensorFlow
Serving, Dlib, FaceNet, Flask, REST APIs

The existing resume describes a facial-recognition and anti-spoofing
system for employee attendance.

Existing resume claims (not independently re-verified): - Collected
employee photos for face-data enrollment and preprocessed anti-spoofing
datasets. - Developed a TensorFlow classification model for
anti-spoofing. - Deployed the anti-spoofing model using TensorFlow
Serving. - Reported face-recognition accuracy of 87% with Dlib and 92%
with FaceNet. - Developed a Flask REST API for frontend integration. -
Reported recognition/inference time of 0.5 seconds per image.

**Verification note:** Clarify which metrics refer to face recognition
versus anti-spoofing.

------------------------------------------------------------------------

## 7. CBIR --- TokoQuick Visual Product Search

**Domain:** Computer Vision, content-based image retrieval\
**Role:** Machine Learning Intern --- CV. Karya Hidup Sentosa (Quick
Tractor)\
**Technologies listed:** Python, ResNet, VGG19, image feature vectors

Built a content-based image retrieval system using ResNet and VGG19 to
generate feature vectors for visual product search on the TokoQuick
e-commerce platform. The existing resume describes this as improving
search accuracy and user experience. No exact retrieval metric or
detailed evaluation setup is currently available.

------------------------------------------------------------------------

## 8. YOLOv5 Materials Counting

**Domain:** Computer Vision, object detection, automated counting\
**Role:** Machine Learning Intern --- CV. Karya Hidup Sentosa (Quick
Tractor)\
**Technologies listed:** Python, YOLOv5

Developed a YOLOv5-based materials detection and counting system for
inventory management. The existing resume reports 97% accuracy after
hyperparameter optimization. The exact definition of accuracy, dataset
size, and evaluation method are not currently available; verify before
using this metric in a detailed case study.

------------------------------------------------------------------------

## 9. Internal AI Agent for Task Manager --- Exploratory Research

**Domain:** AI agents, task management, workflow research\
**Nature of involvement:** Research/exploration only; not a delivered
implementation

The concept was an employee-facing assistant for questions such as
assigned tasks, highest-priority tasks, pending-task summaries, and
project status.

My involvement was limited to researching agent mechanisms, parameters,
and modes (e.g. Deep Research and Ideation). I was not directly involved
in implementation or development.

**Resume guidance:** Usually omit from the core project portfolio or
describe only as exploratory research exposure. Do not present it as a
system I built or deployed.

------------------------------------------------------------------------

# Project ownership and evidence summary

  ------------------------------------------------------------------------
  Project                 Personal contribution    Collaboration / caveat
  ----------------------- ------------------------ -----------------------
  SIMS                    Model experimentation,   AWS deployment
                          segmentation             collaborative; MQTT
                          training/evaluation,     handled by
                          counting logic, error    infrastructure; S3 not
                          analysis, reporting,     personally implemented
                          FastAPI inference        
                          server, YOLO             
                          integration, Redis       
                          configuration            

  CSSD                    Data                     Anomaly detection
                          collection/annotation,   remained under
                          CV pipeline, retrieval,  development; small
                          anomaly experiments,     evaluation set
                          FastAPI backend,         
                          PostgreSQL integration,  
                          staging deployment       

  Prophesy AI Prime       Independently            Did not own downstream
                          implemented website RAG; forecasting/RSL;
                          built SQL agent;         proprietary signal
                          implemented              rules confidential
                          market-sensing workflow  

  Lab Scheduler           Scheduling algorithms,   No confirmed
                          CP-SAT engine, leave     production-scale or
                          workflow, roster         numerical performance
                          metrics, analytics,      metrics
                          backend features         

  WorkGuard               Existing resume          Verify details and
                          describes model,         metrics before detailed
                          backend, and system      public claims
                          contributions            

  Face Attendance         Existing resume          Clarify metric
                          describes anti-spoofing  definitions and
                          model, serving,          ownership
                          recognition, and API     
                          contributions            

  TokoQuick CBIR          Existing resume          No exact retrieval
                          describes ResNet/VGG19   metric available
                          feature-vector retrieval 

  YOLOv5 Materials        Existing resume          Verify reported 97%
  Counting                describes detection and  accuracy definition
                          automated counting       

  Internal Task Manager   Exploratory research     No implementation
  Agent                   into agent mechanisms    ownership
                          and modes                
  ------------------------------------------------------------------------

------------------------------------------------------------------------

# Independent portfolio roadmap

These are **proposed new projects**, not completed company projects.
Implement them independently with public or self-collected data.

## A. Computer Vision Inventory Intelligence

-   Public/self-collected shelf or object dataset.
-   Object detection or segmentation.
-   Geometry-assisted counting baseline.
-   Occlusion and lighting stress tests.
-   FastAPI inference endpoint.
-   Dashboard for predictions and discrepancy analysis.
-   Evaluation separating model metrics from counting accuracy.

## B. Visual Search and Anomaly Detection

-   Public industrial anomaly dataset or independently collected
    objects.
-   Segmentation and preprocessing.
-   DINOv2 embeddings and FAISS retrieval.
-   Top-1/top-5 retrieval evaluation.
-   Patch-based anomaly-detection experiment.
-   FastAPI service and demo UI.
-   Clear limitations and error analysis.

## C. Public-Data Market Intelligence Assistant

-   Public news collection.
-   LLM structured extraction and event deduplication.
-   PostgreSQL storage.
-   ChromaDB-backed RAG assistant.
-   Synthetic, read-only SQL agent.
-   Reference-grounded evaluation with DeepEval/TruLens.
-   Architecture diagram and reproducible setup.

## D. Workforce Scheduling Optimization

-   Synthetic staff, skills, shifts, and availability dataset.
-   Greedy heuristic baseline.
-   OR-Tools CP-SAT optimizer.
-   Urgent leave replacement.
-   Fairness and coverage metrics.
-   Comparison dashboard.
-   Explanation of hard constraints, soft preferences, and solver
    outcomes.

------------------------------------------------------------------------

# General presentation guidance

1.  Clearly label independent portfolio recreations as personal
    projects. Do not imply they are the original employer systems.
2.  Separate model-level metrics from operational/business metrics.
3.  Include dataset size, split strategy, evaluation method, and
    limitations whenever reporting a metric.
4.  Distinguish personally implemented components from collaborative
    infrastructure and pre-existing systems.
5.  Avoid claims of production readiness for staging or experimental
    features.
6.  Do not disclose proprietary business logic, internal datasets,
    client details, credentials, or company source code.
7.  For every project, prepare a concise explanation of the problem,
    your contribution, architecture, hardest technical challenge,
    evaluation, and next improvements.
