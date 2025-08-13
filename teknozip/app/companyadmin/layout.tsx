'use client';

import React from 'react';
import RoleBasedWrapper from '@/components/RoleBasedWrapper';
import AdminLayout from '@/components/admin/AdminLayout';

const CompanyAdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RoleBasedWrapper allowedRoles={['companyadmin']}>
      <AdminLayout>
        {children}
      </AdminLayout>
    </RoleBasedWrapper>
  );
};

export default CompanyAdminLayout;