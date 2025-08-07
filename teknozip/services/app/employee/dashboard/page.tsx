'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import RoleBasedWrapper from '@/components/RoleBasedWrapper';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const EmployeeDashboard = () => {
  const { user } = useAuth();

  const announcements = [
    {
      id: 1,
      title: 'Yeni Proje Başlangıcı',
      content: 'Önümüzdeki hafta yeni bir proje başlıyor. Tüm ekip üyelerinin katılımı bekleniyor.',
      date: '2024-01-15',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Ofis Çalışma Saatleri',
      content: 'Yaz dönemi çalışma saatleri güncellenmiştir.',
      date: '2024-01-10',
      priority: 'medium'
    }
  ];

  const tasks = [
    {
      id: 1,
      title: 'Frontend Geliştirme',
      status: 'in-progress',
      deadline: '2024-01-20',
      priority: 'high'
    },
    {
      id: 2,
      title: 'API Entegrasyonu',
      status: 'pending',
      deadline: '2024-01-25',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Test Senaryoları',
      status: 'completed',
      deadline: '2024-01-15',
      priority: 'low'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <RoleBasedWrapper allowedRoles={['employee']}>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Hoş Geldin, {user?.name}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Duyurular</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{announcement.title}</h3>
                    <Badge className={getPriorityColor(announcement.priority)}>
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{announcement.content}</p>
                  <p className="text-gray-500 text-xs">{announcement.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Görevlerim</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{task.title}</h3>
                    <div className="flex space-x-2">
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs">Teslim Tarihi: {task.deadline}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hızlı İşlemler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="w-full" variant="outline">
              İzin Talebi
            </Button>
            <Button className="w-full" variant="outline">
              Mesai Bildirimi
            </Button>
            <Button className="w-full" variant="outline">
              Destek Talebi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </RoleBasedWrapper>
  );
}

export default EmployeeDashboard;