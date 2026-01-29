import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Lock, ShieldCheck } from 'lucide-react';
import { useAdminStore } from '~/store/adminStore';
import { useTRPC } from '~/trpc/react';

export const Route = createFileRoute('/admin/')({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const trpc = useTRPC();
  const setToken = useAdminStore((state) => state.setToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<{ password: string }>();

  const loginMutation = useMutation(
    trpc.admin.login.mutationOptions({
      onSuccess: (data) => {
        setToken(data.token);
        navigate({ to: '/admin/dashboard' });
      },
      onError: (error) => {
        setError('password', {
          type: 'manual',
          message: error.message || 'Invalid password',
        });
      },
    })
  );

  const onSubmit = ({ password }: { password: string }) => {
    loginMutation.mutate({ password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-navy flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-gold rounded-full mb-4">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-gray-400">Bill Qin Real Estate Admin Panel</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-gold focus:border-transparent transition-shadow"
                  placeholder="Enter admin password"
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full py-3 px-4 bg-primary-gold text-white font-semibold rounded-lg hover:bg-primary-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Protected area - Authorized access only
        </p>
      </div>
    </div>
  );
}
