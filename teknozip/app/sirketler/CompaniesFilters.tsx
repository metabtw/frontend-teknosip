'use client';

import { useState } from 'react';

export default function CompaniesFilters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sector, setSector] = useState('');

  const sectors = [
    'Teknoloji',
    'Perakende',
    'Üretim',
    'Hizmet',
    'Finans',
    'Enerji',
    'Lojistik',
    'Diğer'
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Şirket Ara
          </label>
          <input
            type="text"
            id="search"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Şirket adı ile ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="sector" className="block text-sm font-medium text-gray-700">
            Sektör
          </label>
          <select
            id="sector"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          >
            <option value="">Tüm Sektörler</option>
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}