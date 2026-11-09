import { describe, expect, it } from 'vitest';
import {
  assertLocalePairing,
  entryLocale,
  entrySlug,
  getByLocale,
  getSibling,
  sortProjects,
  type ProjectEntry,
} from './content';
import { projectSchema } from './project-schema';

/** Fixture factory: a compact entry with every honesty field set (schema gate). */
function entry(overrides: Partial<ProjectEntry> & { id: string }): ProjectEntry {
  return {
    slug: overrides.id.split('/')[1] ?? overrides.id,
    locale: entryLocale(overrides.id),
    data: {
      title: 'Fixture Project',
      category: 'Computer Vision',
      overview: 'A fixture overview.',
      stack: ['Python'],
      statusKind: 'delivered',
      ownership: 'employer',
      disclosure: 'Fixture disclosure note.',
      kind: 'compact',
      featured: false,
      order: 99,
    },
    ...overrides,
    // data is overridden wholesale when provided
    ...(overrides.data ? { data: overrides.data } : {}),
  };
}

describe('projectSchema — the honesty gate', () => {
  const valid = {
    title: 'SIMS',
    category: 'Computer Vision',
    overview: 'Inventory monitoring.',
    stack: ['Python', 'YOLOv8'],
    statusKind: 'delivered' as const,
    ownership: 'employer' as const,
    disclosure: 'Internal datasets excluded.',
    kind: 'case-study' as const,
  };

  it('accepts a complete entry (happy path)', () => {
    expect(projectSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects a case study without its disclosure note (error path)', () => {
    const { disclosure, ...withoutDisclosure } = valid;
    expect(projectSchema.safeParse(withoutDisclosure).success).toBe(false);
  });

  it('rejects an honesty label outside the enums (error path)', () => {
    expect(projectSchema.safeParse({ ...valid, statusKind: 'production-ready' }).success).toBe(
      false,
    );
    expect(projectSchema.safeParse({ ...valid, ownership: 'mine' }).success).toBe(false);
  });

  it('applies defaults for stack, featured, and order', () => {
    const parsed = projectSchema.parse(valid);
    expect(parsed.stack).toEqual(['Python', 'YOLOv8']);
    expect(parsed.featured).toBe(false);
    expect(parsed.order).toBe(99);
  });
});

describe('entryLocale / entrySlug', () => {
  it('splits locale-prefixed ids', () => {
    expect(entryLocale('en/sims')).toBe('en');
    expect(entrySlug('id/projects/sims')).toBe('projects/sims');
  });

  it('throws on an id without a locale prefix (edge)', () => {
    expect(() => entryLocale('sims')).toThrow(/does not start with a locale prefix/);
  });
});

describe('getByLocale', () => {
  const mixed = [entry({ id: 'en/a' }), entry({ id: 'id/a' }), entry({ id: 'en/b' })];

  it("returns only that locale's entries (happy path)", () => {
    expect(getByLocale(mixed, 'en').map((e) => e.id)).toEqual(['en/a', 'en/b']);
    expect(getByLocale(mixed, 'id').map((e) => e.id)).toEqual(['id/a']);
  });

  it('returns an empty array for a locale with no entries (edge)', () => {
    expect(getByLocale([], 'en')).toEqual([]);
  });
});

describe('getSibling', () => {
  const pair = [entry({ id: 'en/sims' }), entry({ id: 'id/sims' }), entry({ id: 'en/orphan' })];

  it('finds the same slug under the other prefix (happy path)', () => {
    expect(getSibling(pair, pair[0])?.id).toBe('id/sims');
    expect(getSibling(pair, pair[1])?.id).toBe('en/sims');
  });

  it('returns undefined when the translation is missing (edge)', () => {
    expect(getSibling(pair, pair[2])).toBeUndefined();
  });
});

describe('assertLocalePairing', () => {
  const complete = [entry({ id: 'en/a' }), entry({ id: 'id/a' })];
  const incomplete = [...complete, entry({ id: 'en/orphan' })];

  it('passes on complete fixtures (happy path)', () => {
    expect(() => assertLocalePairing(complete)).not.toThrow();
  });

  it('throws naming the orphan and its missing locale (error path)', () => {
    expect(() => assertLocalePairing(incomplete)).toThrow(/en\/orphan .*missing id sibling/);
  });

  it('passes on an empty collection (edge — nothing to pair yet)', () => {
    expect(() => assertLocalePairing([])).not.toThrow();
  });
});

describe('sortProjects', () => {
  const unsorted = [
    entry({
      id: 'en/z',
      data: { ...entry({ id: 'en/z' }).data, title: 'Zebra', order: 2, featured: false },
    }),
    entry({
      id: 'id/featured',
      data: { ...entry({ id: 'id/featured' }).data, title: 'Álpha', order: 50, featured: true },
    }),
    entry({
      id: 'en/mid',
      data: { ...entry({ id: 'en/mid' }).data, title: 'Mid', order: 1, featured: false },
    }),
    entry({
      id: 'id/dup',
      data: { ...entry({ id: 'id/dup' }).data, title: 'Zebra', order: 2, featured: false },
    }),
  ];

  it('sorts featured first, then order, then title — deterministically', () => {
    const sorted = sortProjects(unsorted);
    expect(sorted.map((e) => e.id)).toEqual(['id/featured', 'en/mid', 'en/z', 'id/dup']);
    // Same input, same output — collection order must not leak in (edge).
    expect(sortProjects([...unsorted].reverse()).map((e) => e.id)).toEqual(sorted.map((e) => e.id));
  });

  it('does not mutate the input array (edge)', () => {
    const copy = [...unsorted];
    sortProjects(unsorted);
    expect(unsorted).toEqual(copy);
  });
});
