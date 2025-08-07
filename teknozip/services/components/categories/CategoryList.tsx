'use client';

import React from 'react';
import { CategoryDto } from '@/types/category';

interface CategoryListProps {
  categories: CategoryDto[];
  loading: boolean;
  onEdit: (category: CategoryDto) => void;
  onDelete: (category: CategoryDto, type: 'soft' | 'hard') => void;
  showInactive?: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  loading,
  onEdit,
  onDelete,
  showInactive = false,
  canEdit,
  canDelete
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Kategoriler yükleniyor...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 text-center">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {showInactive ? 'Pasif kategori bulunamadı' : 'Henüz kategori yok'}
          </h3>
          <p className="text-gray-500">
            {showInactive 
              ? 'Sistemde pasif kategori bulunmamaktadır.'
              : 'Henüz hiç kategori oluşturulmamış. İlk kategoriyi oluşturmak için "Yeni Kategori" butonunu kullanın.'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <div className="col-span-4">Kategori Adı</div>
          <div className="col-span-5">Açıklama</div>
          <div className="col-span-2">ID</div>
          <div className="col-span-1 text-right">İşlemler</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
        {categories.map((category) => (
          <div key={category.categoryId} className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Category Name */}
              <div className="col-span-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{category.name}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="col-span-5">
                <p className="text-sm text-gray-600 truncate" title={category.description || 'Açıklama yok'}>
                  {category.description || (
                    <span className="italic text-gray-400">Açıklama yok</span>
                  )}
                </p>
              </div>

              {/* Category ID */}
              <div className="col-span-2">
                <p className="text-xs text-gray-500 font-mono truncate" title={category.categoryId}>
                  {category.categoryId.substring(0, 8)}...
                </p>
              </div>

              {/* Actions */}
              <div className="col-span-1 text-right">
                <div className="flex items-center justify-end gap-2">
                  {/* Edit Button */}
                  {canEdit && (
                    <button
                      onClick={() => onEdit(category)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Düzenle"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}

                  {/* Delete Buttons - Only for Super Admin */}
                  {canDelete && (
                    <>
                      {/* Soft Delete */}
                      <button
                        onClick={() => onDelete(category, 'soft')}
                        className="p-1 text-gray-400 hover:text-yellow-600 transition-colors"
                        title="Pasif Yap"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>

                      {/* Hard Delete */}
                      <button
                        onClick={() => onDelete(category, 'hard')}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Kalıcı Sil"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Toplam <span className="font-medium">{categories.length}</span> kategori
          </p>
          
          {/* Legend for action buttons */}
          {(canEdit || canDelete) && (
            <div className="flex items-center gap-4 text-xs text-gray-500">
              {canEdit && (
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Düzenle</span>
                </div>
              )}
              {canDelete && (
                <>
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                    <span>Pasif Yap</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Kalıcı Sil</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;