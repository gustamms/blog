import { getAllPosts, getAllTags } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';
import { TagFilter } from '@/components/TagFilter';
import { SearchBar } from '@/components/SearchBar';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string }>;
}) {
  const { q, tag } = await searchParams;
  let posts = getAllPosts();
  const tags = getAllTags();

  if (tag) {
    posts = posts.filter((p) => p.tags.includes(tag));
  }
  if (q) {
    const query = q.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query))
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Posts</h1>
        <p className="text-gray-600">Conteúdos sobre desenvolvimento</p>
      </div>

      <SearchBar className="mb-6" />
      <TagFilter tags={tags} className="mb-8" />

      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
        {posts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>Nenhum post encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
