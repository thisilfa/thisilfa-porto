---
title: Smart Inventory Management System (SIMS)
category: Computer Vision
overview: Sistem pemantauan inventaris berbasis computer vision yang dirancang untuk mengotomatiskan penghitungan inventaris melalui deteksi objek kamera.
role: Computer Vision Engineer
company: Biologic Technik Pte. Ltd.
stack: [Python, YOLOv8, PyTorch, OpenCV, FastAPI, Redis, MQTT, AWS, Raspberry Pi 4, ONNX]
status: Terdeploy di lingkungan inventaris rumah sakit
statusKind: delivered
ownership: employer
disclosure: Beberapa detail implementasi, konfigurasi infrastruktur, dataset internal, dan komponen proprietary tidak dicantumkan demi menjaga kerahasiaan perusahaan.
kind: case-study
featured: true
order: 1
---

## Gambaran

Sistem pemantauan inventaris berbasis computer vision untuk rak perlengkapan rumah sakit.
Kamera mengambil gambar rak secara berkala dan saat perubahan terdeteksi; model segmentasi
mengidentifikasi permukaan kotak bertumpuk yang terlihat, dan logika penghitungan berbasis
geometri memperkirakan jumlah total — termasuk kotak yang sebagian tersembunyi. Sistem juga
mendukung pemantauan pengisian otomatis berkala (PAR) di beberapa rak dan kamera.

## Tanggung jawab saya

- Menguji dan meningkatkan sistem CV yang sudah ada, termasuk retraining model dan evaluasi
  performa harian.
- Melatih dan mengevaluasi model segmentasi YOLOv8 kustom dari bobot pretrained.
- Mengembangkan logika penghitungan berbasis geometri menggunakan koordinat bounding-box,
  ketetanggaan, dan relasi spasial untuk memperkirakan kotak tersembunyi.
- Meninjau ketidaksesuaian harian dan mengategorikan kegagalan sebagai terkait model, terkait
  logika penghitungan, atau lingkungan (misalnya oklusi).
- Mengumpulkan sampel tambahan berupa kotak overexposed dan teroklusi; menerapkan augmentasi
  tertarget dan penyempurnaan logika penghitungan.
- Mengembangkan sendiri server inferensi FastAPI, mengintegrasikan eksekusi YOLO, dan
  mengonfigurasi pemrosesan tugas berbasis Redis.
- Berkolaborasi dengan engineer infrastruktur untuk deployment AWS dan integrasi dengan
  komunikasi MQTT yang sudah ada.
- Mengusulkan arsitektur inferensi terpusat untuk mengurangi duplikasi pemuatan YOLO dan
  ketidakstabilan pada perangkat Raspberry Pi.

## Implementasi teknis

1. Gambar rak diambil secara berkala dan saat perubahan terdeteksi.
2. Segmentasi YOLOv8 kustom mengidentifikasi permukaan kotak bertumpuk yang terlihat.
3. Region yang terdeteksi dianalisis melalui koordinat bounding-box, ketetanggaan, dan relasi
   spasial.
4. Permukaan atas yang terlihat dihitung; kotak tersembunyi disimpulkan dari relasi spasial.
5. Layanan inferensi FastAPI dengan pemrosesan antrian Redis menangani alur kerja inferensi.
6. Deployment edge di perangkat Raspberry Pi 4; alur kerja model ONNX dan PyTorch; AWS di
   tier cloud; MQTT untuk komunikasi perangkat.

## Hasil

- Akurasi penghitungan inventaris tercatat 98,6% dalam pemantauan operasional — definisi
  metrik yang tepat tidak dipublikasikan menunggu persetujuan disclosure.
- Terdeploy di beberapa perangkat Raspberry Pi, mendukung pemantauan inventaris multi-kamera.
- Mendukung pemantauan PAR, dengan laporan bulanan mencakup akurasi, performa PAR, kategori
  kegagalan, dan perbaikan.

## Yang saya pelajari

- Kendala deployment edge dan optimasi pipeline inferensi real-time.
- Pemrosesan terdistribusi antar perangkat.
- Mengintegrasikan computer vision ke sistem operasional, di mana kondisi lingkungan — bukan
  hanya kualitas model — menentukan mode kegagalan.

## Catatan disclosure

Beberapa detail implementasi, konfigurasi infrastruktur, dataset internal, dan komponen
proprietary tidak dicantumkan demi menjaga kerahasiaan perusahaan.
