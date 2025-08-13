// components/ActiveCompanyCard.tsx
import React from 'react';
import Link from 'next/link';

interface ActiveCompanyCardProps {
  company: {
    id: string;
    companyName: string;
    email: string;
    adminEmail: string;
    industry: string;
    city: string;
    createdAt: string;
  };
}

const ActiveCompanyCard = ({ company }: ActiveCompanyCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{company.companyName}</h3>
          <p className="text-sm text-gray-600 mt-1">Şirket Email: {company.email}</p>
          <p className="text-sm text-gray-600">Admin Email: {company.adminEmail}</p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Aktif
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Sektör:</span>
          <span className="font-medium">{company.industry}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Şehir:</span>
          <span className="font-medium">{company.city}</span>
        </div>
        <div className="text-xs text-gray-500">
          Kayıt Tarihi: {new Date(company.createdAt).toLocaleDateString('tr-TR')}
        </div>
      </div>
      
      <Link 
        href={`/admin/superadmin/companies/${company.id}`}
        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        Detaylar
      </Link>
    </div>
  );
};

export default ActiveCompanyCard;