'use client';

import React, { useEffect } from 'react';
import { CategoryDto } from '@/types/category';

interface CategoryDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  category: CategoryDto;
  deleteType: 'soft' | 'hard';
  loading: boolean;
}

const CategoryDeleteModal: React.FC<CategoryDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  category,
  deleteType,
  loading
}) => {
  const [isDeleting, setIsDeleting] = React.useState(false);

  // Handle confirmation
  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      // Error handling is done in parent component
      console.error('Delete confirmation error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle modal close
  const handleClose = () => {
    if (!isDeleting && !loading) {
      onClose();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isDeleting && !loading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isDeleting, loading, onClose]);

  if (!isOpen) return null;

  const isHardDelete = deleteType === 'hard';
  const title = isHardDelete ? 'Kategoriyi Kalıcı Olarak Sil' : 'Kategoriyi Pasif Yap';
  const description = isHardDelete 
    ? 'Bu kategori kalıcı olarak silinecek ve geri alınamayacak. Bu işlem geri alınamaz!'
    : 'Bu kategori pasif hale getirilecek ve artık aktif kategoriler listesinde görünmeyecek.';
  const confirmText = isHardDelete ? 'Kalıcı Olarak Sil' : 'Pasif Yap';
  const iconColor = isHardDelete ? 'text-red-600' : 'text-yellow-600';
  const buttonColor = isHardDelete 
    ? 'bg-red-700 hover:bg-red-800 focus:ring-red-600 border-red-700'
    : 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={handleClose}
        ></div>

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              {/* Icon */}
              <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${isHardDelete ? 'bg-red-100' : 'bg-yellow-100'} sm:mx-0 sm:h-10 sm:w-10`}>
                {isHardDelete ? (
                  <svg className={`h-6 w-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                ) : (
                  <svg className={`h-6 w-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                )}
              </div>

              {/* Content */}
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {title}
                </h3>
                <div className="mt-2">
                  <p className={`text-sm mb-3 ${isHardDelete ? 'text-red-700 font-semibold' : 'text-gray-500'}`}>
                    {description}
                  </p>
                  
                  {/* Category Info */}
                  <div className="bg-gray-50 rounded-lg p-3 border">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {category.name}
                        </p>
                        {category.description && (
                          <p className="text-xs text-gray-500 truncate">
                            {category.description}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 font-mono">
                          ID: {category.categoryId.substring(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </div>

                  {isHardDelete && (
                    <div className="mt-4 p-4 bg-red-100 border-2 border-red-300 rounded-lg">
                      <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <div>
                          <p className="text-base font-bold text-red-900 mb-2">
                            ⚠️ UYARI: Bu işlem geri alınamaz!
                          </p>
                          <p className="text-sm text-red-800">
                            Kategori ve ilişkili tüm veriler kalıcı olarak silinecektir. Bu işlem geri döndürülemez.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleConfirm}
              disabled={isDeleting || loading}
              className={`w-full inline-flex justify-center rounded-lg border border-transparent shadow-lg px-6 py-3 text-base font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${buttonColor}`}
            >
              {isDeleting || loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isDeleting ? 'İşleniyor...' : 'Yükleniyor...'}
                </div>
              ) : (
                confirmText
              )}
            </button>
            <button
              type="button"
              onClick={handleClose}
              disabled={isDeleting || loading}
              className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:mr-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              İptal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDeleteModal;