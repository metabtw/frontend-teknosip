'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Search, Edit, Trash2, Users, Mail, Building, Calendar, CheckCircle, XCircle } from 'lucide-react';

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return (
        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 flex items-center gap-1 px-3 py-1">
          <CheckCircle className="w-3 h-3" />
          Aktif
        </Badge>
      );
    case 'inactive':
      return (
        <Badge className="bg-red-100 text-red-700 border-red-200 flex items-center gap-1 px-3 py-1">
          <XCircle className="w-3 h-3" />
          Pasif
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-700 border-gray-200 flex items-center gap-1 px-3 py-1">
          <XCircle className="w-3 h-3" />
          Bilinmiyor
        </Badge>
      );
  }
};

export default function EmployeesPage() {
  const { user, addEmployee } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    department: '',
    position: '',
    password: ''
  });

  const departments = [
    'İnsan Kaynakları',
    'Bilgi İşlem',
    'Muhasebe',
    'Pazarlama',
    'Satış',
    'Operasyon'
  ];

  const positions = [
    'Müdür',
    'Uzman',
    'Kıdemli Uzman',
    'Koordinatör',
    'Asistan',
    'Stajyer'
  ];

  const employees = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      email: 'ahmet@company.com',
      department: 'Bilgi İşlem',
      position: 'Uzman',
      status: 'active',
      joinDate: '2023-01-15',
      phone: '+90 555 123 4567'
    },
    {
      id: 2,
      name: 'Ayşe Demir',
      email: 'ayse@company.com',
      department: 'İnsan Kaynakları',
      position: 'Müdür',
      status: 'active',
      joinDate: '2022-08-20',
      phone: '+90 555 987 6543'
    },
    {
      id: 3,
      name: 'Mehmet Kaya',
      email: 'mehmet@company.com',
      department: 'Pazarlama',
      position: 'Koordinatör',
      status: 'inactive',
      joinDate: '2023-03-10',
      phone: '+90 555 456 7890'
    }
  ];

  const handleAddEmployee = async () => {
    try {
      await addEmployee({
        ...formData,
        userRole: 'employee',
        companyId: user?.companyId
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        startDate: '',
        department: '',
        position: '',
        password: ''
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Çalışan eklenirken hata:', error);
    }
  };

  const handleEdit = (employee: any) => {
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      startDate: employee.joinDate,
      department: employee.department,
      position: employee.position,
      password: ''
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (employeeId: number) => {
    if (confirm('Bu çalışanı silmek istediğinizden emin misiniz?')) {
      console.log('Çalışan silindi:', employeeId);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      startDate: '',
      department: '',
      position: '',
      password: ''
    });
    setIsEditMode(false);
    setSelectedEmployee(null);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
        <div className="h-full w-full">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-7 m-4 text-white shadow-xl rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Çalışan Yönetimi</h1>
                  <p className="text-blue-100 mt-1">Toplam {employees.length} çalışan</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* Search and Add Employee */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Çalışan ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl shadow-sm"
                />
              </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={resetForm}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  Yeni Çalışan Ekle
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                <div className="relative bg-white rounded-2xl shadow-2xl transition-all duration-300 ease-in-out transform">
                  <DialogHeader className="px-8 py-6 border-b border-gray-100">
                    <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
                        <UserPlus className="w-6 h-6" />
                      </div>
                      {isEditMode ? 'Çalışan Bilgilerini Düzenle' : 'Yeni Çalışan Ekle'}
                    </DialogTitle>
                    <p className="text-gray-600 mt-2">
                      {isEditMode ? 'Çalışan bilgilerini güncelleyin' : 'Yeni çalışan bilgilerini girin'}
                    </p>
                  </DialogHeader>
                  
                  <div className="px-8 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Column */}
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                            Ad Soyad *
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="Çalışan adı ve soyadı"
                            className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 h-12"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                            E-posta Adresi *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="ornek@sirket.com"
                            className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 h-12"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                            Telefon Numarası
                          </Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="+90 555 123 4567"
                            className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 h-12"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="startDate" className="text-sm font-semibold text-gray-700">
                            İşe Başlama Tarihi *
                          </Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                            className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 h-12"
                          />
                        </div>
                      </div>
                      
                      {/* Right Column */}
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="department" className="text-sm font-semibold text-gray-700">
                            Departman *
                          </Label>
                          <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                            <SelectTrigger className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 h-12">
                              <SelectValue placeholder="Departman seçin" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl bg-white shadow-lg border border-gray-200">
                              {departments.map((dept) => (
                                <SelectItem key={dept} value={dept} className="rounded-lg">{dept}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="position" className="text-sm font-semibold text-gray-700">
                            Pozisyon *
                          </Label>
                          <Select value={formData.position} onValueChange={(value) => setFormData({...formData, position: value})}>
                            <SelectTrigger className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 h-12">
                              <SelectValue placeholder="Pozisyon seçin" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl bg-white shadow-lg border border-gray-200">
                              {positions.map((pos) => (
                                <SelectItem key={pos} value={pos} className="rounded-lg">{pos}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {!isEditMode && (
                          <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                              Şifre *
                            </Label>
                            <Input
                              id="password"
                              type="password"
                              value={formData.password}
                              onChange={(e) => setFormData({...formData, password: e.target.value})}
                              placeholder="Güçlü bir şifre oluşturun"
                              className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 h-12"
                            />
                          </div>
                        )}
                        
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Bilgilendirme</h4>
                          <p className="text-xs text-gray-600">
                            * işaretli alanlar zorunludur. Çalışan bilgileri sistem tarafından güvenli bir şekilde saklanacaktır.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 rounded-b-2xl">
                    <div className="flex gap-4 justify-end">
                      <Button 
                        variant="outline" 
                        onClick={() => setIsDialogOpen(false)}
                         className="px-8 py-3 rounded-xl border-gray-300 hover:bg-gray-50 transition-all duration-200 font-medium"
                       >
                         <XCircle className="w-5 h-5 mr-2" />
                         İptal
                       </Button>
                       <Button 
                         onClick={handleAddEmployee}
                         className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
                       >
                         <UserPlus className="w-5 h-5 mr-2" />
                         {isEditMode ? 'Bilgileri Güncelle' : 'Çalışan Ekle'}
                       </Button>
                     </div>
                   </div>
                 </div>
               </DialogContent>
             </Dialog>
           </div>

            {/* Employees Table */}
            <Card className="bg-white border-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-6">
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-600" />
                  Çalışan Listesi
                </CardTitle>
              </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 md:py-4 px-3 md:px-6 font-semibold text-gray-700 text-sm md:text-base">Çalışan</th>
                      <th className="text-left py-3 md:py-4 px-3 md:px-6 font-semibold text-gray-700 text-sm md:text-base hidden sm:table-cell">İletişim</th>
                      <th className="text-left py-3 md:py-4 px-3 md:px-6 font-semibold text-gray-700 text-sm md:text-base hidden md:table-cell">Departman</th>
                      <th className="text-left py-3 md:py-4 px-3 md:px-6 font-semibold text-gray-700 text-sm md:text-base">Pozisyon</th>
                      <th className="text-left py-3 md:py-4 px-3 md:px-6 font-semibold text-gray-700 text-sm md:text-base hidden lg:table-cell">Durum</th>
                      <th className="text-left py-3 md:py-4 px-3 md:px-6 font-semibold text-gray-700 text-sm md:text-base hidden lg:table-cell">Başlangıç</th>
                      <th className="text-center py-3 md:py-4 px-3 md:px-6 font-semibold text-gray-700 text-sm md:text-base">İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee, index) => (
                      <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                        <td className="py-3 md:py-4 px-3 md:px-6">
                          <div className="flex items-center space-x-2 md:space-x-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs md:text-sm">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 text-sm md:text-base">{employee.name}</div>
                              <div className="text-xs md:text-sm text-gray-500">ID: {employee.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 md:py-4 px-3 md:px-6 hidden sm:table-cell">
                          <div className="space-y-1">
                            <div className="flex items-center text-xs md:text-sm text-gray-600">
                              <Mail className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-gray-400" />
                              <span className="truncate">{employee.email}</span>
                            </div>
                            <div className="text-xs md:text-sm text-gray-500">{employee.phone}</div>
                          </div>
                        </td>
                        <td className="py-3 md:py-4 px-3 md:px-6 hidden md:table-cell">
                          <div className="flex items-center text-xs md:text-sm">
                            <Building className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-gray-400" />
                            <span className="font-medium text-gray-700">{employee.department}</span>
                          </div>
                        </td>
                        <td className="py-3 md:py-4 px-3 md:px-6">
                          <span className="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-blue-100 text-blue-800">
                            {employee.position}
                          </span>
                        </td>
                        <td className="py-3 md:py-4 px-3 md:px-6 hidden lg:table-cell">
                          {getStatusBadge(employee.status)}
                        </td>
                        <td className="py-3 md:py-4 px-3 md:px-6 hidden lg:table-cell">
                          <div className="flex items-center text-xs md:text-sm text-gray-600">
                            <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-gray-400" />
                            {new Date(employee.joinDate).toLocaleDateString('tr-TR')}
                          </div>
                        </td>
                        <td className="py-3 md:py-4 px-3 md:px-6">
                          <div className="flex items-center justify-center space-x-1 md:space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(employee)}
                              className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 rounded-lg p-1.5 md:p-2"
                            >
                              <Edit className="w-3 h-3 md:w-4 md:h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(employee.id)}
                              className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 rounded-lg p-1.5 md:p-2"
                            >
                              <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
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
  );
}