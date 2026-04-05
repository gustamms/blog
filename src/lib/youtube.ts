import type { Node } from 'unist';

const YOUTUBE_REGEX = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

function collectLinks(node: Node, parent?: Node, index?: number): { parent: Node; index: number; url: string }[] {
  const results: { parent: Node; index: number; url: string }[] = [];
  const children = (node as any).children as Node[] | undefined;
  if (children) {
    children.forEach((child, i) => {
      if (child.type === 'link' && YOUTUBE_REGEX.test((child as any).url)) {
        results.push({ parent: node, index: i, url: (child as any).url });
      }
      results.push(...collectLinks(child, node, i));
    });
  }
  return results;
}

export function remarkYoutube() {
  return (tree: Node) => {
    const links = collectLinks(tree);

    // Iterate in reverse so indices remain valid
    for (let i = links.length - 1; i >= 0; i--) {
      const { parent, url } = links[i];
      const match = url.match(YOUTUBE_REGEX);
      if (!match) continue;
      const videoId = match[1];

      const htmlNode: Node = {
        type: 'html' as const,
        value: `<div class="relative w-full pt-[56.25%] my-4"><iframe class="absolute inset-0 w-full h-full rounded-lg border border-gray-200 dark:border-gray-700" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>`,
      };

      (parent as any).children[links[i].index] = htmlNode;
    }
  };
}
