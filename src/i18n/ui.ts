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

  'notfound.title': 'Halaman tidak ditemukan',
  'notfound.body': 'Halaman yang Anda cari tidak ada atau telah dipindahkan.',
  'notfound.home.en': 'Continue in English',
  'notfound.home.id': 'Lanjutkan dalam Bahasa Indonesia',
};

export const ui = { en, id } as const;

export function t(lang: Lang, key: keyof typeof en): string {
  return ui[lang][key] ?? ui.en[key];
}
