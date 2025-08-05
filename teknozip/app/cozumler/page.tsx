'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Footer } from '@/components/Footer';
import SolutionsHero from './SolutionsHero';
import SolutionsFilters from './SolutionsFilters';
import SolutionCard from './SolutionCard';

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState([]);
  const [filteredSolutions, setFilteredSolutions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const itemsPerPage = 9;

  // Mock data for solutions
  const mockSolutions = [
    {
      id: 1,
      title: "E-Ticaret Platformu Geliştirme",
      description: "Tam entegre e-ticaret çözümü ile online satış sürecinizi optimize edin. Özel tasarım, mobil uyumluluk ve güvenli ödeme sistemleri ile profesyonel e-ticaret deneyimi.",
      company: "DigiCommerce Teknoloji",
      companySize: "51-200 kişi",
      serviceType: "Tam Hizmet",
      category: "E-Ticaret",
      technologies: ["React", "Node.js", "MongoDB", "AWS"],
      targetSectors: ["Perakende", "Moda", "Elektronik", "Kozmetik"],
      budget: "100.000 - 250.000 TL",
      timeline: "3-6 ay",
      image: "https://readdy.ai/api/search-image?query=modern%20e-commerce%20platform%20interface%20with%20shopping%20cart%20and%20product%20catalog%20clean%20design%20blue%20and%20white%20background%20professional%20online%20store%20layout%20responsive%20web%20design&width=400&height=300&seq=solution-1&orientation=landscape",
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      title: "Yapay Zeka Tabanlı Müşteri Hizmetleri",
      description: "Gelişmiş NLP teknolojisi ile 7/24 otomatik müşteri desteği. Chatbot entegrasyonu ve akıllı yanıt sistemleri ile müşteri memnuniyetini artırın.",
      company: "AI Solutions Pro",
      companySize: "11-50 kişi",
      serviceType: "Danışmanlık",
      category: "Yapay Zeka",
      technologies: ["Python", "TensorFlow", "Django", "Azure"],
      targetSectors: ["Finans", "Telekomünikasyon", "E-Ticaret", "Sağlık"],
      budget: "50.000 - 100.000 TL",
      timeline: "1-3 ay",
      image: "https://readdy.ai/api/search-image?query=artificial%20intelligence%20customer%20service%20chatbot%20interface%20with%20modern%20design%20blue%20theme%20technology%20background%20AI%20assistant%20digital%20communication%20clean%20professional%20layout&width=400&height=300&seq=solution-2&orientation=landscape",
      createdAt: "2024-01-20T14:15:00Z"
    },
    {
      id: 3,
      title: "Mobil Uygulama Geliştirme",
      description: "iOS ve Android için native ve cross-platform mobil uygulama geliştirme. Kullanıcı deneyimi odaklı tasarım ve performans optimizasyonu.",
      company: "MobileFirst Studios",
      companySize: "201-1000 kişi",
      serviceType: "Geliştirme",
      category: "Mobil Uygulama",
      technologies: ["React Native", "Swift", "Kotlin", "Firebase"],
      targetSectors: ["Fintech", "Sağlık", "Eğitim", "Oyun"],
      budget: "150.000 - 350.000 TL",
      timeline: "3-6 ay",
      image: "https://readdy.ai/api/search-image?query=mobile%20application%20development%20smartphone%20interface%20modern%20app%20design%20clean%20user%20interface%20blue%20and%20white%20theme%20professional%20mobile%20screen%20layouts%20technology%20background&width=400&height=300&seq=solution-3&orientation=landscape",
      createdAt: "2024-01-12T09:45:00Z"
    },
    {
      id: 4,
      title: "Siber Güvenlik Danışmanlığı",
      description: "Kapsamlı siber güvenlik değerlendirmesi ve koruma çözümleri. Güvenlik açıklarının tespiti, risk analizi ve güvenlik protokollerinin uygulanması.",
      company: "SecureNet Teknoloji",
      companySize: "51-200 kişi",
      serviceType: "Danışmanlık",
      category: "Siber Güvenlik",
      technologies: ["Penetration Testing", "SIEM", "Firewall", "Encryption"],
      targetSectors: ["Finans", "Sağlık", "Kamu", "Enerji"],
      budget: "75.000 - 200.000 TL",
      timeline: "1-3 ay",
      image: "https://readdy.ai/api/search-image?query=cybersecurity%20technology%20digital%20shield%20protection%20network%20security%20blue%20dark%20background%20professional%20security%20interface%20cyber%20defense%20modern%20technology%20design&width=400&height=300&seq=solution-4&orientation=landscape",
      createdAt: "2024-01-18T16:20:00Z"
    },
    {
      id: 5,
      title: "Bulut Altyapı Yönetimi",
      description: "AWS, Azure ve Google Cloud platformlarında bulut altyapı kurulumu ve yönetimi. Maliyet optimizasyonu, ölçeklenebilirlik ve yedekleme çözümleri.",
      company: "CloudMaster Solutions",
      companySize: "11-50 kişi",
      serviceType: "Sistem Entegrasyonu",
      category: "Bulut Hizmetleri",
      technologies: ["AWS", "Azure", "Docker", "Kubernetes"],
      targetSectors: ["Teknoloji", "Finans", "E-Ticaret", "Startup"],
      budget: "50.000 - 150.000 TL",
      timeline: "1-4 hafta",
      image: "https://readdy.ai/api/search-image?query=cloud%20computing%20infrastructure%20servers%20data%20center%20technology%20blue%20digital%20background%20professional%20cloud%20services%20network%20architecture%20modern%20tech%20design&width=400&height=300&seq=solution-5&orientation=landscape",
      createdAt: "2024-01-10T11:30:00Z"
    },
    {
      id: 6,
      title: "Veri Analizi ve Business Intelligence",
      description: "Büyük veri analizi, raporlama ve görselleştirme çözümleri. Karar destek sistemleri ve prediktif analiz ile işletme zekası geliştirin.",
      company: "DataInsights Analytics",
      companySize: "201-1000 kişi",
      serviceType: "Danışmanlık",
      category: "Veri Analizi",
      technologies: ["Python", "R", "Tableau", "Power BI"],
      targetSectors: ["Finans", "Perakende", "Sağlık", "Üretim"],
      budget: "100.000 - 300.000 TL",
      timeline: "3-6 ay",
      image: "https://readdy.ai/api/search-image?query=data%20analytics%20business%20intelligence%20dashboard%20charts%20graphs%20professional%20interface%20blue%20theme%20data%20visualization%20modern%20analytics%20platform%20clean%20design&width=400&height=300&seq=solution-6&orientation=landscape",
      createdAt: "2024-01-25T13:45:00Z"
    },
    {
      id: 7,
      title: "IoT Çözümleri ve Akıllı Sistemler",
      description: "Nesnelerin interneti (IoT) tabanlı akıllı sistemler. Sensör entegrasyonu, veri toplama ve izleme sistemleri ile endüstriyel otomasyon.",
      company: "SmartTech IoT",
      companySize: "51-200 kişi",
      serviceType: "Tam Hizmet",
      category: "IoT Çözümleri",
      technologies: ["Arduino", "Raspberry Pi", "MQTT", "InfluxDB"],
      targetSectors: ["Üretim", "Tarım", "Enerji", "Akıllı Şehir"],
      budget: "200.000 - 500.000 TL",
      timeline: "6-12 ay",
      image: "https://readdy.ai/api/search-image?query=internet%20of%20things%20IoT%20smart%20devices%20connected%20sensors%20technology%20network%20blue%20modern%20background%20industrial%20automation%20smart%20systems%20professional%20tech%20design&width=400&height=300&seq=solution-7&orientation=landscape",
      createdAt: "2024-01-08T15:10:00Z"
    },
    {
      id: 8,
      title: "Blockchain ve Kripto Çözümleri",
      description: "Blockchain teknolojisi ile güvenli ve şeffaf çözümler. Akıllı kontratlar, tokenizasyon ve merkezi olmayan uygulama geliştirme.",
      company: "BlockChain Innovators",
      companySize: "11-50 kişi",
      serviceType: "Geliştirme",
      category: "Blockchain",
      technologies: ["Ethereum", "Solidity", "Web3.js", "Hyperledger"],
      targetSectors: ["Finans", "Lojistik", "Sağlık", "Emlak"],
      budget: "150.000 - 400.000 TL",
      timeline: "3-6 ay",
      image: "https://readdy.ai/api/search-image?query=blockchain%20technology%20cryptocurrency%20digital%20blocks%20chain%20network%20blue%20futuristic%20background%20crypto%20innovation%20modern%20fintech%20design%20professional%20layout&width=400&height=300&seq=solution-8&orientation=landscape",
      createdAt: "2024-01-22T12:20:00Z"
    },
    {
      id: 9,
      title: "Dijital Pazarlama ve SEO",
      description: "Kapsamlı dijital pazarlama stratejileri, SEO optimizasyonu ve sosyal medya yönetimi. Online görünürlük ve satış artışı için entegre çözümler.",
      company: "Digital Marketing Pro",
      companySize: "1-10 kişi",
      serviceType: "Danışmanlık",
      category: "Dijital Pazarlama",
      technologies: ["Google Analytics", "Facebook Ads", "LinkedIn Ads", "SEMrush"],
      targetSectors: ["E-Ticaret", "Hizmet", "B2B", "Turizm"],
      budget: "25.000 - 75.000 TL",
      timeline: "1-3 ay",
      image: "https://readdy.ai/api/search-image?query=digital%20marketing%20SEO%20social%20media%20analytics%20dashboard%20modern%20interface%20blue%20theme%20marketing%20automation%20professional%20digital%20advertising%20clean%20design&width=400&height=300&seq=solution-9&orientation=landscape",
      createdAt: "2024-01-28T10:15:00Z"
    },
    {
      id: 10,
      title: "Eğitim Teknolojileri Platformu",
      description: "Online eğitim platformu geliştirme ve öğrenme yönetim sistemleri. Interaktif içerik, sınav sistemi ve öğrenci takip araçları.",
      company: "EduTech Solutions",
      companySize: "51-200 kişi",
      serviceType: "Tam Hizmet",
      category: "Eğitim Teknolojileri",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      targetSectors: ["Eğitim", "Kurumsal Eğitim", "Kamu", "Özel Okullar"],
      budget: "200.000 - 500.000 TL",
      timeline: "6-12 ay",
      image: "https://readdy.ai/api/search-image?query=educational%20technology%20online%20learning%20platform%20e-learning%20interface%20modern%20education%20system%20blue%20clean%20design%20student%20dashboard%20digital%20classroom%20professional%20layout&width=400&height=300&seq=solution-10&orientation=landscape",
      createdAt: "2024-01-05T14:30:00Z"
    }
  ];

  useEffect(() => {
    setSolutions(mockSolutions);
    setFilteredSolutions(mockSolutions);
  }, []);

  const handleFilter = (filters) => {
    let filtered = solutions;

    if (filters.search) {
      filtered = filtered.filter(solution =>
        solution.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        solution.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        solution.company.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(solution => solution.category === filters.category);
    }

    if (filters.serviceType && filters.serviceType !== 'all') {
      filtered = filtered.filter(solution => solution.serviceType === filters.serviceType);
    }

    if (filters.companySize && filters.companySize !== 'all') {
      filtered = filtered.filter(solution => solution.companySize.includes(filters.companySize));
    }

    if (filters.budget && filters.budget !== 'all') {
      filtered = filtered.filter(solution => solution.budget && solution.budget.includes(filters.budget));
    }

    if (filters.technologies && filters.technologies !== 'all') {
      filtered = filtered.filter(solution => 
        solution.technologies.some(tech => tech.toLowerCase().includes(filters.technologies.toLowerCase()))
      );
    }

    setFilteredSolutions(filtered);
    setCurrentPage(1);
  };

  const handleSort = (sortValue) => {
    setSortBy(sortValue);
    let sorted = [...filteredSolutions];

    switch (sortValue) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'company':
        sorted.sort((a, b) => a.company.localeCompare(b.company));
        break;
      default:
        break;
    }

    setFilteredSolutions(sorted);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSolutions = filteredSolutions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSolutions.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <SolutionsHero />
        <SolutionsFilters onFilter={handleFilter} />
        
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Çözümler ({filteredSolutions.length})
                </h2>
                <p className="text-gray-600 mt-1">
                  İhtiyacınıza uygun çözümleri keşfedin
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Sırala:</label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-8"
                >
                  <option value="newest">En Yeni</option>
                  <option value="oldest">En Eski</option>
                  <option value="title">Başlık A-Z</option>
                  <option value="company">Şirket A-Z</option>
                </select>
              </div>
            </div>

            {currentSolutions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentSolutions.map((solution) => (
                  <SolutionCard key={solution.id} solution={solution} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-gray-100 rounded-full">
                  <i className="ri-search-line text-2xl text-gray-400"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Çözüm bulunamadı
                </h3>
                <p className="text-gray-600">
                  Arama kriterlerinizi değiştirmeyi deneyin
                </p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex space-x-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Önceki
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        currentPage === number
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sonraki
                  </button>
                </nav>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}