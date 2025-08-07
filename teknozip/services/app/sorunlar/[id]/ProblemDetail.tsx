
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import { Footer } from '@/components/Footer';

interface Problem {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  company: string;
  location: string;
  budget: string;
  urgency: string;
  deadline: string;
  skills: string[];
  createdAt: string;
  requirements: string[];
  benefits: string[];
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  image: string;
}

export default function ProblemDetail({ problemId }: { problemId: string }) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [isInterested, setIsInterested] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const problems = [
      {
        id: 1,
        title: "E-Ticaret Platformu için Ödeme Sistemi Entegrasyonu",
        description: "Mevcut e-ticaret platformumuza güvenli ve hızlı ödeme sistemi entegrasyonu yapacak teknik ekip arıyoruz. Visa, MasterCard ve yerel ödeme yöntemlerini desteklemesi gerekiyor.",
        fullDescription: "Şirketimiz, mevcut e-ticaret platformumuza kapsamlı bir ödeme sistemi entegrasyonu gerçekleştirmek istiyor. Sistem, Visa, MasterCard gibi uluslararası kartları ve yerel ödeme yöntemlerini desteklemeli. PCI DSS uyumluluğu zorunlu. 3D Secure protokolü entegrasyonu gerekli. Ödeme sürecinin kullanıcı dostu ve hızlı olması kritik önem taşıyor. Mevcut sistemimiz PHP Laravel framework üzerinde çalışıyor. API entegrasyonu şeklinde geliştirilmesi tercih ediliyor. Test ortamında kapsamlı testler yapılacak. Proje tamamlandıktan sonra 6 ay teknik destek verilmesi bekleniyor.",
        category: "Fintech",
        company: "DigitalStore A.Ş.",
        location: "İstanbul",
        budget: "50.000-100.000 TL",
        urgency: "Acil",
        deadline: "2024-02-15",
        skills: ["Payment Integration", "API Development", "Security", "PHP", "Laravel", "PCI DSS"],
        createdAt: "2024-01-10",
        requirements: [
          "Visa, MasterCard, American Express desteği",
          "Yerel ödeme yöntemleri (BKM Express, Papara vb.)",
          "3D Secure protokolü entegrasyonu",
          "PCI DSS uyumluluğu",
          "PHP Laravel framework uyumluluğu",
          "RESTful API geliştirme",
          "Kapsamlı test senaryoları",
          "Dokümantasyon hazırlama"
        ],
        benefits: [
          "Güvenli ödeme altyapısı",
          "Müşteri memnuniyeti artışı",
          "Daha hızlı ödeme süreçleri",
          "Çoklu ödeme seçenekleri",
          "Fraud koruması"
        ],
        contactPerson: "Ahmet Yılmaz",
        contactEmail: "ahmet@digitalstore.com",
        contactPhone: "+90 212 555 0123",
        image: "https://readdy.ai/api/search-image?query=modern%20e-commerce%20payment%20system%20integration%20with%20credit%20cards%20and%20digital%20wallets%2C%20secure%20online%20payment%20processing%20interface%2C%20fintech%20technology%20solution%20with%20clean%20white%20background%2C%20professional%20business%20software%20design%2C%20payment%20gateway%20visualization&width=800&height=500&seq=problem-detail-1&orientation=landscape"
      },
      {
        id: 2,
        title: "Hastane Yönetim Sistemi için Mobil Uygulama",
        description: "Hastane personeli için hasta kayıtları, randevu yönetimi ve tıbbi geçmiş takibi yapabilen mobil uygulama geliştirmesi. iOS ve Android platformlarında çalışması gerekiyor.",
        fullDescription: "Hastane yönetim sistemimiz için kapsamlı bir mobil uygulama geliştirme projesi. Uygulama, hasta kayıtlarına erişim, randevu yönetimi, tıbbi geçmiş takibi gibi temel işlevleri içermeli. Offline çalışma özelliği olması kritik. Güvenlik standartları çok yüksek olmalı. KVKK uyumluluğu zorunlu. Mevcut web sistemimizle API entegrasyonu yapılacak. Kullanıcı arayüzü sade ve kullanışlı olmalı. Push notification desteği gerekli. Biometric authentication (parmak izi, yüz tanıma) entegrasyonu isteniyor.",
        category: "Sağlık",
        company: "MedTech Solutions",
        location: "Ankara",
        budget: "100.000-250.000 TL",
        urgency: "Orta",
        deadline: "2024-03-30",
        skills: ["Mobile Development", "Healthcare IT", "Database", "iOS", "Android", "API Integration"],
        createdAt: "2024-01-08",
        requirements: [
          "iOS ve Android native geliştirme",
          "Hasta kayıtları yönetimi",
          "Randevu sistemi entegrasyonu",
          "Offline çalışma özelliği",
          "Biometric authentication",
          "Push notification",
          "KVKK uyumluluğu",
          "API entegrasyonu"
        ],
        benefits: [
          "Mobil erişim kolaylığı",
          "Verimlilik artışı",
          "Hasta memnuniyeti",
          "Hızlı veri erişimi",
          "Güvenli veri yönetimi"
        ],
        contactPerson: "Dr. Zeynep Kaya",
        contactEmail: "zeynep@medtech.com",
        contactPhone: "+90 312 555 0456",
        image: "https://readdy.ai/api/search-image?query=healthcare%20mobile%20application%20interface%20for%20hospital%20management%20system%2C%20medical%20records%20and%20patient%20data%20on%20tablet%20screen%2C%20doctor%20using%20healthcare%20technology%2C%20clean%20medical%20environment%20with%20white%20background%2C%20professional%20healthcare%20software%20design&width=800&height=500&seq=problem-detail-2&orientation=landscape"
      }
    ];

    const foundProblem = problems.find(p => p.id === parseInt(problemId));
    if (foundProblem) {
      setProblem(foundProblem);
    }
  }, [problemId]);

  const getUrgencyColor = (urgency: string) => {
    switch(urgency) {
      case 'Acil': return 'bg-red-100 text-red-800';
      case 'Orta': return 'bg-yellow-100 text-yellow-800';
      case 'Normal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleInterest = () => {
    setIsInterested(!isInterested);
  };

  const handleContact = () => {
    setShowContactForm(true);
  };

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Sorun Bulunamadı</h1>
              <p className="text-gray-600 mb-8">Aradığınız sorun mevcut değil.</p>
              <Link 
                href="/sorunlar"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sorunlar Listesine Dön
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-blue-600">Anasayfa</Link>
            <span>/</span>
            <Link href="/sorunlar" className="hover:text-blue-600">Sorunlar</Link>
            <span>/</span>
            <span className="text-gray-900">Sorun Detayı</span>
          </nav>

          {/* Problem Header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="relative">
              <img 
                src={problem?.image || ''}
                alt={problem?.title || ''}
                className="w-full h-64 object-cover object-top"
              />
              <div className="absolute top-6 left-6">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getUrgencyColor(problem?.urgency || '')}`}>
                  {problem.urgency}
                </span>
              </div>
              <div className="absolute top-6 right-6">
                <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 text-sm font-medium rounded-full">
                  {problem.category}
                </span>
              </div>
            </div>
            
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {problem.title}
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <div className="w-5 h-5 flex items-center justify-center mr-3">
                      <i className="ri-building-line"></i>
                    </div>
                    <span className="font-semibold mr-2">Şirket:</span>
                    <span>{problem.company}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-5 h-5 flex items-center justify-center mr-3">
                      <i className="ri-map-pin-line"></i>
                    </div>
                    <span className="font-semibold mr-2">Konum:</span>
                    <span>{problem.location}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <div className="w-5 h-5 flex items-center justify-center mr-3">
                      <i className="ri-money-dollar-circle-line"></i>
                    </div>
                    <span className="font-semibold mr-2">Bütçe:</span>
                    <span>{problem.budget}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-5 h-5 flex items-center justify-center mr-3">
                      <i className="ri-calendar-line"></i>
                    </div>
                    <span className="font-semibold mr-2">Son Tarih:</span>
                    <span>{formatDate(problem.deadline)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {problem.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={handleInterest}
                  className={`px-6 py-3 rounded-md font-medium transition-colors whitespace-nowrap ${
                    isInterested 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isInterested ? 'İlgileniyorum ✓' : 'İlgileniyorum'}
                </button>
                <button
                  onClick={handleContact}
                  className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors whitespace-nowrap"
                >
                  İletişime Geç
                </button>
              </div>
            </div>
          </div>

          {/* Problem Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Sorun Açıklaması</h2>
                <p className="text-gray-700 leading-relaxed">
                  {problem.fullDescription}
                </p>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Gereksinimler</h2>
                <ul className="space-y-2">
                  {problem.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-5 h-5 flex items-center justify-center mr-3 mt-0.5">
                        <i className="ri-check-line text-green-600"></i>
                      </div>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Beklenen Faydalar</h2>
                <ul className="space-y-2">
                  {problem.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-5 h-5 flex items-center justify-center mr-3 mt-0.5">
                        <i className="ri-star-line text-yellow-500"></i>
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">İletişim Bilgileri</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <div className="w-5 h-5 flex items-center justify-center mr-3">
                      <i className="ri-user-line"></i>
                    </div>
                    <span>{problem.contactPerson}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-5 h-5 flex items-center justify-center mr-3">
                      <i className="ri-mail-line"></i>
                    </div>
                    <span>{problem.contactEmail}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-5 h-5 flex items-center justify-center mr-3">
                      <i className="ri-phone-line"></i>
                    </div>
                    <span>{problem.contactPhone}</span>
                  </div>
                </div>
              </div>

              {/* Project Stats */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Proje İstatistikleri</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Görüntülenme</span>
                    <span className="font-semibold text-gray-900">245</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">İlgilenme</span>
                    <span className="font-semibold text-gray-900">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Teklif</span>
                    <span className="font-semibold text-gray-900">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Yayın Tarihi</span>
                    <span className="font-semibold text-gray-900">{formatDate(problem.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">İletişim Formu</h3>
              <button 
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-close-line"></i>
                </div>
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İsim Soyisim
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mesaj
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  maxLength={500}
                  required
                ></textarea>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
