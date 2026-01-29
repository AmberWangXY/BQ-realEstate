import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { AdminSidebar } from '~/components/admin/AdminSidebar';
import { useAdminStore } from '~/store/adminStore';

export const Route = createFileRoute('/admin/_layout')({
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const token = useAdminStore((state) => state.token);
  const clearToken = useAdminStore((state) => state.clearToken);

  // Redirect to login if no token
  useEffect(() => {
    if (!token) {
      navigate({ to: '/admin' });
    }
  }, [token, navigate]);

  // Don't render anything if not authenticated
  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cream">
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="lg:pl-64">
        <main className="min-h-screen p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
