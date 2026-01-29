import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { Header } from '~/components/homepage/Header';
import { Footer } from '~/components/homepage/Footer';
import { HeroSection } from '~/components/blog/HeroSection';
import { CategoryFilter } from '~/components/blog/CategoryFilter';
import { FeaturedArticle } from '~/components/blog/FeaturedArticle';
import { ArticleGrid } from '~/components/blog/ArticleGrid';
import { Pagination } from '~/components/blog/Pagination';
import { useTRPC } from '~/trpc/react';

const blogSearchSchema = z.object({
  page: z.number().min(1).catch(1),
  category: z.string().optional().catch(undefined),
});

export const Route = createFileRoute('/blog/')({
  validateSearch: blogSearchSchema,
  component: BlogIndex,
});

function BlogIndex() {
  const navigate = useNavigate();
  const { page = 1, category } = Route.useSearch();
  const trpc = useTRPC();

  // Determine if we should show the featured post (only on page 1 without category filter)
  const shouldShowFeatured = !category && page === 1;

  // Fetch featured post
  const featuredQuery = useQuery(trpc.blog.getFeaturedPost.queryOptions());
  
  // Fetch posts with pagination and filtering
  // Only enable after featured query completes if we're on the first page without a category
  const postsQuery = useQuery({
    ...trpc.blog.getPosts.queryOptions({
      page,
      pageSize: 9,
      category: category || undefined,
      excludeId: featuredQuery.data?.id,
    }),
    enabled: !shouldShowFeatured || featuredQuery.isSuccess || featuredQuery.isError,
  });

  const handleCategoryChange = (newCategory: string | null) => {
    navigate({
      to: '/blog',
      search: { page: 1, category: newCategory || undefined },
    });
  };

  const handlePageChange = (newPage: number) => {
    navigate({
      to: '/blog',
      search: { page: newPage, category: category || undefined },
    });
  };

  // Check for errors
  const hasError = featuredQuery.isError || postsQuery.isError;
  const isFeaturedLoading = shouldShowFeatured && featuredQuery.isLoading;
  const isPostsLoading = postsQuery.isLoading;

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <HeroSection />
      
      <CategoryFilter
        selectedCategory={category || null}
        onCategoryChange={handleCategoryChange}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error State */}
        {hasError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <p className="text-red-800 text-center">
              Failed to load blog posts. Please try again later.
            </p>
          </div>
        )}

        {/* Featured Article */}
        {shouldShowFeatured && (
          <>
            {isFeaturedLoading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-gold mx-auto"></div>
              </div>
            )}
            
            {featuredQuery.data && (
              <FeaturedArticle post={featuredQuery.data} />
            )}
          </>
        )}

        {/* Article Grid */}
        {isPostsLoading && !isFeaturedLoading && !hasError && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-gold mx-auto"></div>
          </div>
        )}

        {!isPostsLoading && !hasError && postsQuery.data && (
          <>
            <ArticleGrid posts={postsQuery.data.posts} />
            
            {postsQuery.data.pagination.totalPages > 1 && (
              <Pagination
                currentPage={postsQuery.data.pagination.page}
                totalPages={postsQuery.data.pagination.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
