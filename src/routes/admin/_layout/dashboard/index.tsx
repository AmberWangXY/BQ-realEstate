import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { FileText, BarChart3, TrendingUp, Users } from 'lucide-react';
import { useEffect } from 'react';
import { useAdminStore } from '~/store/adminStore';
import { useTRPC } from '~/trpc/react';

export const Route = createFileRoute('/admin/_layout/dashboard/')({
  component: Dashboard,
});

function Dashboard() {
  const trpc = useTRPC();
  const token = useAdminStore((state) => state.token);
  const navigate = useNavigate();
  const clearToken = useAdminStore((state) => state.clearToken);

  const blogPostsQuery = useQuery(
    trpc.admin.blog.getAll.queryOptions({ token: token! })
  );

  const analyticsQuery = useQuery(
    trpc.traffic.getAnalytics.queryOptions({ token: token! })
  );

  // Handle authentication errors for blog posts query
  useEffect(() => {
    if (blogPostsQuery.isError && blogPostsQuery.error) {
      const error = blogPostsQuery.error as any;
      if (error?.data?.code === 'UNAUTHORIZED' || error?.message?.includes('Invalid or expired token')) {
        clearToken();
        navigate({ to: '/admin' });
      }
    }
  }, [blogPostsQuery.isError, blogPostsQuery.error, clearToken, navigate]);

  // Handle authentication errors for analytics query
  useEffect(() => {
    if (analyticsQuery.isError && analyticsQuery.error) {
      const error = analyticsQuery.error as any;
      if (error?.data?.code === 'UNAUTHORIZED' || error?.message?.includes('Invalid or expired token')) {
        clearToken();
        navigate({ to: '/admin' });
      }
    }
  }, [analyticsQuery.isError, analyticsQuery.error, clearToken, navigate]);

  const stats = [
    {
      name: 'Total Blog Posts',
      value: blogPostsQuery.data?.length || 0,
      icon: FileText,
      color: 'bg-blue-500',
      loading: blogPostsQuery.isLoading,
    },
    {
      name: 'Total Visits',
      value: analyticsQuery.data?.totalVisits || 0,
      icon: BarChart3,
      color: 'bg-green-500',
      loading: analyticsQuery.isLoading,
    },
    {
      name: "Today's Visits",
      value: analyticsQuery.data?.todayVisits || 0,
      icon: TrendingUp,
      color: 'bg-purple-500',
      loading: analyticsQuery.isLoading,
    },
    {
      name: 'Unique Visitors',
      value: analyticsQuery.data?.uniqueVisitors || 0,
      icon: Users,
      color: 'bg-orange-500',
      loading: analyticsQuery.isLoading,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-navy mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to the admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-xl shadow-soft p-6 hover:shadow-soft-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.name}</h3>
              {stat.loading ? (
                <div className="h-8 bg-gray-200 rounded animate-pulse" />
              ) : (
                <p className="text-3xl font-bold text-navy">{stat.value.toLocaleString()}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h2 className="text-xl font-bold text-navy mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a
              href="/admin/blog/create"
              className="block p-4 bg-primary-gold/10 hover:bg-primary-gold/20 rounded-lg transition-colors"
            >
              <h3 className="font-semibold text-navy">Create New Blog Post</h3>
              <p className="text-sm text-gray-600 mt-1">Add a new article to the blog</p>
            </a>
            <a
              href="/admin/blog"
              className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <h3 className="font-semibold text-navy">Manage Blog Posts</h3>
              <p className="text-sm text-gray-600 mt-1">Edit or delete existing posts</p>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6">
          <h2 className="text-xl font-bold text-navy mb-4">Recent Activity</h2>
          {analyticsQuery.isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {analyticsQuery.data?.topPages.slice(0, 3).map((page, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-navy truncate">{page.page}</p>
                  <p className="text-xs text-gray-600 mt-1">{page.count} visits</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
