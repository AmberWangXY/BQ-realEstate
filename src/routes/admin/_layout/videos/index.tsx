import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, Edit, Film, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAdminStore } from '~/store/adminStore';
import { useTRPC } from '~/trpc/react';

export const Route = createFileRoute('/admin/_layout/videos/')({
  component: VideoManagement,
});

function VideoManagement() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const token = useAdminStore((state) => state.token);
  const clearToken = useAdminStore((state) => state.clearToken);
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const videosQuery = useQuery(
    trpc.admin.video.getAll.queryOptions({ token: token! })
  );

  // Handle authentication errors
  useEffect(() => {
    if (videosQuery.isError && videosQuery.error) {
      const error = videosQuery.error as any;
      if (error?.data?.code === 'UNAUTHORIZED' || error?.message?.includes('Invalid or expired token')) {
        clearToken();
        navigate({ to: '/admin' });
      }
    }
  }, [videosQuery.isError, videosQuery.error, clearToken, navigate]);

  const deleteMutation = useMutation(
    trpc.admin.video.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.admin.video.getAll.queryKey() });
        setDeleteConfirm(null);
      },
      onError: (error: any) => {
        if (error?.data?.code === 'UNAUTHORIZED' || error?.message?.includes('Invalid or expired token')) {
          clearToken();
          navigate({ to: '/admin' });
          return;
        }
        setDeleteConfirm(null);
      },
    })
  );

  const handleDelete = (id: number) => {
    deleteMutation.mutate({ token: token!, id });
  };

  const categoryNames: Record<string, string> = {
    'buying': 'Buying',
    'selling': 'Selling',
    'tips': 'Tips & Insights',
  };

  const categoryColors: Record<string, string> = {
    'buying': 'bg-blue-100 text-blue-800',
    'selling': 'bg-green-100 text-green-800',
    'tips': 'bg-purple-100 text-purple-800',
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="md:flex md:items-start md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-navy mb-2">Video Management</h1>
            <p className="text-gray-600">Manage videos for the homepage Video Library section</p>
          </div>
          {/* Desktop Create Button */}
          <Link
            to="/admin/videos/create"
            className="hidden md:flex items-center space-x-2 px-6 py-3 bg-primary-gold text-white font-semibold rounded-lg hover:bg-primary-gold-dark transition-colors shadow-soft hover:shadow-soft-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Add New Video</span>
          </Link>
        </div>
        {/* Mobile Create Button */}
        <Link
          to="/admin/videos/create"
          className="md:hidden flex items-center justify-center space-x-2 px-6 py-3 bg-primary-gold text-white font-semibold rounded-lg hover:bg-primary-gold-dark transition-colors shadow-soft hover:shadow-soft-lg w-full"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Video</span>
        </Link>
      </div>

      {/* Videos List */}
      {videosQuery.isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-gold mx-auto"></div>
        </div>
      ) : videosQuery.isError ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-800 text-center">Failed to load videos</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-xl shadow-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {videosQuery.data?.map((video) => (
                    <tr key={video.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={video.coverImageUrl}
                            alt={video.titleEn}
                            className="w-20 h-12 object-cover rounded"
                          />
                          <div className="max-w-xs">
                            <p className="font-medium text-navy truncate">{video.titleEn}</p>
                            <p className="text-sm text-gray-500 truncate">{video.titleZh}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${categoryColors[video.category]}`}>
                          {categoryNames[video.category]}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {video.duration}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {video.views}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {video.displayOrder}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to="/admin/videos/$id/edit"
                            params={{ id: video.id.toString() }}
                            className="inline-flex items-center space-x-1 px-3 py-2 text-primary-gold hover:bg-primary-gold/10 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            <span className="text-sm font-medium">Edit</span>
                          </Link>
                          <button
                            onClick={() => setDeleteConfirm(video.id)}
                            className="inline-flex items-center space-x-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm font-medium">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {videosQuery.data?.length === 0 && (
              <div className="text-center py-12">
                <Film className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No videos yet</p>
              </div>
            )}
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {videosQuery.data?.map((video) => (
              <div key={video.id} className="bg-white rounded-xl shadow-soft p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <img
                    src={video.coverImageUrl}
                    alt={video.titleEn}
                    className="w-24 h-16 object-cover rounded flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-navy text-sm mb-1 line-clamp-2">
                      {video.titleEn}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-1 mb-2">
                      {video.titleZh}
                    </p>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${categoryColors[video.category]}`}>
                      {categoryNames[video.category]}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3 pb-3 border-b border-gray-100">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {video.duration}
                  </span>
                  <span>{video.views}</span>
                  <span className="text-xs">Order: {video.displayOrder}</span>
                </div>

                <div className="flex space-x-2">
                  <Link
                    to="/admin/videos/$id/edit"
                    params={{ id: video.id.toString() }}
                    className="flex-1 inline-flex items-center justify-center space-x-1 px-3 py-2 text-primary-gold bg-primary-gold/10 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => setDeleteConfirm(video.id)}
                    className="flex-1 inline-flex items-center justify-center space-x-1 px-3 py-2 text-red-600 bg-red-50 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}

            {videosQuery.data?.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl">
                <Film className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No videos yet</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-navy mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this video? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleteMutation.isPending}
                className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
