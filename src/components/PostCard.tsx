"use client";

import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow post-card">
      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
          {post.title}
        </h2>
      </Link>

      <time className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">{post.date}</time>
      <p className="text-gray-600 dark:text-gray-300 mt-2">{post.description}</p>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.dispatchEvent(new CustomEvent('filter-by-tag', { detail: tag }));
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
