// app/admin/company-admin/announcements/new/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const NewAnnouncementPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    employmentType: 'Tam Zamanlı',
    salaryMin: '',
    salaryMax: '',
    experience: '',
    education: '',
    deadline: '',
    requirements: '',
    benefits: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('İlan başarıyla eklendi!');
      router.push('/admin/companyadmin/announcements');
    }, 1500);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Yeni İlan Ekle</h1>
        <p className="mt-1 text-sm text-gray-500">
          Yeni bir iş ilanı oluşturun
        </p>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  İlan Başlığı *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Açıklama *
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Lokasyon *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">
                  Çalışma Türü *
                </label>
                <div className="mt-1">
                  <select
                    id="employmentType"
                    name="employmentType"
                    required
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="Tam Zamanlı">Tam Zamanlı</option>
                    <option value="Yarı Zamanlı">Yarı Zamanlı</option>
                    <option value="Stajyer">Stajyer</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="salaryMin" className="block text-sm font-medium text-gray-700">
                  Minimum Maaş (₺)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="salaryMin"
                    id="salaryMin"
                    min="0"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="salaryMax" className="block text-sm font-medium text-gray-700">
                  Maksimum Maaş (₺)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="salaryMax"
                    id="salaryMax"
                    min="0"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                  Deneyim (Yıl)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="experience"
                    id="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                  Eğitim Seviyesi
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="education"
                    id="education"
                    value={formData.education}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                  Son Başvuru Tarihi
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="deadline"
                    id="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                  Gereklilikler
                </label>
                <div className="mt-1">
                  <textarea
                    id="requirements"
                    name="requirements"
                    rows={3}
                    value={formData.requirements}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">
                  Avantajlar
                </label>
                <div className="mt-1">
                  <textarea
                    id="benefits"
                    name="benefits"
                    rows={3}
                    value={formData.benefits}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Kaydediliyor...' : 'İlanı Yayınla'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewAnnouncementPage;