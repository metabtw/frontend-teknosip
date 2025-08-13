'use client';

import React, { useEffect, useState } from 'react';
import { useCategory } from '@/context/CategoryContext';
import { useAuth } from '@/context/AuthContext';
import { CategoryDto } from '@/types/category';
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';
import CategoryDeleteModal from './CategoryDeleteModal';
import { toast } from 'react-hot-toast';

interface CategoryManagementProps {
  showInactive?: boolean;
}

const CategoryManagement: React.FC<CategoryManagementProps> = ({ showInactive = false }) => {
  const { user } = useAuth();
  const {
    state,
    fetchCategories,
    fetchInactiveCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    activateCategory,
    clearError,
    canCreateCategory,
    canDeleteCategory
  } = useCategory();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryDto | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<CategoryDto | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteType, setDeleteType] = useState<'soft' | 'hard'>('soft');

  // Load categories on component mount
  useEffect(() => {
    if (showInactive) {
      fetchInactiveCategories();
    } else {
      fetchCategories();
    }
  }, [showInactive]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      clearError();
    };
  }, []);

  // Handle create category
  const handleCreateCategory = async (categoryData: { name: string; description?: string }) => {
    try {
      await createCategory(categoryData);
      setShowCreateForm(false);
      toast.success('Kategori başarıyla oluşturuldu!');
    } catch (error: any) {
      toast.error(error.message || 'Kategori oluşturulurken hata oluştu');
    }
  };

  // Handle update category
  const handleUpdateCategory = async (categoryData: { categoryId: string; name: string; description?: string }) => {
    try {
      await updateCategory(categoryData);
      setEditingCategory(null);
      toast.success('Kategori başarıyla güncellendi!');
    } catch (error: any) {
      toast.error(error.message || 'Kategori güncellenirken hata oluştu');
    }
  };

  // Handle soft delete (deactivate)
  const handleSoftDelete = async (category: CategoryDto) => {
    setDeletingCategory(category);
    setDeleteType('soft');
    setIsDeleteModalOpen(true);
  };

  // Handle hard delete (permanent)
  const handleHardDelete = async (category: CategoryDto) => {
    setDeletingCategory(category);
    setDeleteType('hard');
    setIsDeleteModalOpen(true);
  };

  // Handle activate category
  const handleActivate = async (category: CategoryDto) => {
    try {
      await activateCategory(category.categoryId);
      toast.success('Kategori aktif hale getirildi');
    } catch (error: any) {
      console.error('Activate category error:', error);
      toast.error(error.message || 'Kategori aktif hale getirilirken hata oluştu');
    }
  };

  // Handle delete category
  const confirmDelete = async () => {
    if (!deletingCategory) return;
    
    try {
      const isHardDelete = deleteType === 'hard';
      await deleteCategory(deletingCategory.categoryId, isHardDelete);
      
      const successMessage = isHardDelete 
        ? 'Kategori kalıcı olarak silindi'
        : 'Kategori pasif hale getirildi';
      
      toast.success(successMessage);
      setIsDeleteModalOpen(false);
      setDeletingCategory(null);
      setDeleteType('soft');
    } catch (error: any) {
      console.error('Delete category error:', error);
      toast.error(error.message || 'İşlem sırasında hata oluştu');
    }
  };

  // Handle edit button click
  const handleEditClick = (category: CategoryDto) => {
    setEditingCategory(category);
  };

  // Handle delete button click
  const handleDeleteClick = (category: CategoryDto, type: 'soft' | 'hard' = 'soft') => {
    setDeletingCategory(category);
    setDeleteType(type);
  };

  // Handle refresh
  const handleRefresh = () => {
    if (showInactive) {
      fetchInactiveCategories();
    } else {
      fetchCategories();
    }
  };

  const categories = showInactive ? state.inactiveCategories : state.categories;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {showInactive ? 'Pasif Kategoriler' : 'Kategori Yönetimi'}
          </h1>
          <p className="text-gray-600 mt-1">
            {showInactive 
              ? 'Sistemdeki pasif kategorileri görüntüleyin'
              : 'Kategorileri görüntüleyin, düzenleyin ve yönetin'
            }
          </p>
        </div>

        <div className="flex gap-2">
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={state.loading}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {state.loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                Yükleniyor...
              </div>
            ) : (
              'Yenile'
            )}
          </button>

          {/* Create Category Button - Only for Super Admin */}
          {!showInactive && canCreateCategory() && (
            <button
              onClick={() => setShowCreateForm(true)}
              disabled={state.loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Yeni Kategori
            </button>
          )}
        </div>
      </div>

      {/* Error Display */}
      {state.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{state.error}</p>
              </div>
            </div>
            <button
              onClick={clearError}
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Permission Warning for Non-Super Admin */}
      {!showInactive && !canCreateCategory() && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800">
                Kategori ekleme ve silme işlemleri sadece süper yöneticiler tarafından yapılabilir.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Category List */}
      <CategoryList
        categories={categories}
        loading={state.loading}
        onEdit={handleEditClick}
        onSoftDelete={handleSoftDelete}
        onHardDelete={handleHardDelete}
        onActivate={showInactive ? handleActivate : undefined}
        showInactive={showInactive}
        canEdit={true} // All authenticated users can edit
        canDelete={canDeleteCategory()}
      />

      {/* Create Category Form Modal */}
      {showCreateForm && (
        <CategoryForm
          isOpen={showCreateForm}
          onClose={() => setShowCreateForm(false)}
          onSubmit={handleCreateCategory}
          title="Yeni Kategori Oluştur"
          submitText="Oluştur"
          loading={state.loading}
        />
      )}

      {/* Edit Category Form Modal */}
      {editingCategory && (
        <CategoryForm
          isOpen={!!editingCategory}
          onClose={() => setEditingCategory(null)}
          onSubmit={handleUpdateCategory}
          initialData={editingCategory}
          title="Kategori Düzenle"
          submitText="Güncelle"
          loading={state.loading}
        />
      )}

      {/* Delete Modal */}
        {isDeleteModalOpen && deletingCategory && (
          <CategoryDeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setDeletingCategory(null);
              setDeleteType('soft');
            }}
            onConfirm={confirmDelete}
            category={deletingCategory}
            deleteType={deleteType}
            loading={state.loading}
          />
        )}
    </div>
  );
};

export default CategoryManagement;