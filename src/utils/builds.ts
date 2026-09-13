import { getCollection, type CollectionEntry } from "astro:content";

export type Build = CollectionEntry<"builds">;

/** All builds, newest first. Unlike posts, builds have no draft flag. */
export async function getAllBuilds(): Promise<Build[]> {
  const builds = await getCollection("builds");
  return builds.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** "30 g" — used next to weight/weightWithBattery in the spec list. */
export function formatWeight(grams: number): string {
  return `${grams} g`;
}
