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


export default function CompanyProfilePage() {
  const { user } = useAuth();
  const [companyData, setCompanyData] = useState({
    name: 'Teknozip Yazılım',
    description: 'Yenilikçi yazılım çözümleri sunan teknoloji şirketi',
    industry: 'Bilişim Teknolojileri',
    foundedYear: '2020',
    website: 'www.teknozip.com',
    email: 'info@teknozip.com',
    phone: '+90 555 123 4567',
    address: 'Maslak, İstanbul',
    socialMedia: {
      linkedin: 'linkedin.com/company/teknozip',
      twitter: 'twitter.com/teknozip',
      facebook: 'facebook.com/teknozip'
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(companyData);

  const handleSave = () => {
    setCompanyProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(companyProfile);
    setIsEditing(false);
  };

  return (
    <RoleBasedWrapper allowedRoles={['companyadmin']}>
      <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Şirket Profili</CardTitle>
          {!isEditing ? (
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Düzenle
            </Button>
          ) : (
            <div className="space-x-2">
              <Button 
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Kaydet
              </Button>
              <Button 
                onClick={handleCancel}
                variant="outline"
              >
                İptal
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Şirket Adı</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{companyProfile.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="industry">Sektör</Label>
                {isEditing ? (
                  <Input
                    id="industry"
                    value={editedProfile.industry}
                    onChange={(e) => setEditedProfile({...editedProfile, industry: e.target.value})}
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{companyProfile.industry}</p>
                )}
              </div>

              <div>
                <Label htmlFor="foundedYear">Kuruluş Yılı</Label>
                {isEditing ? (
                  <Input
                    id="foundedYear"
                    value={editedProfile.foundedYear}
                    onChange={(e) => setEditedProfile({...editedProfile, foundedYear: e.target.value})}
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{companyProfile.foundedYear}</p>
                )}
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                {isEditing ? (
                  <Input
                    id="website"
                    value={editedProfile.website}
                    onChange={(e) => setEditedProfile({...editedProfile, website: e.target.value})}
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{companyProfile.website}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">E-posta</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{companyProfile.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Telefon</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{companyProfile.phone}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="description">Şirket Açıklaması</Label>
              {isEditing ? (
                <Textarea
                  id="description"
                  value={editedProfile.description}
                  onChange={(e) => setEditedProfile({...editedProfile, description: e.target.value})}
                  className="h-32"
                />
              ) : (
                <p className="text-gray-700 mt-1">{companyProfile.description}</p>
              )}
            </div>

            <div>
              <Label htmlFor="address">Adres</Label>
              {isEditing ? (
                <Textarea
                  id="address"
                  value={editedProfile.address}
                  onChange={(e) => setEditedProfile({...editedProfile, address: e.target.value})}
                />
              ) : (
                <p className="text-gray-700 mt-1">{companyProfile.address}</p>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Sosyal Medya</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  {isEditing ? (
                    <Input
                      id="linkedin"
                      value={editedProfile.socialMedia.linkedin}
                      onChange={(e) => setEditedProfile({
                        ...editedProfile,
                        socialMedia: {...editedProfile.socialMedia, linkedin: e.target.value}
                      })}
                    />
                  ) : (
                    <p className="text-gray-700 mt-1">{companyProfile.socialMedia.linkedin}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="twitter">Twitter</Label>
                  {isEditing ? (
                    <Input
                      id="twitter"
                      value={editedProfile.socialMedia.twitter}
                      onChange={(e) => setEditedProfile({
                        ...editedProfile,
                        socialMedia: {...editedProfile.socialMedia, twitter: e.target.value}
                      })}
                    />
                  ) : (
                    <p className="text-gray-700 mt-1">{companyProfile.socialMedia.twitter}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="facebook">Facebook</Label>
                  {isEditing ? (
                    <Input
                      id="facebook"
                      value={editedProfile.socialMedia.facebook}
                      onChange={(e) => setEditedProfile({
                        ...editedProfile,
                        socialMedia: {...editedProfile.socialMedia, facebook: e.target.value}
                      })}
                    />
                  ) : (
                    <p className="text-gray-700 mt-1">{companyProfile.socialMedia.facebook}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </RoleBasedWrapper>
  );
}

export default Profile;