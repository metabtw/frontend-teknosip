'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import RoleBasedWrapper from '@/components/admin/RoleBasedWrapper';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Icon } from '@iconify/react';

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800">Aktif</Badge>;
    case 'inactive':
      return <Badge className="bg-red-100 text-red-800">Pasif</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800">Bilinmiyor</Badge>;
  }
};

export default function EmployeesPage() {
  const { user, addEmployee } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [employees, setEmployees] = useState([
    { 
      id: 1, 
      name: 'Ahmet Yılmaz', 
      email: 'ahmet@example.com', 
      position: 'Yazılım Geliştirici',
      department: 'Teknoloji',
      status: 'active',
      joinDate: '2024-01-15',
      permissions: ['job_post', 'profile_edit']
    },
    { 
      id: 2, 
      name: 'Mehmet Öztürk', 
      email: 'mehmet@example.com', 
      position: 'İK Uzmanı',
      department: 'İnsan Kaynakları',
      status: 'active',
      joinDate: '2024-02-20',
      permissions: ['employee_manage', 'job_post']
    },
  ]);

  interface EmployeeRegistration {
    name: string;
    email: string;
    phone: string;
    position: string;
    department: string;
    permissions: string[];
    password: string;
  }

  const [formData, setFormData] = useState<EmployeeRegistration>({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    permissions: [],
    password: ''
  });

  const departments = [
    'İnsan Kaynakları',
    'Teknoloji',
    'Finans',
    'Pazarlama',
    'Operasyon',
    'Satış'
  ];

  const positions = [
    'Yazılım Geliştirici',
    'İK Uzmanı',
    'Finans Uzmanı',
    'Pazarlama Uzmanı',
    'Operasyon Yöneticisi',
    'Satış Temsilcisi'
  ];

  const handleSubmit = async () => {
    if (isEditMode && selectedEmployee) {
      const updatedEmployees = employees.map(emp => 
        emp.id === selectedEmployee.id ? { ...emp, ...formData } : emp
      );
      setEmployees(updatedEmployees);
    } else {
      try {
        await addEmployee(formData);
        const newEmployee = {
          id: employees.length + 1,
          ...formData,
          status: 'active',
          joinDate: new Date().toISOString().split('T')[0]
        };
        setEmployees([...employees, newEmployee]);
      } catch (error) {
        console.error('Çalışan eklenirken hata oluştu:', error);
      }
    }
    resetForm();
  };

  const handleEdit = (employee: any) => {
    setIsEditMode(true);
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      position: employee.position,
      department: employee.department,
      permissions: employee.permissions,
      password: ''
    });
  };

  const handleDelete = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      position: '',
      department: '',
      permissions: [],
      password: ''
    });
    setIsEditMode(false);
    setSelectedEmployee(null);
  };

  return (
    <RoleBasedWrapper allowedRoles={['company-admin']}>
      <AdminLayout>
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Çalışanlar</h1>
              <p className="mt-1 text-sm text-gray-500">Şirketinizdeki tüm çalışanları görüntüleyin ve yönetin</p>
            </div>
            <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-medium">
                <Icon icon="solar:add-circle-bold" className="w-5 h-5 mr-2" />
                Yeni Çalışan Ekle
              </Button>
            </DialogTrigger>
            <div className="mt-4">
              <div className="relative">
                <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Çalışan ara..."
                  className="pl-10 bg-gray-50 border-gray-200 rounded-lg w-full"
                />
              </div>
            </div>
            <DialogContent className="sm:max-w-[600px] bg-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">{isEditMode ? 'Çalışan Düzenle' : 'Yeni Çalışan Ekle'}</DialogTitle>
                <p className="text-sm text-gray-500">Lütfen çalışan bilgilerini eksiksiz doldurunuz. (*) işaretli alanlar zorunludur.</p>
              </DialogHeader>
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center">
                      Ad Soyad <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                      placeholder="Örn: Ahmet Yılmaz"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center">
                      E-posta <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                      placeholder="ornek@sirket.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700 flex items-center">
                      Telefon
                    </Label>
                    <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                placeholder="+90 555 123 4567"
              />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-sm font-semibold text-gray-700 flex items-center">
                      İşe Giriş Tarihi
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-sm font-semibold text-gray-700 flex items-center">
                      Departman <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => setFormData({...formData, department: value})}
                    >
                      <SelectTrigger className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors bg-white">
                        <SelectValue placeholder="Departman seçin" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px] overflow-y-auto">
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-sm font-semibold text-gray-700 flex items-center">
                      Pozisyon <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Select
                      value={formData.position}
                      onValueChange={(value) => setFormData({...formData, position: value})}
                    >
                      <SelectTrigger className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors bg-white">
                        <SelectValue placeholder="Pozisyon seçin" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[200px] overflow-y-auto">
                        {positions.map((pos) => (
                          <SelectItem key={pos} value={pos}>{pos}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center">
                    Şifre {!isEditMode && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                    placeholder="••••••••"
                    required={!isEditMode}
                  />
                  {!isEditMode && <p className="text-xs text-gray-500 mt-1">En az 8 karakter uzunluğunda güçlü bir şifre belirleyin.</p>}
                </div>
                <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-gray-100">
                  <Button 
                    variant="outline" 
                    onClick={resetForm}
                    className="px-6 hover:bg-gray-50 transition-colors"
                  >
                    <Icon icon="solar:close-circle-bold" className="w-4 h-4 mr-2" />
                    İptal
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    className="px-6 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  >
                    <Icon icon="solar:user-plus-bold" className="w-4 h-4 mr-2" />
                    {isEditMode ? 'Güncelle' : 'Ekle'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          </div>
          <Card>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ad Soyad</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-posta</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departman</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pozisyon</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşe Giriş</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employees.map((employee) => (
                      <tr key={employee.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{employee.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{employee.department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{employee.position}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(employee.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{employee.joinDate}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(employee)}
                            >
                              <Icon icon="solar:pen-bold" className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDelete(employee.id)}
                            >
                              <Icon icon="solar:trash-bin-trash-bold" className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </AdminLayout>
    </RoleBasedWrapper>
  );
}