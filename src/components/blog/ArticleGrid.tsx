import { ArticleCard } from './ArticleCard';

interface BlogPost {
  id: number;
  slug: string;
  titleEn: string;
  titleZh: string;
  excerptEn: string;
  excerptZh: string;
  thumbnailUrl: string | null;
  category: string;
  publishDate: Date;
}

interface ArticleGridProps {
  posts: BlogPost[];
}

export function ArticleGrid({ posts }: ArticleGridProps) {
  if (posts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-gray-500 text-lg">No articles found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
