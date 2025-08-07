'use client';

import { useState } from 'react';

export default function ProblemsFilters() {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: '',
    budget: '',
    urgency: '',
    skills: ''
  });

  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'Fintech', 'Sağlık', 'IoT', 'Lojistik', 'Eğitim', 
    'Perakende', 'Otomotiv', 'Gayrimenkul', 'Tarım'
  ];

  const locations = [
    'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 
    'Konya', 'Adana', 'Gaziantep', 'Kayseri'
  ];

  const budgetRanges = [
    '0-25.000 TL',
    '25.000-50.000 TL',
    '50.000-100.000 TL',
    '100.000-250.000 TL',
    '250.000-500.000 TL',
    '500.000+ TL'
  ];

  const urgencyLevels = [
    'Acil', 'Orta', 'Normal'
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      location: '',
      budget: '',
      urgency: '',
      skills: ''
    });
  };

  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-search-line text-gray-400"></i>
              </div>
            </div>
            <input
              type="text"
              placeholder="Sorun başlığı, şirket adı veya beceri ara..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-filter-line"></i>
            </div>
            <span>Filtrele</span>
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm pr-8"
                >
                  <option value="">Tümü</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şehir
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm pr-8"
                >
                  <option value="">Tümü</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bütçe
                </label>
                <select
                  value={filters.budget}
                  onChange={(e) => handleFilterChange('budget', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm pr-8"
                >
                  <option value="">Tümü</option>
                  {budgetRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aciliyet
                </label>
                <select
                  value={filters.urgency}
                  onChange={(e) => handleFilterChange('urgency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm pr-8"
                >
                  <option value="">Tümü</option>
                  {urgencyLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beceri
                </label>
                <input
                  type="text"
                  placeholder="Beceri ara..."
                  value={filters.skills}
                  onChange={(e) => handleFilterChange('skills', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors whitespace-nowrap"
              >
                Temizle
              </button>
              <button className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors whitespace-nowrap">
                Filtrele
              </button>
            </div>
          </div>
        )}

        {/* Results Info */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 mb-4 md:mb-0">
            <span className="font-medium">10 sorun</span> bulundu
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sıralama:</span>
            <select className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500 pr-8">
              <option>En Yeni</option>
              <option>En Acil</option>
              <option>Bütçe (Yüksek)</option>
              <option>Bütçe (Düşük)</option>
              <option>Son Tarih</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}