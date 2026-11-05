import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const writes = defineCollection({
  loader: glob({ base: "./src/content/writes", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    topic: z.enum(["Context", "Backend", "Process", "Judgement", "Design", "Agents"]),
    minutes: z.number().int().positive(),
    icon: z.enum(["brief", "stream", "branch", "scale", "nib"]),
    order: z.number().int(),
    draft: z.boolean().default(true),
    tags: z.array(z.string()).default([]),
  }),
});

const work = defineCollection({
  loader: glob({ base: "./src/content/work", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    org: z.string(),
    period: z.string().optional(),
    role: z.string(),
    stack: z.array(z.string()),
    drawing: z.enum(["koch-agents", "fam-cip", "file-ops"]),
    tone: z.string(),
    order: z.number().int(),
  }),
});

export const collections = { writes, work };
