import { useAuth } from '@/context/AuthContext';
import { Icon } from '@iconify/react';
import Link from 'next/link';

type HeaderProps = {
  toggleSidebar: () => void;
};

export default function Header({ toggleSidebar }: HeaderProps) {
  const { user } = useAuth();

  return (
    <div className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-20">
      <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-600 lg:hidden focus:outline-none"
          >
            <Icon icon="solar:hamburger-menu-bold" className="h-6 w-6" />
          </button>
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
            Ana Sayfa
          </Link>
          <div className="relative flex-1 max-w-lg">
            <div className="relative">
              <Icon icon="solar:magnifer-bold" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Ara..."
                className="w-full pl-10 pr-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative text-gray-500 hover:text-gray-600 focus:outline-none">
            <Icon icon="solar:bell-bold" className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {user && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                <Icon icon="solar:user-bold" className="h-5 w-5 text-blue-600" />
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                <div className="text-xs text-gray-500 capitalize">{user?.role?.replace('-', ' ')}</div>
              </div>
            </div>
          )}
    </div>
    </div>
    );
}