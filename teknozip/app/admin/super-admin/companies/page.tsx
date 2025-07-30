// app/admin/super-admin/companies/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getActiveCompanies, getPendingCompanies } from '@/utils/api';
import ActiveCompanyCard from '@/components/ActiveCompanyCard';
import PendingCompanyCard from '@/components/PendingCompanyCard';

const SuperAdminCompaniesPage = () => {
  const { token, refreshAuth } = useAuth();
  const [activeCompanies, setActiveCompanies] = useState<any[]>([]);
  const [pendingCompanies, setPendingCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'pending'>('active');

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [activeResponse, pendingResponse] = await Promise.all([
        getActiveCompanies(token!),
        getPendingCompanies(token!)
      ]);

      if (activeResponse.isSuccess) {
        setActiveCompanies(activeResponse.data);
      }

      if (pendingResponse.isSuccess) {
        setPendingCompanies(pendingResponse.data);
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
      // Onaylama işlemi için API çağrısı yapılacak
      fetchData(); // Verileri yeniden yükle
      alert('Şirket başarıyla onaylandı!');
    } catch (err: any) {
      alert(err.message || 'Şirket onaylanırken hata oluştu');
    }
  };

  const handleRejectCompany = async (companyId: string) => {
    try {
      // Reddetme işlemi için API çağrısı yapılacak
      fetchData(); // Verileri yeniden yükle
      alert('Şirket başarıyla reddedildi!');
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Şirket Yönetimi</h1>
        <p className="mt-1 text-sm text-gray-500">
          Tüm şirketleri görüntüleyin ve yönetin
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('active')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'active'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Aktif Şirketler ({activeCompanies.length})
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'pending'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Bekleyen Şirketler ({pendingCompanies.length})
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'active' ? (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Aktif Şirketler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCompanies.length > 0 ? (
              activeCompanies.map((company) => (
                <ActiveCompanyCard key={company.id} company={company} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center py-8">
                Aktif şirket bulunmamaktadır.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Bekleyen Şirketler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <p className="text-gray-500 col-span-full text-center py-8">
                Bekleyen şirket bulunmamaktadır.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminCompaniesPage;