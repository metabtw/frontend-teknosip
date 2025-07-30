// app/admin/super-admin/dashboard.tsx (güncellenmiş versiyon)
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getPendingCompanies, getActiveCompanies, approveCompany, rejectCompany, getCompanyStats } from '@/utils/api';
import PendingCompanyCard from '@/components/PendingCompanyCard';
import ActiveCompanyCard from '@/components/ActiveCompanyCard';

interface CompanyStats {
  totalCompanies: number;
  activeCompanies: number;
  pendingCompanies: number;
  totalJobs: number;
}

const SuperAdminDashboard = () => {
  const { token, refreshAuth } = useAuth();
  const [pendingCompanies, setPendingCompanies] = useState<any[]>([]);
  const [activeCompanies, setActiveCompanies] = useState<any[]>([]);
  const [stats, setStats] = useState<CompanyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // İstatistikleri al
      try {
        const statsResponse = await getCompanyStats(token!);
        if (statsResponse.isSuccess) {
          setStats(statsResponse.data);
        }
      } catch (err) {
        console.log('İstatistikler alınamadı');
      }

      const [pendingResponse, activeResponse] = await Promise.all([
        getPendingCompanies(token!),
        getActiveCompanies(token!)
      ]);

      if (pendingResponse.isSuccess) {
        setPendingCompanies(pendingResponse.data);
      }

      if (activeResponse.isSuccess) {
        setActiveCompanies(activeResponse.data);
      }
    } catch (err: any) {
      if (err.message.includes('Unauthorized') || err.message.includes('401')) {
        try {
          await refreshAuth();
          fetchData();
        } catch (refreshError) {
          setError('Oturum süresi doldu. Lütfen tekrar giriş yapın.');
        }
      } else {
        setError(err.message || 'Veriler alınırken hata oluştu');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApproveCompany = async (companyId: string) => {
    try {
      const response = await approveCompany(companyId, token!);
      if (response.isSuccess) {
        fetchData(); // Verileri yeniden yükle
        alert('Şirket başarıyla onaylandı!');
      }
    } catch (err: any) {
      alert(err.message || 'Şirket onaylanırken hata oluştu');
    }
  };

  const handleRejectCompany = async (companyId: string) => {
    try {
      const response = await rejectCompany(companyId, token!);
      if (response.isSuccess) {
        fetchData(); // Verileri yeniden yükle
        alert('Şirket başarıyla reddedildi!');
      }
    } catch (err: any) {
      alert(err.message || 'Şirket reddedilirken hata oluştu');
    }
  };

  if (loading) {
    return <div className="p-6">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Hata: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Süper Admin Paneli</h1>
      
      {/* İstatistik Kartları */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Toplam Şirket</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.totalCompanies}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Aktif Şirket</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.activeCompanies}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Bekleyen Şirket</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.pendingCompanies}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Toplam İlan</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stats.totalJobs}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Onay Bekleyen Şirketler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingCompanies.length > 0 ? (
            pendingCompanies.map((company) => (
              <PendingCompanyCard 
                key={company.id} 
                company={company} 
                onApprove={handleApproveCompany}
                onReject={handleRejectCompany}
              />
            ))
          ) : (
            <p className="text-gray-500">Onay bekleyen şirket bulunmamaktadır.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Aktif Şirketler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeCompanies.length > 0 ? (
            activeCompanies.map((company) => (
              <ActiveCompanyCard key={company.id} company={company} />
            ))
          ) : (
            <p className="text-gray-500">Aktif şirket bulunmamaktadır.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;