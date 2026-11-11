---
title: Prophesy AI Prime
category: Applied AI / LLM
type: professional
overview: Solusi intelijen pasar berbasis AI yang mendukung penemuan informasi dan pengambilan pengetahuan melalui alur kerja LLM.
role: AI / Computer Vision Engineer
company: Biologic Technik
stack:
  [
    Python,
    FastAPI,
    n8n,
    OpenAI API,
    Anthropic Claude,
    AnythingLLM,
    ChromaDB,
    PostgreSQL,
    DeepEval,
    TruLens,
  ]
statusKind: delivered
ownership: employer
disclosure: Sumber intelijen bisnis internal, prompt proprietary, dataset, dan alur kerja tidak dicantumkan.
kind: case-study
featured: true
order: 3
period: Juli 2025 – sekarang
diagram: prophesy
contribution:
  - group: implemented
    items:
      - Alur kerja market sensing berbasis n8n — pengumpulan berita harian, ekstraksi JSON terstruktur dengan OpenAI, penyaringan relevansi pasar Singapura, dan deduplikasi ke PostgreSQL.
      - Asisten RAG website, diimplementasikan menyeluruh — ingest dokumen, chunking, embedding, retrieval ChromaDB, dan generasi respons di atas backend FastAPI + AnythingLLM.
      - SQL agent berbasis LLM kustom yang dibangun langsung dengan Python dan panggilan API — tanpa framework — menerjemahkan pertanyaan bahasa natural menjadi SQL atas data forecast langsung.
      - Penyiapan evaluasi — dataset expected facts dengan DeepEval (faithfulness, completeness, instruction following) dan TruLens (relevancy).
  - group: unattributed
    items:
      - Tahap forecasting/RSL hilir yang mengonsumsi sinyal — dimiliki kontributor lain.
---

## Masalah dan kendala

Intelijen pasar untuk operasi yang bergantung pada Singapura berarti memantau berita medis,
nasional, geopolitik, dan lingkungan, mengaitkan setiap peristiwa dengan data rantai pasok
internal, dan memberi makan tahap forecasting — semuanya manual. Sistem ini mengotomatiskan
bagian depan pipeline tersebut: kumpulkan berita, strukturkan, saring relevansinya, dan
jadikan dapat dicari — ditambah asisten website yang menjawab pertanyaan atas pengetahuan
hasilnya, dan SQL agent untuk data forecast langsung.

Kendala yang membentuk pendekatannya:

- **Kerahasiaan** — logika kalkulasi sinyal berbasis aturan yang proprietary dan data klien
  internal sepenuhnya dikecualikan dari tulisan ini.
- **Batas kepemilikan** — tahap forecasting/RSL hilir yang mengonsumsi sinyal dimiliki
  kontributor lain; studi kasus ini mencakup tahapan upstream-nya.
- **Multi-provider LLM** — jawaban harus bekerja atas OpenAI dan Anthropic Claude, dapat
  dipilih pengguna.
- **Kejujuran evaluasi** — kualitas retrieval tidak dievaluasi terpisah, dan tidak ada
  logging level aplikasi yang diimplementasikan; keduanya dinyatakan apa adanya.

## Arsitektur sistem

Diagram menunjukkan tiga bagian terdokumentasi. Market sensing: alur kerja n8n mengumpulkan
berita harian, OpenAI mengekstrak JSON terstruktur yang menjelaskan hubungan setiap artikel
dengan Singapura, penyaring relevansi dengan deduplikasi menyimpan satu rekaman per peristiwa,
dan sinyal terfilter masuk ke PostgreSQL — digabungkan di sana dengan data SKU dan pemasok
internal untuk menurunkan dampak, severity, dan kekuatan sinyal bagi tahap hilir. Asisten RAG
website: backend FastAPI yang terhubung ke API AnythingLLM, dengan ChromaDB sebagai lapisan
retrieval, model OpenAI atau Anthropic Claude yang dapat dipilih pengguna, dan ingest runtime
halaman web yang sedang dilihat melalui JavaScript. SQL agent: agent berbasis LLM kustom yang
menerjemahkan pertanyaan bahasa natural tentang data forecast langsung menjadi SQL, dijalankan
atas akun PostgreSQL read-only. Semua yang solid diimplementasikan oleh saya; tahap
hilir yang redup bukan.

## Implementasi teknis

**Ekstraksi terstruktur di atas feed mentah.** Kebutuhan: berita mentah tidak terstruktur dan
bising. Pendekatan: OpenAI mengekstrak JSON terstruktur yang menjelaskan hubungan setiap
artikel dengan Singapura; penyaringan relevansi dan deduplikasi peristiwa menyimpan satu
rekaman per peristiwa; sinyal terfilter digabungkan dengan data SKU dan pemasok internal untuk
menurunkan dampak, severity, dan kekuatan sinyal. Hasil: tabel sinyal harian yang dapat
dicari untuk tahap forecasting.

**RAG menyeluruh, diimplementasikan mandiri.** Kebutuhan: menjawab pertanyaan yang berlandaskan
hasil forecast, informasi market sensing, dan halaman yang sedang dilihat pengguna.
Pendekatan: dokumen JSON, TXT, dan CSV di-ingest, di-chunk, dan di-embedding ke ChromaDB;
JavaScript mengekstrak halaman web yang sedang dilihat dan mengirimkannya bersama permintaan
chat; konten halaman di-chunk dan di-embedding saat runtime dengan konfigurasi embedding yang
sama dengan sumber statis; AnythingLLM menyajikan jawaban dengan model OpenAI atau Anthropic
Claude pilihan pengguna. Hasil: asisten yang bekerja atas dokumen statis dan halaman langsung.

**SQL agent tanpa framework.** Kebutuhan: pertanyaan bahasa natural atas data forecast
langsung. Pendekatan: agent berbasis LLM kustom yang dibangun langsung dengan Python dan
panggilan API — tanpa LangChain atau LangGraph — terintegrasi dengan FastAPI dan PostgreSQL,
menerjemahkan pertanyaan menjadi SQL dan mengeksekusinya. Akses database bersifat read-only
dan dibatasi pada tabel forecast yang relevan. Hasil: bekerja untuk cakupan yang dimaksud;
otorisasi database per pengguna tidak diimplementasikan, dan hal itu dinyatakan sebagai
batasan, bukan ditutup-tutupi.

**Evaluasi berground.** Kebutuhan: memeriksa bahwa jawaban yang dihasilkan faithful dan
lengkap. Pendekatan: expected facts dan dokumen referensi pendukung disiapkan; jawaban yang
dihasilkan diperiksa terhadap expected facts dan sumber kutipan; DeepEval menilai
faithfulness, completeness, dan instruction following; TruLens menilai relevancy. Hasil:
siklus evaluasi yang dapat diulang — dengan batas terdokumentasi bahwa tahap retrieval dan
chunk ChromaDB yang diambil tidak dievaluasi terpisah.

## Eksperimen dan tantangan rekayasa

- **Ingest halaman web runtime.** Kebutuhan: asisten harus menjawab atas halaman yang sedang
  dilihat pengguna, bukan hanya dokumen statis. Implementasi: JavaScript mengekstrak halaman
  yang dilihat dan kontennya di-chunk serta di-embedding saat runtime dengan konfigurasi
  embedding yang sama dengan sumber statis, sehingga konten statis dan runtime konsisten
  saat di-retrieve.
- **Jawaban multi-provider.** Kebutuhan: tidak terkunci pada satu provider LLM. Implementasi:
  integrasi AnythingLLM dengan model OpenAI dan Anthropic Claude pilihan pengguna di balik
  satu antarmuka chat.
- **Framework versus implementasi langsung.** Kebutuhan: SQL agent untuk data forecast
  langsung. Keputusan: dibangun langsung dengan Python dan panggilan API alih-alih framework
  agent khusus — pilihan terdokumentasi; dokumen tidak mencatat perbandingan terukur dengan
  build berbasis framework, sehingga perbandingan semacam itu tidak diklaim.

## Hasil dan evaluasi

- Alur kerja market sensing harian yang berjalan: pengumpulan, ekstraksi terstruktur,
  penyaringan relevansi, deduplikasi, dan penyimpanan sinyal PostgreSQL untuk tahap
  forecasting.
- Asisten RAG website yang menjawab atas dokumen statis dan halaman web langsung, dengan
  provider LLM pilihan pengguna.
- SQL agent kustom yang menerjemahkan pertanyaan bahasa natural menjadi SQL yang dieksekusi
  atas data forecast langsung.
- Evaluasi: pengujian manual plus siklus dataset terstruktur — expected facts dan dokumen
  referensi diperiksa terhadap jawaban dan kutipan yang dihasilkan, dinilai dengan DeepEval
  (faithfulness, completeness, instruction following) dan TruLens (relevancy).

## Demonstration dan bukti

Tangkapan layar alur kerja tersanitasi, contoh jejak retrieval, dan contoh hasil evaluasi
menunggu materi yang disetujui pemilik dan sengaja tidak dipalsukan di sini.

## Batasan dan refleksi

- Tahap retrieval dan chunk ChromaDB yang diambil tidak dievaluasi terpisah — generasi yang
  dinilai, retrieval tidak.
- Tidak ada memori percakapan persisten antar permintaan terpisah; tidak ada retrieval
  keyword/hybrid (hanya semantik).
- Tidak ada logging atau pemantauan level aplikasi atas permintaan chat, jawaban, konten yang
  diambil, kesalahan, atau hasil evaluasi.
- Akses database SQL agent bersifat read-only dan dibatasi pada tabel forecast yang relevan;
  otorisasi database per pengguna tidak diimplementasikan.
- Tahap forecasting/RSL hilir tidak dicakup di sini — dimiliki kontributor lain.

## Catatan disclosure

Sumber intelijen bisnis internal, prompt proprietary, dataset, dan alur kerja tidak
dicantumkan.
