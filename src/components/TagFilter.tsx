"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface TagFilterProps {
  tags: { tag: string; count: number }[];
  className?: string;
}

export function TagFilter({ tags, className = '' }: TagFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const params = new URLSearchParams(searchParams);
      params.set('tag', e.detail);
      params.delete('q');
      router.push(`/?${params.toString()}`);
    };
    window.addEventListener('filter-by-tag', handler as EventListener);
    return () => window.removeEventListener('filter-by-tag', handler as EventListener);
  }, [router, searchParams]);

  const activeTag = searchParams.get('tag');

  if (tags.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <button
        onClick={() => router.push('/')}
        className={`text-sm px-3 py-1 rounded-full border transition-colors ${
          !activeTag
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
        }`}
      >
        Todos
      </button>
      {tags.map(({ tag, count }) => (
        <button
          key={tag}
          onClick={() => {
            const params = new URLSearchParams();
            if (activeTag === tag) {
              params.delete('tag');
            } else {
              params.set('tag', tag);
            }
            router.push(`/?${params.toString()}`);
          }}
          className={`text-sm px-3 py-1 rounded-full border transition-colors ${
            activeTag === tag
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
          }`}
        >
          {tag} ({count})
        </button>
      ))}
    </div>
  );
}
