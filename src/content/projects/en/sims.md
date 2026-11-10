---
title: Smart Inventory Management System (SIMS)
category: Computer Vision
overview: A computer vision-based inventory monitoring system designed to automate inventory counting through camera-based object detection.
role: Computer Vision Engineer
company: Biologic Technik Pte. Ltd.
stack: [Python, YOLOv8, PyTorch, OpenCV, FastAPI, Redis, MQTT, AWS, Raspberry Pi 4, ONNX]
status: Deployed in a hospital inventory environment
statusKind: delivered
ownership: employer
disclosure: Certain implementation details, infrastructure configurations, internal datasets and proprietary components are excluded to respect company confidentiality.
type: professional
kind: case-study
featured: true
order: 1
period: July 2025 – Present
---

## Overview

A computer vision-based inventory monitoring system for hospital supply shelves. Cameras
capture shelf images periodically and on detected change, a segmentation model identifies the
visible surfaces of stacked boxes, and geometry-based counting logic estimates the total
count — including partially hidden boxes. The system also supports periodic automatic
replenishment (PAR) monitoring across multiple shelves and cameras.

## My responsibilities

- Experimented with and improved an existing CV system, including model retraining and daily
  performance evaluation.
- Trained and evaluated custom YOLOv8 segmentation models from pretrained weights.
- Developed geometry-based counting logic using bounding-box coordinates, adjacency, and
  spatial relationships to estimate hidden boxes.
- Reviewed daily discrepancies and categorized failures as model-related, counting-logic-related,
  or environmental (e.g. occlusion).
- Collected additional overexposed and occluded-box samples; applied targeted augmentation and
  counting-logic refinements.
- Personally developed the FastAPI inference server, integrated YOLO execution, and configured
  Redis-based task processing.
- Collaborated with infrastructure engineers on AWS deployment and integration with the
  existing MQTT communication.
- Proposed a centralized inference architecture to reduce duplicate YOLO loading and
  instability on Raspberry Pi devices.

## Technical implementation

1. Shelf images captured from cameras on a periodic and change-triggered basis.
2. Custom YOLOv8 segmentation identifies the visible surfaces of stacked boxes.
3. Detected regions are analyzed through bounding-box coordinates, adjacency, and spatial
   relationships.
4. Visible top surfaces are counted; hidden boxes are inferred from spatial relationships.
5. A FastAPI inference service with Redis queue processing handles inference workflows.
6. Edge deployment on Raspberry Pi 4 devices; ONNX and PyTorch model workflows; AWS in the
   cloud tier; MQTT for device communication.

## Results

- Reported inventory counting accuracy of 98.6% in operational monitoring — the precise metric
  definition is withheld pending disclosure approval.
- Deployed across multiple Raspberry Pi devices, supporting multi-camera inventory monitoring.
- Supported PAR monitoring, with monthly reports covering accuracy, PAR performance, failure
  categories, and improvements.

## What I learned

- Edge deployment constraints and real-time inference pipeline optimization.
- Distributed processing across devices.
- Integrating computer vision into operational systems, where environmental conditions — not
  model quality alone — drive failure modes.

## Disclosure note

Certain implementation details, infrastructure configurations, internal datasets and
proprietary components are excluded to respect company confidentiality.
