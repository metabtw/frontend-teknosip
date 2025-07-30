'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    description: '',
    category: '',
    supportType: '',
    budget: '',
    location: '',
    deadline: '',
    requirements: '',
    expectedOutcome: '',
    targetAudience: '',
    technologies: [],
    collaborationType: '',
    companySize: '',
    industry: '',
    contactPerson: '',
    contactTitle: '',
    projectStage: '',
    fundingStatus: '',
    partnerRequirements: '',
    additionalInfo: ''
  });

  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const categories = [
    'Teknoloji',
    'Üretim',
    'Sağlık',
    'Enerji',
    'Lojistik',
    'Eğitim',
    'Fintech',
    'Akıllı Şehir',
    'Güvenlik',
    'Tarım',
    'Turizm',
    'Perakende',
    'Gayrimenkul',
    'Otomotiv',
    'Diğer'
  ];

  const supportTypes = [
    'KOSGEB Teknoloji Geliştirme',
    'KOSGEB Ar-Ge Desteği',
    'KOSGEB Girişimcilik',
    'KOSGEB Çevre Desteği',
    'KOSGEB İnovasyon Desteği',
    'KOSGEB Dijital Dönüşüm',
    'TÜBİTAK Desteği',
    'Diğer Kamu Desteği',
    'Özel Sektör Yatırımı'
  ];

  const cities = [
    'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya',
    'Gaziantep', 'Kayseri', 'Eskişehir', 'Mersin', 'Denizli', 'Trabzon',
    'Samsun', 'Malatya', 'Kocaeli', 'Sakarya', 'Manisa', 'Şanlıurfa', 'Diğer'
  ];

  const technologies = [
    'Yapay Zeka', 'Makine Öğrenmesi', 'IoT', 'Blockchain', 'Bulut Teknolojileri',
    'Mobil Uygulama', 'Web Teknolojileri', 'Veri Analizi', 'Siber Güvenlik',
    'Robotik', 'Otomasyon', 'AR/VR', 'Drone Teknolojileri', 'Fintech',
    'Biotechnology', 'Nanotechnology', 'Diğer'
  ];

  const collaborationTypes = [
    'Teknoloji Ortaklığı',
    'Ar-Ge Ortaklığı',
    'Ticari Ortaklık',
    'Yatırım Ortaklığı',
    'Danışmanlık',
    'Lisanslama',
    'Ortak Girişim',
    'Tedarikçi Ortaklığı'
  ];

  const companySizes = [
    'Mikro (1-9 çalışan)',
    'Küçük (10-49 çalışan)',
    'Orta (50-249 çalışan)',
    'Büyük (250+ çalışan)'
  ];

  const projectStages = [
    'Kavram/Fikir',
    'Planlama',
    'Geliştirme',
    'Test',
    'Pilot Uygulama',
    'Ticari Uygulama'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTechnologyToggle = (tech) => {
    setSelectedTechnologies(prev => {
      if (prev.includes(tech)) {
        return prev.filter(t => t !== tech);
      } else {
        return [...prev, tech];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    const finalData = {
      ...formData,
      technologies: selectedTechnologies
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      console.log('Form submitted:', finalData);
      
      // Reset form
      setFormData({
        title: '',
        company: '',
        email: '',
        phone: '',
        website: '',
        description: '',
        category: '',
        supportType: '',
        budget: '',
        location: '',
        deadline: '',
        requirements: '',
        expectedOutcome: '',
        targetAudience: '',
        collaborationType: '',
        companySize: '',
        industry: '',
        contactPerson: '',
        contactTitle: '',
        projectStage: '',
        fundingStatus: '',
        partnerRequirements: '',
        additionalInfo: ''
      });
      setSelectedTechnologies([]);
      
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <form id="project-form" onSubmit={handleSubmit} className="space-y-8">
          
          {/* Proje Temel Bilgileri */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 flex items-center justify-center mr-3">
                <i className="ri-information-line text-blue-600 text-xl"></i>
              </div>
              Proje Temel Bilgileri
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proje Adı *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Projenizin adını girin"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şirket Adı *
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Şirket adınızı girin"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="">Kategori seçin</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destek Türü *
                </label>
                <select
                  name="supportType"
                  value={formData.supportType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="">Destek türü seçin</option>
                  {supportTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proje Bütçesi *
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Örn: ₺500.000"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lokasyon *
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="">Şehir seçin</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proje Aşaması *
                </label>
                <select
                  name="projectStage"
                  value={formData.projectStage}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="">Proje aşaması seçin</option>
                  {projectStages.map((stage) => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tamamlanma Tarihi *
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proje Açıklaması *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Projenizi detaylı şekilde açıklayın (maksimum 500 karakter)"
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.description.length}/500
              </div>
            </div>
          </div>

          {/* Şirket Bilgileri */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 flex items-center justify-center mr-3">
                <i className="ri-building-line text-blue-600 text-xl"></i>
              </div>
              Şirket Bilgileri
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta Adresi *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="sirket@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon Numarası *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://www.sirket.com"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="">Şirket büyüklüğü seçin</option>
                  {companySizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İletişim Kişisi *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ad Soyad"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İletişim Kişisi Unvanı *
                </label>
                <input
                  type="text"
                  name="contactTitle"
                  value={formData.contactTitle}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Örn: Proje Yöneticisi"
                />
              </div>
            </div>
          </div>

          {/* Teknoloji ve Ortaklık */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 flex items-center justify-center mr-3">
                <i className="ri-code-line text-blue-600 text-xl"></i>
              </div>
              Teknoloji ve Ortaklık
            </h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Kullanılan Teknolojiler
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {technologies.map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => handleTechnologyToggle(tech)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap text-left ${
                      selectedTechnologies.includes(tech)
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ortaklık Türü *
                </label>
                <select
                  name="collaborationType"
                  value={formData.collaborationType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                >
                  <option value="">Ortaklık türü seçin</option>
                  {collaborationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hedef Kitle
                </label>
                <input
                  type="text"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Örn: KOBİ'ler, Büyük şirketler"
                />
              </div>
            </div>
          </div>

          {/* Detay Bilgiler */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 flex items-center justify-center mr-3">
                <i className="ri-file-text-line text-blue-600 text-xl"></i>
              </div>
              Detay Bilgiler
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Proje Gereksinimleri
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Projeniz için gerekli kaynakları, yetenekleri ve gereksinimleri açıklayın"
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {formData.requirements.length}/500
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beklenen Sonuçlar
                </label>
                <textarea
                  name="expectedOutcome"
                  value={formData.expectedOutcome}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Projeden beklenen sonuçları ve çıktıları açıklayın"
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {formData.expectedOutcome.length}/500
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ortaklık Gereksinimleri
                </label>
                <textarea
                  name="partnerRequirements"
                  value={formData.partnerRequirements}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="İşbirliği ortaklarından beklentilerinizi belirtin"
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {formData.partnerRequirements.length}/500
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ek Bilgiler
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Paylaşmak istediğiniz diğer önemli bilgiler"
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {formData.additionalInfo.length}/500
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-gray-50 rounded-xl p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-sm text-gray-600">
                <p>
                  <span className="text-red-500">*</span> işaretli alanlar zorunludur.
                </p>
              </div>
              
              <div className="flex space-x-4">
                <Link
                  href="/projeler"
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  İptal Et
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-send-plane-line"></i>
                      </div>
                      <span>Projeyi Gönder</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-3">
                  <i className="ri-check-line text-green-600"></i>
                </div>
                <div>
                  <p className="text-green-800 font-medium">
                    Proje başarıyla gönderildi!
                  </p>
                  <p className="text-green-700 text-sm mt-1">
                    Projeniz incelendikten sonra platformda yayınlanacaktır.
                  </p>
                </div>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-3">
                  <i className="ri-error-warning-line text-red-600"></i>
                </div>
                <div>
                  <p className="text-red-800 font-medium">
                    Proje gönderilirken bir hata oluştu.
                  </p>
                  <p className="text-red-700 text-sm mt-1">
                    Lütfen tekrar deneyin veya destek ekibi ile iletişime geçin.
                  </p>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}