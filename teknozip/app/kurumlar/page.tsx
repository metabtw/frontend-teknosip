'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CompaniesHero from './CompaniesHero';
import CompaniesFilters from './CompaniesFilters';
import CompanyCard from './CompanyCard';

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const itemsPerPage = 12;

  // Mock data for companies
  const mockCompanies = [
    {
      id: 1,
      name: "TechCorp Solutions",
      sector: "Teknoloji",
      size: "201-1000",
      location: "İstanbul",
      foundedYear: 2015,
      description: "Kurumsal yazılım çözümleri ve dijital dönüşüm projelerinde uzman teknoloji şirketi. Bulut tabanlı sistemler ve yapay zeka uygulamaları geliştiriyoruz.",
      expertise: ["Yazılım Geliştirme", "Yapay Zeka", "Bulut Hizmetleri", "Veri Analizi", "Siber Güvenlik"],
      projectCount: 145,
      rating: 4.8,
      logo: "https://readdy.ai/api/search-image?query=modern%20technology%20company%20logo%20design%20clean%20professional%20corporate%20brand%20identity%20minimalist%20tech%20logo%20blue%20geometric%20shapes%20contemporary%20style&width=80&height=80&seq=company-logo-1&orientation=squarish"
    },
    {
      id: 2,
      name: "InnovateTech Yazılım",
      sector: "Teknoloji",
      size: "51-200",
      location: "Ankara",
      foundedYear: 2018,
      description: "Mobil uygulama geliştirme ve e-ticaret çözümlerinde uzman. Kullanıcı deneyimi odaklı yaklaşımla yenilikçi projeler hayata geçiriyoruz.",
      expertise: ["Mobil Uygulama", "E-Ticaret", "UI/UX Tasarım", "React Native", "Flutter"],
      projectCount: 89,
      rating: 4.6,
      logo: "https://readdy.ai/api/search-image?query=innovative%20software%20company%20logo%20modern%20digital%20tech%20branding%20clean%20professional%20design%20geometric%20abstract%20shapes%20corporate%20identity%20blue%20colors&width=80&height=80&seq=company-logo-2&orientation=squarish"
    },
    {
      id: 3,
      name: "DataFlow Analytics",
      sector: "Finans",
      size: "11-50",
      location: "İzmir",
      foundedYear: 2020,
      description: "Büyük veri analizi ve iş zekası çözümleri sunan fintech şirketi. Finansal verilerin analizinde uzman ekibimizle risk yönetimi ve prediktif analiz hizmetleri veriyoruz.",
      expertise: ["Veri Analizi", "Fintech", "Risk Yönetimi", "Business Intelligence", "Machine Learning"],
      projectCount: 67,
      rating: 4.7,
      logo: "https://readdy.ai/api/search-image?query=data%20analytics%20company%20logo%20modern%20financial%20tech%20branding%20professional%20corporate%20design%20clean%20geometric%20shapes%20blue%20and%20green%20colors&width=80&height=80&seq=company-logo-3&orientation=squarish"
    },
    {
      id: 4,
      name: "MedTech Health Solutions",
      sector: "Sağlık",
      size: "101-500",
      location: "Bursa",
      foundedYear: 2012,
      description: "Sağlık teknolojileri alanında öncü şirket. Hastane bilgi sistemleri, telemedicine çözümleri ve medikal cihaz entegrasyonları geliştiriyoruz.",
      expertise: ["Sağlık Teknolojileri", "Telemedicine", "Hastane Bilgi Sistemleri", "IoT", "Mobil Sağlık"],
      projectCount: 156,
      rating: 4.9,
      logo: "https://readdy.ai/api/search-image?query=medical%20technology%20company%20logo%20healthcare%20tech%20branding%20professional%20corporate%20design%20clean%20medical%20cross%20symbol%20blue%20and%20green%20colors&width=80&height=80&seq=company-logo-4&orientation=squarish"
    },
    {
      id: 5,
      name: "EduTech Learning",
      sector: "Eğitim",
      size: "51-200",
      location: "Antalya",
      foundedYear: 2017,
      description: "Eğitim teknolojileri ve online öğrenme platformları geliştiren şirket. Kurumsal eğitim çözümleri ve e-öğrenme sistemleri sunuyoruz.",
      expertise: ["Eğitim Teknolojileri", "E-Öğrenme", "LMS", "Gamification", "Artırılmış Gerçeklik"],
      projectCount: 92,
      rating: 4.5,
      logo: "https://readdy.ai/api/search-image?query=education%20technology%20company%20logo%20e-learning%20platform%20branding%20professional%20corporate%20design%20clean%20book%20symbol%20blue%20and%20orange%20colors&width=80&height=80&seq=company-logo-5&orientation=squarish"
    },
    {
      id: 6,
      name: "SecureNet Siber Güvenlik",
      sector: "Teknoloji",
      size: "11-50",
      location: "Kocaeli",
      foundedYear: 2019,
      description: "Siber güvenlik çözümleri ve danışmanlık hizmetleri sunan uzman şirket. Penetration testing, güvenlik denetimi ve risk analizi alanlarında hizmet veriyoruz.",
      expertise: ["Siber Güvenlik", "Penetration Testing", "Risk Analizi", "Güvenlik Denetimi", "Kriptografi"],
      projectCount: 78,
      rating: 4.8,
      logo: "https://readdy.ai/api/search-image?query=cybersecurity%20company%20logo%20digital%20security%20branding%20professional%20corporate%20design%20clean%20shield%20symbol%20blue%20and%20dark%20colors&width=80&height=80&seq=company-logo-6&orientation=squarish"
    },
    {
      id: 7,
      name: "SmartFactory IoT",
      sector: "Üretim",
      size: "201-1000",
      location: "Adana",
      foundedYear: 2014,
      description: "Endüstri 4.0 çözümleri ve akıllı fabrika sistemleri geliştiren şirket. IoT sensörleri, otomasyon sistemleri ve predictive maintenance çözümleri sunuyoruz.",
      expertise: ["IoT", "Endüstri 4.0", "Otomasyon", "Predictive Maintenance", "Sensör Teknolojileri"],
      projectCount: 203,
      rating: 4.7,
      logo: "https://readdy.ai/api/search-image?query=smart%20factory%20IoT%20company%20logo%20industrial%20technology%20branding%20professional%20corporate%20design%20clean%20gear%20symbol%20blue%20and%20orange%20colors&width=80&height=80&seq=company-logo-7&orientation=squarish"
    },
    {
      id: 8,
      name: "BlockChain Innovations",
      sector: "Finans",
      size: "1-10",
      location: "Gaziantep",
      foundedYear: 2021,
      description: "Blockchain teknolojileri ve kripto çözümleri alanında uzman startup. DeFi uygulamaları, smart contract geliştirme ve tokenizasyon projeleri yürütüyoruz.",
      expertise: ["Blockchain", "Smart Contracts", "DeFi", "Tokenization", "Cryptocurrency"],
      projectCount: 34,
      rating: 4.4,
      logo: "https://readdy.ai/api/search-image?query=blockchain%20company%20logo%20cryptocurrency%20tech%20branding%20professional%20corporate%20design%20clean%20chain%20symbol%20blue%20and%20gold%20colors&width=80&height=80&seq=company-logo-8&orientation=squarish"
    },
    {
      id: 9,
      name: "GreenTech Energy",
      sector: "Enerji",
      size: "51-200",
      location: "Konya",
      foundedYear: 2016,
      description: "Yenilenebilir enerji teknolojileri ve akıllı şebeke çözümleri sunan şirket. Solar panel monitoring, enerji verimliliği ve smart grid sistemleri geliştiriyoruz.",
      expertise: ["Yenilenebilir Enerji", "Smart Grid", "Enerji Verimliliği", "Solar Teknolojileri", "IoT"],
      projectCount: 127,
      rating: 4.6,
      logo: "https://readdy.ai/api/search-image?query=green%20energy%20technology%20company%20logo%20renewable%20energy%20branding%20professional%20corporate%20design%20clean%20leaf%20symbol%20green%20and%20blue%20colors&width=80&height=80&seq=company-logo-9&orientation=squarish"
    },
    {
      id: 10,
      name: "LogiTech Transport",
      sector: "Lojistik",
      size: "101-500",
      location: "Kayseri",
      foundedYear: 2013,
      description: "Akıllı lojistik çözümleri ve tedarik zinciri yönetimi sistemleri geliştiren şirket. Fleet management, route optimization ve warehouse management çözümleri sunuyoruz.",
      expertise: ["Lojistik Teknolojileri", "Fleet Management", "Route Optimization", "Warehouse Management", "GPS Tracking"],
      projectCount: 168,
      rating: 4.5,
      logo: "https://readdy.ai/api/search-image?query=logistics%20technology%20company%20logo%20transport%20tech%20branding%20professional%20corporate%20design%20clean%20truck%20symbol%20blue%20and%20red%20colors&width=80&height=80&seq=company-logo-10&orientation=squarish"
    },
    {
      id: 11,
      name: "CloudFirst Solutions",
      sector: "Teknoloji",
      size: "11-50",
      location: "İstanbul",
      foundedYear: 2019,
      description: "Bulut altyapı hizmetleri ve DevOps çözümleri sunan şirket. AWS, Azure ve Google Cloud platformlarında uzman ekibimizle cloud migration ve yönetim hizmetleri veriyoruz.",
      expertise: ["Bulut Hizmetleri", "DevOps", "Cloud Migration", "AWS", "Azure"],
      projectCount: 95,
      rating: 4.7,
      logo: "https://readdy.ai/api/search-image?query=cloud%20computing%20company%20logo%20tech%20branding%20professional%20corporate%20design%20clean%20cloud%20symbol%20blue%20and%20white%20colors&width=80&height=80&seq=company-logo-11&orientation=squarish"
    },
    {
      id: 12,
      name: "DigitalMark Agency",
      sector: "Danışmanlık",
      size: "1-10",
      location: "Ankara",
      foundedYear: 2020,
      description: "Dijital pazarlama ve SEO uzmanı ajans. Social media management, content marketing ve online advertising alanlarında comprehensive çözümler sunuyoruz.",
      expertise: ["Dijital Pazarlama", "SEO", "Social Media", "Content Marketing", "Google Ads"],
      projectCount: 187,
      rating: 4.3,
      logo: "https://readdy.ai/api/search-image?query=digital%20marketing%20agency%20logo%20modern%20advertising%20branding%20professional%20corporate%20design%20clean%20megaphone%20symbol%20blue%20and%20orange%20colors&width=80&height=80&seq=company-logo-12&orientation=squarish"
    }
  ];

  useEffect(() => {
    setCompanies(mockCompanies);
    setFilteredCompanies(mockCompanies);
  }, []);

  const handleFilter = (filters) => {
    let filtered = companies;

    if (filters.search) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        company.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.sector && filters.sector !== 'all') {
      filtered = filtered.filter(company => company.sector === filters.sector);
    }

    if (filters.size && filters.size !== 'all') {
      filtered = filtered.filter(company => company.size.includes(filters.size));
    }

    if (filters.location && filters.location !== 'all') {
      filtered = filtered.filter(company => company.location === filters.location);
    }

    if (filters.expertise && filters.expertise !== 'all') {
      filtered = filtered.filter(company => 
        company.expertise.some(exp => exp.toLowerCase().includes(filters.expertise.toLowerCase()))
      );
    }

    setFilteredCompanies(filtered);
    setCurrentPage(1);
  };

  const handleSort = (sortValue) => {
    setSortBy(sortValue);
    let sorted = [...filteredCompanies];

    switch (sortValue) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'projects':
        sorted.sort((a, b) => b.projectCount - a.projectCount);
        break;
      case 'founded':
        sorted.sort((a, b) => b.foundedYear - a.foundedYear);
        break;
      default:
        break;
    }

    setFilteredCompanies(sorted);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <CompaniesHero />
        <CompaniesFilters onFilter={handleFilter} />
        
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Kayıtlı Kurumlar ({filteredCompanies.length})
                </h2>
                <p className="text-gray-600 mt-1">
                  Platformumuzda aktif olan güvenilir kurumlar
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Sırala:</label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm pr-8"
                >
                  <option value="name">İsim A-Z</option>
                  <option value="rating">En Yüksek Puan</option>
                  <option value="projects">En Çok Proje</option>
                  <option value="founded">En Yeni</option>
                </select>
              </div>
            </div>

            {currentCompanies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-gray-100 rounded-full">
                  <i className="ri-building-line text-2xl text-gray-400"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Kurum bulunamadı
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
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-700 hover:text-purple-600'
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