'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import RoleBasedWrapper from '@/components/admin/RoleBasedWrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Icon } from '@iconify/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const OvertimeRequests = () => {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const overtimeRequests = [
    {
      id: 1,
      date: '2024-01-15',
      hours: 3,
      reason: 'Proje teslim tarihi yaklaşıyor',
      status: 'pending',
      requestDate: '2024-01-14'
    },
    {
      id: 2,
      date: '2024-01-10',
      hours: 2,
      reason: 'Sistem bakımı',
      status: 'approved',
      requestDate: '2024-01-09'
    },
    {
      id: 3,
      date: '2024-01-05',
      hours: 4,
      reason: 'Acil müşteri talebi',
      status: 'rejected',
      requestDate: '2024-01-04'
    }
  ];

  const [newRequest, setNewRequest] = useState({
    date: '',
    hours: '',
    reason: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  }

  const handleSubmit = () => {
    // API entegrasyonu yapılacak
    console.log('Yeni mesai talebi:', newRequest);
    setIsDialogOpen(false);
    setNewRequest({
      date: '',
      hours: '',
      reason: ''
    });
  };

  return (
    <RoleBasedWrapper allowedRoles={['employee']}>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mesai Bildirimleri</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Yeni Mesai Bildirimi</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni Mesai Bildirimi</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Mesai Tarihi</Label>
                <Input
                  id="date"
                  type="date"
                  value={newRequest.date}
                  onChange={(e) => setNewRequest({...newRequest, date: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="hours">Mesai Süresi (Saat)</Label>
                <Input
                  id="hours"
                  type="number"
                  min="1"
                  max="12"
                  value={newRequest.hours}
                  onChange={(e) => setNewRequest({...newRequest, hours: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="reason">Mesai Nedeni</Label>
                <Textarea
                  id="reason"
                  value={newRequest.reason}
                  onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                  placeholder="Mesai nedenini açıklayın"
                />
              </div>

              <Button onClick={handleSubmit} className="w-full">
                Gönder
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mesai Geçmişi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {overtimeRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{request.date}</h3>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status === 'approved' ? 'Onaylandı' :
                     request.status === 'pending' ? 'Beklemede' :
                     'Reddedildi'}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Süre: {request.hours} saat</p>
                  <p>Neden: {request.reason}</p>
                  <p className="text-gray-500 text-xs">Talep Tarihi: {request.requestDate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
    </RoleBasedWrapper>
  );
}
}
  
  export default OvertimeRequests;