---
title: CSSD Surgical Instrument Identification
category: Computer Vision
overview: A computer vision system designed to identify surgical instruments through object detection, visual embeddings, similarity search and image analysis.
role: Computer Vision Engineer
company: Biologic Technik
stack:
  [Python, YOLO, SAM, DINOv2, FAISS, PostgreSQL, pgvector, FastAPI, OpenCV, Isolation Forest, SVM]
status: Staging / experimental validation
statusKind: staging
ownership: employer
disclosure: Real operational data, proprietary workflows and internal implementation details are not included.
type: professional
kind: case-study
featured: true
order: 2
period: July 2025 – Present
---

## Overview

A computer vision system for the hospital Central Sterile Services Department (CSSD) that
identifies surgical instruments through object detection, visual embeddings, similarity search
and image analysis — including measurement and abnormality-detection components.

## My responsibilities

- Developed the computer vision pipeline end to end.
- Implemented object detection and instrument identification.
- Integrated DINOv2 embeddings for visual representation.
- Implemented similarity search using FAISS and PostgreSQL with pgvector.
- Integrated SAM for segmentation refinement.
- Developed instrument measurement and anomaly-detection components.
- Contributed to backend development and database integration.

## Technical implementation

1. **Object detection** — YOLO locates instruments in the frame.
2. **Feature extraction** — DINOv2 produces visual embeddings per instrument.
3. **Similarity search** — FAISS and PostgreSQL with pgvector match embeddings against the
   instrument reference set.
4. **Segmentation** — Segment Anything Model (SAM) refines instrument masks.
5. **Measurement** — pixel-to-centimeter calibration for instrument dimensions.
6. **Anomaly detection** — HSV, grayscale and LAB features with Isolation Forest and SVM.

A dataset of approximately 200 instrument images was collected and annotated for
experimentation.

## Results

- The system reached staging / experimental validation.
- Detection, embedding-based retrieval, segmentation refinement, measurement, and
  anomaly-detection components each ran as part of a unified pipeline.
- Abnormality-detection methods remained under development; the system remains at staging /
  experimental validation.

## What I learned

- Combining multiple vision models into a unified pipeline.
- Embedding-based visual retrieval in practice.
- Feature engineering for anomaly detection with small datasets.
- Image processing and measurement calibration.

## Disclosure note

Real operational data, proprietary workflows and internal implementation details are not
included.
