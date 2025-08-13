'use client';

import { useState, useEffect } from 'react';
import RoleBasedWrapper from '@/components/admin/RoleBasedWrapper';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/utils/apiClient';
import { Users, Building2, Briefcase, TrendingUp, Clock, CheckCircle, AlertCircle, Activity } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState([
    {
      title: 'Toplam Şirket',
      value: '0',
      change: 'Yükleniyor...',
      icon: Building2,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Toplam Kurum',
      value: '0',
      change: 'Yükleniyor...',
      icon: Building2,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Toplam Proje',
      value: '0',
      change: 'Yükleniyor...',
      icon: Briefcase,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      title: 'Toplam Problem',
      value: '0',
      change: 'Yükleniyor...',
      icon: AlertCircle,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600'
    }
  ]);
  const [loading, setLoading] = useState(true);

  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Paralel olarak tüm verileri çek
      const [companiesRes, institutionsRes, projectsRes, problemsRes] = await Promise.all([
        apiClient.get('/Company/GetListCompany'),
        apiClient.get('/Institution/GetListInstitution'),
        apiClient.get('/Project/GetListProject'),
        apiClient.get('/Problem/GetProblemList')
      ]);

      // Şirket verileri
      const companies = companiesRes?.data || [];
      const totalCompanies = companies.length;
      const pendingCompanies = companies.filter((c: { approvalStatus: number }) => c.approvalStatus === 0).length;

      // Kurum verileri
      const institutions = institutionsRes?.data || [];
      const totalInstitutions = institutions.length;

      // Proje verileri
      const projects = projectsRes?.data || [];
      const totalProjects = projects.length;

      // Problem verileri
      const problems = problemsRes?.data || [];
      const totalProblems = problems.length;

      // Stats güncelle
      setStats([
        {
          title: 'Toplam Şirket',
          value: totalCompanies.toString(),
          change: pendingCompanies > 0 ? `${pendingCompanies} onay bekliyor` : 'Tüm şirketler onaylı',
          icon: Building2,
          color: 'from-blue-500 to-blue-600',
          bgColor: 'bg-blue-50',
          iconColor: 'text-blue-600'
        },
        {
          title: 'Toplam Kurum',
          value: totalInstitutions.toString(),
          change: `${totalCompanies + totalInstitutions} toplam organizasyon`,
          icon: Building2,
          color: 'from-green-500 to-green-600',
          bgColor: 'bg-green-50',
          iconColor: 'text-green-600'
        },
        {
          title: 'Toplam Proje',
          value: totalProjects.toString(),
          change: 'Aktif projeler',
          icon: Briefcase,
          color: 'from-emerald-500 to-emerald-600',
          bgColor: 'bg-emerald-50',
          iconColor: 'text-emerald-600'
        },
        {
          title: 'Toplam Problem',
          value: totalProblems.toString(),
          change: 'Bildirilen problemler',
          icon: AlertCircle,
          color: 'from-red-500 to-red-600',
          bgColor: 'bg-red-50',
          iconColor: 'text-red-600'
        }
      ]);

      // Son aktiviteleri oluştur
      const activities: Array<{
        type: 'success' | 'info' | 'warning';
        title: string;
        description: string;
        time: string;
        icon: any;
      }> = [];

      // Son eklenen şirketler
      const recentCompanies = companies
        .sort((a: { createdAt?: string; registrationDate?: string }, b: { createdAt?: string; registrationDate?: string }) =>
        ((b.createdAt || b.registrationDate || '') && (a.createdAt || a.registrationDate || '') ?
          new Date(b.createdAt || b.registrationDate || '').getTime() -
          new Date(a.createdAt || a.registrationDate || '').getTime() : 0)
        ).slice(0, 2);

      recentCompanies.forEach((company: { name?: string; companyName?: string; createdAt?: string; registrationDate?: string }) => {
        activities.push({
          type: 'success',
          title: 'Yeni şirket kaydı',
          description: `${company.name || company.companyName} sisteme kaydoldu`,
          time: formatTimeAgo(company.createdAt || company.registrationDate || ''),
          icon: CheckCircle
        });
      });

      // Son eklenen projeler
      const recentProjects = projects
        .sort((a: { createdAt?: string }, b: { createdAt?: string }) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
        .slice(0, 1);

      recentProjects.forEach((project: { title?: string; createdAt?: string }) => {
        activities.push({
          type: 'info',
          title: 'Yeni proje eklendi',
          description: project.title || 'Yeni proje',
          time: formatTimeAgo(project.createdAt || ''),
          icon: Briefcase
        });
      });

      setRecentActivities(activities.slice(0, 3) as unknown as typeof recentActivities);

    } catch (error) {
      console.error('Dashboard verileri yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    if (!dateString) return 'Bilinmiyor';

    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Az önce';
    if (diffInHours < 24) return `${diffInHours} saat önce`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} gün önce`;

    return date.toLocaleDateString('tr-TR');
  };

  return (
    <RoleBasedWrapper allowedRoles={['superadmin', 'companyadmin']}>
      <AdminLayout>
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Hoş Geldiniz, {user?.name || 'Admin'}!</h1>
                <p className="text-blue-100 text-lg">İşte sistemin genel durumu ve son aktiviteler.</p>
              </div>
              <div className="hidden md:block">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <Activity className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}></div>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-semibold text-gray-700">{stat.title}</CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <IconComponent className={`h-5 w-5 ${stat.iconColor}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <p className="text-sm text-gray-600">{stat.change}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Activities & System Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activities */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Son Aktiviteler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => {
                    const IconComponent = (activity as { icon: React.ElementType }).icon;
                    const colorClasses = {
                      success: 'text-emerald-600 bg-emerald-50',
                      info: 'text-blue-600 bg-blue-50',
                      warning: 'text-amber-600 bg-amber-50'
                    };

                    return (
                      <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className={`p-2 rounded-lg ${colorClasses[(activity as { type: keyof typeof colorClasses }).type]}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900">{(activity as { title: string }).title}</p>
                          <p className="text-sm text-gray-600 truncate">{(activity as { description: string }).description}</p>
                        </div>
                        <time className="text-xs text-gray-500 whitespace-nowrap">{(activity as { time: string }).time}</time>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  Sistem Durumu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">CPU Kullanımı</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">45%</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500" style={{ width: '45%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Bellek Kullanımı</span>
                      <Badge variant="secondary" className="bg-amber-100 text-amber-700">72%</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full transition-all duration-500" style={{ width: '72%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Disk Kullanımı</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">38%</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500" style={{ width: '38%' }}></div>
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