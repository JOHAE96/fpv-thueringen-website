import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Files starting with an underscore are ignored by every collection below,
 * which makes drafts easy to park outside the build entirely (in addition to
 * the explicit `draft` flag on `posts`).
 */
const DRAFT_PATTERN = "**/[^_]*.{md,mdx}";

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: DRAFT_PATTERN }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      /** Used for the post list, meta description and the OG image. */
      description: z.string(),
      tags: z.array(z.string()).optional(),
      cover: image().optional(),
      /** Hidden from production builds, still visible in `astro dev`. */
      draft: z.boolean().default(false),
    }),
});

/**
 * Every field is individually optional — not every build has a separate
 * receiver or VTX. Rendering order on /builds/:slug follows the order the
 * fields are declared in here, not the order they happen to appear in a given
 * post's frontmatter.
 */
const buildComponentsSchema = z.object({
  frame: z.string().optional(),
  stack: z.string().optional(),
  receiver: z.string().optional(),
  vtx: z.string().optional(),
  vtxAntenna: z.string().optional(),
  motors: z.string().optional(),
  props: z.string().optional(),
  cam: z.string().optional(),
  battery: z.string().optional(),
});

const builds = defineCollection({
  loader: glob({ base: "./src/content/builds", pattern: DRAFT_PATTERN }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string(),
      pilot: z.string().optional(),
      cover: image().optional(),
      components: buildComponentsSchema,
      /** Free-form key/value pairs for anything not covered above (GPS, Buzzer, Kabelbaum, …). */
      extraComponents: z.record(z.string(), z.string()).optional(),
      /** Grams, without battery. */
      weight: z.number().optional(),
      /** Grams, with battery. */
      weightWithBattery: z.number().optional(),
    }),
});

const faqs = defineCollection({
  loader: glob({ base: "./src/content/faqs", pattern: "**/[^_]*.md" }),
  schema: z.object({
    question: z.string(),
    /** Sort order, ascending. */
    order: z.number(),
    category: z.string().optional(),
  }),
});

/**
 * Free-text pages (/verein, /community, /videos, /impressum) that a
 * non-technical board member should be able to edit without touching Astro.
 */
const pages = defineCollection({
  loader: glob({ base: "./src/content/pages", pattern: "**/[^_]*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const videos = defineCollection({
  loader: glob({ base: "./src/content/videos", pattern: "**/[^_]*.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** External YouTube link — opened in a new tab, never embedded. */
      url: z.string().url(),
      thumbnail: image(),
      date: z.coerce.date(),
      pilot: z.string().optional(),
    }),
});

export const collections = { posts, builds, faqs, pages, videos };
