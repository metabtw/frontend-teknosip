'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SupportRequests = () => {
  const { user } = useAuth();
  if (!user || !user.isAdmin) {
    return <div>Yetkisiz erişim</div>;
  }
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const supportRequests = [
    {
      id: 1,
      title: 'Bilgisayar Donanım Sorunu',
      category: 'Teknik Destek',
      description: 'Bilgisayarım çok yavaş çalışıyor ve sık sık donuyor.',
      status: 'in-progress',
      priority: 'high',
      createdAt: '2024-01-15',
      lastUpdate: '2024-01-16',
      responses: [
        {
          id: 1,
          from: 'IT Destek',
          message: 'Uzaktan bağlantı için müsait olduğunuz zamanı belirtir misiniz?',
          date: '2024-01-16'
        }
      ]
    },
    {
      id: 2,
      title: 'Yazıcı Bağlantı Sorunu',
      category: 'Teknik Destek',
      description: 'Yazıcıya bağlanamıyorum.',
      status: 'resolved',
      priority: 'medium',
      createdAt: '2024-01-10',
      lastUpdate: '2024-01-11',
      responses: [
        {
          id: 1,
          from: 'IT Destek',
          message: 'Yazıcı sürücüleri güncellendi ve sorun çözüldü.',
          date: '2024-01-11'
        }
      ]
    }
  ];

  const [newRequest, setNewRequest] = useState({
    title: '',
    category: '',
    description: '',
    priority: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
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

  const handleSubmit = () => {
    // API entegrasyonu yapılacak
    console.log('Yeni destek talebi:', newRequest);
    setIsDialogOpen(false);
    setNewRequest({
      title: '',
      category: '',
      description: '',
      priority: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Destek Talepleri</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Yeni Destek Talebi</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Destek Talebi</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Başlık</Label>
                <Input
                  id="title"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                  placeholder="Sorununuzu kısaca özetleyin"
                />
              </div>

              <div>
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={newRequest.category}
                  onValueChange={(value) => setNewRequest({...newRequest, category: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Teknik Destek</SelectItem>
                    <SelectItem value="software">Yazılım</SelectItem>
                    <SelectItem value="hardware">Donanım</SelectItem>
                    <SelectItem value="network">Ağ/İnternet</SelectItem>
                    <SelectItem value="other">Diğer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Öncelik</Label>
                <Select
                  value={newRequest.priority}
                  onValueChange={(value) => setNewRequest({...newRequest, priority: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Öncelik seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">Yüksek</SelectItem>
                    <SelectItem value="medium">Orta</SelectItem>
                    <SelectItem value="low">Düşük</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                  placeholder="Sorununuzu detaylı bir şekilde açıklayın"
                  className="h-32"
                />
              </div>

              <Button onClick={handleSubmit} className="w-full">
                Gönder
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {supportRequests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{request.title}</CardTitle>
                <div className="flex space-x-2">
                  <Badge className={getPriorityColor(request.priority)}>
                    {request.priority === 'high' ? 'Yüksek' :
                     request.priority === 'medium' ? 'Orta' : 'Düşük'}
                  </Badge>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status === 'resolved' ? 'Çözüldü' :
                     request.status === 'in-progress' ? 'İşleniyor' : 'Beklemede'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Kategori: {request.category}</p>
                  <p className="text-sm text-gray-500">Oluşturulma: {request.createdAt}</p>
                  <p className="text-sm text-gray-500">Son Güncelleme: {request.lastUpdate}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="font-medium">Açıklama:</p>
                  <p className="text-gray-600 mt-1">{request.description}</p>
                </div>
                {request.responses.length > 0 && (
                  <div className="border-t pt-4">
                    <p className="font-medium mb-2">Yanıtlar:</p>
                    <div className="space-y-3">
                      {request.responses.map((response) => (
                        <div key={response.id} className="bg-gray-50 p-3 rounded">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{response.from}</span>
                            <span className="text-gray-500">{response.date}</span>
                          </div>
                          <p className="mt-1 text-gray-600">{response.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SupportRequests;