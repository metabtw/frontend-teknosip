'use client';

import { useState } from 'react';

export default function SolutionsFilters({ onFilter }) {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    serviceType: 'all',
    companySize: 'all',
    budget: 'all',
    technologies: 'all'
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const categories = [
    { value: 'all', label: 'Tüm Kategoriler' },
    { value: 'Yazılım Geliştirme', label: 'Yazılım Geliştirme' },
    { value: 'Mobil Uygulama', label: 'Mobil Uygulama' },
    { value: 'Web Tasarım', label: 'Web Tasarım' },
    { value: 'E-Ticaret', label: 'E-Ticaret' },
    { value: 'Yapay Zeka', label: 'Yapay Zeka' },
    { value: 'Veri Analizi', label: 'Veri Analizi' },
    { value: 'Siber Güvenlik', label: 'Siber Güvenlik' },
    { value: 'Bulut Hizmetleri', label: 'Bulut Hizmetleri' },
    { value: 'IoT Çözümleri', label: 'IoT Çözümleri' },
    { value: 'Blockchain', label: 'Blockchain' },
    { value: 'Dijital Pazarlama', label: 'Dijital Pazarlama' },
    { value: 'Eğitim Teknolojileri', label: 'Eğitim Teknolojileri' }
  ];

  const serviceTypes = [
    { value: 'all', label: 'Tüm Hizmet Türleri' },
    { value: 'Tam Hizmet', label: 'Tam Hizmet' },
    { value: 'Danışmanlık', label: 'Danışmanlık' },
    { value: 'Geliştirme', label: 'Geliştirme' },
    { value: 'Teknik Destek', label: 'Teknik Destek' },
    { value: 'Eğitim', label: 'Eğitim' },
    { value: 'Sistem Entegrasyonu', label: 'Sistem Entegrasyonu' }
  ];

  const companySizes = [
    { value: 'all', label: 'Tüm Şirket Büyüklükleri' },
    { value: '1-10', label: '1-10 kişi' },
    { value: '11-50', label: '11-50 kişi' },
    { value: '51-200', label: '51-200 kişi' },
    { value: '201-1000', label: '201-1000 kişi' },
    { value: '1000+', label: '1000+ kişi' }
  ];

  const budgetRanges = [
    { value: 'all', label: 'Tüm Bütçe Aralıkları' },
    { value: '10000-50000', label: '10.000 - 50.000 TL' },
    { value: '50000-100000', label: '50.000 - 100.000 TL' },
    { value: '100000-250000', label: '100.000 - 250.000 TL' },
    { value: '250000-500000', label: '250.000 - 500.000 TL' },
    { value: '500000+', label: '500.000 TL+' }
  ];

  const technologies = [
    { value: 'all', label: 'Tüm Teknolojiler' },
    { value: 'React', label: 'React' },
    { value: 'Angular', label: 'Angular' },
    { value: 'Vue.js', label: 'Vue.js' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'C#', label: 'C#' },
    { value: 'PHP', label: 'PHP' },
    { value: 'Laravel', label: 'Laravel' },
    { value: 'Django', label: 'Django' },
    { value: 'AWS', label: 'AWS' },
    { value: 'Azure', label: 'Azure' }
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
                placeholder="Çözüm ara..."
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
              value={filters.serviceType}
              onChange={(e) => handleFilterChange('serviceType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
            >
              {serviceTypes.map((serviceType) => (
                <option key={serviceType.value} value={serviceType.value}>
                  {serviceType.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filters.companySize}
              onChange={(e) => handleFilterChange('companySize', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
            >
              {companySizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={filters.budget}
              onChange={(e) => handleFilterChange('budget', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
            >
              {budgetRanges.map((budget) => (
                <option key={budget.value} value={budget.value}>
                  {budget.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <select
            value={filters.technologies}
            onChange={(e) => handleFilterChange('technologies', e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
          >
            {technologies.map((tech) => (
              <option key={tech.value} value={tech.value}>
                {tech.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}