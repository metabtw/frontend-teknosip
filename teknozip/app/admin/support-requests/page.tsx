'use client';

import React, { useState } from 'react';
import RoleBasedWrapper from '@/components/admin/RoleBasedWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import { Icon } from '@iconify/react';

export default function SupportRequestsPage() {
  const [supportRequests, setSupportRequests] = useState([
    {
      id: 1,
      title: 'Yazılım Geliştirme Desteği',
      company: 'Köfteci Yusuf',
      type: 'software',
      status: 'pending',
      priority: 'high',
      description: 'Mobil uygulama geliştirme için teknik destek talebi',
      submittedAt: '2024-01-15',
      contact: {
        name: 'Ahmet Yılmaz',
        email: 'ahmet@kofteciyusuf.com',
        phone: '+90 555 123 4567'
      }
    },
    {
      id: 2,
      title: 'Sürdürülebilirlik Danışmanlığı',
      company: 'İstanbul Üniversitesi',
      type: 'consulting',
      status: 'in-progress',
      priority: 'medium',
      description: 'Kampüs sürdürülebilirlik projesi için danışmanlık talebi',
      submittedAt: '2024-01-14',
      contact: {
        name: 'Dr. Ayşe Kaya',
        email: 'ayse.kaya@istanbul.edu.tr',
        phone: '+90 555 234 5678'
      }
    },
    {
      id: 3,
      title: 'Altyapı İyileştirme Projesi',
      company: 'Bursa Belediyesi',
      type: 'infrastructure',
      status: 'completed',
      priority: 'low',
      description: 'Akıllı şehir altyapı projesi için teknik destek',
      submittedAt: '2024-01-13',
      contact: {
        name: 'Mehmet Demir',
        email: 'mehmet.demir@bursa.bel.tr',
        phone: '+90 555 345 6789'
      }
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">Beklemede</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-500">İşleniyor</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Tamamlandı</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Reddedildi</Badge>;
      default:
        return <Badge className="bg-gray-500">Bilinmiyor</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500">Yüksek</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Orta</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Düşük</Badge>;
      default:
        return <Badge className="bg-gray-500">Bilinmiyor</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'software':
        return 'solar:code-bold';
      case 'consulting':
        return 'solar:users-group-rounded-bold';
      case 'infrastructure':
        return 'solar:server-bold';
      default:
        return 'solar:question-circle-bold';
    }
  };

  return (
    <RoleBasedWrapper allowedRoles={['superadmin']}>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Destek Talepleri</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tüm Talepler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Talep</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Şirket/Kurum</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İletişim</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Öncelik</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {supportRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50 cursor-pointer">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Icon icon={getTypeIcon(request.type)} className="w-8 h-8 text-gray-500 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{request.title}</div>
                              <div className="text-sm text-gray-500 capitalize">{request.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{request.company}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium">{request.contact.name}</div>
                            <div className="text-gray-500">{request.contact.email}</div>
                            <div className="text-gray-500">{request.contact.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getPriorityBadge(request.priority)}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(request.status)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{request.submittedAt}</div>
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
}