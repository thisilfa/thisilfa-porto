---
title: Identifikasi Instrumen Bedah CSSD
category: Computer Vision
overview: Sistem computer vision yang mengidentifikasi instrumen bedah melalui deteksi objek, visual embedding, similarity search, dan analisis citra.
role: Computer Vision Engineer
company: Biologic Technik
stack:
  [Python, YOLO, SAM, DINOv2, FAISS, PostgreSQL, pgvector, FastAPI, OpenCV, Isolation Forest, SVM]
status: Staging / validasi eksperimental
statusKind: staging
ownership: employer
disclosure: Data operasional asli, alur kerja proprietary, dan detail implementasi internal tidak dicantumkan.
kind: case-study
featured: true
order: 2
---

## Gambaran

Sistem computer vision untuk Central Sterile Services Department (CSSD) rumah sakit yang
mengidentifikasi instrumen bedah melalui deteksi objek, visual embedding, similarity search,
dan analisis citra — termasuk komponen pengukuran dan deteksi abnormalitas.

## Tanggung jawab saya

- Mengembangkan pipeline computer vision secara menyeluruh.
- Mengimplementasikan deteksi objek dan identifikasi instrumen.
- Mengintegrasikan embedding DINOv2 untuk representasi visual.
- Mengimplementasikan similarity search menggunakan FAISS dan PostgreSQL dengan pgvector.
- Mengintegrasikan SAM untuk penyempurnaan segmentasi.
- Mengembangkan komponen pengukuran instrumen dan deteksi anomali.
- Berkontribusi pada pengembangan backend dan integrasi database.

## Implementasi teknis

1. **Deteksi objek** — YOLO menemukan instrumen dalam frame.
2. **Ekstraksi fitur** — DINOv2 menghasilkan embedding visual per instrumen.
3. **Similarity search** — FAISS dan PostgreSQL dengan pgvector mencocokkan embedding dengan
   set referensi instrumen.
4. **Segmentasi** — Segment Anything Model (SAM) menyempurnakan mask instrumen.
5. **Pengukuran** — kalibrasi piksel-ke-sentimeter untuk dimensi instrumen.
6. **Deteksi anomali** — fitur HSV, grayscale, dan LAB dengan Isolation Forest dan SVM.

Dataset sekitar 200 gambar instrumen dikumpulkan dan dianotasi untuk eksperimen.

## Hasil

- Sistem mencapai tahap staging / validasi eksperimental.
- Komponen deteksi, retrieval berbasis embedding, penyempurnaan segmentasi, pengukuran, dan
  deteksi anomali berjalan sebagai satu pipeline terpadu.
- Metode deteksi abnormalitas masih dalam pengembangan; sistem tetap berada pada tahap
  staging / validasi eksperimental.

## Yang saya pelajari

- Menggabungkan beberapa model vision menjadi satu pipeline terpadu.
- Retrieval visual berbasis embedding dalam praktik.
- Feature engineering untuk deteksi anomali dengan dataset kecil.
- Pemrosesan citra dan kalibrasi pengukuran.

## Catatan disclosure

Data operasional asli, alur kerja proprietary, dan detail implementasi internal tidak
dicantumkan.
