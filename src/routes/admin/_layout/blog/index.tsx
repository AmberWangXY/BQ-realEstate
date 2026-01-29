import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, Calendar, Tag, Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAdminStore } from '~/store/adminStore';
import { useTRPC } from '~/trpc/react';

export const Route = createFileRoute('/admin/_layout/blog/')({
  component: BlogManagement,
});

function BlogManagement() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const token = useAdminStore((state) => state.token);
  const clearToken = useAdminStore((state) => state.clearToken);
  const navigate = useNavigate();
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const postsQuery = useQuery(
    trpc.admin.blog.getAll.queryOptions({ token: token! })
  );

  // Handle authentication errors
  useEffect(() => {
    if (postsQuery.isError && postsQuery.error) {
      const error = postsQuery.error as any;
      // If we get an unauthorized error, clear the token and redirect to login
      if (error?.data?.code === 'UNAUTHORIZED' || error?.message?.includes('Invalid or expired token')) {
        clearToken();
        navigate({ to: '/admin' });
      }
    }
  }, [postsQuery.isError, postsQuery.error, clearToken, navigate]);

  const deleteMutation = useMutation(
    trpc.admin.blog.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.admin.blog.getAll.queryKey() });
        setDeleteConfirm(null);
      },
      onError: (error: any) => {
        // Check for auth errors
        if (error?.data?.code === 'UNAUTHORIZED' || error?.message?.includes('Invalid or expired token')) {
          clearToken();
          navigate({ to: '/admin' });
          return;
        }
        // For other errors, just close the modal and let the user try again
        setDeleteConfirm(null);
      },
    })
  );

  const handleDelete = (id: number) => {
    deleteMutation.mutate({ token: token!, id });
  };

  const categoryNames: Record<string, string> = {
    'buying-tips': 'Buying Tips',
    'selling-strategies': 'Selling Strategies',
    'market-insights': 'Market Insights',
    'investment-guide': 'Investment Guide',
    'property-management': 'Property Management',
    'financing-loans': 'Successful Story',
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="md:flex md:items-start md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl font-bold text-navy mb-2">Blog Management</h1>
            <p className="text-gray-600">Manage all blog posts</p>
          </div>
          {/* Desktop Create Button */}
          <Link
            to="/admin/blog/create"
            className="hidden md:flex items-center space-x-2 px-6 py-3 bg-primary-gold text-white font-semibold rounded-lg hover:bg-primary-gold-dark transition-colors shadow-soft hover:shadow-soft-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Post</span>
          </Link>
        </div>
        {/* Mobile Create Button */}
        <Link
          to="/admin/blog/create"
          className="md:hidden flex items-center justify-center space-x-2 px-6 py-3 bg-primary-gold text-white font-semibold rounded-lg hover:bg-primary-gold-dark transition-colors shadow-soft hover:shadow-soft-lg w-full"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Post</span>
        </Link>
      </div>

      {/* Posts List */}
      {postsQuery.isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-gold mx-auto"></div>
        </div>
      ) : postsQuery.isError ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-800 text-center">Failed to load blog posts</p>
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
                      Slug
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Published
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {postsQuery.data?.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <p className="font-medium text-navy truncate">{post.titleEn}</p>
                          <p className="text-sm text-gray-500 truncate">{post.titleZh}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {post.slug}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 bg-primary-gold/10 text-primary-gold text-xs font-semibold rounded-full">
                          <Tag className="w-3 h-3 mr-1" />
                          {categoryNames[post.category] || post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center text-sm text-gray-600">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(post.publishDate)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to="/admin/blog/$id/edit"
                            params={{ id: post.id.toString() }}
                            className="inline-flex items-center space-x-1 px-3 py-2 text-primary-gold hover:bg-primary-gold/10 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            <span className="text-sm font-medium">Edit</span>
                          </Link>
                          <button
                            onClick={() => setDeleteConfirm(post.id)}
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

            {postsQuery.data?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No blog posts yet</p>
              </div>
            )}
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {postsQuery.data?.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-soft p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-navy text-base mb-1 line-clamp-2">
                    {post.titleEn}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-1 mb-2">
                    {post.titleZh}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="inline-flex items-center px-2 py-1 bg-primary-gold/10 text-primary-gold text-xs font-semibold rounded-full">
                      <Tag className="w-3 h-3 mr-1" />
                      {categoryNames[post.category] || post.category}
                    </span>
                    <span className="inline-flex items-center text-xs text-gray-600">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(post.publishDate)}
                    </span>
                  </div>
                </div>
                
                <div className="mb-3 pb-3 border-b border-gray-100">
                  <code className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded break-all">
                    {post.slug}
                  </code>
                </div>

                <div className="flex space-x-2">
                  <Link
                    to="/admin/blog/$id/edit"
                    params={{ id: post.id.toString() }}
                    className="flex-1 inline-flex items-center justify-center space-x-1 px-3 py-2 text-primary-gold bg-primary-gold/10 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => setDeleteConfirm(post.id)}
                    className="flex-1 inline-flex items-center justify-center space-x-1 px-3 py-2 text-red-600 bg-red-50 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}

            {postsQuery.data?.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl">
                <p className="text-gray-500">No blog posts yet</p>
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
              Are you sure you want to delete this blog post? This action cannot be undone.
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
