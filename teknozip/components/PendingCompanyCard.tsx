// components/PendingCompanyCard.tsx
import React from 'react';

interface PendingCompanyCardProps {
  company: {
    id: string;
    companyName: string;
    email: string;
    adminEmail: string;
    createdAt: string;
  };
  onApprove: (companyId: string) => void;
  onReject: (companyId: string) => void;
}

const PendingCompanyCard = ({ company, onApprove, onReject }: PendingCompanyCardProps) => {
  const handleApprove = () => {
    if (window.confirm(`${company.companyName} adlı şirketi onaylamak istediğinizden emin misiniz?`)) {
      onApprove(company.id);
    }
  };

  const handleReject = () => {
    if (window.confirm(`${company.companyName} adlı şirketi reddetmek istediğinizden emin misiniz?`)) {
      onReject(company.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{company.companyName}</h3>
          <p className="text-sm text-gray-600 mt-1">Şirket Email: {company.email}</p>
          <p className="text-sm text-gray-600">Admin Email: {company.adminEmail}</p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Beklemede
        </span>
      </div>
      
      <div className="text-xs text-gray-500 mb-4">
        Başvuru Tarihi: {new Date(company.createdAt).toLocaleDateString('tr-TR')}
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={handleApprove}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
        >
          Onayla
        </button>
        <button
          onClick={handleReject}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
        >
          Reddet
        </button>
      </div>
    </div>
  );
};

export default PendingCompanyCard;