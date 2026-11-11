/**
 * Slug-keyed diagram registry — entries declare `diagram: <key>` in
 * frontmatter and case-study pages render the mapped component between the
 * contribution section and the prose.
 *
 * Plain JavaScript, deliberately: this module imports an .astro component,
 * so the astro toolchain compiles it through the astro transform, whose
 * parser rejects TypeScript annotations of any kind (`const x: T`, param
 * types). Keep this file annotation-free.
 */
import DiagramSims from '../components/diagram-sims.astro';
import DiagramCssd from '../components/diagram-cssd.astro';
import DiagramProphesy from '../components/diagram-prophesy.astro';

const diagrams = { sims: DiagramSims, cssd: DiagramCssd, prophesy: DiagramProphesy };

export function diagramFor(key) {
  if (!key) return null;
  return diagrams[key] ?? null;
}
