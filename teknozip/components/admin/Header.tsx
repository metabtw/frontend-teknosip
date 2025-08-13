'use client';

import { useAuth } from '@/context/AuthContext';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const { user } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-gradient-to-b from-slate-900 to-slate-800 border-b border-slate-700 h-16 flex items-center justify-between px-4 md:px-6 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center gap-3 md:gap-6 flex-1">
        <button
          onClick={toggleSidebar}
          className="text-slate-300 hover:text-white md:hidden focus:outline-none p-2 rounded-lg hover:bg-slate-700 transition-all duration-200"
        >
          <Icon icon="solar:hamburger-menu-bold" className="h-5 w-5" />
        </button>
        
        <div className="relative max-w-md w-full hidden sm:block">
          <div className="relative">
            <Icon icon="solar:magnifer-bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Ara..."
              className="w-full pl-10 pr-4 py-2.5 text-sm text-slate-200 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Bildirimler */}
        <button className="relative p-2 text-slate-300 hover:text-white focus:outline-none rounded-lg hover:bg-slate-700 transition-all duration-200 group">
          <Icon icon="solar:bell-bold" className="h-5 w-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-400 rounded-full animate-ping"></span>
        </button>

        {/* Kullanıcı Profili */}
        {user && (
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-700 transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Icon icon="solar:user-bold" className="h-4 w-4 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-semibold text-white">{user?.name}</div>
                <div className="text-xs text-slate-300 capitalize">{user?.role?.replace('-', ' ')}</div>
              </div>
              <Icon icon="solar:alt-arrow-down-bold" className="h-4 w-4 text-slate-400 group-hover:text-slate-200 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            
            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-xl shadow-lg border border-slate-600 py-2 z-50">
                <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 transition-colors">
                  <Icon icon="solar:user-bold" className="h-4 w-4" />
                  Profil
                </Link>
                <Link href="/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-200 hover:bg-slate-700 transition-colors">
                  <Icon icon="solar:settings-bold" className="h-4 w-4" />
                  Ayarlar
                </Link>
                <hr className="my-2 border-slate-600" />
                <button className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-900/30 transition-colors w-full text-left">
                  <Icon icon="solar:logout-bold" className="h-4 w-4" />
                  Çıkış Yap
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}