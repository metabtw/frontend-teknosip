'use client';
import React from 'react';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Genel Bakış</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Son Eklenen İlanlar */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Son Eklenen İlanlar</h3>
          <p>Henüz hiç ilan eklenmedi.</p>
        </div>

        {/* Eklenen Çalışan Sayısı */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Eklenen Çalışan Sayısı</h3>
          <p>0 çalışan</p>
        </div>

        {/* Onay Bekleyen İşlemler */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Onay Bekleyen İşlemler</h3>
          <p>Henüz onay bekleyen işlem yok.</p>
        </div>

        {/* Hızlı Erişim Kutuları */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Hızlı Erişim</h3>
          <ul className="list-disc pl-5">
            <li>
              <a href="/admin/company-admin/announcements" className="text-blue-500 hover:text-blue-700">
                Yeni İlan Ekle
              </a>
            </li>
            <li>
              <a href="/admin/company-admin/employees" className="text-blue-500 hover:text-blue-700">
                Yeni Çalışan Ekle
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;