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
    bodyRu: z.string().optional(),
    technologies: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    awesomeOpenCodeUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number(),
    stars: z.number().optional(),
    image: z.string().optional(),
    summary: z.string().optional(),
    summaryRu: z.string().optional(),
    demonstrates: z.string().optional(),
    demonstratesRu: z.string().optional(),
    problem: z.string().optional(),
    problemRu: z.string().optional(),
    architecture: z.string().optional(),
    architectureRu: z.string().optional(),
    decisions: z.array(z.string()).optional(),
    decisionsRu: z.array(z.string()).optional(),
    tradeoffs: z.array(z.string()).optional(),
    tradeoffsRu: z.array(z.string()).optional(),
    role: z.array(z.string()).optional(),
    roleRu: z.array(z.string()).optional(),
    futureImprovements: z.array(z.string()).optional(),
    futureImprovementsRu: z.array(z.string()).optional(),
    demoUrl: z.string().url().optional(),
    docsUrl: z.string().url().optional(),
    features: z.array(z.string()).optional(),
    featuresRu: z.array(z.string()).optional(),
    status: z.enum(['active', 'archived', 'wip']).default('active'),
    startDate: z.string().optional(),
    images: z.array(z.string()).optional(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string(),
    description: z.string(),
    descriptionEn: z.string(),
    date: z.string(),
    sourceName: z.string(),
    sourceNameRu: z.string(),
    links: z.array(z.object({
      label: z.string(),
      labelRu: z.string(),
      url: z.string().url(),
    })).optional(),
    tags: z.array(z.string()),
    readingTime: z.string(),
    readers: z.string().optional(),
    bodyEn: z.string(),
    files: z.array(z.object({
      url: z.string(),
      label: z.string(),
      labelRu: z.string(),
      format: z.string(),
    })).optional(),
  }),
});

export const collections = { experience, projects, articles };
