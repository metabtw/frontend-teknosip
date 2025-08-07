'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

type RoleBasedWrapperProps = {
  children: React.ReactNode;
  allowedRoles: Array<'superadmin' | 'companyadmin' | 'employee'>;
};

const RoleBasedWrapper = ({ children, allowedRoles }: RoleBasedWrapperProps) => {
  const { user, loading, isTokenValid } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Token geçerliliğini kontrol et
    if (!loading) {
      if (!user || !isTokenValid()) {
        router.push('/auth/login');
        return;
      }
      
      // Rol kontrolü
      if (!allowedRoles.includes(user.role)) {
        router.push('/403');
        return;
      }
    }
  }, [user, loading, router, allowedRoles, isTokenValid]);

  if (loading || !user) {
    return <LoadingSpinner />;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Yetkisiz Erişim</h2>
          <p className="text-gray-700 mb-6">
            Bu sayfaya erişim izniniz bulunmamaktadır.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleBasedWrapper;