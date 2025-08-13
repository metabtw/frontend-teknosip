'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import RoleBasedWrapper from '@/components/admin/RoleBasedWrapper';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Building2, Briefcase, TrendingUp, Clock, CheckCircle, AlertCircle, Activity } from 'lucide-react';

export default function CompanyAdminDashboard() {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Toplam Çalışan',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Aktif İş İlanları',
      value: '8',
      change: '+3',
      changeType: 'positive',
      icon: Briefcase,
      color: 'green'
    },
    {
      title: 'Bu Ay Başvuru',
      value: '156',
      change: '+23%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Bekleyen Onay',
      value: '7',
      change: '-2',
      changeType: 'negative',
      icon: Clock,
      color: 'orange'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Yeni çalışan eklendi',
      user: 'Ahmet Yılmaz',
      time: '2 saat önce',
      type: 'success'
    },
    {
      id: 2,
      action: 'İş ilanı yayınlandı',
      user: 'Frontend Developer',
      time: '4 saat önce',
      type: 'info'
    },
    {
      id: 3,
      action: 'Başvuru alındı',
      user: 'Backend Developer pozisyonu',
      time: '6 saat önce',
      type: 'success'
    },
    {
      id: 4,
      action: 'Çalışan bilgileri güncellendi',
      user: 'Ayşe Demir',
      time: '1 gün önce',
      type: 'warning'
    }
  ];

  const systemStatus = [
    { name: 'Sistem Durumu', status: 'Çevrimiçi', color: 'green' },
    { name: 'Veritabanı', status: 'Çevrimiçi', color: 'green' },
    { name: 'E-posta Servisi', status: 'Çevrimiçi', color: 'green' },
    { name: 'Yedekleme', status: 'Tamamlandı', color: 'blue' }
  ];

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600 bg-blue-100',
      green: 'text-green-600 bg-green-100',
      purple: 'text-purple-600 bg-purple-100',
      orange: 'text-orange-600 bg-orange-100'
    };
    return colors[color as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'info':
        return <Activity className="w-4 h-4 text-blue-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
        <div className="h-full w-full">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white shadow-xl rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Hoş geldiniz, {user?.name}!</h1>
                  <p className="text-blue-100 mt-1">Şirket yönetim panelinize genel bakış</p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-blue-100">Saat</div>
                  <div className="text-lg font-semibold">{new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
                <Badge className="bg-green-500/20 text-green-100 border-green-400/30">
                  Çevrimiçi
                </Badge>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="p-3 md:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        <div className={`flex items-center text-sm ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <TrendingUp className={`w-4 h-4 mr-1 ${
                            stat.changeType === 'negative' ? 'rotate-180' : ''
                          }`} />
                          {stat.change} bu ay
                        </div>
                      </div>
                      <div className={`p-3 rounded-xl ${getIconColor(stat.color)}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
            {/* Recent Activities */}
            <Card className="bg-white border-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-5">
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-blue-600" />
                  Son Aktiviteler
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.user}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="bg-white border-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-5">
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-green-600" />
                  Sistem Durumu
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-4">
                  {systemStatus.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      <Badge 
                        className={`${
                          item.color === 'green' 
                            ? 'bg-green-100 text-green-700 border-green-200' 
                            : 'bg-blue-100 text-blue-700 border-blue-200'
                        }`}
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            </div>
          </div>
        </div>
  );
}