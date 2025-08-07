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

type LeaveRequest = {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
};

export default function LeaveRequestsPage() {
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const leaveRequests = [
    {
      id: 1,
      type: 'Yıllık İzin',
      startDate: '2024-01-20',
      endDate: '2024-01-25',
      status: 'pending',
      reason: 'Aile ziyareti',
      requestDate: '2024-01-10'
    },
    {
      id: 2,
      type: 'Hastalık İzni',
      startDate: '2024-01-15',
      endDate: '2024-01-16',
      status: 'approved',
      reason: 'Doktor randevusu',
      requestDate: '2024-01-08'
    },
    {
      id: 3,
      type: 'İdari İzin',
      startDate: '2024-01-05',
      endDate: '2024-01-05',
      status: 'rejected',
      reason: 'Resmi işlemler',
      requestDate: '2024-01-02'
    }
  ];

  const [newRequest, setNewRequest] = useState({
    type: '',
    startDate: '',
    endDate: '',
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
  };

  const handleSubmit = () => {
    // API entegrasyonu yapılacak
    console.log('Yeni izin talebi:', newRequest);
    setIsDialogOpen(false);
    setNewRequest({
      type: '',
      startDate: '',
      endDate: '',
      reason: ''
    });
  };

  return (
    <RoleBasedWrapper allowedRoles={['employee']}>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">İzin Talepleri</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Yeni İzin Talebi</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni İzin Talebi</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="type">İzin Türü</Label>
                <Select
                  value={newRequest.type}
                  onValueChange={(value) => setNewRequest({...newRequest, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="İzin türü seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Yıllık İzin</SelectItem>
                    <SelectItem value="sick">Hastalık İzni</SelectItem>
                    <SelectItem value="administrative">İdari İzin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="startDate">Başlangıç Tarihi</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newRequest.startDate}
                  onChange={(e) => setNewRequest({...newRequest, startDate: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="endDate">Bitiş Tarihi</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newRequest.endDate}
                  onChange={(e) => setNewRequest({...newRequest, endDate: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="reason">İzin Nedeni</Label>
                <Textarea
                  id="reason"
                  value={newRequest.reason}
                  onChange={(e) => setNewRequest({...newRequest, reason: e.target.value})}
                  placeholder="İzin talebinizin nedenini açıklayın"
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
          <CardTitle>İzin Geçmişi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaveRequests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{request.type}</h3>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status === 'approved' ? 'Onaylandı' :
                     request.status === 'pending' ? 'Beklemede' :
                     'Reddedildi'}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Başlangıç: {request.startDate}</p>
                  <p>Bitiş: {request.endDate}</p>
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

export default LeaveRequests;