import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

import { SITE } from "../config";
import { formatDate } from "../utils/date";
import { getAllBuilds } from "../utils/builds";
import { collectTags, getPublishedPosts } from "../utils/posts";

/**
 * https://llmstxt.org — a plain-text index of the site for language models,
 * built from the same collections that drive the pages.
 */
export const GET: APIRoute = async ({ site }) => {
  const posts = await getPublishedPosts();
  const tags = collectTags(posts);
  const builds = await getAllBuilds();
  const faqs = (await getCollection("faqs")).sort(
    (a, b) => a.data.order - b.data.order,
  );
  const videos = (await getCollection("videos")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  const absolute = (path: string) => new URL(path, site).href;

  const lines = [
    `# ${SITE.title}`,
    "",
    `> ${SITE.description}`,
    "",
    "## News",
    "",
    ...posts.map(
      (post) =>
        `- [${post.data.title}](${absolute(`/news/${post.id}/`)}): ${
          post.data.description
        } Veröffentlicht am ${formatDate(post.data.date)}.`,
    ),
    "",
    "## Builds",
    "",
    ...builds.map(
      (build) =>
        `- [${build.data.title}](${absolute(`/builds/${build.id}/`)}): ${
          build.data.description
        }`,
    ),
    "",
    "## FAQ",
    "",
    ...faqs.map((faq) => `- ${faq.data.question}`),
    "",
    "## Videos",
    "",
    ...videos.map((video) => `- [${video.data.title}](${video.data.url})`),
    "",
    "## Seiten",
    "",
    `- [News](${absolute("/news/")}): alle Beiträge, neueste zuerst.`,
    `- [Tags](${absolute("/news/tags/")}): ${
      tags.map((t) => t.name).join(", ") || "noch keine"
    }.`,
    `- [Builds](${absolute("/builds/")}): Drohnen-Builds der Mitglieder.`,
    `- [Videos](${absolute("/videos/")}): kuratierte Flugvideos der Mitglieder.`,
    `- [FAQ](${absolute("/faqs/")}): häufig gestellte Fragen.`,
    `- [Verein](${absolute("/verein/")}): wer wir sind und wie man Mitglied wird.`,
    `- [Community](${absolute("/community/")}): Treffen, Fluggelände, Kontaktwege.`,
    "",
    "## Feeds",
    "",
    `- [RSS](${absolute("/rss.xml")})`,
    `- [Sitemap](${absolute("/sitemap-index.xml")})`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
