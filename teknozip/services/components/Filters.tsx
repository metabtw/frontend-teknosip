'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

export default function Filters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const [sortBy, setSortBy] = useState('');

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Arama Kutusu */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Kurum/Şirket ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Icon
                icon="solar:magnifer-linear"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              />
            </div>
          </div>

          {/* Filtreler */}
          <div className="flex flex-wrap gap-4 items-center">
            <select
              className="block w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
            >
              <option value="all">Tüm Sektörler</option>
              <option value="technology">Teknoloji</option>
              <option value="manufacturing">Üretim</option>
              <option value="education">Eğitim</option>
              <option value="health">Sağlık</option>
            </select>

            <select
              className="block w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="all">Kurum Büyüklüğü</option>
              <option value="small">1-50 Çalışan</option>
              <option value="medium">51-200 Çalışan</option>
              <option value="large">201+ Çalışan</option>
            </select>

            <select
              className="block w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="all">Konum</option>
              <option value="istanbul">İstanbul</option>
              <option value="ankara">Ankara</option>
              <option value="izmir">İzmir</option>
              <option value="bursa">Bursa</option>
            </select>

            <select
              className="block w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              value={selectedExpertise}
              onChange={(e) => setSelectedExpertise(e.target.value)}
            >
              <option value="all">Uzmanlık Alanı</option>
              <option value="software">Yazılım Geliştirme</option>
              <option value="ai">Yapay Zeka</option>
              <option value="iot">IoT</option>
              <option value="data">Veri Analizi</option>
            </select>

            <select
              className="block w-full md:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name-asc">İsim A-Z</option>
              <option value="name-desc">İsim Z-A</option>
              <option value="date-desc">En Yeni</option>
              <option value="date-asc">En Eski</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}