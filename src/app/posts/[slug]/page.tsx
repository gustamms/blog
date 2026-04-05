import Link from 'next/link';
import { getAllPosts, getPostAsHtml } from '@/lib/posts';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostAsHtml(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline text-sm mb-4 inline-block">
        &larr; Voltar aos posts
      </Link>

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

      <div className="flex items-center gap-3 mb-6 text-sm text-gray-500 dark:text-gray-400">
        <time>{post.date}</time>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">{post.description}</p>

      <div
        className="prose prose-gray dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
