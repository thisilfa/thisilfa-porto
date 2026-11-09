import { z } from 'astro/zod';

/**
 * Project entry schema — the honesty gate at the data layer. Every field a
 * listing or case study renders is required here, so an entry that skips its
 * disclosure note or ownership label fails the build, not the review.
 */
export const projectSchema = z.object({
  title: z.string(),
  category: z.string(),
  overview: z.string(),
  role: z.string().optional(),
  company: z.string().optional(),
  stack: z.array(z.string()).default([]),
  status: z.string().optional(),
  statusKind: z.enum(['delivered', 'staging', 'research', 'unverified']),
  ownership: z.enum(['employer', 'independent', 'unconfirmed']),
  disclosure: z.string().min(1),
  kind: z.enum(['case-study', 'compact']),
  featured: z.boolean().default(false),
  order: z.number().default(99),
});

export type ProjectData = z.infer<typeof projectSchema>;
