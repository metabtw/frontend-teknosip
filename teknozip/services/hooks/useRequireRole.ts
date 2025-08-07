'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './useAuth';

export const useRequireRole = (requiredRole: string) => {
  const { role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!role) {
      router.push('/auth');
    } else if (role !== requiredRole) {
      router.push('/403');
    }
  }, [role, loading, requiredRole, router]);

  return { role, loading };
};