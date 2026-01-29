import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { LayoutDashboard, FileText, BarChart3, LogOut, Menu, X, Video } from 'lucide-react';
import { useState } from 'react';
import { useAdminStore } from '~/store/adminStore';

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const clearToken = useAdminStore((state) => state.clearToken);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    clearToken();
    navigate({ to: '/admin' });
  };

  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Blog Management',
      href: '/admin/blog',
      icon: FileText,
    },
    {
      name: 'Video Management',
      href: '/admin/videos',
      icon: Video,
    },
    {
      name: 'User Traffic',
      href: '/admin/traffic',
      icon: BarChart3,
    },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-navy text-primary-gold hover:bg-navy-light transition-colors shadow-lg"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-navy shadow-xl z-40 transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="p-6 border-b border-navy-light">
            <h1 className="text-2xl font-bold text-primary-gold">Admin Panel</h1>
            <p className="text-sm text-gray-400 mt-1">Bill Qin Real Estate</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                    ${
                      active
                        ? 'bg-primary-gold text-white font-semibold'
                        : 'text-gray-300 hover:bg-navy-light hover:text-primary-gold'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-navy-light">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
