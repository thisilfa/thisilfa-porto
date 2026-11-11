---
title: Identifikasi Instrumen Bedah CSSD
category: Computer Vision
type: professional
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
period: Juli 2025 – sekarang
diagram: cssd
contribution:
  - group: implemented
    items:
      - Pengembangan menyeluruh — pengumpulan dan anotasi data (~200 citra instrumen, dikumpulkan sendiri), eksperimen model, dan pemrosesan citra.
      - Pipeline identifikasi — deteksi YOLO, penyempurnaan mask SAM, estimasi panjang geometris, dan retrieval embedding DINOv2.
      - Eksplorasi deteksi abnormalitas lintas tiga pendekatan (pemrosesan HSV, PatchCore, dan metode patch-feature kustom).
      - Backend FastAPI dengan SQLAlchemy dan asyncio; model dimuat sekali dan dipakai ulang antar permintaan.
      - Deployment staging di AWS EC2 dengan Uvicorn.
  - group: unattributed
    items:
      - Provenans metadata instrumen referensi di PostgreSQL; jumlah kategori instrumen yang tepat.
---

## Masalah dan kendala

Di Central Sterile Services Department rumah sakit, instrumen bedah datang dalam nampan yang
harus diidentifikasi dan diperiksa abnormalitas permukaannya — noda darah, karat, kerusakan —
sebelum dipakai ulang. Identifikasi manual dan rawan salah: banyak instrumen tampak hampir
identik, dan pemeriksaan visual bersaing dengan beban kerja. Tujuan sistem: foto nampan,
identifikasi setiap instrumen secara otomatis, dan eksplorasi penandaan abnormalitas
otomatis.

Kendala yang membentuk pendekatannya:

- **Instrumen yang mirip secara visual** — clamp dan forceps berbeda pada geometri kecil;
  klasifikasi generik tidak cukup, sehingga pipeline menggabungkan deteksi, geometri, dan
  retrieval embedding.
- **Penyiapan kamera tetap** — citra diambil dalam penyiapan terkontrol dengan pencahayaan
  dan posisi kamera yang konsisten, yang membuat kalibrasi satu kali piksel-ke-sentimeter
  menjadi mungkin.
- **Realitas data kecil** — sekitar 200 citra instrumen yang dikumpulkan dan dianotasi sendiri;
  tidak ada dataset operasional besar untuk masalah ini.
- **Batas staging** — sistem menyasar validasi staging, bukan deployment produksi.

## Arsitektur sistem

Diagram di atas menunjukkan pipeline identifikasi yang digeneralkan. YOLO mendeteksi dan
melokalisasi setiap instrumen dengan mask awal; crop diproses dengan penekanan latar belakang
dan pencahayaan latar putih; SAM menyempurnakan mask; panjang instrumen diestimasi dari
geometri poligon dan titik dengan PCA, dikonversi ke sentimeter melalui kalibrasi kamera tetap,
dan difilter terhadap metadata instrumen di PostgreSQL saat kandidat menyempit. Embedding
DINOv2 yang dibandingkan dengan cosine similarity mengidentifikasi instrumen, dengan FAISS
untuk pencarian in-memory dan PostgreSQL/pgvector sebagai penyimpanan embedding persisten —
dua peran yang saling melengkapi, keduanya diimplementasikan. Node metadata dibuat redup:
provenansnya tidak teratribusi individual.

## Implementasi teknis

**Retrieval alih-alih klasifikasi.** Kebutuhan: instrumen berbeda pada geometri kecil, dan
klasifier closed-set perlu retraining untuk setiap instrumen baru. Pendekatan: perlakukan
identifikasi sebagai retrieval — embedding DINOv2, cosine similarity, pencarian in-memory
FAISS, pgvector sebagai penyimpanan persisten. Hasil: instrumen baru bergabung dengan
menambahkan embedding referensi, dan retrieval top-5 membuat kandidat yang mirip dapat
diperiksa.

**Kalibrasi kamera tetap.** Kebutuhan: panjang instrumen dalam sentimeter, bukan piksel.
Pendekatan: kalibrasi satu kali untuk penyiapan kamera tetap, dengan geometri poligon/titik
dan PCA untuk estimasi panjang — bukan objek kalibrasi di setiap citra. Hasil: panjang
menjadi filter terhadap metadata instrumen di PostgreSQL, menyempitkan kandidat sebelum
perbandingan embedding.

**Penyimpanan yang saling melengkapi.** Kebutuhan: pencarian cepat dan embedding yang awet.
Pendekatan: FAISS untuk pencarian similarity in-memory, PostgreSQL/pgvector sebagai penyimpan
embedding persisten. Hasil: setiap penyimpanan melayani peran yang dibangun untuknya.

**Efisiensi backend.** Kebutuhan: API staging tanpa pemuatan model per permintaan. Pendekatan:
FastAPI dengan SQLAlchemy dan asyncio; model dimuat ke memori sekali dan dipakai ulang.
Hasil: deployment staging di AWS EC2 via Uvicorn — secara eksplisit tanpa Docker, Nginx, atau
autentikasi/otorisasi API, yang berada di luar cakupan staging.

## Eksperimen dan tantangan rekayasa

- **Deteksi abnormalitas — tiga pendekatan dieksplorasi.** Kebutuhan: menandai noda darah,
  karat, dan kerusakan permukaan. Pendekatan: pemrosesan citra HSV tradisional; deteksi anomali
  patch berbasis PatchCore; dan metode kustom berbasis patch yang mengekstrak fitur
  HSV/grayscale/LAB dengan Isolation Forest dan SVM. Status terdokumentasi: pendekatan kustom
  membagi citra menjadi patch, menyimpan fitur patch-level ke CSV, dan mengulangi patching saat
  inferensi untuk membatasi wilayah anomali; model yang sama dipakai lintas tipe abnormalitas,
  dan apakah model terpisah per tipe digunakan belum terkonfirmasi. Status: masih dalam
  pengembangan dan pengujian — disajikan pada tahap validasi staging saja, dengan deployment
  ke produksi di luar cakupan.
- **Evaluasi test set kecil.** Sebelas tipe instrumen dievaluasi: sekitar 10 dari 11
  diidentifikasi benar pada top-1 (sekitar 90,9% pada test set itu). Analisis top-5 memeriksa
  apakah kandidat yang benar atau mirip secara visual muncul di antara hasil teratas — 7 dari
  11 tipe memiliki kandidat yang sangat mirip di lima besar. Ini test set kecil, bukan
  benchmark luas atau akurasi produksi yang digeneralisasi.
- **Salah identifikasi yang diingat.** Satu kasus mungkin melibatkan kebingungan clamp versus
  forceps, tetapi kasus tepatnya dan akar penyebabnya belum terkonfirmasi — dicatat di sini
  sebagai ingatan yang belum terverifikasi, bukan temuan.

## Hasil dan evaluasi

- Sekitar 10/11 tipe instrumen teridentifikasi benar pada top-1 (≈90,9%) — pada test set kecil
  berisi 11 tipe, bukan benchmark luas.
- Analisis retrieval top-5 terdokumentasi: 7 dari 11 tipe menunjukkan kandidat yang sangat
  mirip di lima besar, menjadi motivasi filter panjang-metadata dalam pipeline.
- Pendekatan deteksi abnormalitas tetap eksperimental; pipeline identifikasi mencapai
  validasi staging.
- Tidak ada klaim akurasi produksi yang digeneralisasi — cakupan evaluasi adalah dataset yang
  dikumpulkan dan test set 11 tipe.

## Demonstration dan bukti

Tangkapan layar pipeline tersanitasi, contoh citra instrumen, dan visualisasi retrieval
embedding menunggu materi yang disetujui pemilik dan sengaja tidak dipalsukan di sini.

## Batasan dan refleksi

- Dataset (~200 citra, 11 tipe dievaluasi) hanya mendukung validasi staging — bukan akurasi
  produksi yang digeneralisasi.
- Deteksi abnormalitas tetap eksperimental; strategi pemodelan per tipe yang benar belum
  terkonfirmasi.
- Deployment staging sengaja mengabaikan Docker, Nginx, dan autentikasi/otorisasi API;
  produksi membutuhkan ketiganya.
- Kualitas retrieval bergantung pada metadata referensi yang provenansnya tidak teratribusi
  individual di sini.
- Investigasi selanjutnya, belum dilakukan: dataset multi-lokasi yang lebih besar, keputusan
  pemodelan anomali per tipe, dan penguatan produksi.

## Catatan disclosure

Data operasional asli, alur kerja proprietary, dan detail implementasi internal tidak
dicantumkan.
