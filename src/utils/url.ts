/**
 * Helpers for building links that keep working when the site is deployed
 * under a subpath (e.g. a GitHub Pages project site served at
 * `/<repo-name>/` instead of `/`). Astro's `base` config option only
 * rewrites paths it manages itself (routing, `astro:assets`, CSS `url()`);
 * plain string hrefs/srcs and `new URL(x, Astro.site)` need to be prefixed
 * by hand, which is what these do.
 */

/**
 * Prefix a root-relative path with the site's configured base path. Leaves
 * already-absolute URLs (external links, `https://...`, `//...`) untouched.
 */
export function withBase(path: string): string {
  if (/^[a-z][a-z0-9+.-]*:/i.test(path) || path.startsWith("//")) {
    return path;
  }

  const base = import.meta.env.BASE_URL;
  const trimmedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${trimmedBase}${normalizedPath}`;
}

/**
 * Resolve a root-relative path to an absolute URL, combining the site's
 * origin (`site`, expected bare — no base path) with the configured base.
 */
export function absoluteUrl(path: string, site: URL): URL {
  return new URL(withBase(path), site);
}
