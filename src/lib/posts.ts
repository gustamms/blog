import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

interface Post {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  content: string;
}

function parsePost(fileName: string): Post {
  const slug = fileName.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, fileName);
  const fileContent = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContent) as { data: Record<string, unknown>; content: string };

  return {
    slug,
    title: (data.title as string) || 'Sem título',
    description: (data.description as string) || '',
    tags: (data.tags as string[]) || [],
    date: (data.date as string) || '',
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => parsePost(fileName))
    .sort((a, b) => {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    });
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContent = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContent) as { data: Record<string, unknown>; content: string };

  return {
    slug,
    title: (data.title as string) || 'Sem título',
    description: (data.description as string) || '',
    tags: (data.tags as string[]) || [],
    date: (data.date as string) || '',
    content,
  };
}

export async function getPostAsHtml(slug: string) {
  const post = getPostBySlug(slug);
  if (!post) {
    return null;
  }

  const processedContent = await remark().use(remarkHtml).process(post.content);
  const contentHtml = processedContent.toString();

  return { ...post, contentHtml };
}

export function getAllTags() {
  const posts = getAllPosts();
  const tagsMap = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag: string) => {
      tagsMap.set(tag, (tagsMap.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagsMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
