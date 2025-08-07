'use client';

import { useState } from 'react';

export default function ProjectFilters({ onFilter }) {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    support: 'all',
    location: 'all',
    status: 'all'
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const categories = [
    { value: 'all', label: 'Tüm Kategoriler' },
    { value: 'Teknoloji', label: 'Teknoloji' },
    { value: 'Üretim', label: 'Üretim' },
    { value: 'Sağlık', label: 'Sağlık' },
    { value: 'Enerji', label: 'Enerji' },
    { value: 'Lojistik', label: 'Lojistik' },
    { value: 'Eğitim', label: 'Eğitim' },
    { value: 'Fintech', label: 'Fintech' },
    { value: 'Akıllı Şehir', label: 'Akıllı Şehir' },
    { value: 'Güvenlik', label: 'Güvenlik' }
  ];

  const supportTypes = [
    { value: 'all', label: 'Tüm Destek Türleri' },
    { value: 'KOSGEB Teknoloji Geliştirme', label: 'Teknoloji Geliştirme' },
    { value: 'KOSGEB Ar-Ge Desteği', label: 'Ar-Ge Desteği' },
    { value: 'KOSGEB Girişimcilik', label: 'Girişimcilik' },
    { value: 'KOSGEB Çevre Desteği', label: 'Çevre Desteği' }
  ];

  const locations = [
    { value: 'all', label: 'Tüm Şehirler' },
    { value: 'İstanbul', label: 'İstanbul' },
    { value: 'Ankara', label: 'Ankara' },
    { value: 'İzmir', label: 'İzmir' },
    { value: 'Bursa', label: 'Bursa' },
    { value: 'Antalya', label: 'Antalya' }
  ];

  const statuses = [
    { value: 'all', label: 'Tüm Durumlar' },
    { value: 'Aktif', label: 'Aktif' },
    { value: 'Tamamlandı', label: 'Tamamlandı' },
    { value: 'Beklemede', label: 'Beklemede' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-search-line text-gray-400"></i>
                </div>
              </div>
              <input
                type="text"
                placeholder="Proje ara..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filters.support}
              onChange={(e) => handleFilterChange('support', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
            >
              {supportTypes.map((support) => (
                <option key={support.value} value={support.value}>
                  {support.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
            >
              {locations.map((location) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}