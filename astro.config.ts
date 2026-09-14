import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import { BASE_PATH, SITE } from "./src/config";
import { remarkBasePath } from "./src/plugins/remark-base-path";

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  base: BASE_PATH,
  output: "static",
  integrations: [mdx(), sitemap()],

  markdown: {
    processor: unified({ remarkPlugins: [remarkBasePath(BASE_PATH)] }),
    shikiConfig: {
      // Muted, low-chroma pair — the usual defaults are too blue next to ink
      // and vermilion.
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark",
      },
      // Emit both palettes as custom properties rather than baking one in, so
      // the theme toggle switches highlighting with everything else. See the
      // code block rules in src/styles/prose.css.
      defaultColor: false,
      wrap: false,
    },
  },
});
