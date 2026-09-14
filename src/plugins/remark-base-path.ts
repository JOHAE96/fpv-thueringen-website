import { visit } from "unist-util-visit";
import type { Root } from "mdast";
import type { Plugin } from "unified";

/**
 * Prefixes root-relative internal links and images (`[Verein](/verein/)`)
 * in Markdown/MDX content with the site's base path, so hand-written
 * content links keep working when the site is deployed under a subpath.
 * Astro doesn't rewrite these itself — only routing and `astro:assets`
 * references get the base path applied automatically.
 */
export function remarkBasePath(base: string): Plugin<[], Root> {
  const prefix = base.endsWith("/") ? base.slice(0, -1) : base;

  return () => (tree: Root) => {
    visit(tree, ["link", "image"] as const, (node) => {
      if (node.url.startsWith("/") && !node.url.startsWith("//")) {
        node.url = `${prefix}${node.url}`;
      }
    });
  };
}
