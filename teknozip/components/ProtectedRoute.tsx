'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Roles } from '@/constants/roles';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: Roles[];
}

export default function ProtectedRoute({ children, allowedRoles = [] }: ProtectedRouteProps) {
  const router = useRouter();
  // TODO: Implement actual role-based authentication logic here
  const userRole = Roles.USER; // This should come from your auth context

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    router.push('/unauthorized');
    return null;
  }

  return <>{children}</>;
}