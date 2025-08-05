'use client';

import { useState } from 'react';

export default function InstitutionFilters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    'Üniversite',
    'Belediye',
    'Valilik',
    'Bakanlık',
    'Müdürlük',
    'Diğer Kamu Kurumu'
  ];

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200">
      <div className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Kurum Ara
          </label>
          <input
            type="text"
            id="search"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            placeholder="Kurum adı ile ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Kategori
          </label>
          <select
            id="category"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Tüm Kategoriler</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}