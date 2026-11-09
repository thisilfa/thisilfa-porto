/**
 * Locale path utilities — pure string functions over build-time inputs, so
 * the vitest suite exercises them directly with no astro module mocking.
 * Components feed them real values: Astro.url.pathname, BASE_URL, and the
 * route map from import.meta.glob (see language-switcher.astro).
 */
import { defaultLang, locales, type Lang } from './ui';

/** Remove the project-site base from a build-time pathname. */
export function stripBase(pathname: string, base: string): string {
  const normalized = base.endsWith('/') ? base.slice(0, -1) : base;
  if (normalized === '' || normalized === '/') return pathname;
  return pathname.startsWith(normalized) ? pathname.slice(normalized.length) : pathname;
}

/** Collapse duplicate slashes and guarantee one trailing slash (directory format). */
export function normalizeTrailingSlash(path: string): string {
  const withoutDouble = path.replace(/\/{2,}/g, '/');
  return withoutDouble.endsWith('/') ? withoutDouble : `${withoutDouble}/`;
}

/** Which locale does this base-stripped path belong to? */
export function localeFromPath(baseStrippedPath: string): Lang {
  for (const locale of locales) {
    if (locale === defaultLang) continue;
    if (baseStrippedPath === `/${locale}/` || baseStrippedPath.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return defaultLang;
}

/** Guard: an unknown locale must throw, never emit a wrong URL. */
export function assertLocale(locale: string): asserts locale is Lang {
  if (!(locales as string[]).includes(locale)) {
    throw new Error(`Unknown locale "${locale}" — configured locales are: ${locales.join(', ')}`);
  }
}

/** Remove the locale segment from a base-stripped path (default locale has none). */
export function stripLocaleSegment(baseStrippedPath: string): string {
  const locale = localeFromPath(baseStrippedPath);
  if (locale === defaultLang) return normalizeTrailingSlash(baseStrippedPath);
  const rest = baseStrippedPath.slice(`/${locale}`.length);
  return normalizeTrailingSlash(rest === '' ? '/' : rest);
}

/**
 * The locale-neutral route ('/', '/about/', '/projects/sims/') of a
 * build-time pathname, base already removed.
 */
export function neutralRoute(baseStrippedPath: string): string {
  return stripLocaleSegment(baseStrippedPath);
}

/**
 * Route map built from import.meta.glob keys ('/src/pages/about.astro',
 * '/src/pages/id/about.astro') → set of neutral routes that exist per locale.
 */
export function buildRouteMap(pageKeys: string[]): Map<Lang, Set<string>> {
  const map = new Map<Lang, Set<string>>();
  for (const key of pageKeys) {
    const route = key.replace(/^\/src\/pages/, '').replace(/\.astro$/, '');
    if (route === '' || route === '/index' || route.endsWith('/index')) {
      const dir = route.replace(/\/?index$/, '/');
      const locale = localeFromPath(dir === '' ? '/' : dir);
      const set = map.get(locale) ?? new Set<string>();
      set.add('/');
      map.set(locale, set);
      continue;
    }
    const locale = localeFromPath(route);
    const neutral = stripLocaleSegment(route);
    const set = map.get(locale) ?? new Set<string>();
    set.add(neutral);
    map.set(locale, set);
  }
  return map;
}

/**
 * The path of `route` in `target`, or null when that page does not exist in
 * the target locale — callers fall back to the localized home.
 */
export function routeInLocale(
  routeMap: Map<Lang, Set<string>>,
  route: string,
  target: Lang,
): string | null {
  assertLocale(target);
  const set = routeMap.get(target);
  if (set && (set.has(route) || set.has('/'))) {
    return set.has(route) ? route : '/';
  }
  return null;
}

/** Full swap: build-time pathname → base-stripped path in the target locale,
 * falling back to the target locale's home when no equivalent page exists. */
export function translatePath(
  pathname: string,
  base: string,
  target: Lang,
  routeMap: Map<Lang, Set<string>>,
): string {
  assertLocale(target);
  const baseStripped = stripBase(pathname, base);
  const route = neutralRoute(baseStripped);
  const localized = routeInLocale(routeMap, route, target);
  const path = localized ?? '/';
  return target === defaultLang ? path : `/${target}${path === '/' ? '/' : path}`;
}
