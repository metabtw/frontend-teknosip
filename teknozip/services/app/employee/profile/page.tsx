'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import RoleBasedWrapper from '@/components/admin/RoleBasedWrapper';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EmployeeProfile = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '555-0123',
    position: 'Yazılım Geliştirici',
    department: 'Teknoloji',
    joinDate: '2023-06-15',
    emergencyContact: {
      name: 'Ahmet Yılmaz',
      relation: 'Eş',
      phone: '555-4567'
    },
    address: 'Atatürk Mah. Cumhuriyet Cad. No:123 İstanbul'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  const handleEdit = () => {
    setTempProfile(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  const handleSave = () => {
    // API entegrasyonu yapılacak
    setProfile(tempProfile);
    setIsEditing(false);
  };

  return (
    <RoleBasedWrapper allowedRoles={['employee']}>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profil Bilgileri</h1>
        {!isEditing ? (
          <Button onClick={handleEdit}>Düzenle</Button>
        ) : (
          <div className="space-x-2">
            <Button variant="outline" onClick={handleCancel}>İptal</Button>
            <Button onClick={handleSave}>Kaydet</Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Kişisel Bilgiler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Ad Soyad</Label>
              <Input
                id="name"
                value={isEditing ? tempProfile.name : profile.name}
                onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                value={isEditing ? tempProfile.email : profile.email}
                onChange={(e) => setTempProfile({...tempProfile, email: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                value={isEditing ? tempProfile.phone : profile.phone}
                onChange={(e) => setTempProfile({...tempProfile, phone: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="address">Adres</Label>
              <Input
                id="address"
                value={isEditing ? tempProfile.address : profile.address}
                onChange={(e) => setTempProfile({...tempProfile, address: e.target.value})}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>İş Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="position">Pozisyon</Label>
              <Input
                id="position"
                value={isEditing ? tempProfile.position : profile.position}
                onChange={(e) => setTempProfile({...tempProfile, position: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="department">Departman</Label>
              <Input
                id="department"
                value={isEditing ? tempProfile.department : profile.department}
                onChange={(e) => setTempProfile({...tempProfile, department: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="joinDate">İşe Başlama Tarihi</Label>
              <Input
                id="joinDate"
                value={profile.joinDate}
                disabled
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acil Durum İletişim Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="emergencyName">Ad Soyad</Label>
              <Input
                id="emergencyName"
                value={isEditing ? tempProfile.emergencyContact.name : profile.emergencyContact.name}
                onChange={(e) => setTempProfile({
                  ...tempProfile,
                  emergencyContact: {...tempProfile.emergencyContact, name: e.target.value}
                })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="emergencyRelation">Yakınlık</Label>
              <Input
                id="emergencyRelation"
                value={isEditing ? tempProfile.emergencyContact.relation : profile.emergencyContact.relation}
                onChange={(e) => setTempProfile({
                  ...tempProfile,
                  emergencyContact: {...tempProfile.emergencyContact, relation: e.target.value}
                })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="emergencyPhone">Telefon</Label>
              <Input
                id="emergencyPhone"
                value={isEditing ? tempProfile.emergencyContact.phone : profile.emergencyContact.phone}
                onChange={(e) => setTempProfile({
                  ...tempProfile,
                  emergencyContact: {...tempProfile.emergencyContact, phone: e.target.value}
                })}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </RoleBasedWrapper>
  );
}

export default EmployeeProfile;