'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ForbiddenPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleGoHome = () => {
    if (user) {
      // Kullanıcının rolüne göre ana sayfasına yönlendir
      switch (user.role) {
        case 'superadmin':
          router.push('/admin/dashboard');
          break;
        case 'companyadmin':
          router.push('/company-admin/dashboard');
          break;
        case 'employee':
          router.push('/employee/dashboard');
          break;
        default:
          router.push('/auth/login');
      }
    } else {
      router.push('/auth/login');
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-9xl font-bold text-red-500">403</h1>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Erişim Reddedildi
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Bu sayfaya erişim yetkiniz bulunmamaktadır.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Ana Sayfaya Dön
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  );
}