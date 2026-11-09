/**
 * Bilingual content helpers — pure functions over passed-in collections, so
 * the vitest suite runs them directly. The astro:content import lives in the
 * pages (thin wrapper), keeping this module import-free for tests.
 */
import type { Lang } from '../i18n/ui';

export type LocaleId = `${'en' | 'id'}/${string}`;

export interface ProjectEntry {
  id: string;
  slug: string;
  locale: Lang;
  data: {
    title: string;
    category: string;
    overview: string;
    role?: string;
    company?: string;
    stack: string[];
    status?: string;
    statusKind: 'delivered' | 'staging' | 'research' | 'unverified';
    ownership: 'employer' | 'independent' | 'unconfirmed';
    disclosure: string;
    kind: 'case-study' | 'compact';
    featured: boolean;
    order: number;
  };
}

/** Locale of an entry id ('en/sims' → 'en'). */
export function entryLocale(id: string): Lang {
  const prefix = id.split('/', 1)[0];
  if (prefix !== 'en' && prefix !== 'id') {
    throw new Error(`Entry id "${id}" does not start with a locale prefix`);
  }
  return prefix;
}

/** Slug of an entry id ('en/sims' → 'sims'). */
export function entrySlug(id: string): string {
  const slash = id.indexOf('/');
  return slash === -1 ? id : id.slice(slash + 1);
}

/** Filter a collection down to one locale. */
export function getByLocale<T extends ProjectEntry>(entries: T[], locale: Lang): T[] {
  return entries.filter((entry) => entryLocale(entry.id) === locale);
}

/** The same slug in the other locale, or undefined when the translation is missing. */
export function getSibling<T extends ProjectEntry>(entries: T[], entry: T): T | undefined {
  const other: Lang = entryLocale(entry.id) === 'en' ? 'id' : 'en';
  const siblingId = `${other}/${entrySlug(entry.id)}`;
  return entries.find((candidate) => candidate.id === siblingId);
}

/**
 * Throw naming any entry whose translation is missing. Called from the
 * projects pages' loading path, so a missing translation fails the build —
 * full bilingual parity is enforced here, not hoped for.
 */
export function assertLocalePairing<T extends ProjectEntry>(entries: T[]): void {
  const orphans = entries.filter((entry) => !getSibling(entries, entry));
  if (orphans.length > 0) {
    const listed = orphans
      .map(
        (entry) => `${entry.id} (missing ${entryLocale(entry.id) === 'en' ? 'id' : 'en'} sibling)`,
      )
      .join(', ');
    throw new Error(`Bilingual pairing incomplete — missing translations: ${listed}`);
  }
}

/**
 * Deterministic sort: featured first, then explicit order, then title, with
 * the entry id as the final tie-break so the result is a total order —
 * independent of the collection's input order.
 */
export function sortProjects<T extends ProjectEntry>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
    if (a.data.order !== b.data.order) return a.data.order - b.data.order;
    const byTitle = a.data.title.localeCompare(b.data.title);
    if (byTitle !== 0) return byTitle;
    return a.id.localeCompare(b.id);
  });
}
