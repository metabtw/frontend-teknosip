'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function ProjectDetail({ projectId }) {
  const [showContactForm, setShowContactForm] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Akıllı Tarım Teknolojileri",
      company: "AgroTech Solutions",
      description: "IoT sensörler ile tarım alanlarında verimlilik artırma projesi. Toprak analizi ve otomatik sulama sistemi geliştirilmektedir.",
      detailedDescription: "Bu proje, modern tarım teknolojilerini kullanarak çiftçilerin verimlilik artırmasını hedeflemektedir. IoT sensörler sayesinde toprak nem seviyesi, pH değeri, sıcaklık ve diğer kritik parametreler sürekli izlenmektedir. Sistem, bu verileri analiz ederek otomatik sulama yapmakta ve çiftçilere gerçek zamanlı bilgi sunmaktadır. Proje kapsamında mobil uygulama ve web paneli de geliştirilmekte, böylece çiftçiler tarım alanlarını uzaktan izleyebilmektedir.",
      support: "KOSGEB Teknoloji Geliştirme",
      category: "Teknoloji",
      budget: "₺450.000",
      status: "Aktif",
      deadline: "2024-12-15",
      location: "Ankara",
      tags: ["IoT", "Tarım", "Teknoloji", "Otomasyon"],
      contactPerson: "Ahmet Yılmaz",
      contactEmail: "ahmet.yilmaz@agrotech.com",
      contactPhone: "+90 532 123 45 67",
      projectDuration: "8 ay",
      teamSize: "6 kişi",
      technologies: ["IoT", "React", "Node.js", "MongoDB", "AWS"],
      milestones: [
        { title: "Araştırma ve Planlama", status: "Tamamlandı", date: "2024-03-01" },
        { title: "Prototip Geliştirme", status: "Tamamlandı", date: "2024-05-15" },
        { title: "Test ve Doğrulama", status: "Devam Ediyor", date: "2024-08-30" },
        { title: "Pilot Uygulama", status: "Beklemede", date: "2024-11-01" },
        { title: "Lansman", status: "Beklemede", date: "2024-12-15" }
      ],
      requirements: [
        "Tarım teknolojileri konusunda deneyim",
        "IoT sistem geliştirme becerisi",
        "Mobil uygulama geliştirme",
        "Veri analizi ve makine öğrenmesi",
        "Saha testleri için ekipman"
      ],
      image: "https://readdy.ai/api/search-image?query=modern%20smart%20agriculture%20technology%20with%20IoT%20sensors%20in%20green%20farm%20field%2C%20automated%20irrigation%20system%2C%20digital%20farming%20equipment%2C%20sustainable%20agriculture%20technology%2C%20clean%20modern%20agricultural%20machinery%2C%20professional%20agricultural%20innovation&width=800&height=400&seq=project-detail-1&orientation=landscape"
    },
    {
      id: 2,
      title: "Endüstri 4.0 Üretim Sistemi",
      company: "ManufactureTech",
      description: "Fabrika otomasyonu ve veri analizi ile üretim süreçlerini optimize eden akıllı manufacturing çözümü.",
      detailedDescription: "Endüstri 4.0 prensiplerine dayanan bu proje, üretim süreçlerini tamamen dijitalleştirmeyi hedeflemektedir. Akıllı sensörler, makine öğrenmesi algoritmaları ve gerçek zamanlı veri analizi ile üretim hatlarının verimliliği artırılmaktadır. Sistem, öngörülü bakım, kalite kontrol ve üretim optimizasyonu sağlamaktadır. Proje kapsamında ERP entegrasyonu, dashboard geliştirme ve mobil izleme uygulaması da bulunmaktadır.",
      support: "KOSGEB Ar-Ge Desteği",
      category: "Üretim",
      budget: "₺680.000",
      status: "Aktif",
      deadline: "2024-11-30",
      location: "İstanbul",
      tags: ["Endüstri 4.0", "Otomasyon", "Üretim", "Veri Analizi"],
      contactPerson: "Mehmet Demir",
      contactEmail: "mehmet.demir@manufacturtech.com",
      contactPhone: "+90 533 234 56 78",
      projectDuration: "12 ay",
      teamSize: "10 kişi",
      technologies: ["Python", "TensorFlow", "Docker", "Kubernetes", "PostgreSQL"],
      milestones: [
        { title: "Sistem Analizi", status: "Tamamlandı", date: "2024-01-15" },
        { title: "Altyapı Kurulumu", status: "Tamamlandı", date: "2024-04-01" },
        { title: "Algoritma Geliştirme", status: "Devam Ediyor", date: "2024-07-15" },
        { title: "Entegrasyon Testleri", status: "Beklemede", date: "2024-10-01" },
        { title: "Canlı Ortam", status: "Beklemede", date: "2024-11-30" }
      ],
      requirements: [
        "Endüstri 4.0 deneyimi",
        "Makine öğrenmesi uzmanlığı",
        "PLC programlama",
        "Veri analizi becerisi",
        "Sistem entegrasyonu"
      ],
      image: "https://readdy.ai/api/search-image?query=modern%20industrial%20factory%20with%20automated%20machinery%2C%20Industry%204.0%20smart%20manufacturing%20system%2C%20robotic%20production%20line%2C%20digital%20factory%20automation%2C%20high-tech%20manufacturing%20equipment%2C%20clean%20industrial%20environment&width=800&height=400&seq=project-detail-2&orientation=landscape"
    },
    {
      id: 3,
      title: "Sağlık Takip Mobil Uygulaması",
      company: "HealthTech Innovations",
      description: "Kişisel sağlık verilerini takip eden ve doktorlarla iletişim kurmayı sağlayan mobil sağlık platformu.",
      detailedDescription: "Bu mobil sağlık platformu, kullanıcıların sağlık verilerini kolayca takip etmesini ve sağlık profesyonelleri ile iletişim kurmasını sağlamaktadır. Uygulama, vital bulgular, ilaç takibi, randevu yönetimi ve telemedicine özelliklerini içermektedir. Yapay zeka destekli sağlık önerileri, acil durum bildirimleri ve ailelere bilgilendirme gibi özellikler de mevcuttur. KVKK uyumlu güvenli veri saklama sistemi kullanılmaktadır.",
      support: "KOSGEB Girişimcilik",
      category: "Sağlık",
      budget: "₺320.000",
      status: "Aktif",
      deadline: "2024-10-20",
      location: "İzmir",
      tags: ["Mobil", "Sağlık", "Uygulama", "Telemedicine"],
      contactPerson: "Dr. Ayşe Kaya",
      contactEmail: "ayse.kaya@healthtech.com",
      contactPhone: "+90 534 345 67 89",
      projectDuration: "6 ay",
      teamSize: "5 kişi",
      technologies: ["React Native", "Firebase", "Node.js", "Express", "MongoDB"],
      milestones: [
        { title: "UI/UX Tasarım", status: "Tamamlandı", date: "2024-05-01" },
        { title: "Frontend Geliştirme", status: "Tamamlandı", date: "2024-07-15" },
        { title: "Backend Geliştirme", status: "Devam Ediyor", date: "2024-09-01" },
        { title: "Test ve Güvenlik", status: "Beklemede", date: "2024-10-01" },
        { title: "Mağaza Yayını", status: "Beklemede", date: "2024-10-20" }
      ],
      requirements: [
        "Mobil uygulama geliştirme",
        "Sağlık sektörü deneyimi",
        "KVKK uyumluluk",
        "API entegrasyonu",
        "Güvenlik protokolleri"
      ],
      image: "https://readdy.ai/api/search-image?query=modern%20healthcare%20mobile%20application%20interface%20on%20smartphone%2C%20digital%20health%20monitoring%20system%2C%20medical%20technology%20innovation%2C%20clean%20user%20interface%20design%2C%20healthcare%20app%20development%2C%20professional%20medical%20technology&width=800&height=400&seq=project-detail-3&orientation=landscape"
    }
  ];

  const project = projects.find(p => p.id === parseInt(projectId)) || projects[0];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setShowContactForm(false);
    alert('Mesajınız gönderildi! Proje sahibi sizinle iletişime geçecektir.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/projeler"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <div className="w-5 h-5 flex items-center justify-center mr-2">
              <i className="ri-arrow-left-line"></i>
            </div>
            Projelere Geri Dön
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover object-top"
              />
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {project.support}
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {project.status}
                  </span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h1>
                
                <p className="text-lg text-gray-600 mb-6">
                  {project.company}
                </p>
                
                <div className="prose max-w-none mb-8">
                  <p className="text-gray-700 leading-relaxed">
                    {project.detailedDescription}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Proje Aşamaları
                  </h3>
                  <div className="space-y-4">
                    {project.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                          milestone.status === 'Tamamlandı' ? 'bg-green-500' :
                          milestone.status === 'Devam Ediyor' ? 'bg-blue-500' :
                          'bg-gray-300'
                        }`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">
                              {milestone.title}
                            </span>
                            <span className="text-sm text-gray-500">
                              {milestone.date}
                            </span>
                          </div>
                          <span className={`text-sm ${
                            milestone.status === 'Tamamlandı' ? 'text-green-600' :
                            milestone.status === 'Devam Ediyor' ? 'text-blue-600' :
                            'text-gray-500'
                          }`}>
                            {milestone.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Gereksinimler
                  </h3>
                  <ul className="space-y-2">
                    {project.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <i className="ri-check-line text-green-500"></i>
                        </div>
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Teknolojiler
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Proje Detayları
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Kategori:</span>
                  <span className="font-medium text-gray-900">{project.category}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Bütçe:</span>
                  <span className="font-medium text-gray-900">{project.budget}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Süre:</span>
                  <span className="font-medium text-gray-900">{project.projectDuration}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Takım:</span>
                  <span className="font-medium text-gray-900">{project.teamSize}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Konum:</span>
                  <span className="font-medium text-gray-900">{project.location}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Teslim:</span>
                  <span className="font-medium text-gray-900">{project.deadline}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">İletişim</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-user-line text-gray-500"></i>
                    </div>
                    <span className="text-gray-700">{project.contactPerson}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-mail-line text-gray-500"></i>
                    </div>
                    <span className="text-gray-700">{project.contactEmail}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-phone-line text-gray-500"></i>
                    </div>
                    <span className="text-gray-700">{project.contactPhone}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  İletişime Geç
                </button>
                <button className="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap">
                  Favorilere Ekle
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Etiketler</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Proje Sahibi ile İletişim
              </h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-close-line"></i>
                </div>
              </button>
            </div>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adınız Soyadınız
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-posta Adresiniz
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon Numaranız
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mesajınız
                </label>
                <textarea
                  rows={4}
                  required
                  maxLength={500}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Projeyle ilgili sorularınızı veya işbirliği teklifinizi yazın..."
                ></textarea>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
                >
                  Mesaj Gönder
                </button>
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  İptal
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