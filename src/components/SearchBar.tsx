  "use client";

import { useSearchParams, useRouter } from 'next/navigation';

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className = '' }: SearchBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }
    params.delete('tag');
    router.push(`/?${params.toString()}`);
  }

  return (
    <input
      type="text"
      placeholder="Buscar posts..."
      defaultValue={searchParams.get('q') ?? ''}
      onInput={(e) => handleSearch((e.target as HTMLInputElement).value)}
      className={`w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:placeholder-gray-500 ${className}`}
    />
  );
}
