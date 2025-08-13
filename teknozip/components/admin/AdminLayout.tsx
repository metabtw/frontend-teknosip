'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden w-full md:w-auto">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
          <div className="h-full w-full max-w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;