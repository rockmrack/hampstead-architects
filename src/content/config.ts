import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: () => z.object({
    title: z.string(),
    location: z.string(),
    category: z.string(),
    description: z.string(),
    featured: z.boolean().default(false),
    coverImage: z.string(),
    images: z.array(z.string()),
    details: z.object({
      area: z.string(),
      year: z.string(),
      architect: z.string(),
      type: z.string().optional(),
      conservation: z.boolean().default(false),
    }),
    challenge: z.string().optional(),
    solution: z.string().optional(),
    beforeImage: z.string().optional(),
    afterImage: z.string().optional(),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Hampstead Architects'),
    coverImage: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  'projects': projectsCollection,
  'blog': blogCollection,
};
