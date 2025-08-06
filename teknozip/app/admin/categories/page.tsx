'use client';

import React from 'react';
import { CategoryProvider } from '@/context/CategoryContext';
import CategoryManagement from '@/components/categories/CategoryManagement';
import RoleBasedWrapper from '@/components/RoleBasedWrapper';
import { Toaster } from 'react-hot-toast';

const CategoriesPage = () => {
  return (
    <RoleBasedWrapper allowedRoles={['super-admin']}>
      <CategoryProvider>
        <div className="min-h-screen bg-gray-50">
          {/* Page Header */}
          <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-6">
                <nav className="flex" aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-4">
                    <li>
                      <div>
                        <a href="/admin/dashboard" className="text-gray-400 hover:text-gray-500 transition-colors">
                          <svg className="flex-shrink-0 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                          </svg>
                          <span className="sr-only">Ana Sayfa</span>
                        </a>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <svg className="flex-shrink-0 h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <a href="/admin/dashboard" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">
                          Yönetim Paneli
                        </a>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <svg className="flex-shrink-0 h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-4 text-sm font-medium text-gray-900">
                          Kategori Yönetimi
                        </span>
                      </div>
                    </li>
                  </ol>
                </nav>

                {/* Navigation Tabs */}
                <div className="mt-6">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                      <span className="border-blue-500 text-blue-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
                        Aktif Kategoriler
                      </span>
                      <a
                        href="/admin/categories/inactive"
                        className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors"
                      >
                        Pasif Kategoriler
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CategoryManagement />
          </div>

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </CategoryProvider>
    </RoleBasedWrapper>
  );
};

export default CategoriesPage;