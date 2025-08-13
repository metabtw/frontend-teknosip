'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Icon } from '@iconify/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

function AnnouncementsPage() {
  const { user } = useAuth();

  interface Announcement {
    id: string;
    title: string;
    content: string;
    type: string;
    createdAt: string;
    expiresAt: string;
  }

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Yeni Ofis Açılışı',
      content: 'Şirketimizin yeni ofisi önümüzdeki ay açılıyor. Tüm çalışanlarımız davetlidir.',
      type: 'important',
      createdAt: '2024-02-15',
      expiresAt: '2024-03-15'
    },
    {
      id: '2',
      title: 'Sistem Bakımı Duyurusu',
      content: 'Bu hafta sonu planlı sistem bakımı yapılacaktır. Lütfen çalışmalarınızı buna göre planlayın.',
      type: 'important',
      createdAt: '2024-02-28',
      expiresAt: '2024-03-03'
    }
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState<Omit<Announcement, 'id'>>({
    title: '',
    content: '',
    type: 'important',
    createdAt: new Date().toISOString().split('T')[0],
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const handleAddAnnouncement = () => {
    const announcement = {
      id: String(announcements.length + 1),
      ...newAnnouncement
    };
    
    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({
      title: '',
      content: '',
      type: 'normal',
      createdAt: new Date().toISOString().split('T')[0],
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'important':
        return 'bg-red-500';
      case 'event':
        return 'bg-yellow-500';
      case 'normal':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Duyurular</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  Yeni Duyuru Ekle
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Yeni Duyuru Ekle</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Başlık</Label>
                    <Input
                      id="title"
                      value={newAnnouncement.title}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">İçerik</Label>
                    <Textarea
                      id="content"
                      value={newAnnouncement.content}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Duyuru Tipi</Label>
                    <select
                      id="type"
                      className="w-full border rounded-md p-2"
                      value={newAnnouncement.type}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, type: e.target.value})}
                    >
                      <option value="important">Önemli</option>
                      <option value="event">Etkinlik</option>
                      <option value="normal">Normal</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="expiresAt">Son Geçerlilik Tarihi</Label>
                    <Input
                      id="expiresAt"
                      type="date"
                      value={newAnnouncement.expiresAt}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, expiresAt: e.target.value})}
                    />
                  </div>
                  <Button 
                    onClick={handleAddAnnouncement}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Ekle
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{announcement.title}</h3>
                    <Badge className={getTypeColor(announcement.type)}>
                      {announcement.type === 'important' ? 'Önemli' : announcement.type === 'event' ? 'Etkinlik' : 'Normal'}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4">{announcement.content}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Oluşturulma: {announcement.createdAt}</span>
                    <span>Son Geçerlilik: {announcement.expiresAt}</span>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
}

export default AnnouncementsPage;