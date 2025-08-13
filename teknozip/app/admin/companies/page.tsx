'use client';

import RoleBasedWrapper from '@/components/admin/RoleBasedWrapper';
import AdminLayout from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@iconify/react';
import { apiClient } from '@/utils/apiClient';
import { useAuth } from '@/context/AuthContext';

interface Company {
  id: number;
  name?: string;
  companyName?: string;
  institutionName?: string;
  sector?: string;
  type?: string;
  contactPerson?: string;
  authorizedPersonName?: string;
  email?: string;
  phone?: string;
  phoneNumber?: string;
  approvalStatus?: number;
  createdAt?: string;
  registrationDate?: string;
}



const getSectorIcon = (sector: string) => {
  switch (sector.toLowerCase()) {
    case 'bilişim':
      return 'solar:monitor-bold';
    case 'yazılım':
      return 'solar:code-bold';
    case 'bulut bilişim':
      return 'solar:cloud-bold';
    case 'e-ticaret':
      return 'solar:cart-bold';
    case 'finans':
      return 'solar:card-bold';
    case 'üretim':
      return 'solar:factory-bold';
    default:
      return 'solar:buildings-bold';
  }
};

const CompaniesPage = () => {
  const { user } = useAuth();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModal, setDeleteModal] = useState<{show: boolean, company: Company | null}>({show: false, company: null});
  const [detailModal, setDetailModal] = useState<{show: boolean, company: Company | null}>({show: false, company: null});
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<Company | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      const companiesResponse = await apiClient.get('/Company/GetCompanyWithStatusFalse');

      if (companiesResponse?.success || companiesResponse?.isSuccess) {
        setCompanies(companiesResponse.data || []);
      }
    } catch (error) {
      console.error('Veri yükleme hatası:', error);
      setError('Veriler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await apiClient.put(`/Company/${id}/approve`);
      
      setCompanies(companies.map(company => 
        company.id === id ? { ...company, approvalStatus: 1 } : company
      ));
    } catch (error) {
      console.error('Onaylama hatası:', error);
      setError('Onaylama işlemi sırasında bir hata oluştu.');
    }
  };

  const handleReject = async (id: number) => {
    try {
      await apiClient.put(`/Company/GetCompanyWithStatusFalse`, {
        id: id,
        approvalStatus: 2
      });
      
      setCompanies(companies.map(company => 
        company.id === id ? { ...company, approvalStatus: 2 } : company
      ));
    } catch (error) {
      console.error('Reddetme hatası:', error);
      setError('Reddetme işlemi sırasında bir hata oluştu.');
    }
  };

  const handleDeleteClick = (company: Company) => {
    setDeleteModal({show: true, company});
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.company) return;
    
    try {
      setError('');
      await apiClient.delete(`/Company/HardDeleteCompany`, {
        id: deleteModal.company.id
      });
      
      setCompanies(companies.filter(company => company.id !== deleteModal.company!.id));
      setDeleteModal({show: false, company: null});
    } catch (error: any) {
      setError(error.message || 'Silme işlemi sırasında bir hata oluştu.');
      setDeleteModal({show: false, company: null});
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({show: false, company: null});
  };

  const handleDetailClick = (company: Company) => {
    setDetailModal({show: true, company});
    setEditMode(false);
    setEditData(company);
  };

  const handleDetailClose = () => {
    setDetailModal({show: false, company: null});
    setEditMode(false);
    setEditData(null);
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
    if (!editMode && detailModal.company) {
      setEditData({...detailModal.company});
    }
  };

  const handleEditChange = (field: string, value: string) => {
    if (editData) {
      setEditData({...editData, [field]: value});
    }
  };

  const handleUpdate = async () => {
    if (!editData || !detailModal.company) return;
    
    try {
      await apiClient.put(`/Company/UpdateCompany`, editData);
      
      setCompanies(companies.map(company => 
        company.id === editData.id ? editData : company
      ));
      setDetailModal({show: true, company: editData});
      setEditMode(false);
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      setError('Güncelleme işlemi sırasında bir hata oluştu.');
    }
  };

  const handleModalApprove = async () => {
    if (!detailModal.company) return;
    await handleApprove(detailModal.company.id);
    const updatedCompany = {...detailModal.company, approvalStatus: 1};
    setDetailModal({show: true, company: updatedCompany});
  };

  const handleModalReject = async () => {
    if (!detailModal.company) return;
    await handleReject(detailModal.company.id);
    const updatedCompany = {...detailModal.company, approvalStatus: 2};
    setDetailModal({show: true, company: updatedCompany});
  };

  const handleModalDelete = () => {
    if (!detailModal.company) return;
    setDeleteModal({show: true, company: detailModal.company});
    setDetailModal({show: false, company: null});
  };

  const getStatusBadge = (approvalStatus: number) => {
    switch (approvalStatus) {
      case 1:
        return <Badge className="bg-green-500">Onaylandı</Badge>;
      case 0:
        return <Badge className="bg-yellow-500">Onay Bekliyor</Badge>;
      case 2:
        return <Badge className="bg-red-500">Reddedildi</Badge>;
      default:
        return <Badge className="bg-gray-500">Bilinmiyor</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR');
  };

  if (loading) {
    return (
      <RoleBasedWrapper allowedRoles={['superadmin']}>
        <AdminLayout>
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Yükleniyor...</div>
          </div>
        </AdminLayout>
      </RoleBasedWrapper>
    );
  }

  if (error) {
    return (
      <RoleBasedWrapper allowedRoles={['superadmin']}>
        <AdminLayout>
          <div className="flex justify-center items-center h-64">
            <div className="text-red-500">{error}</div>
          </div>
        </AdminLayout>
      </RoleBasedWrapper>
    );
  }

  const emptyMessage = 'Henüz şirket kaydı bulunmamaktadır.';

  return (
    <RoleBasedWrapper allowedRoles={['superadmin']}>
      <AdminLayout>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                Şirket Yönetimi
              </CardTitle>
            </CardHeader>
            <CardContent>
              {companies.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {emptyMessage}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Şirket
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İletişim</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kayıt Tarihi</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {companies.map((item) => (
                         <tr key={item.id}>
                           <td className="px-6 py-4">
                             <div className="flex items-center">
                               <Icon icon={getSectorIcon(item.sector || '')} className="w-8 h-8 text-gray-500 mr-3" />
                               <div>
                                 <div className="text-sm font-medium text-gray-900">{item.name || item.companyName || item.institutionName}</div>
                                 <div className="text-xs text-gray-400">{item.sector || item.type || '-'}</div>
                               </div>
                             </div>
                           </td>
                           <td className="px-6 py-4">
                             <div className="text-sm text-gray-900">{item.contactPerson || item.authorizedPersonName || '-'}</div>
                             <div className="text-sm text-gray-500">{item.email || '-'}</div>
                             <div className="text-sm text-gray-500">{item.phone || item.phoneNumber || '-'}</div>
                           </td>
                           <td className="px-6 py-4">
                             {getStatusBadge(item.approvalStatus ?? 0)}
                           </td>
                           <td className="px-6 py-4 text-sm text-gray-500">
                             {formatDate(item.createdAt || item.registrationDate || '')}
                           </td>
                           <td className="px-6 py-4 text-sm font-medium">
                             <div className="flex flex-wrap gap-2">
                               {(item.approvalStatus === 0 || item.approvalStatus === undefined) && (
                                 <>
                                   <Button
                                     onClick={() => handleApprove(item.id!)}
                                     className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1"
                                   >
                                     Onayla
                                   </Button>
                                   <Button
                                     onClick={() => handleReject(item.id!)}
                                     className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1"
                                   >
                                     Reddet
                                   </Button>
                                 </>
                               )}
                               <Button
                                  onClick={() => handleDetailClick(item)}
                                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1"
                                >
                                  Detay
                                </Button>
                               <Button
                                 onClick={() => handleDeleteClick(item)}
                                 className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1"
                               >
                                 Sil
                               </Button>
                             </div>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               )}
             </CardContent>
          </Card>
          
          {/* Detay Modalı */}
          {detailModal.show && detailModal.company && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Şirket Detayları</h3>
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleEditToggle}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm"
                    >
                      {editMode ? 'İptal' : 'Düzenle'}
                    </Button>
                    <Button
                      onClick={handleDetailClose}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 text-sm"
                    >
                      Kapat
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Şirket Adı</label>
                      {editMode ? (
                        <input
                          type="text"
                          value={editData?.name || editData?.companyName || ''}
                          onChange={(e) => handleEditChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{detailModal.company.name || detailModal.company.companyName || '-'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sektör</label>
                      {editMode ? (
                        <input
                          type="text"
                          value={editData?.sector || ''}
                          onChange={(e) => handleEditChange('sector', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{detailModal.company.sector || '-'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Yetkili Kişi</label>
                      {editMode ? (
                        <input
                          type="text"
                          value={editData?.contactPerson || editData?.authorizedPersonName || ''}
                          onChange={(e) => handleEditChange('contactPerson', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{detailModal.company.contactPerson || detailModal.company.authorizedPersonName || '-'}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                      {editMode ? (
                        <input
                          type="email"
                          value={editData?.email || ''}
                          onChange={(e) => handleEditChange('email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{detailModal.company.email || '-'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                      {editMode ? (
                        <input
                          type="text"
                          value={editData?.phone || editData?.phoneNumber || ''}
                          onChange={(e) => handleEditChange('phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{detailModal.company.phone || detailModal.company.phoneNumber || '-'}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Durum</label>
                      <div>{getStatusBadge(detailModal.company.approvalStatus ?? 0)}</div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kayıt Tarihi</label>
                      <p className="text-gray-900">{formatDate(detailModal.company.createdAt || detailModal.company.registrationDate || '')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <div className="flex space-x-3">
                    {editMode ? (
                      <Button
                        onClick={handleUpdate}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2"
                      >
                        Kaydet
                      </Button>
                    ) : (
                      <>
                        {(detailModal.company.approvalStatus === 0 || detailModal.company.approvalStatus === undefined) && (
                          <>
                            <Button
                              onClick={handleModalApprove}
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2"
                            >
                              Onayla
                            </Button>
                            <Button
                              onClick={handleModalReject}
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2"
                            >
                              Reddet
                            </Button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  
                  {!editMode && (
                    <Button
                      onClick={handleModalDelete}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2"
                    >
                      Sil
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Silme Onay Modalı */}
          {deleteModal.show && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-center mb-4">
                  <Icon icon="solar:danger-triangle-bold" className="w-8 h-8 text-red-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Şirketi Sil</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  <strong>{deleteModal.company?.name || deleteModal.company?.companyName}</strong> şirketini kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                </p>
                <div className="flex justify-end space-x-3">
                  <Button
                    onClick={handleDeleteCancel}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2"
                  >
                    İptal
                  </Button>
                  <Button
                    onClick={handleDeleteConfirm}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2"
                  >
                    Sil
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </RoleBasedWrapper>
  );
};

export default CompaniesPage;