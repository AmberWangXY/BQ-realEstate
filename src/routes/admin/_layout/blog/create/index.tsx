import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save } from 'lucide-react';
import { useAdminStore } from '~/store/adminStore';
import { useTRPC, useTRPCClient } from '~/trpc/react';

export const Route = createFileRoute('/admin/_layout/blog/create/')({
  component: CreateBlogPost,
});

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
  const trpcClient = useTRPCClient();
  const queryClient = useQueryClient();
  const token = useAdminStore((state) => state.token);
  const clearToken = useAdminStore((state) => state.clearToken);

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [headerImageFile, setHeaderImageFile] = useState<File | null>(null);
  const [headerImagePreview, setHeaderImagePreview] = useState<string | null>(null);
  const [isUploadingImages, setIsUploadingImages] = useState(false);

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
        // Check for auth errors
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

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeaderImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeaderImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setHeaderImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File, slug: string, imageType: 'thumbnail' | 'header'): Promise<string> => {
    try {
      // Generate presigned URL using the tRPC client for imperative calls
      const { uploadUrl, publicUrl } = await trpcClient.admin.file.generateImageUploadUrl.mutate({
        token: token!,
        slug,
        imageType,
      });

      // Upload file to MinIO
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to upload ${imageType}`);
      }

      return publicUrl;
    } catch (error: any) {
      // Check for auth errors
      if (error?.data?.code === 'UNAUTHORIZED' || error?.message?.includes('Invalid or expired token')) {
        clearToken();
        navigate({ to: '/admin' });
        throw new Error('Authentication failed. Please log in again.');
      }
      throw error;
    }
  };

  const onSubmit = async (data: BlogPostForm) => {
    try {
      setIsUploadingImages(true);
      
      // Upload thumbnail image if selected
      let thumbnailUrl = data.thumbnailUrl;
      if (thumbnailFile) {
        thumbnailUrl = await uploadImage(thumbnailFile, data.slug, 'thumbnail');
      }

      // Upload header image if selected
      let headerImageUrl = data.headerImage;
      if (headerImageFile) {
        headerImageUrl = await uploadImage(headerImageFile, data.slug, 'header');
      }

      createMutation.mutate({
        token: token!,
        ...data,
        thumbnailUrl,
        headerImage: headerImageUrl,
      });
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Failed to upload images',
      });
    } finally {
      setIsUploadingImages(false);
    }
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
      {/* Header */}
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

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-soft p-8">
        {errors.root && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{errors.root.message}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Slug */}
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

          {/* Title English */}
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

          {/* Title Chinese */}
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

          {/* Category */}
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

          {/* Keywords */}
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

          {/* Thumbnail Image Upload */}
          <div>
            <label htmlFor="thumbnailImage" className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail Image Upload
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Upload a thumbnail image for the blog card preview. Recommended size: 800x600px.
            </p>
            <input
              id="thumbnailFile"
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent"
            />
            {thumbnailPreview && (
              <div className="mt-3">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-48 h-32 object-cover rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>

          {/* Thumbnail URL (Manual Entry - Optional) */}
          <div>
            <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail URL (optional - manual entry)
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Alternatively, you can manually enter a thumbnail URL if you prefer not to upload.
            </p>
            <input
              id="thumbnailUrl"
              type="text"
              {...register('thumbnailUrl')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              placeholder="/path-to-image.jpg"
            />
          </div>

          {/* Header Image Upload */}
          <div>
            <label htmlFor="headerImage" className="block text-sm font-medium text-gray-700 mb-2">
              Main Header Image (optional)
            </label>
            <p className="text-sm text-gray-500 mb-2">
              This image will be displayed at the top of the blog post page.
            </p>
            <input
              id="headerImageFile"
              type="file"
              accept="image/*"
              onChange={handleHeaderImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent"
            />
            {headerImagePreview && (
              <div className="mt-3">
                <img
                  src={headerImagePreview}
                  alt="Header preview"
                  className="w-full max-w-2xl h-48 object-cover rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>

          {/* Excerpt English */}
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

          {/* Excerpt Chinese */}
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

          {/* Content English */}
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

          {/* Content Chinese */}
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

        {/* Submit Button */}
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
            disabled={createMutation.isPending || isUploadingImages}
            className="flex items-center space-x-2 px-6 py-3 bg-primary-gold text-white font-semibold rounded-lg hover:bg-primary-gold-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            <span>
              {createMutation.isPending || isUploadingImages
                ? 'Creating...'
                : 'Create Post'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
