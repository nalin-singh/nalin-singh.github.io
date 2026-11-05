import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import { frame, theme } from "./src/lib/code-frame";

export default defineConfig({
  site: "https://nalin-singh.github.io",
  integrations: [mdx(), sitemap()],
  prefetch: true,
  markdown: {
    shikiConfig: { theme, transformers: [frame] },
  },
});
