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
      - Merancang dan mengimplementasikan arsitektur inferensi terpusat, menggantikan duplikasi
        pemuatan YOLO per perangkat.
  - group: contributed
    items:
      - Deployment AWS, berkolaborasi dengan tim infrastruktur.
      - Integrasi MQTT dengan infrastruktur yang sudah ada.
      - Integrasi layanan inferensi computer vision ke sistem inventaris yang lebih luas.
  - group: unattributed
    items:
      - Penyiapan kamera dan akuisisi citra; frontend, dashboard, dan lapisan pelaporan.
      - Penyimpanan Amazon S3 — bagian dari sistem yang lebih luas, bukan implementasi pribadi.
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

Diagram di atas menunjukkan alur umumnya. Tujuh kamera di tujuh rak mengirim citra ke empat
perangkat Raspberry Pi 4 yang mengambil gambar rak setiap 30 menit dan saat peristiwa
perubahan jumlah terdeteksi. Segmentasi YOLOv8 mengidentifikasi permukaan kotak bertumpuk
yang terlihat, dan penghitungan berbasis geometri dan penalaran spasial — secara eksplisit
bukan rekonstruksi 3D penuh — memperkirakan jumlah total, termasuk kotak yang tidak dapat
dilihat langsung. Layanan inferensi FastAPI dengan pemrosesan antrian berbasis Redis menangani
alur kerja inferensi dan menyerahkan hasilnya ke sistem inventaris. MQTT menghubungkan
perangkat ke infrastruktur yang ada, dan tier cloud berjalan di AWS, tempat pendekatan
inferensi terpusat dituju. Tahapan bergaris putus-putus dan redup menandai komponen milik tim
lain atau yang tidak teratribusi individual; tahapan solid adalah yang saya implementasikan.

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

**Siklus hidup model dan data.** Retraining dan evaluasi adalah praktik harian: performa
dipantau terhadap ketidaksesuaian yang ditinjau, dan kegagalan dikategorikan sebagai terkait
model, terkait logika penghitungan, atau lingkungan (misalnya oklusi atau overexposure)
sebelum ada perbaikan dicoba. Dataset terdokumentasi: kurang dari 500 citra (sekitar 800
"instance" anotasi — makna tepat dari angka itu belum terkonfirmasi), dianotasi di Roboflow,
dengan ketidakseimbangan kelas ditangani saat preparasi. Augmentasi mencakup rotasi,
pembalikan, perubahan brightness/contrast dan exposure, plus random cutout selektif pada
kurang dari 3% data pelatihan. Pelatihan memantau loss dan mAP; pengujian mencakup evaluasi
segmentation-mask, mask mAP, presisi, dan confusion matrix. Skor model-level yang tepat tidak
tersedia.

## Eksperimen dan tantangan rekayasa

- **Tinjauan ketidaksesuaian harian.** Hitungan sistem menyimpang dari hitungan staf.
  Investigasi membandingkan keluaran sistem dengan kondisi rak yang sebenarnya dan melabeli
  setiap kesalahan berdasarkan penyebabnya. Observasi: kesalahan terbagi menjadi kegagalan
  model, kegagalan logika penghitungan, dan kondisi lingkungan. Keputusan: perbaikan hanya
  dicoba setelah kategorisasi, sehingga retraining model tidak menutupi kesalahan logika
  penghitungan.
- **Kegagalan overexposure dan oklusi.** Rak tertentu gagal di jam-jam yang bisa diprediksi
  (pencahayaan) dan pada menara yang tersusun rapat. Tindakan terdokumentasi: pengumpulan
  tertarget sampel overexposed dan teroklusi, diikuti augmentasi dan penyempurnaan logika
  penghitungan. Dokumentasi mencatat tindakan-tindakan ini; ia tidak mencatat efek terukurnya
  pada rak yang gagal, sehingga tidak ada klaim pemulihan di sini.
- **Ketidakstabilan edge.** Satu Raspberry Pi menjalankan program yang sama dua kali untuk dua
  kamera, memuat YOLO dua kali dan berkontribusi pada inefisiensi sumber daya serta crash.
  Tindakan terdokumentasi: usulan untuk memindahkan inferensi ke server yang di-host di AWS
  sementara perangkat Pi menangkap dan mengirim citra — dengan server inferensi FastAPI,
  integrasi YOLO, dan pemrosesan antrian Redis diimplementasikan sendiri. Dokumentasi tidak
  mencatat adopsi usulan tersebut maupun efek terukurnya, sehingga keduanya tidak diklaim.

## Hasil dan evaluasi

Akurasi penghitungan harian rata-rata puncak sebesar 98,6% pada Oktober, diukur dengan
membandingkan jumlah inventaris hasil deteksi terhadap kuantitas inventaris aktual. Ini adalah
metrik penghitungan operasional — jumlah item versus inventaris aktual — bukan angka akurasi
model; tahun pelaporan Oktober tersebut belum terkonfirmasi. Di luar metrik: terdeploy di
beberapa perangkat Raspberry Pi, mendukung pemantauan multi-kamera dan pengisian otomatis
berkala (PAR), dengan laporan bulanan mencakup akurasi, performa PAR, kategori kegagalan, dan
perbaikan.

## Demonstration dan bukti

Tangkapan layar tersanitasi, contoh citra rak, dan contoh alur pemrosesan yang digeneralkan
menunggu materi yang disetujui pemilik dan sengaja tidak dipalsukan di sini.

## Batasan dan refleksi

- Angka 98,6% menggambarkan penghitungan operasional pada rak yang terdeploy pada Oktober
  (tahun pelaporannya belum terkonfirmasi); angka ini tidak digeneralisasi ke lingkungan yang
  belum terlihat, dan citra serta dataset di baliknya bersifat internal dan tidak dibuka.
- Penyiapan kamera, frontend, dan lapisan pelaporan tidak teratribusi individual dalam studi
  kasus ini dan tidak dijelaskan di sini.
- Apakah usulan inferensi terpusat diadopsi di produksi tidak terdokumentasi; kontribusi yang
  terdokumentasi adalah usulannya serta server FastAPI, integrasi YOLO, dan pemrosesan antrian
  Redis yang diimplementasikan sendiri.
- Investigasi selanjutnya, belum dilakukan: apakah kesalahan oklusi ekstrem yang tersisa lebih
  baik dilayani sensor depth daripada menambah data pelatihan RGB.

## Catatan disclosure

Beberapa detail implementasi, konfigurasi infrastruktur, dataset internal, dan komponen
proprietary tidak dicantumkan demi menjaga kerahasiaan perusahaan.
