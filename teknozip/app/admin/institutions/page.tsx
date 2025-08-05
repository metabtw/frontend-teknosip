'use client';

import { useState } from 'react';
import RoleBasedWrapper from '@/components/admin/RoleBasedWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@iconify/react';

export default function InstitutionsPage() {
  const [institutions, setInstitutions] = useState([
    {
      id: 1,
      name: 'İstanbul Üniversitesi',
      type: 'kurum',
      category: 'Üniversite',
      location: 'İstanbul',
      status: 'active',
      contact: 'Dr. Ahmet Yılmaz',
      email: 'info@istanbul.edu.tr',
      phone: '+90 212 440 0000',
      projects: 12
    },
    {
      id: 2,
      name: 'Bursa Büyükşehir Belediyesi',
      type: 'kurum',
      category: 'Belediye',
      location: 'Bursa',
      status: 'active',
      contact: 'Mehmet Demir',
      email: 'info@bursa.bel.tr',
      phone: '+90 224 234 0000',
      projects: 8
    },
    {
      id: 3,
      name: 'Ankara Valiliği',
      type: 'kurum',
      category: 'Valilik',
      location: 'Ankara',
      status: 'pending',
      contact: 'Ayşe Kaya',
      email: 'info@ankara.gov.tr',
      phone: '+90 312 306 0000',
      projects: 0
    }
  ]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Üniversite':
        return 'solar:graduation-cap-bold';
      case 'Belediye':
        return 'solar:city-bold';
      case 'Valilik':
        return 'solar:flag-bold';
      case 'Bakanlık':
        return 'solar:building-bold';
      default:
        return 'solar:building-bold';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Aktif</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Onay Bekliyor</Badge>;
      case 'inactive':
        return <Badge className="bg-red-500">Pasif</Badge>;
      default:
        return <Badge className="bg-gray-500">Bilinmiyor</Badge>;
    }
  };

  return (
    <RoleBasedWrapper allowedRoles={['super-admin']}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Kurumlar</h1>
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Icon icon="solar:add-circle-bold" className="w-5 h-5 mr-2" />
            Yeni Kurum Ekle
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Kurum Yönetimi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kurum</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İletişim</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projeler</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {institutions.map((institution) => (
                    <tr key={institution.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Icon icon={getCategoryIcon(institution.category)} className="w-8 h-8 text-gray-500 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{institution.name}</div>
                            <div className="text-sm text-gray-500">{institution.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{institution.category}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium">{institution.contact}</div>
                          <div className="text-gray-500">{institution.email}</div>
                          <div className="text-gray-500">{institution.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(institution.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{institution.projects}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Icon icon="solar:pen-bold" className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                            <Icon icon="solar:trash-bin-trash-bold" className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </RoleBasedWrapper>
  );
}