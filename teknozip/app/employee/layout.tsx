'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import RoleBasedWrapper from '@/components/admin/RoleBasedWrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Clock, CalendarDays, UserCircle, Bell, HelpCircle, Menu, X } from 'lucide-react';


const EmployeeLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/employee/dashboard',
      icon: LayoutDashboard
    },
    {
      title: 'Mesai Bildirimleri',
      href: '/employee/overtime',
      icon: Clock
    },
    {
      title: 'İzin Talepleri',
      href: '/employee/leave-requests',
      icon: CalendarDays
    },
    {
      title: 'Profil',
      href: '/employee/profile',
      icon: UserCircle
    },
    {
      title: 'Duyurular',
      href: '/employee/announcements',
      icon: Bell
    },
    {
      title: 'Destek',
      href: '/employee/support',
      icon: HelpCircle
    }
  ];

  return (
    <RoleBasedWrapper allowedRoles={['employee']}>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-40`}
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Çalışan Paneli</h1>
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-64">
          <div className="p-6">
            {children}
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </RoleBasedWrapper>
  );
};

export default EmployeeLayout;