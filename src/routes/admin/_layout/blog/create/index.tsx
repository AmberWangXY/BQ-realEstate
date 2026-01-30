import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save } from 'lucide-react';
import { useAdminStore } from '~/store/adminStore';
import { useTRPC } from '~/trpc/react';

export const Route = createFileRoute('/admin/_layout/blog/create/')({
  component: CreateBlogPost,
});

const urlPattern = /^https?:\/\/.+/;

interface BlogPostForm {
  slug: string;
  titleEn: string;
  titleZh: string;
  keywords: string;
  category: string;
  contentEn: string;
  contentZh: string;
  excerptEn: string;
  excerptZh: string;
  thumbnailUrl?: string;
  headerImage?: string;
}

function CreateBlogPost() {
  const navigate = useNavigate();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const token = useAdminStore((state) => state.token);
  const clearToken = useAdminStore((state) => state.clearToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<BlogPostForm>();

  const createMutation = useMutation(
    trpc.admin.blog.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.admin.blog.getAll.queryKey() });
        queryClient.invalidateQueries({ queryKey: trpc.blog.getPosts.queryKey() });
        navigate({ to: '/admin/blog' });
      },
      onError: (error: any) => {
        if (error?.data?.code === 'UNAUTHORIZED' || error?.message?.includes('Invalid or expired token')) {
          clearToken();
          navigate({ to: '/admin' });
          return;
        }

        setError('root', {
          type: 'manual',
          message: error.message || 'Failed to create blog post',
        });
      },
    })
  );

  const onSubmit = (data: BlogPostForm) => {
    const thumbnailUrl = data.thumbnailUrl?.trim() || undefined;
    const headerImage = data.headerImage?.trim() || undefined;

    if (thumbnailUrl && !urlPattern.test(thumbnailUrl)) {
      setError('thumbnailUrl', { type: 'manual', message: 'Must be a valid http or https URL' });
      return;
    }
    if (headerImage && !urlPattern.test(headerImage)) {
      setError('headerImage', { type: 'manual', message: 'Must be a valid http or https URL' });
      return;
    }

    createMutation.mutate({
      token: token!,
      ...data,
      thumbnailUrl,
      headerImage,
    });
  };

  const categories = [
    { value: 'buying-tips', label: 'Buying Tips' },
    { value: 'selling-strategies', label: 'Selling Strategies' },
    { value: 'market-insights', label: 'Market Insights' },
    { value: 'investment-guide', label: 'Investment Guide' },
    { value: 'property-management', label: 'Property Management' },
    { value: 'financing-loans', label: 'Successful Story' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => navigate({ to: '/admin/blog' })}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-navy mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog Management</span>
        </button>
        <h1 className="text-4xl font-bold text-navy mb-2">Create New Blog Post</h1>
        <p className="text-gray-600">Fill in the details to create a new blog post</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-soft p-8">
        {errors.root && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{errors.root.message}</p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL) *
            </label>
            <input
              id="slug"
              type="text"
              {...register('slug', { required: 'Slug is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              placeholder="e.g., how-to-buy-silicon-valley-2025"
            />
            {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>}
          </div>

          <div>
            <label htmlFor="titleEn" className="block text-sm font-medium text-gray-700 mb-2">
              Title (English) *
            </label>
            <input
              id="titleEn"
              type="text"
              {...register('titleEn', { required: 'English title is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              placeholder="Enter English title"
            />
            {errors.titleEn && (
              <p className="mt-1 text-sm text-red-600">{errors.titleEn.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="titleZh" className="block text-sm font-medium text-gray-700 mb-2">
              Title (Chinese) *
            </label>
            <input
              id="titleZh"
              type="text"
              {...register('titleZh', { required: 'Chinese title is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              placeholder="输入中文标题"
            />
            {errors.titleZh && (
              <p className="mt-1 text-sm text-red-600">{errors.titleZh.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              {...register('category', { required: 'Category is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-2">
              Keywords (SEO) *
            </label>
            <input
              id="keywords"
              type="text"
              {...register('keywords', { required: 'Keywords are required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              placeholder="e.g., Silicon Valley homes, Bay Area real estate"
            />
            {errors.keywords && (
              <p className="mt-1 text-sm text-red-600">{errors.keywords.message}</p>
            )}
          </div>

          {/* Thumbnail Image URL */}
          <div>
            <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail Image URL (must be a publicly accessible URL)
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Paste a public image URL for the blog card preview. Recommended size: 800x600px.
            </p>
            <input
              id="thumbnailUrl"
              type="text"
              {...register('thumbnailUrl')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              placeholder="https://example.com/image.jpg or https://images.unsplash.com/..."
            />
            {errors.thumbnailUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.thumbnailUrl.message}</p>
            )}
          </div>

          {/* Header Image URL */}
          <div>
            <label htmlFor="headerImage" className="block text-sm font-medium text-gray-700 mb-2">
              Main Header Image URL (must be a publicly accessible URL)
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Paste a public image URL displayed at the top of the blog post page.
            </p>
            <input
              id="headerImage"
              type="text"
              {...register('headerImage')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              placeholder="https://example.com/header.jpg or https://images.unsplash.com/..."
            />
            {errors.headerImage && (
              <p className="mt-1 text-sm text-red-600">{errors.headerImage.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="excerptEn" className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt (English) *
            </label>
            <textarea
              id="excerptEn"
              {...register('excerptEn', { required: 'English excerpt is required' })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              placeholder="Brief summary in English"
            />
            {errors.excerptEn && (
              <p className="mt-1 text-sm text-red-600">{errors.excerptEn.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="excerptZh" className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt (Chinese) *
            </label>
            <textarea
              id="excerptZh"
              {...register('excerptZh', { required: 'Chinese excerpt is required' })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              placeholder="中文简要摘要"
            />
            {errors.excerptZh && (
              <p className="mt-1 text-sm text-red-600">{errors.excerptZh.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="contentEn" className="block text-sm font-medium text-gray-700 mb-2">
              Content (English) - Markdown supported *
            </label>
            <textarea
              id="contentEn"
              {...register('contentEn', { required: 'English content is required' })}
              rows={15}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent font-mono text-sm"
              placeholder="Write your content in Markdown format..."
            />
            {errors.contentEn && (
              <p className="mt-1 text-sm text-red-600">{errors.contentEn.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="contentZh" className="block text-sm font-medium text-gray-700 mb-2">
              Content (Chinese) - Markdown supported *
            </label>
            <textarea
              id="contentZh"
              {...register('contentZh', { required: 'Chinese content is required' })}
              rows={15}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent font-mono text-sm"
              placeholder="使用 Markdown 格式编写内容..."
            />
            {errors.contentZh && (
              <p className="mt-1 text-sm text-red-600">{errors.contentZh.message}</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex space-x-4">
          <button
            type="button"
            onClick={() => navigate({ to: '/admin/blog' })}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="flex items-center space-x-2 px-6 py-3 bg-primary-gold text-white font-semibold rounded-lg hover:bg-primary-gold-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            <span>{createMutation.isPending ? 'Creating...' : 'Create Post'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
