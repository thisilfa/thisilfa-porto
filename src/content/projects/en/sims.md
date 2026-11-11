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
      - Designed and implemented the centralized inference architecture, replacing duplicate
        per-device YOLO loading.
  - group: contributed
    items:
      - AWS deployment, in collaboration with the infrastructure engineers.
      - MQTT integration with the existing infrastructure.
      - Integration of the computer vision inference service into the broader inventory system.
  - group: unattributed
    items:
      - Camera setup and image acquisition; frontend, dashboard, and reporting layer.
      - Amazon S3 storage — part of the wider system, not personally implemented.
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

The diagram above shows the generalized flow. Seven cameras across seven shelves feed four
Raspberry Pi 4 devices that capture shelf images every 30 minutes and on quantity-change
events. YOLOv8 segmentation identifies the visible surfaces of stacked boxes, and geometry-
and spatial-reasoning-based counting — explicitly not a full 3D reconstruction — estimates
the full count, including the boxes it cannot directly see. A FastAPI inference service with
Redis-based queue processing handles the inference workflow and hands results to the
inventory system. MQTT connects the devices to the existing infrastructure, and the cloud
tier runs on AWS, where the centralized inference approach was pointed. The dashed and muted
stages mark components owned by other teams or not individually attributed; the solid stages
are the ones I implemented.

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

**Model lifecycle and data.** Retraining and evaluation were daily practice: performance was
monitored against reviewed discrepancies, and failures were categorized as model-related,
counting-logic-related, or environmental (for example occlusion or overexposure) before any
fix was attempted. The documented dataset: fewer than 500 images (roughly 800 annotation
"instances" — the exact meaning of that count is unconfirmed), annotated in Roboflow, with
class imbalance addressed during preparation. Augmentations included rotation, flipping,
brightness/contrast and exposure changes, plus selective random cutout on less than 3% of
the training data. Training monitored loss and mAP; testing covered segmentation-mask
evaluation, mask mAP, precision, and a confusion matrix. Exact model-level scores are not
available.

## Experiments and engineering challenges

- **Daily discrepancy review.** Reported counts drifted from staff counts. Investigation
  compared system output against shelf truth and labeled each miss by cause. Observation:
  misses split into model failures, counting-logic failures, and environmental conditions.
  Decision: fixes were attempted only after categorization, so model retraining did not mask
  counting-logic errors.
- **Overexposure and occlusion failures.** Certain shelves failed at predictable times of day
  (lighting) and on tightly stacked towers. Documented actions: targeted collection of
  overexposed and occluded samples, followed by augmentation and counting-logic refinements.
  The documentation records these actions; it does not record their measured effect on the
  failing shelves, so no recovery claim is made here.
- **Edge instability.** One Raspberry Pi ran the same program twice for two cameras, loading
  YOLO twice and contributing to resource inefficiency and crashes. Documented action: a
  proposal to move inference to an AWS-hosted server while the Pi devices capture and send
  images — with the FastAPI inference server, YOLO integration, and Redis task processing
  personally implemented. The documentation does not record the proposal's adoption or its
  measured effect, so none is claimed.

## Results and evaluation

Peak average daily item-counting correctness of 98.6% in October, measured by comparing
detected inventory counts against actual inventory quantities. This is an operational
counting metric — item counts versus actual inventory — not a model accuracy figure; the
year of the October reporting is unconfirmed. Beyond the metric: deployed across multiple
Raspberry Pi devices, supporting multi-camera monitoring and periodic automatic replenishment
(PAR), with monthly reports covering accuracy, PAR performance, failure categories, and
improvements.

## Demonstration and evidence

Sanitized screenshots, sample shelf imagery, and a generalized processing-flow example await
owner-approved material and are intentionally not faked here.

## Limitations and reflection

- The 98.6% figure describes operational counting on the deployed shelves in October (the
  reporting year is unconfirmed); it does not generalize to unseen environments, and the
  underlying images and datasets are internal and undisclosed.
- Camera setup, the frontend, and the reporting layer are not individually attributed in this
  case study and are not described here.
- Whether the centralized inference proposal was adopted in production is not documented; the
  documented contributions are the proposal itself and the personally implemented FastAPI
  server, YOLO integration, and Redis task processing.
- Future investigation, not yet performed: whether the remaining extreme-occlusion errors are
  better served by depth sensing than by additional RGB training data.

## Disclosure note

Certain implementation details, infrastructure configurations, internal datasets and
proprietary components are excluded to respect company confidentiality.
