import { z } from 'astro/zod';

/**
 * Project entry schema — the honesty gate at the data layer. Every field a
 * listing or case study renders is required here, so an entry that skips its
 * disclosure note or ownership label fails the build, not the review.
 */
export const projectSchema = z.object({
  title: z.string(),
  category: z.string(),
  /** Project classification (origin R7): professional / independent / research. */
  type: z.enum(['professional', 'independent', 'research']),
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
  /** Employment period, verbatim from the resume — never project windows. */
  period: z.string().optional(),
  /**
   * Contribution split per the improvement guide §5.4: implemented /
   * contributed / unattributed (three-group model, owner decision
   * 2026-11-11 — designed-and-proposed work consolidates into implemented).
   * Locale-native text per entry.
   */
  contribution: z
    .array(
      z.object({
        group: z.enum(['implemented', 'contributed', 'unattributed']),
        items: z.array(z.string()).min(1),
      }),
    )
    .optional(),
  /** Slug of the architecture diagram component rendered by the case-study page. */
  diagram: z.string().optional(),
});

export type ProjectData = z.infer<typeof projectSchema>;
