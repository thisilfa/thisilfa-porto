---
title: Smart Inventory Management System (SIMS)
category: Computer Vision
type: professional
overview: A computer vision-based inventory monitoring system designed to automate inventory counting through camera-based object detection.
role: Computer Vision Engineer
company: Biologic Technik Pte. Ltd.
stack: [Python, YOLOv8, PyTorch, OpenCV, FastAPI, Redis, MQTT, AWS, Raspberry Pi 4, ONNX]
status: Deployed in a hospital inventory environment
statusKind: delivered
ownership: employer
disclosure: Certain implementation details, infrastructure configurations, internal datasets and proprietary components are excluded to respect company confidentiality.
kind: case-study
featured: true
order: 1
period: July 2025 – Present
diagram: sims
contribution:
  - group: implemented
    items:
      - YOLOv8 model retraining, experimentation, and daily performance evaluation.
      - Geometry-based inventory counting logic covering partially hidden boxes.
      - The FastAPI inference server and the integration of the YOLO inference pipeline.
      - Redis-based task queue processing.
      - Daily detection monitoring and discrepancy review.
      - Targeted data collection addressing overexposed and occluded-box failures.
  - group: contributed
    items:
      - AWS deployment, in collaboration with the infrastructure engineers.
      - MQTT integration with the existing infrastructure.
      - Integration of the computer vision inference service into the broader inventory system.
  - group: proposed
    items:
      - The centralized inference architecture that replaced duplicate per-device YOLO loading.
  - group: unattributed
    items:
      - Camera setup and image acquisition; frontend, dashboard, and reporting layer.
---

## Problem and constraints

Hospital supply shelves were counted by hand: staff walked the storage areas, counted boxes
shelf by shelf, and typed the numbers into the inventory system. The manual round was slow,
tied to staff availability, and drifted from reality between rounds. Cameras watching the
shelves already captured the raw material for automation, but the counting problem itself is
harder than generic object detection: boxes are stacked in towers where only the top surfaces
are visible, lighting shifts during the day, and a hospital environment cannot be staged for
the model's benefit.

The constraints that shaped the solution:

- **Occlusion by stacking** — most boxes in a tower are hidden; any usable count must infer
  what it cannot see.
- **Edge hardware** — capture runs on Raspberry Pi 4 devices with limited memory, on which
  large models are slow and unstable.
- **Operational requirements** — counts must arrive continuously, errors must be reviewable by
  staff, and the system runs inside the hospital's existing infrastructure (MQTT, AWS).

## System architecture

The diagram above shows the generalized flow. Cameras over the shelves feed edge devices
(Raspberry Pi 4) that capture shelf images periodically and on detected change. YOLOv8
segmentation identifies the visible surfaces of stacked boxes, and geometry-based counting
logic estimates the full count — including the boxes it cannot directly see. A FastAPI
inference service with Redis-based queue processing handles the inference workflow and hands
results to the inventory system. MQTT connects the devices to the existing infrastructure, and
the cloud tier runs on AWS. The dashed and muted stages mark components owned by other teams
or not individually attributed; the solid stages are the ones I implemented.

## Technical implementation

**Segmentation and counting.** Custom YOLOv8 segmentation models, trained from pretrained
weights, identify the visible surfaces of stacked boxes. Requirement: a count that survives
occlusion. Approach: count visible top surfaces and infer hidden boxes from bounding-box
coordinates, adjacency, and the spatial relationships between detections. Outcome: usable
counts from partially visible towers, with failures concentrated in cases of extreme
occlusion — which is exactly where the targeted data collection (below) went.

**Centralized inference.** Requirement: YOLO loading duplicated on every Raspberry Pi made the
edge devices slow and unstable. Approach: a centralized FastAPI inference server — proposed
and implemented personally — so edge devices capture and stream while inference happens on
stronger hardware, with Redis-based queue processing between capture and inference. Outcome:
relief for the edge devices and a single place to monitor model behavior.

**Model lifecycle.** Retraining and evaluation were daily practice: performance was monitored
against reviewed discrepancies, and failures were categorized as model-related,
counting-logic-related, or environmental (for example occlusion or overexposure) before any
fix was attempted.

## Experiments and engineering challenges

- **Daily discrepancy review.** Reported counts drifted from staff counts. Investigation
  compared system output against shelf truth and labeled each miss by cause. Observation:
  misses split into model failures, counting-logic failures, and environmental conditions.
  Decision: fixes were attempted only after categorization, so model retraining did not mask
  counting-logic errors.
- **Overexposure and occlusion failures.** Certain shelves failed at predictable times of day
  (lighting) and on tightly stacked towers. Experiment: targeted collection of overexposed and
  occluded samples, followed by augmentation and counting-logic refinements. Observation:
  detection on the previously failing shelves recovered; remaining errors clustered in extreme
  occlusion. Decision: keep the geometry-based inference rather than chasing a fully visible
  training set that the environment cannot provide.
- **Edge instability.** Duplicate YOLO loading on the Raspberry Pi devices produced
  instability under load. Experiment: the centralized inference architecture (above).
  Observation: edge load dropped to capture and streaming. Decision: adopted, with the
  proposal documented and shared with the team.

## Results and evaluation

Peak average daily item-counting correctness of 98.6% in October, measured by comparing
detected inventory counts against actual inventory quantities. This is an operational
counting metric — item counts versus actual inventory — not a model accuracy figure. Beyond
the metric: deployed across multiple Raspberry Pi devices, supporting multi-camera monitoring
and periodic automatic replenishment (PAR), with monthly reports covering accuracy, PAR
performance, failure categories, and improvements.

## Demonstration and evidence

Sanitized screenshots, sample shelf imagery, and a generalized processing-flow example await
owner-approved material and are intentionally not faked here.

## Limitations and reflection

- The 98.6% figure describes operational counting on the deployed shelves in October; it does
  not generalize to unseen environments, and the underlying images and datasets are internal
  and undisclosed.
- Camera setup, the frontend, and the reporting layer were owned by other teams and are not
  described here.
- What I would investigate next: whether the remaining extreme-occlusion errors are better
  served by depth sensors than by more RGB training data.

## Disclosure note

Certain implementation details, infrastructure configurations, internal datasets and
proprietary components are excluded to respect company confidentiality.
