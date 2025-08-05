import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useAuth } from '@/context/AuthContext';

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    const commonItems = [
      { name: 'Dashboard', href: `/${user?.role}/dashboard`, icon: 'solar:chart-bold' },
    ];

    if (user?.role === 'super-admin') {
      return [
        ...commonItems,
        { name: 'Şirketler', href: '/admin/companies', icon: 'solar:buildings-bold' },
        { name: 'Kurumlar', href: '/admin/institutions', icon: 'solar:university-bold' },
        { name: 'Destek Talepleri', href: '/admin/support-requests', icon: 'solar:chat-square-call-bold' },
        { name: 'İlanlar', href: '/admin/job-postings', icon: 'solar:document-bold' },
        { name: 'Kullanıcılar', href: '/admin/users', icon: 'solar:users-group-rounded-bold' },
      ];
    }

    if (user?.role === 'company-admin') {
      return [
        ...commonItems,
        { name: 'Çalışanlar', href: '/company-admin/employees', icon: 'solar:users-group-two-rounded-bold' },
        { name: 'İlanlar', href: '/company-admin/job-postings', icon: 'solar:document-bold' },
      ];
    }

    if (user?.role === 'employee') {
      return [
        ...commonItems,
        { name: 'Görevler', href: '/employee/tasks', icon: 'solar:clipboard-list-bold' },
      ];
    }

    return commonItems;
  };

  const menuItems = getMenuItems();

  return (
    <aside className={`bg-white w-64 border-r border-gray-200 h-full flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static z-30`}
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="bg-blue-50 rounded-xl w-10 h-10 flex items-center justify-center">
            <span className="text-blue-600 text-xl font-bold">T</span>
          </div>
          <span className="ml-3 text-xl font-semibold text-gray-900">TEKNOSİP</span>
        </div>
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-500 hover:text-white focus:outline-none"
        >
          <Icon icon="solar:close-circle-bold" className="w-6 h-6" />
        </button>
      </div>

      <div className="p-4 border-b border-gray-100 bg-gray-50">
        {user && (
          <div className="flex items-center">
            <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-sm border border-gray-200">
              <Icon icon="solar:user-bold" className="w-5 h-5 text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              {user.companyName && (
                <p className="text-xs text-gray-400">{user.companyName}</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-6">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150 text-gray-600 hover:bg-gray-50 hover:text-blue-600"
          >
            <Icon icon={item.icon} className="w-5 h-5 mr-3" />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-100 bg-gray-50">
        <button 
          onClick={logout}
          className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-red-600 rounded-lg transition-colors duration-150"
        >
          <Icon icon="solar:logout-bold" className="w-5 h-5 mr-3" />
          <span className="font-medium">Çıkış Yap</span>
        </button>
      </div>
    </aside>
  );
}