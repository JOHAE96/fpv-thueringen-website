import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

import { CLUB, SITE } from "../config";
import { getPublishedPosts } from "../utils/posts";
import { absoluteUrl } from "../utils/url";

export const GET: APIRoute = async (context) => {
  const posts = await getPublishedPosts();

  // Includes the base path, with a trailing slash — @astrojs/rss resolves
  // item `link`s against this, so they must be relative (no leading slash)
  // or the base path gets dropped again.
  const site = absoluteUrl("/", context.site!);

  return rss({
    title: SITE.title,
    description: SITE.description,
    site,
    // RSS 2.0 reserves <author> for an email address, so the byline goes in
    // Dublin Core instead. Feed readers understand both.
    xmlns: { dc: "http://purl.org/dc/elements/1.1/" },
    items: posts.map((post) => ({
      title: post.data.title,
      // Summaries only. Rendering MDX bodies into the feed needs the container
      // API and pulls the whole component runtime into the build.
      description: post.data.description,
      pubDate: post.data.date,
      link: `news/${post.id}/`,
      categories: post.data.tags ?? [],
      customData: `<dc:creator><![CDATA[${CLUB.name}]]></dc:creator>`,
    })),
    customData: `<language>${SITE.lang}</language>`,
  });
};
