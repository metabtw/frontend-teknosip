'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Announcements = () => {
  const { user } = useAuth();

  const announcements = [
    {
      id: 1,
      title: 'Yıl Sonu Değerlendirme Toplantısı',
      content: 'Yıl sonu değerlendirme toplantımız 25 Aralık 2024 tarihinde saat 14:00\'da ana toplantı salonunda gerçekleştirilecektir. Tüm çalışanlarımızın katılımı zorunludur.',
      priority: 'high',
      date: '2024-01-15',
      department: 'Tüm Departmanlar',
      author: 'İnsan Kaynakları'
    },
    {
      id: 2,
      title: 'Yeni Proje Başlangıcı',
      content: 'XYZ Projesi için kick-off toplantısı 20 Ocak 2024 tarihinde gerçekleştirilecektir. İlgili departman çalışanlarının katılımı beklenmektedir.',
      priority: 'medium',
      date: '2024-01-14',
      department: 'Teknoloji',
      author: 'Proje Yönetimi'
    },
    {
      id: 3,
      title: 'Ofis Bakım Çalışması',
      content: 'Bu hafta sonu ofisimizde bakım çalışmaları yapılacaktır. Pazartesi günü çalışanlarımız home-office yapabilir.',
      priority: 'low',
      date: '2024-01-13',
      department: 'Tüm Departmanlar',
      author: 'İdari İşler'
    }
  ];

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

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Yüksek Öncelikli';
      case 'medium':
        return 'Orta Öncelikli';
      case 'low':
        return 'Düşük Öncelikli';
      default:
        return 'Belirsiz';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Duyurular</h1>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{announcement.title}</CardTitle>
                <Badge className={getPriorityColor(announcement.priority)}>
                  {getPriorityText(announcement.priority)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">{announcement.content}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">Tarih:</span> {announcement.date}
                  </div>
                  <div>
                    <span className="font-medium">Departman:</span> {announcement.department}
                  </div>
                  <div>
                    <span className="font-medium">Yayınlayan:</span> {announcement.author}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Announcements;