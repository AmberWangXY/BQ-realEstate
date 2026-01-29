import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, Users, TrendingUp, Globe, FileText, Calendar } from 'lucide-react';
import { useEffect } from 'react';
import { useAdminStore } from '~/store/adminStore';
import { useTRPC } from '~/trpc/react';

export const Route = createFileRoute('/admin/_layout/traffic/')({
  component: TrafficAnalytics,
});

function TrafficAnalytics() {
  const trpc = useTRPC();
  const token = useAdminStore((state) => state.token);
  const navigate = useNavigate();
  const clearToken = useAdminStore((state) => state.clearToken);

  const analyticsQuery = useQuery(
    trpc.traffic.getAnalytics.queryOptions({ token: token! })
  );

  // Handle authentication errors
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
      name: 'Total Visits',
      value: analyticsQuery.data?.totalVisits || 0,
      icon: BarChart3,
      color: 'bg-blue-500',
    },
    {
      name: "Today's Visits",
      value: analyticsQuery.data?.todayVisits || 0,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      name: 'Unique Visitors',
      value: analyticsQuery.data?.uniqueVisitors || 0,
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      name: 'Top Countries',
      value: analyticsQuery.data?.topCountries.length || 0,
      icon: Globe,
      color: 'bg-orange-500',
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-navy mb-2">User Traffic Analytics</h1>
        <p className="text-gray-600">Monitor website visitor statistics</p>
      </div>

      {/* Loading State */}
      {analyticsQuery.isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-gold mx-auto"></div>
        </div>
      )}

      {/* Error State */}
      {analyticsQuery.isError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-800 text-center">Failed to load analytics data</p>
        </div>
      )}

      {/* Data Display */}
      {analyticsQuery.data && (
        <>
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
                  <p className="text-3xl font-bold text-navy">{stat.value.toLocaleString()}</p>
                </div>
              );
            })}
          </div>

          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Visits by Day Chart */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h2 className="text-xl font-bold text-navy mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Visits Last 30 Days
              </h2>
              <div className="space-y-2">
                {Object.entries(analyticsQuery.data.visitsByDay)
                  .sort(([a], [b]) => b.localeCompare(a))
                  .slice(0, 10)
                  .map(([date, count]) => {
                    const maxCount = Math.max(
                      ...Object.values(analyticsQuery.data.visitsByDay)
                    );
                    const percentage = (count / maxCount) * 100;

                    return (
                      <div key={date} className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600 w-20">{formatDate(date)}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                          <div
                            className="bg-primary-gold h-full flex items-center justify-end pr-2"
                            style={{ width: `${percentage}%` }}
                          >
                            <span className="text-xs font-semibold text-white">
                              {count}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Top Countries */}
            <div className="bg-white rounded-xl shadow-soft p-6">
              <h2 className="text-xl font-bold text-navy mb-6 flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Top Countries
              </h2>
              <div className="space-y-3">
                {analyticsQuery.data.topCountries.slice(0, 10).map((country, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium text-navy">{country.country}</span>
                    <span className="text-sm text-gray-600">{country.count} visits</span>
                  </div>
                ))}
                {analyticsQuery.data.topCountries.length === 0 && (
                  <p className="text-center text-gray-500 py-4">No country data yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Top Pages */}
          <div className="bg-white rounded-xl shadow-soft p-6 mb-8">
            <h2 className="text-xl font-bold text-navy mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Top Pages
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Page
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                      Visits
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {analyticsQuery.data.topPages.map((page, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-navy">{page.page}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 text-right">
                        {page.count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Visits */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h2 className="text-xl font-bold text-navy mb-6">Recent Visits</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Page
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {analyticsQuery.data.recentVisits.slice(0, 20).map((visit) => (
                    <tr key={visit.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {formatDateTime(visit.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-sm text-navy">
                        {[visit.city, visit.region, visit.country]
                          .filter(Boolean)
                          .join(', ') || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{visit.page}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
