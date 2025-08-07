import RoleBasedWrapper from '@/components/admin/RoleBasedWrapper';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@iconify/react';

export default function DashboardPage() {
  const stats = [
    { title: 'Toplam Şirket', value: 42, icon: 'solar:buildings-bold', change: '+5%' },
    { title: 'Onay Bekleyen', value: 8, icon: 'solar:clock-circle-bold', change: '-2%' },
    { title: 'Aktif İlanlar', value: 156, icon: 'solar:document-bold', change: '+12%' },
    { title: 'Toplam Kullanıcı', value: 284, icon: 'solar:users-group-rounded-bold', change: '+8%' },
  ];

  const recentActivities = [
    { id: 1, user: 'Ahmet Yılmaz', action: 'Yeni şirket kaydı onayladı', time: '2 dakika önce' },
    { id: 2, user: 'Ayşe Kaya', action: 'Yeni kullanıcı ekledi', time: '15 dakika önce' },
    { id: 3, user: 'Mehmet Demir', action: 'İlan güncelledi', time: '1 saat önce' },
    { id: 4, user: 'Zeynep Şahin', action: 'Şirket bilgilerini düzenledi', time: '3 saat önce' },
    { id: 5, user: 'Can Yıldız', action: 'Sistem ayarlarını güncelledi', time: '1 gün önce' },
  ];

  return (
    <RoleBasedWrapper allowedRoles={['super-admin']}>
      <AdminLayout>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
                  <Icon icon={stat.icon} className="w-5 h-5 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-500 mt-1">{stat.change} geçen aya göre</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Son Aktivite</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 flex-shrink-0" />
                      <div className="ml-4">
                        <div className="font-medium">{activity.user}</div>
                        <div className="text-sm text-gray-600">{activity.action}</div>
                      </div>
                      <div className="ml-auto text-sm text-gray-500">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sistem Durumu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>CPU Kullanımı</span>
                      <span>42%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Bellek Kullanımı</span>
                      <span>64%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '64%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Depolama</span>
                      <span>78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    </RoleBasedWrapper>
  );
}