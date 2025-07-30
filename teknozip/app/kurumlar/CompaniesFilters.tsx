'use client';

import { useState } from 'react';

export default function CompaniesFilters({ onFilter }) {
  const [filters, setFilters] = useState({
    search: '',
    sector: 'all',
    size: 'all',
    location: 'all',
    expertise: 'all'
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kurum Ara
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Kurum adı..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <i className="ri-search-line absolute left-3 top-2.5 text-gray-400"></i>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sektör
            </label>
            <select
              value={filters.sector}
              onChange={(e) => handleFilterChange('sector', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pr-8"
            >
              <option value="all">Tüm Sektörler</option>
              <option value="Teknoloji">Teknoloji</option>
              <option value="Finans">Finans</option>
              <option value="Sağlık">Sağlık</option>
              <option value="Eğitim">Eğitim</option>
              <option value="E-Ticaret">E-Ticaret</option>
              <option value="Üretim">Üretim</option>
              <option value="Lojistik">Lojistik</option>
              <option value="Enerji">Enerji</option>
              <option value="Telekomünikasyon">Telekomünikasyon</option>
              <option value="Danışmanlık">Danışmanlık</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kurum Büyüklüğü
            </label>
            <select
              value={filters.size}
              onChange={(e) => handleFilterChange('size', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pr-8"
            >
              <option value="all">Tüm Büyüklükler</option>
              <option value="1-10">1-10 Kişi</option>
              <option value="11-50">11-50 Kişi</option>
              <option value="51-200">51-200 Kişi</option>
              <option value="201-1000">201-1000 Kişi</option>
              <option value="1000+">1000+ Kişi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Konum
            </label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pr-8"
            >
              <option value="all">Tüm Şehirler</option>
              <option value="İstanbul">İstanbul</option>
              <option value="Ankara">Ankara</option>
              <option value="İzmir">İzmir</option>
              <option value="Bursa">Bursa</option>
              <option value="Antalya">Antalya</option>
              <option value="Kocaeli">Kocaeli</option>
              <option value="Adana">Adana</option>
              <option value="Gaziantep">Gaziantep</option>
              <option value="Konya">Konya</option>
              <option value="Kayseri">Kayseri</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Uzmanlık Alanı
            </label>
            <select
              value={filters.expertise}
              onChange={(e) => handleFilterChange('expertise', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 pr-8"
            >
              <option value="all">Tüm Alanlar</option>
              <option value="Yazılım Geliştirme">Yazılım Geliştirme</option>
              <option value="Mobil Uygulama">Mobil Uygulama</option>
              <option value="Yapay Zeka">Yapay Zeka</option>
              <option value="Siber Güvenlik">Siber Güvenlik</option>
              <option value="Veri Analizi">Veri Analizi</option>
              <option value="Bulut Hizmetleri">Bulut Hizmetleri</option>
              <option value="IoT">IoT</option>
              <option value="Blockchain">Blockchain</option>
              <option value="Dijital Pazarlama">Dijital Pazarlama</option>
              <option value="UI/UX Tasarım">UI/UX Tasarım</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}