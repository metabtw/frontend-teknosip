'use client';

import { ReactNode } from 'react';
import { useRequireRole } from '@/hooks/useRequireRole';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredRole 
}: ProtectedRouteProps) {
  const { loading } = useRequireRole(requiredRole);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}