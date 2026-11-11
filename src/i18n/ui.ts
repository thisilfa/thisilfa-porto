/**
 * UI dictionaries — interface labels per locale. Long-form content lives in
 * content collections, not here. A future section (Personal Lab, Journal)
 * launches by adding entries to `navItems` and both dictionaries.
 */

export const languages = {
  en: 'English',
  id: 'Bahasa Indonesia',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

/** Every locale the site builds, mirroring astro.config.mjs. */
export const locales: Lang[] = ['en', 'id'];

/** The five live sections, in nav order (plan R3 / AE2). */
export const navItems = ['home', 'about', 'projects', 'resume', 'contact'] as const;

export type NavItem = (typeof navItems)[number];

export const navPaths: Record<NavItem, string> = {
  home: '/',
  about: '/about/',
  projects: '/projects/',
  resume: '/resume/',
  contact: '/contact/',
};

const en = {
  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.projects': 'Projects',
  'nav.resume': 'Resume',
  'nav.contact': 'Contact',

  'site.name': 'Silfaradila Mei Fizahidah',
  'site.tagline': 'Building intelligent systems through practical engineering.',
  'site.role': 'AI Engineer · Computer Vision · Machine Learning',

  'footer.builtNote': 'Designed and built by Silfaradila.',
  'footer.backHome': 'Back to home',

  'a11y.skipToContent': 'Skip to content',

  'home.available': 'Available for opportunities',
  'home.exploreProjects': 'Explore Projects',
  'home.downloadResume': 'Download Resume',
  'home.contactCta': 'Contact Me',
  'home.featured': 'Featured Projects',
  'home.featuredEmpty': 'Case studies are being written right now — check back shortly.',
  'home.expertise': 'Technical Expertise',
  'home.journey': 'Professional Journey',
  'resume.download': 'Download Resume (PDF)',
  'resume.englishOnly': 'The resume is currently available in English.',

  'projects.listing': 'Projects',
  'projects.intro':
    'Professional work and independent research, in one place. Case studies link to full write-ups; each entry carries its honest status and a disclosure note.',
  'projects.groups.professional': 'Professional Experience',
  'projects.groups.research': 'Research & Experiments',
  'projects.backTo': '← All projects',
  'projects.professional': 'Professional Project',
  'projects.redacted': 'Partially Redacted',
  'contribution.implemented': 'I implemented',
  'contribution.contributed': 'I contributed to',
  'contribution.unattributed': 'Not individually attributed',
  'projects.contribution': 'My contribution',
  'diagram.sims.title': 'SIMS architecture — generalized flow',
  'diagram.sims.desc':
    'Cameras on shelves feed edge devices; YOLOv8 segmentation and counting logic run in a FastAPI inference service with Redis queueing, producing inventory results. MQTT and AWS are integration points owned by the infrastructure team.',
  'diagram.legend.implemented': 'Implemented',
  'diagram.legend.integration': 'Contributed / integration',
  'diagram.legend.context': 'Context — not individually attributed',
  'diagram.scrollHint': 'Scroll to see the full diagram',
  'status.delivered': 'Delivered',
  'status.staging': 'Staging',
  'status.research': 'Research',
  'status.unverified': 'Resume-described; not independently verified',

  'notfound.title': 'Page not found',
  'notfound.body': 'The page you are looking for does not exist or has moved.',
  'notfound.home.en': 'Continue in English',
  'notfound.home.id': 'Lanjutkan dalam Bahasa Indonesia',
} as const;

const id: Record<keyof typeof en, string> = {
  'nav.home': 'Beranda',
  'nav.about': 'Tentang',
  'nav.projects': 'Proyek',
  'nav.resume': 'Resume',
  'nav.contact': 'Kontak',

  'site.name': 'Silfaradila Mei Fizahidah',
  'site.tagline': 'Membangun sistem cerdas melalui rekayasa yang praktis.',
  'site.role': 'AI Engineer · Computer Vision · Machine Learning',

  'footer.builtNote': 'Dirancang dan dibangun oleh Silfaradila.',
  'footer.backHome': 'Kembali ke beranda',

  'a11y.skipToContent': 'Langsung ke konten',

  'home.available': 'Terbuka untuk peluang',
  'home.exploreProjects': 'Lihat Proyek',
  'home.downloadResume': 'Unduh Resume',
  'home.contactCta': 'Hubungi Saya',
  'home.featured': 'Proyek Unggulan',
  'home.featuredEmpty': 'Studi kasus sedang ditulis — mohon kembali sebentar lagi.',
  'home.expertise': 'Keahlian Teknis',
  'home.journey': 'Perjalanan Profesional',
  'resume.download': 'Unduh Resume (PDF)',
  'resume.englishOnly': 'Resume saat ini tersedia dalam bahasa Inggris.',

  'projects.listing': 'Proyek',
  'projects.intro':
    'Pekerjaan profesional dan riset independen, dalam satu tempat. Studi kasus tertaut ke tulisan lengkap; setiap entri membawa status yang jujur dan catatan disclosure.',
  'projects.groups.professional': 'Pengalaman Profesional',
  'projects.groups.research': 'Riset & Eksperimen',
  'projects.backTo': '← Semua proyek',
  'projects.professional': 'Proyek Profesional',
  'projects.redacted': 'Sebagian Disunting',
  'contribution.implemented': 'Saya mengimplementasikan',
  'contribution.contributed': 'Saya berkontribusi dalam',
  'contribution.unattributed': 'Tidak teratribusi individual',
  'projects.contribution': 'Kontribusi saya',
  'diagram.sims.title': 'Arsitektur SIMS — alur umum',
  'diagram.sims.desc':
    'Kamera di rak mengirim citra ke perangkat edge; segmentasi YOLOv8 dan logika penghitungan berjalan di layanan inferensi FastAPI dengan antrian Redis, menghasilkan data inventaris. MQTT dan AWS adalah titik integrasi milik tim infrastruktur.',
  'diagram.legend.implemented': 'Diimplementasikan',
  'diagram.legend.integration': 'Kontribusi / integrasi',
  'diagram.legend.context': 'Konteks — tidak teratribusi individual',
  'diagram.scrollHint': 'Gulir untuk melihat diagram lengkap',
  'status.delivered': 'Terdeploy',
  'status.staging': 'Staging',
  'status.research': 'Penelitian',
  'status.unverified': 'Dijelaskan di resume; belum terverifikasi independen',

  'notfound.title': 'Halaman tidak ditemukan',
  'notfound.body': 'Halaman yang Anda cari tidak ada atau telah dipindahkan.',
  'notfound.home.en': 'Continue in English',
  'notfound.home.id': 'Lanjutkan dalam Bahasa Indonesia',
};

export const ui = { en, id } as const;

export function t(lang: Lang, key: keyof typeof en): string {
  return ui[lang][key] ?? ui.en[key];
}
