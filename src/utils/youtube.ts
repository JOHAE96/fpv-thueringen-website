/**
 * Pulls the video ID out of the usual YouTube URL shapes (watch, youtu.be,
 * shorts, embed, live). Returns undefined for anything else.
 */
export function youtubeId(url: string): string | undefined {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return undefined;
  }

  const host = parsed.hostname.replace(/^(www|m)\./, "");

  if (host === "youtu.be") {
    return parsed.pathname.split("/")[1] || undefined;
  }

  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const fromQuery = parsed.searchParams.get("v");
    if (fromQuery) return fromQuery;

    const [, kind, id] = parsed.pathname.split("/");
    if (["shorts", "embed", "live"].includes(kind) && id) return id;
  }

  return undefined;
}

/** 480×360 (4:3 with letterbox bars), available for every public video. */
export function youtubeThumbnail(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

/** Privacy-enhanced player, started right away since the click was the intent. */
export function youtubeEmbed(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
}
