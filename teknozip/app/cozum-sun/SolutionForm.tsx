'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SolutionForm() {
  const [formData, setFormData] = useState({
    solutionTitle: '',
    category: '',
    description: '',
    companyName: '',
    companySize: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    technologies: [],
    serviceType: '',
    targetSectors: [],
    budget: '',
    timeline: '',
    requirements: '',
    benefits: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const categories = [
    'Yazılım Geliştirme',
    'Mobil Uygulama',
    'Web Tasarım',
    'E-Ticaret',
    'Yapay Zeka',
    'Veri Analizi',
    'Siber Güvenlik',
    'Bulut Hizmetleri',
    'IoT Çözümleri',
    'Blockchain',
    'Dijital Pazarlama',
    'Eğitim Teknolojileri'
  ];

  const technologies = [
    'React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'Java', 
    'C#', 'PHP', 'Laravel', 'Django', 'Spring Boot', 'MongoDB',
    'PostgreSQL', 'MySQL', 'Redis', 'AWS', 'Azure', 'Docker',
    'Kubernetes', 'TensorFlow', 'PyTorch', 'Blockchain'
  ];

  const servicetypes = [
    'Tam Hizmet',
    'Danışmanlık',
    'Geliştirme',
    'Teknik Destek',
    'Eğitim',
    'Sistem Entegrasyonu'
  ];

  const targetSectors = [
    'Finans', 'Sağlık', 'Eğitim', 'E-Ticaret', 'Lojistik',
    'İmalat', 'Turizm', 'Gayrimenkul', 'Perakende', 'Tarım'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTechnologyToggle = (tech) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech]
    }));
  };

  const handleSectorToggle = (sector) => {
    setFormData(prev => ({
      ...prev,
      targetSectors: prev.targetSectors.includes(sector)
        ? prev.targetSectors.filter(s => s !== sector)
        : [...prev.targetSectors, sector]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Çözüm verileri:', formData);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        solutionTitle: '',
        category: '',
        description: '',
        companyName: '',
        companySize: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        website: '',
        technologies: [],
        serviceType: '',
        targetSectors: [],
        budget: '',
        timeline: '',
        requirements: '',
        benefits: '',
        additionalInfo: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Çözüm Temel Bilgileri */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <i className="ri-lightbulb-line text-blue-600"></i>
                </div>
                Çözüm Temel Bilgileri
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Çözüm Başlığı *
                  </label>
                  <input
                    type="text"
                    name="solutionTitle"
                    value={formData.solutionTitle}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Çözümünüzün başlığını yazın"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                  >
                    <option value="">Kategori seçin</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Çözüm Açıklaması *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  maxLength={500}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Çözümünüzü detaylı şekilde açıklayın"
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {formData.description.length}/500
                </div>
              </div>
            </div>

            {/* Şirket Bilgileri */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <i className="ri-building-line text-blue-600"></i>
                </div>
                Şirket Bilgileri
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Şirket adınızı yazın"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şirket Büyüklüğü *
                  </label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                  >
                    <option value="">Büyüklük seçin</option>
                    <option value="1-10">1-10 kişi</option>
                    <option value="11-50">11-50 kişi</option>
                    <option value="51-200">51-200 kişi</option>
                    <option value="201-1000">201-1000 kişi</option>
                    <option value="1000+">1000+ kişi</option>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="Ad Soyad"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="ornek@sirket.com"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="+90 (555) 123 45 67"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="https://sirket.com"
                  />
                </div>
              </div>
            </div>

            {/* Teknoloji ve Hizmet Türü */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <i className="ri-code-line text-blue-600"></i>
                </div>
                Teknoloji ve Hizmet Türü
              </h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Kullanılan Teknolojiler
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {technologies.map(tech => (
                    <label key={tech} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.technologies.includes(tech)}
                        onChange={() => handleTechnologyToggle(tech)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{tech}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hizmet Türü *
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                  >
                    <option value="">Hizmet türü seçin</option>
                    {servicetypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bütçe Aralığı
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                  >
                    <option value="">Bütçe aralığı seçin</option>
                    <option value="10000-50000">10.000 - 50.000 TL</option>
                    <option value="50000-100000">50.000 - 100.000 TL</option>
                    <option value="100000-250000">100.000 - 250.000 TL</option>
                    <option value="250000-500000">250.000 - 500.000 TL</option>
                    <option value="500000+">500.000 TL+</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Hedef Sektörler
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {targetSectors.map(sector => (
                    <label key={sector} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.targetSectors.includes(sector)}
                        onChange={() => handleSectorToggle(sector)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{sector}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Detay Bilgiler */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                <div className="w-6 h-6 flex items-center justify-center mr-3">
                  <i className="ri-file-text-line text-blue-600"></i>
                </div>
                Detay Bilgiler
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teslim Süresi
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                  >
                    <option value="">Süre seçin</option>
                    <option value="1-4 hafta">1-4 hafta</option>
                    <option value="1-3 ay">1-3 ay</option>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Çözümünüzü sunmak için gerekli koşulları belirtin"
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {formData.requirements.length}/500
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sağladığı Faydalar
                </label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={500}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Çözümünüzün sağladığı faydaları açıklayın"
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {formData.benefits.length}/500
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Diğer önemli bilgileri paylaşın"
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {formData.additionalInfo.length}/500
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Link
                href="/cozumler"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-center whitespace-nowrap"
              >
                İptal Et
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
              >
                {isSubmitting ? (
                  <span className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Gönderiliyor...</span>
                  </span>
                ) : (
                  'Çözümü Paylaş'
                )}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <div className="w-5 h-5 flex items-center justify-center mr-3">
                    <i className="ri-check-circle-fill text-green-600"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-green-800">
                      Çözümünüz başarıyla gönderildi!
                    </h3>
                    <p className="text-sm text-green-700 mt-1">
                      Çözümünüz incelendikten sonra platformda yayınlanacaktır.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="w-5 h-5 flex items-center justify-center mr-3">
                    <i className="ri-error-warning-fill text-red-600"></i>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-red-800">
                      Gönderim sırasında hata oluştu
                    </h3>
                    <p className="text-sm text-red-700 mt-1">
                      Lütfen tekrar deneyin veya destek ekibi ile iletişime geçin.
                    </p>
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