// app/admin/super-admin/jobs/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getAllJobs, deleteJob } from '@/utils/api';

interface Job {
  id: string;
  title: string;
  companyName: string;
  location: string;
  employmentType: string;
  salaryMin?: number;
  salaryMax?: number;
  createdAt: string;
  isActive: boolean;
}

const SuperAdminJobsPage = () => {
  const { token, refreshAuth } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchJobs();
    }
  }, [token]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await getAllJobs(token!);
      
      if (response.isSuccess) {
        setJobs(response.data);
      }
    } catch (err: any) {
      if (err.message.includes('Unauthorized') || err.message.includes('401')) {
        try {
          await refreshAuth();
          fetchJobs();
        } catch (refreshError) {
          setError('Oturum süresi doldu. Lütfen tekrar giriş yapın.');
        }
      } else {
        setError(err.message || 'İlanlar alınırken hata oluştu');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId: string, jobTitle: string) => {
    if (window.confirm(`"${jobTitle}" başlıklı ilanı silmek istediğinizden emin misiniz?`)) {
      try {
        const response = await deleteJob(jobId, token!);
        if (response.isSuccess) {
          fetchJobs(); // Verileri yeniden yükle
          alert('İlan başarıyla silindi!');
        }
      } catch (err: any) {
        alert(err.message || 'İlan silinirken hata oluştu');
      }
    }
  };

  const handleToggleStatus = async (jobId: string, currentStatus: boolean) => {
    // Burada ilan durumunu değiştirmek için API çağrısı yapılacak
    alert(`İlan durumu ${currentStatus ? 'pasif' : 'aktif'} hale getirilecek`);
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
        <h1 className="text-2xl font-bold text-gray-900">İlan Yönetimi</h1>
        <p className="mt-1 text-sm text-gray-500">
          Tüm ilanları görüntüleyin ve yönetin
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İlan Başlığı
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Şirket
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lokasyon
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tür
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Maaş
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{job.companyName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{job.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {job.employmentType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {job.salaryMin && job.salaryMax 
                        ? `${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()} ₺`
                        : 'Belirtilmemiş'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        job.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {job.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(job.createdAt).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleToggleStatus(job.id, job.isActive)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        {job.isActive ? 'Pasif Yap' : 'Aktif Yap'}
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id, job.title)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                    Henüz ilan bulunmamaktadır.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminJobsPage;