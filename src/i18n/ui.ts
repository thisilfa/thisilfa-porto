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

  'notfound.title': 'Halaman tidak ditemukan',
  'notfound.body': 'Halaman yang Anda cari tidak ada atau telah dipindahkan.',
  'notfound.home.en': 'Continue in English',
  'notfound.home.id': 'Lanjutkan dalam Bahasa Indonesia',
};

export const ui = { en, id } as const;

export function t(lang: Lang, key: keyof typeof en): string {
  return ui[lang][key] ?? ui.en[key];
}
