'use client';
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import RoleBasedWrapper from '@/components/admin/RoleBasedWrapper';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Icon } from '@iconify/react';
import { Badge } from '@/components/ui/badge';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <RoleBasedWrapper allowedRoles={['company-admin']}>
      <AdminLayout>
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Hoş geldiniz, {user?.name}!</h1>
                <p className="mt-1 text-sm text-gray-500">TechCorp Solutions - Şirket Yönetim Paneli</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="success" className="text-xs px-3 py-1">Aktif</Badge>
                <div className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-lg">
                  Son giriş: {new Date().toLocaleString('tr-TR', {hour: '2-digit', minute: '2-digit'})}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6">
                <CardTitle className="text-base font-medium text-gray-700">Toplam Çalışan</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Icon icon="solar:users-group-rounded-bold" className="h-6 w-6 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="text-3xl font-semibold text-gray-900">5</div>
                <p className="text-xs text-green-500 flex items-center gap-1 mt-2">
                  <Icon icon="solar:arrow-up-bold" className="h-4 w-4" />
                  +8.5% bu ay
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6">
                <CardTitle className="text-base font-medium text-gray-700">Destek Teklifleri</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Icon icon="solar:document-text-bold" className="h-6 w-6 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="text-3xl font-semibold text-gray-900">3</div>
                <p className="text-xs text-green-500 flex items-center gap-1 mt-2">
                  <Icon icon="solar:arrow-up-bold" className="h-4 w-4" />
                  +15.2% bu ay
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6">
                <CardTitle className="text-base font-medium text-gray-700">Aktif Destek Çağrıları</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Icon icon="solar:phone-calling-rounded-bold" className="h-6 w-6 text-orange-600" />
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="text-3xl font-semibold text-gray-900">12</div>
                <p className="text-xs text-red-500 flex items-center gap-1 mt-2">
                  <Icon icon="solar:arrow-down-bold" className="h-4 w-4" />
                  -5.3% bu ay
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6">
                <CardTitle className="text-base font-medium text-gray-700">Kayıt Tarihi</CardTitle>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Icon icon="solar:calendar-bold" className="h-6 w-6 text-emerald-600" />
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="text-3xl font-semibold text-gray-900">15.01.2023</div>
                <p className="text-xs text-gray-500 mt-2">Şirket kayıt tarihi</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">Son Eklenen Çalışanlar</CardTitle>
                <CardDescription className="text-sm text-gray-500">En son sisteme eklenen çalışanlar</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Icon icon="solar:user-bold" className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Fatma Öztürk</div>
                      <div className="text-sm text-gray-500">Proje Yöneticisi</div>
                    </div>
                    <Badge variant="warning" className="ml-auto px-3 py-1">İzinli</Badge>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                      <Icon icon="solar:user-bold" className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Ali Şahin</div>
                      <div className="text-sm text-gray-500">DevOps Mühendisi</div>
                    </div>
                    <Badge variant="success" className="ml-auto px-3 py-1">Aktif</Badge>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                      <Icon icon="solar:user-bold" className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Zeynep Çelik</div>
                      <div className="text-sm text-gray-500">İnsan Kaynakları</div>
                    </div>
                    <Badge variant="success" className="ml-auto px-3 py-1">Aktif</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">Aktif Destek Teklifleri</CardTitle>
                <CardDescription className="text-sm text-gray-500">Şu anda aktif olan destek teklifleriniz</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                      <Icon icon="solar:document-text-bold" className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Startup için Teknik Danışmanlık</div>
                      <div className="text-sm text-gray-500">05.02.2024</div>
                    </div>
                    <Badge variant="success" className="ml-auto px-3 py-1">Aktif</Badge>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Icon icon="solar:document-text-bold" className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Açık Kaynak Proje Desteği</div>
                      <div className="text-sm text-gray-500">15.03.2024</div>
                    </div>
                    <Badge variant="warning" className="ml-auto px-3 py-1">Beklemede</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-900">Şirket Bilgileri Özeti</CardTitle>
              <CardDescription className="text-sm text-gray-500">Şirketinizin temel bilgileri</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                        <Icon icon="solar:buildings-bold" className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div className="text-sm font-medium text-gray-500">Sektör</div>
                    </div>
                    <div className="text-base font-medium text-gray-900">Bilişim Teknolojileri</div>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                        <Icon icon="solar:letter-bold" className="h-5 w-5 text-rose-600" />
                      </div>
                      <div className="text-sm font-medium text-gray-500">E-posta</div>
                    </div>
                    <div className="text-base font-medium text-gray-900">info@techcorp.com</div>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center">
                        <Icon icon="solar:phone-bold" className="h-5 w-5 text-cyan-600" />
                      </div>
                      <div className="text-sm font-medium text-gray-500">Telefon</div>
                    </div>
                    <div className="text-base font-medium text-gray-900">+90 212 555 0123</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </RoleBasedWrapper>
  );
}