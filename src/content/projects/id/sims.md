---
title: Smart Inventory Management System (SIMS)
category: Computer Vision
type: professional
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
period: Juli 2025 – sekarang
diagram: sims
contribution:
  - group: implemented
    items:
      - Retraining, eksperimen, dan evaluasi performa harian model YOLOv8.
      - Logika penghitungan inventaris berbasis geometri untuk kotak yang sebagian tersembunyi.
      - Server inferensi FastAPI dan integrasi pipeline inferensi YOLO.
      - Pemrosesan antrian tugas berbasis Redis.
      - Pemantauan deteksi harian dan tinjauan ketidaksesuaian.
      - Pengumpulan data tertarget untuk kegagalan overexposed dan kotak teroklusi.
  - group: contributed
    items:
      - Deployment AWS, berkolaborasi dengan tim infrastruktur.
      - Integrasi MQTT dengan infrastruktur yang sudah ada.
      - Integrasi layanan inferensi computer vision ke sistem inventaris yang lebih luas.
  - group: proposed
    items:
      - Arsitektur inferensi terpusat yang menggantikan duplikasi pemuatan YOLO per perangkat.
  - group: unattributed
    items:
      - Penyiapan kamera dan akuisisi citra; frontend, dashboard, dan lapisan pelaporan.
---

## Masalah dan kendala

Rak perlengkapan rumah sakit dihitung secara manual: staf berkeliling area penyimpanan,
menghitung kotak rak demi rak, dan mengetikkan angkanya ke sistem inventaris. Putaran manual
ini lambat, bergantung pada ketersediaan staf, dan menyimpang dari kenyataan di antara
putaran. Kamera yang mengawasi rak sudah menangkap bahan baku otomatisasi, tetapi masalah
penghitungannya lebih sulit daripada deteksi objek generik: kotak ditumpuk menara di mana
hanya permukaan atas yang terlihat, pencahayaan berubah sepanjang hari, dan lingkungan rumah
sakit tidak bisa ditata demi kepentingan model.

Kendala yang membentuk solusinya:

- **Oklusi akibat penumpukan** — sebagian besar kotak dalam menara tersembunyi; penghitungan
  yang berguna harus menyimpulkan apa yang tidak terlihat.
- **Perangkat keras edge** — pengambilan citra berjalan di Raspberry Pi 4 berkapasitas terbatas,
  tempat model besar lambat dan tidak stabil.
- **Kebutuhan operasional** — jumlah harus terus-menerus masuk, kesalahan harus bisa ditinjau
  staf, dan sistem berjalan di dalam infrastruktur rumah sakit yang sudah ada (MQTT, AWS).

## Arsitektur sistem

Diagram di atas menunjukkan alur umumnya. Kamera di rak mengirim citra ke perangkat edge
(Raspberry Pi 4) yang mengambil gambar rak secara berkala dan saat perubahan terdeteksi.
Segmentasi YOLOv8 mengidentifikasi permukaan kotak bertumpuk yang terlihat, dan logika
penghitungan berbasis geometri memperkirakan jumlah total — termasuk kotak yang tidak dapat
dilihat langsung. Layanan inferensi FastAPI dengan pemrosesan antrian berbasis Redis menangani
alur kerja inferensi dan menyerahkan hasilnya ke sistem inventaris. MQTT menghubungkan
perangkat ke infrastruktur yang ada, dan tier cloud berjalan di AWS. Tahapan bergaris putus-
putus dan redup menandai komponen milik tim lain atau yang tidak teratribusi individual;
tahapan solid adalah yang saya implementasikan.

## Implementasi teknis

**Segmentasi dan penghitungan.** Model segmentasi YOLOv8 kustom, dilatih dari bobot
pretrained, mengidentifikasi permukaan kotak bertumpuk yang terlihat. Kebutuhan: hitungan yang
bertahan terhadap oklusi. Pendekatan: hitung permukaan atas yang terlihat dan simpulkan kotak
tersembunyi dari koordinat bounding-box, ketetanggaan, dan relasi spasial antar deteksi.
Hasil: hitungan yang berguna dari menara sebagian terlihat, dengan kegagalan terkonsentrasi
pada kasus oklusi ekstrem — tepat di mana pengumpulan data tertarget (di bawah) diarahkan.

**Inferensi terpusat.** Kebutuhan: pemuatan YOLO yang duplikat di setiap Raspberry Pi membuat
perangkat edge lambat dan tidak stabil. Pendekatan: server inferensi FastAPI terpusat —
diusulkan dan diimplementasikan sendiri — sehingga perangkat edge menangkap dan mengirim,
sementara inferensi berjalan di perangkat keras yang lebih kuat, dengan pemrosesan antrian
berbasis Redis antara pengambilan dan inferensi. Hasil: beban edge berkurang dan ada satu
tempat terpusat untuk memantau perilaku model.

**Siklus hidup model.** Retraining dan evaluasi adalah praktik harian: performa dipantau
terhadap ketidaksesuaian yang ditinjau, dan kegagalan dikategorikan sebagai terkait model,
terkait logika penghitungan, atau lingkungan (misalnya oklusi atau overexposure) sebelum ada
perbaikan dicoba.

## Eksperimen dan tantangan rekayasa

- **Tinjauan ketidaksesuaian harian.** Hitungan sistem menyimpang dari hitungan staf.
  Investigasi membandingkan keluaran sistem dengan kondisi rak yang sebenarnya dan melabeli
  setiap kesalahan berdasarkan penyebabnya. Observasi: kesalahan terbagi menjadi kegagalan
  model, kegagalan logika penghitungan, dan kondisi lingkungan. Keputusan: perbaikan hanya
  dicoba setelah kategorisasi, sehingga retraining model tidak menutupi kesalahan logika
  penghitungan.
- **Kegagalan overexposure dan oklusi.** Rak tertentu gagal di jam-jam yang bisa diprediksi
  (pencahayaan) dan pada menara yang tersusun rapat. Eksperimen: pengumpulan tertarget sampel
  overexposed dan teroklusi, diikuti augmentasi dan penyempurnaan logika penghitungan.
  Observasi: deteksi pada rak yang sebelumnya gagal pulih; kesalahan tersisa mengelompok di
  oklusi ekstrem. Keputusan: pertahankan inferensi berbasis geometri alih-alih mengejar
  dataset sepenuhnya terlihat yang tidak mungkin diberikan lingkungan ini.
- **Ketidakstabilan edge.** Pemuatan YOLO yang duplikat di perangkat Raspberry Pi menghasilkan
  ketidakstabilan di bawah beban. Eksperimen: arsitektur inferensi terpusat (di atas).
  Observasi: beban edge turun menjadi pengambilan dan pengiriman citra. Keputusan: diadopsi,
  dengan usulan didokumentasikan dan dibagikan ke tim.

## Hasil dan evaluasi

Akurasi penghitungan harian rata-rata puncak sebesar 98,6% pada Oktober, diukur dengan
membandingkan jumlah inventaris hasil deteksi terhadap kuantitas inventaris aktual. Ini adalah
metrik penghitungan operasional — jumlah item versus inventaris aktual — bukan angka akurasi
model. Di luar metrik: terdeploy di beberapa perangkat Raspberry Pi, mendukung pemantauan
multi-kamera dan pengisian otomatis berkala (PAR), dengan laporan bulanan mencakup akurasi,
performa PAR, kategori kegagalan, dan perbaikan.

## Demonstration dan bukti

Tangkapan layar tersanitasi, contoh citra rak, dan contoh alur pemrosesan yang digeneralkan
menunggu materi yang disetujui pemilik dan sengaja tidak dipalsukan di sini.

## Batasan dan refleksi

- Angka 98,6% menggambarkan penghitungan operasional pada rak yang terdeploy pada Oktober;
  angka ini tidak digeneralisasi ke lingkungan yang belum terlihat, dan citra serta dataset di
  baliknya bersifat internal dan tidak dibuka.
- Penyiapan kamera, frontend, dan lapisan pelaporan dimiliki tim lain dan tidak dijelaskan di
  sini.
- Yang akan saya teliti selanjutnya: apakah kesalahan oklusi ekstrem yang tersisa lebih baik
  dilayani sensor depth daripada menambah data pelatihan RGB.

## Catatan disclosure

Beberapa detail implementasi, konfigurasi infrastruktur, dataset internal, dan komponen
proprietary tidak dicantumkan demi menjaga kerahasiaan perusahaan.
