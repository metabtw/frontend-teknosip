'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProblemForm() {
  const [formData, setFormData] = useState({
    problemTitle: '',
    category: '',
    description: '',
    companyName: '',
    companySize: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    budget: '',
    deadline: '',
    requirements: '',
    additionalInfo: '',
    sectors: [],
    technologies: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);

  const sectors = [
    'Bilişim',
    'Finans',
    'Sağlık',
    'Eğitim',
    'Üretim',
    'Perakende',
    'Lojistik',
    'Enerji'
  ];

  const technologies = [
    'Yapay Zeka',
    'Blockchain',
    'IoT',
    'Bulut Bilişim',
    'Büyük Veri',
    'Siber Güvenlik',
    'Mobil Uygulama',
    'Web Geliştirme'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const arrayField = name.includes('sectors') ? 'sectors' : 'technologies';
      const newArray = checked
        ? [...formData[arrayField], value]
        : formData[arrayField].filter(item => item !== value);
      
      setFormData(prev => ({
        ...prev,
        [arrayField]: newArray
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);

    try {
      // API entegrasyonu burada yapılacak
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Başarılı gönderim sonrası form temizleme
      setFormData({
        problemTitle: '',
        category: '',
        description: '',
        companyName: '',
        companySize: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        website: '',
        budget: '',
        deadline: '',
        requirements: '',
        additionalInfo: '',
        sectors: [],
        technologies: []
      });
    } catch (error) {
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Sorun Temel Bilgileri */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <i className="ri-error-warning-line text-red-600"></i>
                </div>
                Sorun Temel Bilgileri
              </h3>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sorun Başlığı *
                  </label>
                  <input
                    type="text"
                    name="problemTitle"
                    value={formData.problemTitle}
                    onChange={handleInputChange}
                    required
                    maxLength={100}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    placeholder="Sorununuzu kısaca tanımlayın"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  >
                    <option value="">Kategori Seçin</option>
                    <option value="yazilim">Yazılım Geliştirme</option>
                    <option value="danismanlik">Danışmanlık</option>
                    <option value="tasarim">Tasarım</option>
                    <option value="pazarlama">Pazarlama</option>
                    <option value="diger">Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detaylı Açıklama *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    maxLength={1000}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    placeholder="Sorununuzu detaylı bir şekilde açıklayın"
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {formData.description.length}/1000
                  </div>
                </div>
              </div>
            </div>

            {/* Sektör ve Teknoloji */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <i className="ri-building-line text-red-600"></i>
                </div>
                Sektör ve Teknoloji
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İlgili Sektörler
                  </label>
                  <div className="space-y-2">
                    {sectors.map((sector) => (
                      <label key={sector} className="flex items-center">
                        <input
                          type="checkbox"
                          name="sectors"
                          value={sector}
                          checked={formData.sectors.includes(sector)}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700 ml-2">{sector}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İlgili Teknolojiler
                  </label>
                  <div className="space-y-2">
                    {technologies.map((tech) => (
                      <label key={tech} className="flex items-center">
                        <input
                          type="checkbox"
                          name="technologies"
                          value={tech}
                          checked={formData.technologies.includes(tech)}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700 ml-2">{tech}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bütçe ve Zaman */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <i className="ri-money-dollar-circle-line text-red-600"></i>
                </div>
                Bütçe ve Zaman
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bütçe Aralığı
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  >
                    <option value="">Bütçe Seçin</option>
                    <option value="0-50000">0-50.000 TL</option>
                    <option value="50000-100000">50.000-100.000 TL</option>
                    <option value="100000-250000">100.000-250.000 TL</option>
                    <option value="250000-500000">250.000-500.000 TL</option>
                    <option value="500000+">500.000+ TL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tamamlanma Süresi
                  </label>
                  <select
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  >
                    <option value="">Süre Seçin</option>
                    <option value="0-3 ay">0-3 ay</option>
                    <option value="3-6 ay">3-6 ay</option>
                    <option value="6-12 ay">6-12 ay</option>
                    <option value="12+ ay">12+ ay</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gereksinimler ve Koşullar
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={500}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  placeholder="Çözüm için gerekli koşulları belirtin"
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {formData.requirements.length}/500
                </div>
              </div>
            </div>

            {/* İletişim Bilgileri */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <i className="ri-contacts-line text-red-600"></i>
                </div>
                İletişim Bilgileri
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şirket Adı *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şirket Büyüklüğü
                  </label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  >
                    <option value="">Seçin</option>
                    <option value="1-10">1-10 çalışan</option>
                    <option value="11-50">11-50 çalışan</option>
                    <option value="51-200">51-200 çalışan</option>
                    <option value="201-500">201-500 çalışan</option>
                    <option value="501+">501+ çalışan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İletişim Kişisi *
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    placeholder="https://"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ek Bilgiler
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={500}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  placeholder="Diğer önemli bilgileri paylaşın"
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {formData.additionalInfo.length}/500
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Gönderiliyor...</span>
                  </span>
                ) : (
                  'Sorunu Paylaş'
                )}
              </button>
            </div>

            {showError && (
              <div className="mt-4">
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Gönderim sırasında hata oluştu
                      </h3>
                      <p className="text-sm text-red-700 mt-1">
                        Lütfen tekrar deneyin veya destek ekibi ile iletişime geçin.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}