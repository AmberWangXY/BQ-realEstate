import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save } from 'lucide-react';
import { useAdminStore } from '~/store/adminStore';
import { useTRPC } from '~/trpc/react';

export const Route = createFileRoute('/admin/_layout/videos/create/')({
  component: CreateVideo,
});

interface VideoForm {
  titleEn: string;
  titleZh: string;
  videoUrl: string;
  category: 'buying' | 'selling' | 'tips';
  coverImageUrl: string;
  duration: string;
  views: string;
  displayOrder: number;
}

function CreateVideo() {
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
  } = useForm<VideoForm>({
    defaultValues: {
      displayOrder: 0,
    },
  });

  const createMutation = useMutation(
    trpc.admin.video.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.admin.video.getAll.queryKey() });
        navigate({ to: '/admin/videos' });
      },
      onError: (error: any) => {
        if (error?.data?.code === 'UNAUTHORIZED' || error?.message?.includes('Invalid or expired token')) {
          clearToken();
          navigate({ to: '/admin' });
          return;
        }

        setError('root', {
          type: 'manual',
          message: error.message || 'Failed to create video',
        });
      },
    })
  );

  const onSubmit = (data: VideoForm) => {
    const coverImageUrl = data.coverImageUrl?.trim();
    if (!coverImageUrl) {
      setError('coverImageUrl', { type: 'manual', message: 'Cover image URL is required' });
      return;
    }
    if (!/^https?:\/\//.test(coverImageUrl)) {
      setError('coverImageUrl', { type: 'manual', message: 'Must be a valid http or https URL' });
      return;
    }

    createMutation.mutate({
      token: token!,
      ...data,
      coverImageUrl,
    });
  };

  const categories = [
    { value: 'buying', label: 'Buying' },
    { value: 'selling', label: 'Selling' },
    { value: 'tips', label: 'Tips & Insights' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => navigate({ to: '/admin/videos' })}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-navy mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Video Management</span>
        </button>
        <h1 className="text-4xl font-bold text-navy mb-2">Add New Video</h1>
        <p className="text-gray-600">Fill in the details to add a new video</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-soft p-8">
        {errors.root && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{errors.root.message}</p>
          </div>
        )}

        <div className="space-y-6">
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
            <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Video URL (YouTube) *
            </label>
            <input
              id="videoUrl"
              type="url"
              {...register('videoUrl', {
                required: 'Video URL is required',
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: 'Please enter a valid URL',
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              placeholder="https://www.youtube.com/watch?v=..."
            />
            {errors.videoUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.videoUrl.message}</p>
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

          {/* Cover Image URL */}
          <div>
            <label htmlFor="coverImageUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image URL (must be a publicly accessible URL) *
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Paste a public image URL for the video thumbnail. Recommended size: 800x450px (16:9).
            </p>
            <input
              id="coverImageUrl"
              type="text"
              {...register('coverImageUrl', { required: 'Cover image URL is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              placeholder="https://example.com/cover.jpg or https://images.unsplash.com/..."
            />
            {errors.coverImageUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.coverImageUrl.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
              Duration *
            </label>
            <input
              id="duration"
              type="text"
              {...register('duration', {
                required: 'Duration is required',
                pattern: {
                  value: /^\d{1,2}:\d{2}$/,
                  message: 'Duration must be in format MM:SS (e.g., 14:17)',
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              placeholder="e.g., 14:17"
            />
            {errors.duration && (
              <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="views" className="block text-sm font-medium text-gray-700 mb-2">
              Views *
            </label>
            <input
              id="views"
              type="text"
              {...register('views', { required: 'Views count is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              placeholder="e.g., 11K or 11K views"
            />
            {errors.views && (
              <p className="mt-1 text-sm text-red-600">{errors.views.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="displayOrder" className="block text-sm font-medium text-gray-700 mb-2">
              Display Order
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Lower numbers appear first. Use 0 for default ordering.
            </p>
            <input
              id="displayOrder"
              type="number"
              {...register('displayOrder', {
                valueAsNumber: true,
                min: { value: 0, message: 'Order must be 0 or greater' },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent"
              placeholder="0"
            />
            {errors.displayOrder && (
              <p className="mt-1 text-sm text-red-600">{errors.displayOrder.message}</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex space-x-4">
          <button
            type="button"
            onClick={() => navigate({ to: '/admin/videos' })}
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
            <span>{createMutation.isPending ? 'Creating...' : 'Create Video'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
