'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth'; // Veya '@/context/AuthContext' → doğru importa dikkat

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, role, logout } = useAuth();

  const getDashboardLink = () => {
    if (role === 'Admin') return '/admin/dashboard';           // Süper admin
    if (role === 'CompanyAdmin') return '/admin/company-admin/dashboard'; // Şirket admini
    return '/user/dashboard'; // Varsayılan (isteğe bağlı)
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              TEKNOSİP
            </Link>
          </div>

          {/* Masaüstü Menü */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Anasayfa</Link>
            <Link href="/projeler" className="text-gray-700 hover:text-blue-600">Projeler</Link>
            <Link href="/sorunlar" className="text-gray-700 hover:text-blue-600">Sorunlar</Link>
            <Link href="/cozumler" className="text-gray-700 hover:text-blue-600">Çözümler</Link>
            <Link href="/kurumlar" className="text-gray-700 hover:text-blue-600">Kurumlar</Link>

            {user ? (
              <>
                <div className="text-sm text-gray-600">
                  Hoş geldin, <span className="font-medium">{user.email}</span>
                </div>
                <div className="text-sm text-gray-500">Rol: {role}</div>
                <Link 
                  href={getDashboardLink()} 
                  className="text-blue-600 hover:underline font-medium"
                >
                  Hesabım
                </Link>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                >
                  Çıkış
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Giriş
              </Link>
            )}
          </div>

          {/* Mobil Menü Butonu */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menüyü aç/kapat"
          >
            <i className="ri-menu-line text-xl"></i>
          </button>
        </div>

        {/* Mobil Menü */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="px-3 py-2 text-gray-700 hover:text-blue-600">Anasayfa</Link>
              <Link href="/projeler" className="px-3 py-2 text-gray-700 hover:text-blue-600">Projeler</Link>
              <Link href="/sorunlar" className="px-3 py-2 text-gray-700 hover:text-blue-600">Sorunlar</Link>
              <Link href="/cozumler" className="px-3 py-2 text-gray-700 hover:text-blue-600">Çözümler</Link>
              <Link href="/kurumlar" className="px-3 py-2 text-gray-700 hover:text-blue-600">Kurumlar</Link>

              {user ? (
                <>
                  <div className="px-3 text-sm text-gray-600">Hoş geldin, {user.email}</div>
                  <div className="px-3 text-sm text-gray-500">Rol: {role}</div>
                  <Link
                    href={getDashboardLink()}
                    className="px-3 text-blue-600 hover:underline font-medium"
                  >
                    Hesabım
                  </Link>
                  <button
                    onClick={logout}
                    className="mx-3 mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
                  >
                    Çıkış
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="mx-3 mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center text-sm"
                >
                  Giriş
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}