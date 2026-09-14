/**
 * FPV Thüringen e.V. — site configuration
 *
 * This is the only file you need to edit for site-wide settings. Everything
 * else reads from here: metadata, navigation, feeds, OG images and the ink
 * simulation on the home page. Based on the Astro theme Sumi
 * (https://github.com/kpab/astro-sumi, MIT) — see AGENTS.md/README.md.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  /** Shown as the link text, so keep it short. */
  label: string;
  href: string;
}

/**
 * Path the site is served under on GitHub Pages (a project page, not a
 * `<user>.github.io` root repo), e.g. `https://johae96.github.io/fpv-thueringen-website/`.
 * Passed to Astro's `base` config and used to build the club's canonical
 * URL below — the rest of the app derives base-aware links from
 * `import.meta.env.BASE_URL` at runtime instead (see src/utils/url.ts).
 */
export const BASE_PATH = "/fpv-thueringen-website";

export const SITE = {
  /** Bare origin of the deployed site — no path, no trailing slash. */
  url: "https://johae96.github.io",
  title: "FPV Thüringen e.V.",
  /**
   * Short decorative mark used for the vertical rail and the loading screen
   * in the original theme. Left empty on purpose — it was a Japanese
   * character tied to the theme's own branding, unrelated to the club.
   */
  titleMark: "",
  tagline: "FPV-Modellflugverein aus Thüringen",
  description:
    "FPV Thüringen e.V. ist ein Verein für FPV-Modellflug in Thüringen: gemeinsame Flugtermine, Builds der Mitglieder, Wettbewerbe und Ausflüge.",
  /** BCP 47 language tag, written to <html lang>. */
  lang: "de",
  /** Used for og:locale. */
  locale: "de_DE",
  /** Fallback OG image, relative to public/. Used for pages without one. */
  defaultOgImage: "/og-default.png",
} as const;

/**
 * The club, used as the organisation in structured data (JSON-LD) and in the
 * footer credit. Not a personal author — this site has no single byline.
 */
export const CLUB = {
  name: "FPV Thüringen e.V.",
  url: `${SITE.url}${BASE_PATH}`,
  /** Used for JSON-LD `address.addressRegion`. No street address published. */
  region: "Thüringen",
} as const;

export const NAV: NavItem[] = [
  { label: "News", href: "/news" },
  { label: "Builds", href: "/builds" },
  { label: "Videos", href: "/videos" },
  { label: "Verein", href: "/verein" },
  { label: "Community", href: "/community" },
  { label: "FAQ", href: "/faqs" },
];

/**
 * Optional external links (Discord, Instagram, …) shown in the footer next to
 * the RSS link. Leave empty if there is nothing to link yet.
 */
export const SOCIAL: SocialLink[] = [];

export const NEWS = {
  /**
   * Posts per page on /news and the tag archives.
   */
  postsPerPage: 8,
  /** Latest posts shown on the home page. */
  postsOnHome: 3,
  /** Estimated reading speed used for the "N Min. Lesezeit" label. */
  wordsPerMinute: 200,
  showReadingTime: true,
  /** Render the table of contents on article pages. */
  showTableOfContents: true,
  /** Minimum number of headings before the table of contents appears. */
  tocMinHeadings: 3,
} as const;

export const BUILDS = {
  /** Latest builds shown on the home page. */
  buildsOnHome: 3,
} as const;

/**
 * The WebGL ink simulation.
 *
 * It only ever loads on the home page, is skipped entirely when the visitor
 * prefers reduced motion or the browser lacks WebGL2, and pauses when scrolled
 * out of view. Turn both flags off for a completely JavaScript-free site.
 */
export const INK = {
  /** Full-bleed ink behind the hero. */
  hero: true,
  /** Narrow ink band used as a section transition. */
  divider: true,
  /** Density of each ink splat. Sensible range is 0.3 – 2.5. */
  strength: 1,
  /** Let the ink drift on its own instead of only reacting to the cursor. */
  autoFlow: true,
} as const;

/** Generate a per-article OG image at build time with satori. */
export const OG = {
  enabled: true,
  width: 1200,
  height: 630,
} as const;
