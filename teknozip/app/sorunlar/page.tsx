'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProblemsHero from './ProblemsHero';
import ProblemsFilters from './ProblemsFilters';
import ProblemCard from './ProblemCard';
import { useState } from 'react';

export default function ProblemsPage() {
  const [problems] = useState([
    {
      id: 1,
      title: "E-Ticaret Platformu için Ödeme Sistemi Entegrasyonu",
      description: "Mevcut e-ticaret platformumuza güvenli ve hızlı ödeme sistemi entegrasyonu yapacak teknik ekip arıyoruz. Visa, MasterCard ve yerel ödeme yöntemlerini desteklemesi gerekiyor.",
      category: "Fintech",
      company: "DigitalStore A.Ş.",
      location: "İstanbul",
      budget: "50.000-100.000 TL",
      urgency: "Acil",
      deadline: "2024-02-15",
      skills: ["Payment Integration", "API Development", "Security"],
      createdAt: "2024-01-10",
      image: "https://readdy.ai/api/search-image?query=modern%20e-commerce%20payment%20system%20integration%20with%20credit%20cards%20and%20digital%20wallets%2C%20secure%20online%20payment%20processing%20interface%2C%20fintech%20technology%20solution%20with%20clean%20white%20background%2C%20professional%20business%20software%20design%2C%20payment%20gateway%20visualization&width=600&height=400&seq=problem-1&orientation=landscape"
    },
    {
      id: 2,
      title: "Hastane Yönetim Sistemi için Mobil Uygulama",
      description: "Hastane personeli için hasta kayıtları, randevu yönetimi ve tıbbi geçmiş takibi yapabilen mobil uygulama geliştirmesi. iOS ve Android platformlarında çalışması gerekiyor.",
      category: "Sağlık",
      company: "MedTech Solutions",
      location: "Ankara",
      budget: "100.000-250.000 TL",
      urgency: "Orta",
      deadline: "2024-03-30",
      skills: ["Mobile Development", "Healthcare IT", "Database"],
      createdAt: "2024-01-08",
      image: "https://readdy.ai/api/search-image?query=healthcare%20mobile%20application%20interface%20for%20hospital%20management%20system%2C%20medical%20records%20and%20patient%20data%20on%20tablet%20screen%2C%20doctor%20using%20healthcare%20technology%2C%20clean%20medical%20environment%20with%20white%20background%2C%20professional%20healthcare%20software%20design&width=600&height=400&seq=problem-2&orientation=landscape"
    },
    {
      id: 3,
      title: "Üretim Tesisi için IoT Sensör Ağı Kurulumu",
      description: "Tekstil üretim tesisimizde makine performansı, sıcaklık ve nem takibi için IoT sensör ağı kurulumu ve veri analizi sistemi. Gerçek zamanlı monitoring gerekli.",
      category: "IoT",
      company: "TextilPro İmalat",
      location: "Bursa",
      budget: "250.000-500.000 TL",
      urgency: "Normal",
      deadline: "2024-05-20",
      skills: ["IoT", "Sensor Networks", "Data Analytics"],
      createdAt: "2024-01-05",
      image: "https://readdy.ai/api/search-image?query=industrial%20IoT%20sensor%20network%20in%20textile%20manufacturing%20facility%2C%20smart%20factory%20monitoring%20system%20with%20sensors%20and%20data%20visualization%2C%20modern%20industrial%20automation%20technology%2C%20clean%20factory%20environment%20with%20white%20background&width=600&height=400&seq=problem-3&orientation=landscape"
    },
    {
      id: 4,
      title: "Lojistik Şirketi için Araç Takip Sistemi",
      description: "Filo yönetimi ve araç takibi için GPS tabanlı sistem geliştirmesi. Rota optimizasyonu, yakıt tüketimi takibi ve sürücü performans raporları içermeli.",
      category: "Lojistik",
      company: "FastCargo Lojistik",
      location: "İzmir",
      budget: "75.000-150.000 TL",
      urgency: "Acil",
      deadline: "2024-02-28",
      skills: ["GPS Tracking", "Fleet Management", "Route Optimization"],
      createdAt: "2024-01-12",
      image: "https://readdy.ai/api/search-image?query=logistics%20vehicle%20tracking%20system%20with%20GPS%20monitoring%2C%20fleet%20management%20dashboard%20on%20computer%20screen%2C%20transportation%20and%20delivery%20tracking%20technology%2C%20modern%20logistics%20control%20center%20with%20white%20background&width=600&height=400&seq=problem-4&orientation=landscape"
    },
    {
      id: 5,
      title: "Eğitim Platformu için Video Konferans Entegrasyonu",
      description: "Online eğitim platformumuza video konferans, ekran paylaşımı ve interaktif whiteboard özellikleri eklenecek. Zoom, Teams gibi platformlarla entegrasyon.",
      category: "Eğitim",
      company: "EduTech Online",
      location: "Ankara",
      budget: "30.000-75.000 TL",
      urgency: "Normal",
      deadline: "2024-04-15",
      skills: ["Video Conferencing", "WebRTC", "Education Technology"],
      createdAt: "2024-01-07",
      image: "https://readdy.ai/api/search-image?query=online%20education%20platform%20with%20video%20conferencing%20interface%2C%20students%20and%20teacher%20in%20virtual%20classroom%2C%20digital%20learning%20technology%20with%20webcam%20and%20screen%20sharing%2C%20modern%20educational%20software%20design%20with%20white%20background&width=600&height=400&seq=problem-5&orientation=landscape"
    },
    {
      id: 6,
      title: "Finans Şirketi için Risk Analizi Sistemi",
      description: "Kredi başvurularını otomatik değerlendiren AI tabanlı risk analizi sistemi. Makine öğrenmesi algoritmaları ile risk skorlaması yapacak.",
      category: "Fintech",
      company: "FinanceCore",
      location: "İstanbul",
      budget: "200.000-400.000 TL",
      urgency: "Normal",
      deadline: "2024-06-30",
      skills: ["Machine Learning", "Risk Assessment", "Financial Analytics"],
      createdAt: "2024-01-03",
      image: "https://readdy.ai/api/search-image?query=financial%20risk%20analysis%20system%20with%20AI%20and%20machine%20learning%20algorithms%2C%20credit%20scoring%20dashboard%20with%20charts%20and%20graphs%2C%20modern%20fintech%20software%20interface%2C%20professional%20financial%20technology%20with%20white%20background&width=600&height=400&seq=problem-6&orientation=landscape"
    },
    {
      id: 7,
      title: "Perakende Zinciri için Stok Yönetim Sistemi",
      description: "Çok mağazalı perakende zinciri için merkezi stok yönetimi, satış analizi ve otomatik sipariş sistemi. Gerçek zamanlı stok takibi gerekli.",
      category: "Perakende",
      company: "RetailMax Mağazaları",
      location: "İstanbul",
      budget: "150.000-300.000 TL",
      urgency: "Orta",
      deadline: "2024-04-30",
      skills: ["Inventory Management", "POS Integration", "Analytics"],
      createdAt: "2024-01-09",
      image: "https://readdy.ai/api/search-image?query=retail%20inventory%20management%20system%20dashboard%20with%20stock%20tracking%2C%20warehouse%20management%20software%20interface%2C%20modern%20retail%20technology%20with%20barcode%20scanning%2C%20clean%20retail%20environment%20with%20white%20background&width=600&height=400&seq=problem-7&orientation=landscape"
    },
    {
      id: 8,
      title: "Otomotiv Servisi için Randevu ve Fatura Sistemi",
      description: "Otomotiv servisi için online randevu sistemi, müşteri takibi, iş emri yönetimi ve otomatik fatura kesme sistemi geliştirmesi.",
      category: "Otomotiv",
      company: "AutoService Pro",
      location: "Bursa",
      budget: "40.000-80.000 TL",
      urgency: "Normal",
      deadline: "2024-03-15",
      skills: ["Appointment System", "CRM", "Billing System"],
      createdAt: "2024-01-11",
      image: "https://readdy.ai/api/search-image?query=automotive%20service%20management%20system%20with%20appointment%20scheduling%2C%20car%20repair%20shop%20software%20interface%2C%20automotive%20industry%20technology%20solution%2C%20modern%20garage%20management%20with%20white%20background&width=600&height=400&seq=problem-8&orientation=landscape"
    },
    {
      id: 9,
      title: "Gayrimenkul Portalı için Sanal Tur Sistemi",
      description: "Gayrimenkul portalımız için 360 derece sanal tur sistemi, VR desteği ve interaktif kat planları. Emlak ilanlarına entegre edilecek.",
      category: "Gayrimenkul",
      company: "RealEstate Digital",
      location: "Antalya",
      budget: "80.000-160.000 TL",
      urgency: "Orta",
      deadline: "2024-05-10",
      skills: ["Virtual Reality", "360 Photography", "3D Modeling"],
      createdAt: "2024-01-06",
      image: "https://readdy.ai/api/search-image?query=real%20estate%20virtual%20tour%20system%20with%20360%20degree%20property%20viewing%2C%20VR%20headset%20for%20property%20visualization%2C%20modern%20real%20estate%20technology%20interface%2C%20digital%20property%20showcase%20with%20white%20background&width=600&height=400&seq=problem-9&orientation=landscape"
    },
    {
      id: 10,
      title: "Tarım Kooperatifi için Ürün Takip Sistemi",
      description: "Tarım ürünlerinin üretimden tüketiciye kadar takibi için blockchain tabanlı sistem. Organik sertifika ve kalite kontrol süreçleri dahil.",
      category: "Tarım",
      company: "AgroTech Kooperatifi",
      location: "Konya",
      budget: "120.000-240.000 TL",
      urgency: "Normal",
      deadline: "2024-07-15",
      skills: ["Blockchain", "Supply Chain", "Agriculture Tech"],
      createdAt: "2024-01-04",
      image: "https://readdy.ai/api/search-image?query=agriculture%20product%20tracking%20system%20with%20blockchain%20technology%2C%20farm%20to%20table%20supply%20chain%20monitoring%2C%20organic%20farming%20technology%20interface%2C%20modern%20agricultural%20management%20with%20white%20background&width=600&height=400&seq=problem-10&orientation=landscape"
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <ProblemsHero />
        <ProblemsFilters />
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {problems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex space-x-2">
                <button className="px-4 py-2 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50">
                  Önceki
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  1
                </button>
                <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                  2
                </button>
                <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                  3
                </button>
                <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                  Sonraki
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}