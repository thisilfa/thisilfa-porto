import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { projectSchema } from './lib/project-schema';

/**
 * Project content — one collection, locale embedded in the entry id.
 * EN entries live at src/content/projects/en/<slug>.md, Indonesian mirrors
 * at src/content/projects/id/<slug>.md; the documented filter pattern is
 * `id.startsWith('en/')`, and a sibling is the same slug under the other
 * prefix (see src/lib/content.ts).
 */
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '{en,id}/**/*.md' }),
  schema: projectSchema,
});

export const collections = { projects };
