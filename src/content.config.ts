import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

export const CATEGORIES = [
  'camera-movement',
  'framing',
  'editing',
  'lighting',
  'lens',
  'vfx',
  'animation',
  'aesthetic',
] as const;

const techniques = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/techniques' }),
  schema: z.object({
    name: z.string(),
    category: z.enum(CATEGORIES),
    summary: z.string().max(200),
    aliases: z.array(z.string()).default([]),
    related: z.array(reference('techniques')).default([]),
  }),
});

const examples = defineCollection({
  loader: file('./src/data/examples.json'),
  schema: z.object({
    techniques: z.array(reference('techniques')).min(1),
    // URL absolue vers le bucket (R2, Bunny…) ou chemin sous /public/media
    media: z.string(),
    poster: z.string().optional(),
    source: z.string(),
    type: z.enum(['film', 'series', 'music-video', 'commercial', 'other']).default('film'),
    director: z.string().optional(),
    dp: z.string().optional(),
    year: z.number().int().optional(),
    credit: z.string().optional(),
    timestamp: z.string().optional(),
  }),
});

export const collections = { techniques, examples };
