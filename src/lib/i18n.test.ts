import { describe, expect, it } from 'vitest';
import type { Lang } from '../i18n/ui';
import {
  assertLocale,
  buildRouteMap,
  localeFromPath,
  neutralRoute,
  normalizeTrailingSlash,
  routeInLocale,
  stripBase,
  stripLocaleSegment,
  translatePath,
} from '../i18n/utils';

const BASE = '/thisilfa-porto';

/** Both locales mirror each other: every route exists on both sides. */
const mirrored = buildRouteMap([
  '/src/pages/index.astro',
  '/src/pages/about.astro',
  '/src/pages/projects/index.astro',
  '/src/pages/projects/sims.astro',
  '/src/pages/id/index.astro',
  '/src/pages/id/about.astro',
  '/src/pages/id/projects/index.astro',
  '/src/pages/id/projects/sims.astro',
]);

/** English-only: no Indonesian translation exists for this route. */
const unmirrored = buildRouteMap(['/src/pages/journal.astro', '/src/pages/index.astro']);

describe('stripBase', () => {
  it('removes the project base with or without its trailing slash', () => {
    expect(stripBase('/thisilfa-porto/about/', BASE)).toBe('/about/');
    expect(stripBase('/thisilfa-porto/about/', '/thisilfa-porto/')).toBe('/about/');
    expect(stripBase('/about/', '')).toBe('/about/');
  });

  it('leaves foreign paths untouched', () => {
    expect(stripBase('/other/about/', BASE)).toBe('/other/about/');
  });
});

describe('normalizeTrailingSlash', () => {
  it('collapses duplicate slashes and guarantees one trailing slash', () => {
    expect(normalizeTrailingSlash('/about//')).toBe('/about/');
    expect(normalizeTrailingSlash('/about')).toBe('/about/');
    expect(normalizeTrailingSlash('/projects/sims/')).toBe('/projects/sims/');
  });
});

describe('localeFromPath', () => {
  it('detects the prefixed locale and defaults the rest', () => {
    expect(localeFromPath('/id/about/')).toBe('id');
    expect(localeFromPath('/about/')).toBe('en');
    expect(localeFromPath('/')).toBe('en');
    expect(localeFromPath('/ideas/')).toBe('en'); // 'id' as substring must not match
  });
});

describe('neutralRoute', () => {
  it('strips the locale segment, keeping the page route', () => {
    expect(neutralRoute('/id/projects/sims/')).toBe('/projects/sims/');
    expect(neutralRoute('/projects/sims/')).toBe('/projects/sims/');
    expect(neutralRoute('/id/')).toBe('/');
  });
});

describe('translatePath — Covers AE1', () => {
  it('maps the Indonesian SIMS case study to its English equivalent and back', () => {
    expect(translatePath('/thisilfa-porto/id/projects/sims/', BASE, 'en', mirrored)).toBe(
      '/projects/sims/',
    );
    expect(translatePath('/thisilfa-porto/projects/sims/', BASE, 'id', mirrored)).toBe(
      '/id/projects/sims/',
    );
  });

  it('swaps the locale root', () => {
    expect(translatePath('/thisilfa-porto/', BASE, 'id', mirrored)).toBe('/id/');
    expect(translatePath('/thisilfa-porto/id/', BASE, 'en', mirrored)).toBe('/');
  });

  it('falls back to the localized home when the equivalent page is missing', () => {
    expect(translatePath('/thisilfa-porto/journal/', BASE, 'id', unmirrored)).toBe('/id/');
    // The English page exists, so EN→EN keeps the page; only the missing ID
    // translation falls back.
    expect(translatePath('/thisilfa-porto/id/journal/', BASE, 'en', unmirrored)).toBe('/journal/');
    // A route that exists in neither locale falls back on both sides.
    expect(translatePath('/thisilfa-porto/nonexistent/', BASE, 'id', unmirrored)).toBe('/id/');
    expect(translatePath('/thisilfa-porto/id/nonexistent/', BASE, 'en', unmirrored)).toBe('/');
  });

  it('throws on a locale outside the configured list (edge)', () => {
    // Static types forbid unknown locales; the runtime guard is for untyped
    // callers, so the test casts past the union to exercise it.
    const unknown = 'fr' as Lang;
    expect(() => translatePath('/thisilfa-porto/about/', BASE, unknown, mirrored)).toThrow(
      /Unknown locale "fr"/,
    );
  });

  it('keeps one trailing slash through a swap (edge)', () => {
    expect(translatePath('/thisilfa-porto/about', BASE, 'id', mirrored)).toBe('/id/about/');
  });
});

describe('routeInLocale', () => {
  it('returns the route when it exists, home when only the locale root does, null when the locale is absent', () => {
    expect(routeInLocale(mirrored, '/about/', 'id')).toBe('/about/');
    // The locale root always satisfies a missing route at this layer.
    expect(routeInLocale(unmirrored, '/nonexistent/', 'en')).toBe('/');
    // A locale with no pages at all yields null — translatePath applies the
    // home fallback on top of this.
    expect(routeInLocale(unmirrored, '/journal/', 'id')).toBeNull();
  });
});

describe('buildRouteMap', () => {
  it('registers index files as the locale root on both sides', () => {
    expect(mirrored.get('en')).toContain('/');
    expect(mirrored.get('id')).toContain('/');
  });

  it('registers mirrored page routes under their locale', () => {
    expect(mirrored.get('en')).toContain('/projects/sims/');
    expect(mirrored.get('id')).toContain('/projects/sims/');
  });
});
