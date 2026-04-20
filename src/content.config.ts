import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    position: z.string(),
    positionEn: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    current: z.boolean().default(false),
    industry: z.string(),
    industryRu: z.string(),
    technologies: z.array(z.string()),
    order: z.number(),
    descriptionRu: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    descriptionRu: z.string().optional(),
    technologies: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

export const collections = { experience, projects };
