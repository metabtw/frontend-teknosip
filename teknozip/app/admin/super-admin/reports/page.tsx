// app/admin/super-admin/reports/page.tsx
'use client';

import React, { useState } from 'react';

const SuperAdminReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState('companies');

  const reports = [
    { id: 'companies', name: 'Şirket Raporları' },
    { id: 'jobs', name: 'İlan Raporları' },
    { id: 'users', name: 'Kullanıcı Raporları' },
    { id: 'revenue', name: 'Gelir Raporları' }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Raporlar</h1>
        <p className="mt-1 text-sm text-gray-500">
          Sistem istatistikleri ve raporlarını görüntüleyin
        </p>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {reports.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`${
                  selectedReport === report.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {report.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {selectedReport === 'companies' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Şirket Raporları</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900">Yeni Kayıtlar</h3>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">12</p>
                  <p className="mt-1 text-sm text-gray-500">Bu ay</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900">Aktif Şirketler</h3>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">85</p>
                  <p className="mt-1 text-sm text-gray-500">Toplam</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900">Ortalama Deneyim</h3>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">7 yıl</p>
                  <p className="mt-1 text-sm text-gray-500">Tüm şirketler</p>
                </div>
              </div>
            </div>
          )}

          {selectedReport === 'jobs' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">İlan Raporları</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900">Toplam İlan</h3>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">156</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900">Aktif İlan</h3>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">98</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900">Tam Zamanlı</h3>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">67</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900">Yarı Zamanlı</h3>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">31</p>
                </div>
              </div>
            </div>
          )}

          {selectedReport === 'users' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Kullanıcı Raporları</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Kullanıcı İstatistikleri</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Süper Admin</span>
                      <span>1</span>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Şirket Admin</span>
                      <span>85</span>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Çalışan</span>
                      <span>1,247</span>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedReport === 'revenue' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Gelir Raporları</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Aylık Gelir</h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">₺45,678</p>
                <p className="mt-1 text-sm text-gray-500">Ocak 2024</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminReportsPage;