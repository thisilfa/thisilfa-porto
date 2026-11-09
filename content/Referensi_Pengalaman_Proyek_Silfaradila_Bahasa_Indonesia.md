# Referensi Pengalaman Proyek --- Silfaradila Mei Fizahidah

Dokumen ini menjadi referensi utama untuk menyusun CV, merencanakan
portofolio, menyiapkan dokumentasi GitHub, dan menghadapi wawancara
teknis.

**Catatan penting:** Setiap proyek dijelaskan dengan membedakan
pekerjaan yang saya kerjakan sendiri, kontribusi yang dilakukan bersama
tim, eksperimen yang belum selesai, serta informasi yang masih perlu
dikonfirmasi. Jangan mempublikasikan data internal perusahaan, logika
bisnis proprietary, screenshot internal, source code perusahaan, atau
informasi klien.

------------------------------------------------------------------------

## 1. Smart Inventory Management System (SIMS)

**Bidang:** Computer Vision, segmentasi objek, pemantauan inventaris,
integrasi edge dan cloud\
**Posisi:** Computer Vision Engineer --- Biologic Technik Pte. Ltd.\
**Status:** Sudah digunakan di lingkungan inventaris rumah sakit\
**Teknologi:** Python, YOLOv8, PyTorch, Ultralytics, OpenCV, FastAPI,
Redis, MQTT, AWS, Raspberry Pi 4, Roboflow

### Gambaran proyek

SIMS adalah sistem pemantauan dan penghitungan stok inventaris
menggunakan computer vision. Kamera mengambil gambar rak secara berkala
dan ketika jumlah barang yang terdeteksi berubah. Sistem mengenali
bagian permukaan kotak yang terlihat, lalu menggunakan hubungan posisi
antarobjek untuk memperkirakan jumlah kotak secara keseluruhan, termasuk
kotak yang sebagian tertutup atau tidak terlihat sepenuhnya.

Sistem ini juga mendukung pemantauan PAR (*Periodic Automatic
Replenishment*), yaitu memberi notifikasi kepada tim inventaris ketika
stok berada di bawah batas yang telah ditentukan.

### Tanggung jawab dan kontribusi saya

-   Melakukan eksperimen dan pengembangan pada sistem computer vision
    yang sudah ada, termasuk retraining model dan evaluasi performa
    setiap hari.
-   Melatih dan mengevaluasi custom YOLOv8 segmentation model dengan
    menggunakan pretrained weights YOLOv8.
-   Mengembangkan logika penghitungan berbasis geometri dengan
    memanfaatkan koordinat bounding box, kedekatan antarobjek, dan
    hubungan spasial untuk memperkirakan jumlah kotak yang tersembunyi.
-   Meninjau selisih hasil penghitungan setiap hari dan mengelompokkan
    penyebabnya menjadi masalah model, logika penghitungan, atau kondisi
    lingkungan seperti occlusion.
-   Mengumpulkan sampel tambahan, termasuk gambar dengan pencahayaan
    terlalu terang (*overexposed*) dan kotak yang tertutup sebagian.
-   Menerapkan augmentasi data yang sesuai dan memperbaiki logika
    penghitungan berdasarkan pola kesalahan yang ditemukan.
-   Memantau performa sistem secara operasional serta menyiapkan laporan
    bulanan yang mencakup akurasi penghitungan, performa PAR, kategori
    kegagalan, dan perbaikan yang dilakukan.
-   Mengusulkan perubahan arsitektur inference terpusat untuk mengurangi
    pemuatan model YOLO berulang dan masalah kestabilan pada perangkat
    Raspberry Pi.
-   Mengembangkan FastAPI inference server, mengintegrasikan proses
    inference YOLO, dan mengonfigurasi pemrosesan task berbasis Redis
    secara langsung.
-   Berkolaborasi dengan tim infrastruktur dalam deployment di AWS dan
    integrasi dengan sistem komunikasi MQTT yang sudah tersedia.

### Cara kerja model dan logika penghitungan

1.  Kamera mengambil gambar rak inventaris.
2.  Custom YOLOv8 segmentation model mengenali permukaan kotak yang
    terlihat.
3.  Sistem menganalisis area hasil deteksi, koordinat bounding box,
    kedekatan antarobjek, dan hubungan spasial.
4.  Permukaan atas yang terlihat digunakan untuk menghitung kotak,
    sementara hubungan antara permukaan atas, samping, dan bawah
    membantu memperkirakan kotak yang tertutup.
5.  Hasil penghitungan digunakan dalam alur pemantauan inventaris,
    termasuk pemantauan batas PAR.

Pendekatan ini lebih tepat disebut penghitungan berbasis geometri dan
hubungan spasial, bukan rekonstruksi 3D secara penuh.

### Data dan evaluasi

-   Dataset yang digunakan secara keseluruhan berisi kurang dari 500
    gambar.
-   Sekitar 800 *instances* dikumpulkan, tetapi arti pasti dari jumlah
    tersebut belum terkonfirmasi.
-   Anotasi dilakukan menggunakan Roboflow; ketidakseimbangan jumlah
    data antar kelas (*class imbalance*) juga ditangani pada tahap
    persiapan data.
-   Augmentasi mencakup rotasi, flipping, perubahan brightness/contrast
    dan exposure, serta random cutout secara terbatas (kurang dari 3%
    data training).
-   Proses training dipantau menggunakan loss dan mAP. Evaluasi testing
    mencakup segmentasi mask, mask mAP, precision, dan confusion matrix.
-   Skor evaluasi spesifik untuk model belum tersedia.
-   Performa operasional yang pernah dilaporkan mencapai **rata-rata
    akurasi penghitungan inventaris harian sebesar 98,6% selama bulan
    Oktober**. Angka ini merupakan metrik penghitungan stok secara
    operasional---jumlah item yang dihitung dengan benar dibandingkan
    jumlah aktual---bukan mAP model. Tahun pencapaian tersebut belum
    terkonfirmasi.

### Deployment dan kolaborasi tim

Pada arsitektur sebelumnya, dua kamera menggunakan satu Raspberry Pi dan
program yang sama dijalankan dua kali. Akibatnya, model YOLO dimuat dua
kali pada perangkat yang sama. Hal ini membuat penggunaan resource
kurang efisien dan menyebabkan Raspberry Pi lebih sering mengalami
crash.

Saya mengusulkan agar proses inference dipindahkan ke server yang
berjalan di AWS, sementara Raspberry Pi bertugas mengambil gambar dan
mengirimkannya ke server.

-   **Bagian yang saya kerjakan langsung:** FastAPI inference server,
    integrasi inference YOLO, dan konfigurasi pemrosesan task
    menggunakan Redis.
-   **Bagian kolaboratif atau yang sudah tersedia:** Deployment AWS
    dilakukan bersama tim infrastruktur. MQTT merupakan komponen yang
    sudah ada dan dikelola tim infrastruktur. Amazon S3 digunakan dalam
    infrastruktur sistem secara keseluruhan, tetapi bukan bagian yang
    saya implementasikan sendiri.
-   Deployment menggunakan tujuh kamera pada tujuh rak dan empat
    perangkat Raspberry Pi 4. Satu Raspberry Pi menangani dua kamera,
    tetapi pembagian pasti kamera pada setiap perangkat belum diketahui.
-   Gambar diambil setiap 30 menit dan ketika terjadi event
    `qty_change`.
-   Sistem digunakan di lingkungan inventaris rumah sakit. Detail
    mengenai penyebutan sebelumnya tentang "dua inventory" area/lokasi
    belum jelas.

### Ide untuk membangun versi portofolio sendiri

Gunakan dataset publik atau data yang dikumpulkan sendiri. Jangan
menggunakan gambar, label, kode, maupun aturan penghitungan proprietary
milik perusahaan.

Versi portofolio dapat mencakup: - Deteksi atau segmentasi objek pada
rak menggunakan dataset publik. - Implementasi baseline penghitungan
berbasis geometri yang alurnya dapat dijelaskan. - Pengujian pada
kondisi occlusion, objek bertumpuk, pencahayaan berbeda, dan objek yang
hanya terlihat sebagian. - FastAPI sebagai inference endpoint. -
Dashboard sederhana untuk menampilkan hasil deteksi, estimasi jumlah,
confidence, dan riwayat selisih penghitungan. - Evaluasi yang memisahkan
metrik model dengan akurasi penghitungan secara keseluruhan.

------------------------------------------------------------------------

## 2. CSSD Surgical Instrument Identification & Abnormality Detection

**Bidang:** Computer Vision, visual search, segmentasi, anomaly
detection, backend engineering\
**Posisi:** Computer Vision Engineer --- Biologic Technik Pte. Ltd.\
**Status:** Masih dalam tahap staging; pendekatan deteksi abnormalitas
masih dikembangkan\
**Teknologi:** Python, YOLO, SAM, DINOv2, cosine similarity, FAISS,
PostgreSQL, pgvector, SQLAlchemy, FastAPI, asyncio, AWS EC2, OpenCV,
HSV, grayscale, LAB, Isolation Forest, SVM, PatchCore

### Gambaran proyek dan peran saya

Proyek ini bertujuan mengidentifikasi instrumen bedah berbahan logam
yang diletakkan di atas tray, sekaligus mengeksplorasi deteksi
abnormalitas pada permukaannya, seperti noda darah, karat, dan kerusakan
lainnya.

Saya menangani pengembangan dari awal hingga integrasi, mulai dari
pengumpulan dan anotasi data, eksperimen model, pemrosesan gambar,
identifikasi dan retrieval instrumen, eksperimen deteksi abnormalitas,
pengembangan backend FastAPI, hingga deployment ke lingkungan staging.

### Alur identifikasi instrumen

1.  **Deteksi objek:** YOLO mendeteksi dan menentukan lokasi instrumen,
    sekaligus menghasilkan mask awal.
2.  **Cropping dan preprocessing:** Area instrumen dipotong dan
    diproses, termasuk pengurangan pengaruh background serta penyesuaian
    agar background menjadi putih.
3.  **Penyempurnaan mask:** Segment Anything Model (SAM) digunakan untuk
    memperbaiki mask instrumen.
4.  **Estimasi panjang:** Panjang instrumen dihitung dari mask yang
    sudah diperbaiki menggunakan geometri polygon/titik dan PCA.
5.  **Konversi pixel ke sentimeter:** Kalibrasi berdasarkan setup kamera
    yang tetap digunakan untuk mengubah ukuran pixel menjadi estimasi
    panjang fisik. Kalibrasi tidak dilakukan menggunakan objek referensi
    pada setiap gambar.
6.  **Penyaringan kandidat:** Estimasi panjang dibandingkan dengan
    metadata panjang instrumen di PostgreSQL untuk menyaring kandidat.
7.  **Pencarian visual:** DINOv2 menghasilkan image embedding, kemudian
    cosine similarity digunakan untuk membandingkan embedding gambar
    input dengan embedding referensi.
8.  **Similarity search:** FAISS digunakan untuk pencarian kemiripan di
    memori, sedangkan PostgreSQL dengan pgvector digunakan untuk
    menyimpan embedding secara persisten.

FAISS dan pgvector memiliki fungsi yang saling melengkapi: FAISS
mendukung pencarian di memori, sedangkan PostgreSQL/pgvector menyimpan
embedding secara persisten.

### Pengumpulan data

-   Sekitar 200 gambar instrumen dikumpulkan dan dianotasi sendiri.
-   Gambar mencakup beberapa jenis instrumen; jumlah kategori pastinya
    belum diketahui.
-   Gambar diambil dalam setup terkontrol dengan pencahayaan dan posisi
    kamera yang konsisten.
-   Gambar diberi label menggunakan nama file.

### Eksperimen deteksi abnormalitas

Target abnormalitas mencakup noda darah, karat, dan kerusakan permukaan
instrumen lainnya. Ada tiga pendekatan yang dieksplorasi:

1.  Pemrosesan gambar tradisional berbasis HSV.
2.  Deteksi anomali berbasis patch menggunakan PatchCore.
3.  Pendekatan custom berbasis patch yang menggabungkan fitur image
    processing dan machine learning.

Pada pendekatan custom: - Gambar instrumen dibagi menjadi beberapa
patch. - Setiap patch diekstraksi menjadi fitur numerik dari channel
HSV, grayscale, dan LAB. - Fitur pada tingkat patch disimpan ke CSV. -
Isolation Forest dan SVM digunakan untuk mengklasifikasikan anomali. -
Pada inference, proses pembagian patch dan ekstraksi fitur dilakukan
kembali. - Patch yang terindikasi abnormal ditandai menggunakan
koordinat bounding box.

Model Isolation Forest dan SVM yang sama digunakan untuk berbagai jenis
abnormalitas; belum ada konfirmasi bahwa setiap jenis abnormalitas
memiliki model terpisah.

**Catatan status:** Pendekatan-pendekatan ini masih dalam tahap
pengembangan dan pengujian. Jangan menyebutnya sebagai fitur yang sudah
siap produksi.

### Backend dan deployment

-   Mengembangkan FastAPI backend dan mengintegrasikan keseluruhan
    pipeline secara langsung.
-   Menggunakan SQLAlchemy untuk interaksi dengan PostgreSQL dan Python
    asyncio untuk mendukung pemrosesan request secara asynchronous.
-   Mengoptimalkan pengelolaan model dengan memuat model ke memori satu
    kali dan menggunakannya kembali, alih-alih melakukan reload pada
    setiap request.
-   Melakukan deployment aplikasi staging di AWS EC2 menggunakan
    Uvicorn.
-   Deployment tersebut belum menggunakan Docker, Nginx, maupun
    autentikasi/otorisasi API.

### Evaluasi

-   Melakukan evaluasi pada 11 jenis instrumen.
-   Sekitar 10 dari 11 instrumen berhasil diidentifikasi dengan benar
    pada top-1 untuk test set kecil tersebut (sekitar 90,9% pada test
    set itu).
-   Analisis top-5 retrieval digunakan untuk melihat apakah kandidat
    yang benar atau kandidat yang sangat mirip masih muncul dalam lima
    hasil teratas.
-   Tujuh dari 11 kasus memiliki kandidat yang tampilannya sangat mirip
    di antara hasil top-5.
-   Salah satu kasus salah identifikasi yang saya ingat mungkin
    melibatkan clamp dan forceps, tetapi kasus persis dan akar
    masalahnya belum terkonfirmasi.

Jumlah data evaluasi ini masih kecil, sehingga hasilnya tidak boleh
disebut sebagai benchmark berskala luas atau akurasi produksi secara
umum.

### Ide untuk membangun versi portofolio sendiri

Gunakan dataset anomaly detection industri yang tersedia untuk publik
atau kumpulkan gambar objek non-rahasia secara mandiri.

Versi portofolio dapat mencakup: - Pipeline segmentasi dan
preprocessing. - Pembuatan embedding menggunakan DINOv2 dan retrieval
menggunakan FAISS. - Penyaringan kandidat tambahan menggunakan metadata
geometri jika relevan. - Evaluasi retrieval top-1 dan top-5. -
Eksperimen anomaly detection berbasis patch. - FastAPI service dan demo
sederhana. - Penjelasan yang jelas tentang fitur retrieval yang sudah
berfungsi dan eksperimen anomaly detection yang masih terbatas.

------------------------------------------------------------------------

## 3. Prophesy AI Prime --- LLM Market Sensing & Website AI Assistant

**Bidang:** Applied AI, LLM applications, RAG, workflow automation, SQL
agent\
**Posisi:** AI/Computer Vision Engineer --- Biologic Technik Pte. Ltd.\
**Teknologi:** Python, FastAPI, n8n, OpenAI API, Anthropic Claude,
AnythingLLM API, ChromaDB, PostgreSQL, JavaScript, Cron, DeepEval,
TruLens

### Gambaran proyek dan peran saya

Prophesy AI Prime merupakan platform market intelligence. Fokus tanggung
jawab saya ada pada workflow market sensing berbasis LLM dan website
chat assistant. Saya tidak menangani tahap forecasting/RSL yang menjadi
proses lanjutan dari platform tersebut.

Ada dua komponen utama yang saya kerjakan: 1. Workflow otomatis untuk
mengumpulkan berita dan memproses informasi pasar. 2. Website assistant
yang menggunakan RAG dan custom SQL agent untuk menjawab pertanyaan
seputar informasi platform dan data forecast.

### A. Workflow market sensing otomatis

-   Membangun workflow pengumpulan berita harian menggunakan n8n.
-   Memantau berita dari bidang medis, nasional, geopolitik, dan
    lingkungan yang berpotensi berkaitan secara langsung maupun tidak
    langsung dengan Singapura.
-   Mengambil detail artikel dan metadata, termasuk URL sumber asli.
-   Menggunakan OpenAI untuk mengolah berita yang belum terstruktur
    menjadi JSON yang menjelaskan keterkaitan berita tersebut dengan
    Singapura.
-   Menyaring berita berdasarkan relevansinya terhadap pasar Singapura.
-   Menerapkan deduplikasi berdasarkan event agar beberapa artikel yang
    membahas kejadian sama tidak menghasilkan sinyal berulang.
-   Menyimpan berita yang lolos proses filtering ke PostgreSQL.
-   Membuat cron job lokal yang berjalan setiap minggu untuk memproses
    informasi sinyal secara terjadwal.
-   Menggabungkan berita eksternal dengan informasi internal seperti SKU
    dan supplier untuk menghasilkan informasi terkait impact, severity,
    signal strength, dan atribut lainnya.

**Kerahasiaan:** Detail aturan perhitungan sinyal yang bersifat
proprietary dan data internal klien tidak dicantumkan. Tahap lanjutan
yang menggunakan sinyal tersebut untuk forecasting/RSL dikerjakan oleh
kontributor lain.

### B. Website RAG assistant

Saya mengimplementasikan workflow RAG secara mandiri dari awal hingga
akhir, termasuk document ingestion, chunking, embedding generation,
retrieval, dan response generation.

-   Membangun integrasi chat pada website menggunakan backend FastAPI
    yang terhubung ke AnythingLLM API.
-   Menggunakan ChromaDB sebagai retrieval layer.
-   Mendukung pilihan model OpenAI dan Anthropic Claude yang dapat
    dipilih pengguna.
-   Mengintegrasikan file JSON, TXT, dan CSV yang berisi hasil forecast
    serta informasi market sensing.
-   Menggunakan JavaScript untuk mengambil konten halaman website yang
    sedang dibuka pengguna, lalu mengirimkannya ke backend FastAPI
    bersama request chat.
-   Melakukan chunking dan embedding terhadap konten halaman tersebut
    secara dinamis saat runtime, menggunakan konfigurasi embedding yang
    sama dengan sumber dokumen statis.
-   Menggunakan semantic similarity retrieval dari ChromaDB untuk
    menyediakan konteks yang relevan bagi jawaban.

Belum ada konfirmasi penggunaan keyword search atau hybrid retrieval.
Persistent conversational memory antar-request juga belum
diimplementasikan.

### C. Custom SQL agent

-   Membangun custom LLM-powered SQL agent secara langsung menggunakan
    Python dan API calls, tanpa framework khusus seperti LangChain atau
    LangGraph.
-   Mengintegrasikannya dengan FastAPI dan PostgreSQL.
-   Memungkinkan pertanyaan dalam bahasa natural mengenai data forecast
    terkini diterjemahkan menjadi SQL dan dieksekusi ke database.
-   Pengguna aplikasi menggunakan satu akun database read-only bersama.
-   Hak akses akun tersebut dibatasi hanya pada tabel forecast yang
    relevan, bukan seluruh database.
-   Belum ada otorisasi database yang berbeda untuk masing-masing
    pengguna.

### D. Evaluasi RAG

-   Melakukan pengujian manual dan evaluasi menggunakan dataset
    terstruktur.
-   Menyiapkan fakta yang diharapkan beserta dokumen referensi, lalu
    memeriksa jawaban yang dihasilkan terhadap fakta dan sumber yang
    seharusnya mendukung jawaban.
-   Menggunakan DeepEval untuk mengevaluasi faithfulness, completeness,
    dan instruction following.
-   Menggunakan TruLens untuk mengevaluasi relevancy.
-   Belum melakukan evaluasi retrieval secara terpisah terhadap chunk
    yang diambil dari ChromaDB.
-   Belum mengimplementasikan logging/monitoring pada level aplikasi
    untuk request chat, jawaban, retrieved context, error, maupun hasil
    evaluasi.

### Ide untuk membangun versi portofolio sendiri

Bangun market intelligence assistant independen menggunakan data publik.
Contoh ruang lingkup: - Mengumpulkan berita dari sumber atau API
publik. - Menggunakan LLM untuk mengekstrak informasi event menjadi data
terstruktur. - Melakukan deduplikasi event. - Menyimpan data terstruktur
ke PostgreSQL. - Membuat RAG assistant menggunakan ChromaDB. -
Menambahkan SQL agent read-only yang terhubung ke database sintetis. -
Mengevaluasi jawaban berdasarkan sumber referensi. - Mendokumentasikan
arsitektur, hasil evaluasi, dan keterbatasan sistem.

Jangan menggunakan prompt internal perusahaan, dataset internal, aturan
perhitungan sinyal proprietary, atau informasi klien.

------------------------------------------------------------------------

## 4. Clinical Laboratory Staff Scheduling & Optimization System

**Bidang:** Operations Research, constraint programming, workforce
scheduling, backend engineering\
**Teknologi:** Python, Greedy Algorithms, Heuristic Scoring, Google
OR-Tools, CP-SAT, FastAPI, PostgreSQL, Gini coefficient

### Gambaran proyek

Sistem penjadwalan dan optimasi tenaga kerja untuk operasional
laboratorium klinis. Sistem membantu mengalokasikan staf ke berbagai
departemen berdasarkan keterampilan, kualifikasi, ketersediaan,
preferensi shift, dan batas jam kerja.

Penjadwalan dilakukan langsung melalui halaman Scheduler. Proyek ini
tidak menggunakan Pipeline Generator.

### Scheduling engine

-   Mengembangkan mesin penjadwalan menggunakan Greedy Algorithm dengan
    multi-factor heuristic scoring.
-   Mengalokasikan staf ke shift berdasarkan keterampilan, kualifikasi,
    ketersediaan, preferensi, dan batas jam kerja.
-   Mengimplementasikan opsi mesin optimasi Google OR-Tools CP-SAT.
-   Menggunakan Boolean decision variables, hard constraints, dan
    objective maximization untuk mengoptimalkan alokasi staf.
-   Mendukung perbandingan antara pendekatan heuristic scheduling dan
    constraint programming.

### Manajemen cuti

-   Mengembangkan workflow untuk menangani pengajuan cuti mendesak.
-   Mengidentifikasi shift yang terdampak ketika staf tidak dapat masuk.
-   Mencari staf pengganti yang memiliki kualifikasi sesuai.
-   Memvalidasi ketersediaan dan batas jam kerja mingguan staf
    pengganti.

### Analitik dan evaluasi roster

Merancang kerangka evaluasi roster dengan tujuh metrik: 1. Utilisasi
staf. 2. Kesesuaian keterampilan (*skill matching*). 3. Pemenuhan
kebutuhan shift (*shift coverage*). 4. Keadilan distribusi beban kerja
menggunakan Gini coefficient. 5. Kesesuaian dengan preferensi shift. 6.
Alokasi supervisor. 7. Efisiensi biaya.

Saya juga membangun analitik beban kerja dan rekomendasi optimasi untuk
mengidentifikasi kekurangan staf, kesenjangan keterampilan,
ketidakseimbangan beban kerja, dan alokasi sumber daya yang kurang
efisien.

### Fitur aplikasi

-   Halaman Scheduler mendukung preset tanggal dan rentang tanggal
    kustom.
-   Mendukung aturan departemen, template, riwayat shift, generate
    otomatis, dan penyimpanan hasil jadwal secara otomatis.
-   Memiliki dashboard dan analytics, manajemen cuti, staf, departemen,
    serta keterampilan.
-   Halaman aplikasi mencakup login, dashboard, scheduler, analytics,
    leaves, staff, serta departments/skills.
-   Autentikasi mencakup integrasi JWT/SSO melalui Sims Plus.
-   Role-based access mendukung Staff, Manager, dan Admin.
-   Backend menggunakan FastAPI dan PostgreSQL dengan pola
    endpoint/service bergaya SQLModel.
-   Sistem juga mencakup multi-level caching dan antarmuka responsif.

### Batasan informasi

Belum ada metrik terkonfirmasi mengenai peningkatan performa,
pengurangan waktu proses, atau skala penggunaan di lingkungan produksi.
Proyek ini lebih tepat diposisikan sebagai proyek optimasi dan software
engineering, bukan model AI/ML. Jangan mengklaim hasil roster di dunia
nyata selalu optimal secara global tanpa memeriksa status optimalitas
solver pada proses tersebut.

### Ide untuk membangun versi portofolio sendiri

Gunakan data sintetis berisi staf, shift, kualifikasi, ketersediaan, dan
preferensi.

Versi portofolio dapat mencakup: - Greedy heuristic sebagai baseline. -
Optimizer menggunakan OR-Tools CP-SAT. - Perbandingan coverage,
fairness, pemenuhan preferensi, dan biaya. - Simulasi penggantian staf
ketika ada cuti mendesak. - Dashboard perbandingan hasil. - Penjelasan
hard constraints, soft preferences, dan status hasil solver.

------------------------------------------------------------------------

## 5. WorkGuard --- Workplace Violation Detection

**Bidang:** Computer Vision, object detection, video analytics, backend
integration\
**Posisi:** Junior Machine Learning Engineer --- CV. Karya Hidup Sentosa
(Quick Tractor)\
**Teknologi yang tercantum di CV:** Python, YOLOv8, FastAPI, Celery,
Optuna, CometML, REST APIs, SMTP, PDF reporting

### Gambaran proyek

Sistem deteksi pelanggaran di lingkungan kerja secara real-time
menggunakan YOLOv8 dan video analytics. Sistem ditujukan untuk mengenali
pelanggaran seperti penggunaan ponsel tanpa izin, muatan yang tidak
aman, dan memasuki area terbatas.

### Informasi dan klaim dari CV saat ini

Informasi berikut dipertahankan berdasarkan isi CV yang ada dan belum
diverifikasi ulang secara independen:

-   Merancang infrastruktur sistem, data pipeline, workflow training
    model, dan arsitektur deployment.
-   Mengumpulkan, memberi anotasi, dan memproses lebih dari 10K gambar
    dari berbagai kategori pelanggaran.
-   Menerapkan augmentasi data yang mempertimbangkan keseimbangan kelas,
    seperti rotasi, penyesuaian brightness, dan penambahan noise.
-   Menggunakan Optuna untuk hyperparameter tuning dan CometML untuk
    experiment tracking.
-   Melaporkan hasil 92% mAP dan waktu inference 45 ms.
-   Membangun backend FastAPI/Celery untuk menangani streaming CCTV
    secara bersamaan dari lebih dari 15 kamera.
-   Menyediakan REST endpoint untuk pemantauan real-time dan email alert
    menggunakan SMTP.
-   Mengintegrasikan pembuatan laporan PDF otomatis dan analitik
    pelanggaran.
-   CV saat ini mencantumkan pengurangan pelanggaran kerja sebesar 25%.

**Catatan verifikasi:** Pastikan definisi metrik, metode evaluasi, dan
bagian yang benar-benar dikerjakan sendiri sebelum menggunakan klaim
tersebut dalam studi kasus publik atau wawancara teknis.

------------------------------------------------------------------------

## 6. Face Attendance System

**Bidang:** Face recognition, anti-spoofing, model serving, backend API\
**Posisi:** Junior Machine Learning Engineer --- CV. Karya Hidup Sentosa
(Quick Tractor)\
**Teknologi yang tercantum di CV:** TensorFlow, TensorFlow Serving,
Dlib, FaceNet, Flask, REST APIs

### Gambaran proyek

Sistem absensi karyawan yang menggunakan pengenalan wajah dan teknik
anti-spoofing.

### Informasi dan klaim dari CV saat ini

Informasi berikut berasal dari CV yang ada dan belum diverifikasi ulang:

-   Mengumpulkan foto karyawan untuk enrollment data wajah dan melakukan
    preprocessing dataset anti-spoofing.
-   Mengembangkan model klasifikasi anti-spoofing menggunakan
    TensorFlow.
-   Melakukan deployment model anti-spoofing menggunakan TensorFlow
    Serving.
-   Melaporkan akurasi face recognition sebesar 87% menggunakan Dlib dan
    92% menggunakan FaceNet.
-   Mengembangkan Flask REST API untuk integrasi dengan aplikasi
    frontend.
-   Melaporkan waktu inference/pengenalan sebesar 0,5 detik per gambar.

**Catatan verifikasi:** Perlu diperjelas metrik mana yang mengukur face
recognition dan mana yang mengukur anti-spoofing.

------------------------------------------------------------------------

## 7. CBIR --- TokoQuick Visual Product Search

**Bidang:** Computer Vision, content-based image retrieval\
**Posisi:** Machine Learning Intern --- CV. Karya Hidup Sentosa (Quick
Tractor)\
**Teknologi yang tercantum:** Python, ResNet, VGG19, image feature
vectors

### Gambaran proyek

Membangun sistem *content-based image retrieval* (CBIR) menggunakan
ResNet dan VGG19 untuk menghasilkan feature vector gambar. Feature
vector tersebut digunakan untuk mendukung pencarian produk berdasarkan
kemiripan visual pada platform e-commerce TokoQuick.

CV yang ada menjelaskan bahwa proyek ini bertujuan meningkatkan akurasi
pencarian dan pengalaman pengguna. Belum tersedia metrik retrieval yang
spesifik maupun detail metode evaluasinya.

------------------------------------------------------------------------

## 8. YOLOv5 Materials Counting

**Bidang:** Computer Vision, object detection, automated counting\
**Posisi:** Machine Learning Intern --- CV. Karya Hidup Sentosa (Quick
Tractor)\
**Teknologi yang tercantum:** Python, YOLOv5

### Gambaran proyek

Mengembangkan sistem deteksi dan penghitungan material secara otomatis
menggunakan YOLOv5 untuk mendukung pengelolaan inventaris.

CV yang ada melaporkan akurasi sebesar 97% setelah hyperparameter
optimization. Definisi akurasi, ukuran dataset, dan metode evaluasinya
belum tersedia. Pastikan detail tersebut sebelum menggunakan angka ini
dalam studi kasus yang lebih mendalam.

------------------------------------------------------------------------

## 9. Internal AI Agent for Task Manager --- Eksplorasi dan Riset

**Bidang:** AI agents, task management, workflow research\
**Bentuk kontribusi:** Riset dan eksplorasi; bukan implementasi sistem

### Konteks proyek

Konsep assistant internal untuk membantu karyawan memperoleh informasi
mengenai tugas yang diberikan kepada mereka.

Contoh pertanyaan yang ingin didukung: - Apa saja tugas yang diberikan
kepada saya? - Tugas mana yang menjadi prioritas tertinggi? - Bisa
rangkum tugas-tugas saya yang masih pending? - Bagaimana status proyek
yang sedang berjalan?

### Keterlibatan saya

Kontribusi saya terbatas pada riset dan eksplorasi mekanisme agent,
parameter, serta mode operasional, termasuk konsep seperti Deep Research
dan Ideation. Saya tidak terlibat langsung dalam implementasi atau
pengembangan sistem.

**Saran untuk CV:** Umumnya proyek ini tidak perlu dimasukkan sebagai
proyek utama dalam portofolio. Jika relevan, cukup disebut sebagai
pengalaman eksplorasi atau riset AI agent. Jangan menggambarkannya
sebagai sistem yang saya bangun atau deploy.

------------------------------------------------------------------------

# Ringkasan kontribusi dan batas kepemilikan proyek

  -----------------------------------------------------------------------
  Proyek                  Kontribusi yang saya    Kolaborasi / catatan
                          kerjakan                
  ----------------------- ----------------------- -----------------------
  SIMS                    Eksperimen dan evaluasi Deployment AWS
                          model, training         kolaboratif; MQTT
                          segmentation, counting  dikelola tim
                          logic, analisis error,  infrastruktur; S3 bukan
                          pelaporan, FastAPI      implementasi pribadi
                          inference server,       
                          integrasi YOLO,         
                          konfigurasi Redis       

  CSSD                    Pengumpulan/anotasi     Anomaly detection masih
                          data, pipeline CV,      dikembangkan; test set
                          retrieval, eksperimen   kecil
                          anomaly detection,      
                          FastAPI backend,        
                          integrasi PostgreSQL,   
                          staging deployment      

  Prophesy AI Prime       Implementasi mandiri    Tidak menangani
                          website RAG, custom SQL downstream
                          agent, workflow market  forecasting/RSL; aturan
                          sensing                 sinyal proprietary
                                                  bersifat rahasia

  Lab Scheduler           Algoritma scheduling,   Belum ada metrik
                          CP-SAT engine, workflow performa numerik atau
                          cuti, metrik roster,    skala produksi yang
                          analytics, fitur        terkonfirmasi
                          backend                 

  WorkGuard               CV yang ada menjelaskan Detail dan metrik perlu
                          kontribusi model,       diverifikasi sebelum
                          backend, dan sistem     dijadikan studi kasus
                                                  publik

  Face Attendance         CV yang ada menjelaskan Perlu memperjelas
                          model anti-spoofing,    definisi metrik dan
                          model serving,          kepemilikan pekerjaan
                          recognition, dan API    

  TokoQuick CBIR          CV yang ada menjelaskan Belum ada metrik
                          retrieval berbasis      retrieval yang spesifik
                          feature vector          
                          ResNet/VGG19            

  YOLOv5 Materials        CV yang ada menjelaskan Definisi akurasi 97%
  Counting                deteksi dan             perlu diverifikasi
                          penghitungan otomatis   

  Internal Task Manager   Eksplorasi mekanisme    Tidak memiliki tanggung
  Agent                   dan mode AI agent       jawab implementasi
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# Rencana membangun portofolio independen

Bagian ini berisi **ide proyek baru yang bisa dibangun secara mandiri**,
bukan proyek perusahaan yang sudah selesai. Gunakan dataset publik atau
data yang dikumpulkan sendiri.

## A. Computer Vision Inventory Intelligence

-   Dataset rak atau objek dari sumber publik atau hasil pengumpulan
    mandiri.
-   Model object detection atau segmentation.
-   Baseline penghitungan berbasis geometri.
-   Pengujian occlusion dan variasi pencahayaan.
-   FastAPI inference endpoint.
-   Dashboard untuk hasil prediksi dan analisis selisih penghitungan.
-   Evaluasi yang memisahkan metrik model dengan akurasi penghitungan.

## B. Visual Search and Anomaly Detection

-   Dataset anomaly detection industri publik atau objek yang
    dikumpulkan sendiri.
-   Pipeline segmentasi dan preprocessing.
-   DINOv2 embeddings dan FAISS retrieval.
-   Evaluasi retrieval top-1/top-5.
-   Eksperimen anomaly detection berbasis patch.
-   FastAPI service dan demo UI.
-   Dokumentasi keterbatasan dan analisis error.

## C. Public-Data Market Intelligence Assistant

-   Pengumpulan berita dari sumber publik.
-   Ekstraksi informasi terstruktur menggunakan LLM dan deduplikasi
    event.
-   Penyimpanan data di PostgreSQL.
-   RAG assistant dengan ChromaDB.
-   SQL agent read-only menggunakan database sintetis.
-   Evaluasi berbasis referensi dengan DeepEval/TruLens.
-   Diagram arsitektur dan instruksi setup yang bisa direproduksi.

## D. Workforce Scheduling Optimization

-   Dataset sintetis berisi staf, keterampilan, shift, dan ketersediaan.
-   Greedy heuristic sebagai baseline.
-   Optimizer menggunakan OR-Tools CP-SAT.
-   Simulasi penggantian staf ketika ada cuti mendesak.
-   Metrik fairness dan coverage.
-   Dashboard perbandingan.
-   Penjelasan hard constraints, soft preferences, dan hasil solver.

------------------------------------------------------------------------

# Panduan umum saat mempresentasikan proyek

1.  Beri label yang jelas pada proyek portofolio independen. Jangan
    membuatnya seolah-olah merupakan sistem asli milik perusahaan
    sebelumnya.
2.  Pisahkan metrik performa model dengan metrik operasional atau
    bisnis.
3.  Jika mencantumkan angka, sertakan ukuran dataset, strategi pembagian
    data, metode evaluasi, dan keterbatasannya.
4.  Bedakan komponen yang dikembangkan sendiri dengan komponen hasil
    kolaborasi tim atau sistem yang sudah tersedia.
5.  Jangan mengklaim fitur siap produksi jika statusnya masih staging
    atau eksperimen.
6.  Jangan membagikan logika bisnis proprietary, dataset internal,
    informasi klien, credential, atau source code perusahaan.
7.  Untuk setiap proyek, siapkan penjelasan singkat mengenai masalah
    yang ingin diselesaikan, kontribusi pribadi, arsitektur, tantangan
    teknis terbesar, evaluasi, dan hal yang ingin ditingkatkan
    berikutnya.
