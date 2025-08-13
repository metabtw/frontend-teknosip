'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const { user, logout } = useAuth();
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const getMenuItems = () => {
    const commonItems = [
      { name: 'AnaSayfa', href: '/', icon: 'solar:home-2-bold' },
    ];

    if (user?.role === 'superadmin') {
      return [
        ...commonItems,
        { name: 'Dashboard', href: '/admin/dashboard', icon: 'solar:chart-bold' },
        { name: 'Şirketler', href: '/admin/companies', icon: 'solar:buildings-bold' },
        { name: 'Kurumlar', href: '/admin/institutions', icon: 'solar:buildings-bold' },
        { name: 'Kategoriler', href: '/admin/categories', icon: 'solar:folder-bold' },
        { name: 'Destek Talepleri', href: '/admin/support-requests', icon: 'solar:chat-square-call-bold' },
        { name: 'İlanlar', href: '/admin/job-postings', icon: 'solar:document-bold' },
        { name: 'Kullanıcılar', href: '/admin/users', icon: 'solar:users-group-rounded-bold' },
      ];
    }

    if (user?.role === 'companyadmin') {
      return [
        ...commonItems,
        { name: 'Dashboard', href: '/companyadmin/dashboard', icon: 'solar:chart-bold' },
        { name: 'Çalışanlar', href: '/companyadmin/employees', icon: 'solar:users-group-two-rounded-bold' },
        { name: 'Duyurular', href: '/companyadmin/announcements', icon: 'solar:bell-bold' },
        { name: 'İlanlar', href: '/companyadmin/job-postings', icon: 'solar:document-bold' },
      ];
    }

    if (user?.role === 'employee') {
      return [
        ...commonItems,
        { name: 'Dashboard', href: '/employee/dashboard', icon: 'solar:chart-bold' },
        { name: 'Görevler', href: '/employee/tasks', icon: 'solar:clipboard-list-bold' },
      ];
    }

    return commonItems;
  };

  const menuItems = getMenuItems();

  return (
    <aside 
      className={`bg-gradient-to-b from-slate-900 to-slate-800 w-64 border-r border-slate-700 h-full flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static z-30 shadow-xl md:shadow-none`}
    >
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl w-10 h-10 flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-bold">T</span>
          </div>
          <span className="ml-3 text-xl font-bold text-white">TEKNOSİP</span>
        </div>
        <button
          onClick={toggleSidebar}
          className="md:hidden absolute top-4 right-4 text-slate-400 hover:text-white focus:outline-none transition-colors"
        >
          <Icon icon="solar:close-circle-bold" className="w-6 h-6" />
        </button>
      </div>

      {user && (
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-center">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
              <Icon icon="solar:user-bold" className="w-5 h-5 text-white" />
            </div>
            {isExpanded && (
              <div className="ml-3 transition-opacity duration-300">
                <p className="text-sm font-semibold text-white">{user.name}</p>
                {user.companyName && (
                  <p className="text-xs text-slate-300">{user.companyName}</p>
                )}
                <div className="mt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                    {user?.role?.replace('-', ' ')}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto py-6 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center px-3 py-3 mb-2 text-sm font-medium rounded-xl text-slate-300 bg-slate-700/50"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-700">
              <Icon icon={item.icon} className="w-5 h-5" />
            </div>
            <span className="ml-3 font-semibold">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button 
          onClick={logout}
          className="group flex items-center justify-center w-full px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-slate-300 hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600 hover:text-white hover:shadow-lg hover:scale-105 active:scale-95"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-700 group-hover:bg-white/20 transition-colors duration-200">
            <Icon icon="solar:logout-bold" className="w-5 h-5" />
          </div>
          {isExpanded && (
            <span className="ml-3 font-semibold transition-opacity duration-300">Çıkış Yap</span>
          )}
          {!isExpanded && (
            <div className="absolute left-16 bg-slate-800 text-white px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg border border-slate-600">
              Çıkış Yap
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}