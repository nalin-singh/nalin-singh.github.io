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

export const collections = { writes };
