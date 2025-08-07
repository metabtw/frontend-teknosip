'use client';

import RoleBasedWrapper from '@/components/admin/RoleBasedWrapper';
import AdminLayout from '@/components/admin/AdminLayout';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Icon } from '@iconify/react';

const getSectorIcon = (sector: string) => {
  switch (sector.toLowerCase()) {
    case 'bilişim':
      return 'solar:monitor-bold';
    case 'yazılım':
      return 'solar:code-bold';
    case 'bulut bilişim':
      return 'solar:cloud-bold';
    case 'e-ticaret':
      return 'solar:cart-bold';
    case 'finans':
      return 'solar:card-bold';
    case 'üretim':
      return 'solar:factory-bold';
    default:
      return 'solar:buildings-bold';
  }
};

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([
    { 
      id: 1, 
      name: 'Teknoloji Çözümleri A.Ş.', 
      type: 'şirket',
      sector: 'Bilişim',
      email: 'info@teknolojicozumleri.com', 
      status: 'approved', 
      createdAt: '2025-07-15',
      contact: 'Ahmet Yılmaz',
      phone: '+90 555 123 4567',
      employeeCount: 25,
      activeJobs: 5
    },
    { 
      id: 2, 
      name: 'Yazılım Geliştirme Ltd.', 
      type: 'şirket',
      sector: 'Yazılım',
      email: 'iletisim@yazilimgelistirme.com', 
      status: 'pending', 
      createdAt: '2025-07-20',
      contact: 'Ayşe Kaya',
      phone: '+90 555 987 6543',
      employeeCount: 0,
      activeJobs: 0
    },
    { 
      id: 3, 
      name: 'Bulut Sistemleri A.Ş.', 
      type: 'şirket',
      sector: 'Bulut Bilişim',
      email: 'destek@bulutsistemleri.com', 
      status: 'rejected', 
      createdAt: '2025-07-18',
      contact: 'Mehmet Demir',
      phone: '+90 555 456 7890',
      employeeCount: 0,
      activeJobs: 0
    }
  ]);

  const handleApprove = (id: number) => {
    setCompanies(companies.map(company => 
      company.id === id ? { ...company, status: 'approved' } : company
    ));
  };

  const handleReject = (id: number) => {
    setCompanies(companies.map(company => 
      company.id === id ? { ...company, status: 'rejected' } : company
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Onaylandı</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Onay Bekliyor</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Reddedildi</Badge>;
      default:
        return <Badge className="bg-gray-500">Bilinmiyor</Badge>;
    }
  };

  return (
    <RoleBasedWrapper allowedRoles={['super-admin']}>
      <AdminLayout>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Şirket/Firma Yönetimi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Şirket</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sektör</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İletişim</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Çalışan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İlanlar</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {companies.map((company) => (
                      <tr key={company.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Icon icon={getSectorIcon(company.sector)} className="w-8 h-8 text-gray-500 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{company.name}</div>
                              <div className="text-xs text-gray-400">{company.createdAt}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{company.sector}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{company.contact}</div>
                          <div className="text-sm text-gray-500">{company.email}</div>
                          <div className="text-sm text-gray-500">{company.phone}</div>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(company.status)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {company.employeeCount}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {company.activeJobs}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium space-x-2">
                          {company.status === 'pending' && (
                            <>
                              <Button
                                onClick={() => handleApprove(company.id)}
                                className="bg-green-500 hover:bg-green-600 text-white"
                              >
                                Onayla
                              </Button>
                              <Button
                                onClick={() => handleReject(company.id)}
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                Reddet
                              </Button>
                            </>
                          )}
                          <Button
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            Detay
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </RoleBasedWrapper>
  );
};

export default CompaniesPage;