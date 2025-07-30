// app/admin/super-admin/companies/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getCompanyDetails } from '@/utils/api';
import { useRouter } from 'next/navigation';

interface Company {
  id: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  taxNumber: string;
  industry: string;
  expertiseAreas: string[];
  experienceYear: number;
  city: string;
  district: string;
  addressLine: string;
  postalCode: string;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  createdAt: string;
  isActive: boolean;
}

const CompanyDetailPage = ({ params }: { params: { id: string } }) => {
  const { token, refreshAuth } = useAuth();
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token && params.id) {
      fetchCompanyDetails();
    }
  }, [token, params.id]);

  const fetchCompanyDetails = async () => {
    try {
      setLoading(true);
      const response = await getCompanyDetails(params.id, token!);
      
      if (response.isSuccess) {
        setCompany(response.data);
      }
    } catch (err: any) {
      if (err.message.includes('Unauthorized') || err.message.includes('401')) {
        try {
          await refreshAuth();
          fetchCompanyDetails();
        } catch (refreshError) {
          setError('Oturum süresi doldu. Lütfen tekrar giriş yapın.');
        }
      } else {
        setError(err.message || 'Şirket detayları alınırken hata oluştu');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Hata: {error}</div>;
  }

  if (!company) {
    return <div className="p-6">Şirket bulunamadı.</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-indigo-600 hover:text-indigo-900 mb-4 flex items-center"
        >
          ← Geri
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{company.companyName}</h1>
        <p className="mt-1 text-sm text-gray-500">
          Şirket detaylarını görüntüleyin
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Şirket Bilgileri</h3>
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              company.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {company.isActive ? 'Aktif' : 'Pasif'}
            </span>
          </div>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Şirketin temel bilgileri ve iletişim detayları
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Şirket Adı</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{company.companyName}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Şirket Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{company.email}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Telefon</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{company.phoneNumber}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Vergi Numarası</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{company.taxNumber}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Sektör</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{company.industry}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Uzmanlık Alanları</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {company.expertiseAreas?.join(', ') || 'Belirtilmemiş'}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Deneyim Yılı</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{company.experienceYear} yıl</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Adres</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {company.addressLine}, {company.district}/{company.city} {company.postalCode}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Yönetici Bilgileri</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Şirket yöneticisinin iletişim bilgileri
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Ad</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{company.adminFirstName}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Soyad</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{company.adminLastName}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{company.adminEmail}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Kayıt Tarihi</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(company.createdAt).toLocaleDateString('tr-TR')}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailPage;