const YOUTUBE_REGEX = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/g;

export function embedYoutube(html: string): string {
  return html.replace(
    /<a href="([^"]*?youtube\.com\/watch\?v=([^"&]+)[^"]*?)">[^<]*?<\/a>/gi,
    (_match, _url, videoId) => {
      return `<div class="relative w-full pt-[56.25%] my-4"><iframe class="absolute inset-0 w-full h-full rounded-lg border border-gray-200 dark:border-gray-700" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>`;
    }
  );
}
