'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import { Footer } from '@/components/Footer';
import ProjectFilters from './ProjectFilters';
import ProjectCard from './ProjectCard';
import ProjectHero from './ProjectHero';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Roles } from '@/constants/roles';

export default function ProjectsPage() {
  
  interface Project {
    id: number;
    title: string;
    company: string;
    description: string;
    support: string;
    category: string;
    budget: string;
    status: string;
    deadline: string;
    location: string;
    tags: string[];
    image: string;
  }

  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const projectsPerPage = 9;

  const projects = [
    {
      id: 1,
      title: "Akıllı Tarım Teknolojileri",
      company: "AgroTech Solutions",
      description: "IoT sensörler ile tarım alanlarında verimlilik artırma projesi. Toprak analizi ve otomatik sulama sistemi geliştirilmektedir.",
      support: "KOSGEB Teknoloji Geliştirme",
      category: "Teknoloji",
      budget: "₺450.000",
      status: "Aktif",
      deadline: "2024-12-15",
      location: "Ankara",
      tags: ["IoT", "Tarım", "Teknoloji", "Otomasyon"],
      image: "https://readdy.ai/api/search-image?query=modern%20smart%20agriculture%20technology%20with%20IoT%20sensors%20in%20green%20farm%20field%2C%20automated%20irrigation%20system%2C%20digital%20farming%20equipment%2C%20sustainable%20agriculture%20technology%2C%20clean%20modern%20agricultural%20machinery%2C%20professional%20agricultural%20innovation&width=400&height=250&seq=projects-1&orientation=landscape"
    },
    {
      id: 2,
      title: "Endüstri 4.0 Üretim Sistemi",
      company: "ManufactureTech",
      description: "Fabrika otomasyonu ve veri analizi ile üretim süreçlerini optimize eden akıllı manufacturing çözümü.",
      support: "KOSGEB Ar-Ge Desteği",
      category: "Üretim",
      budget: "₺680.000",
      status: "Aktif",
      deadline: "2024-11-30",
      location: "İstanbul",
      tags: ["Endüstri 4.0", "Otomasyon", "Üretim", "Veri Analizi"],
      image: "https://readdy.ai/api/search-image?query=modern%20industrial%20factory%20with%20automated%20machinery%2C%20Industry%204.0%20smart%20manufacturing%20system%2C%20robotic%20production%20line%2C%20digital%20factory%20automation%2C%20high-tech%20manufacturing%20equipment%2C%20clean%20industrial%20environment&width=400&height=250&seq=projects-2&orientation=landscape"
    },
    {
      id: 3,
      title: "Sağlık Takip Mobil Uygulaması",
      company: "HealthTech Innovations",
      description: "Kişisel sağlık verilerini takip eden ve doktorlarla iletişim kurmayı sağlayan mobil sağlık platformu.",
      support: "KOSGEB Girişimcilik",
      category: "Sağlık",
      budget: "₺320.000",
      status: "Aktif",
      deadline: "2024-10-20",
      location: "İzmir",
      tags: ["Mobil", "Sağlık", "Uygulama", "Telemedicine"],
      image: "https://readdy.ai/api/search-image?query=modern%20healthcare%20mobile%20application%20interface%20on%20smartphone%2C%20digital%20health%20monitoring%20system%2C%20medical%20technology%20innovation%2C%20clean%20user%20interface%20design%2C%20healthcare%20app%20development%2C%20professional%20medical%20technology&width=400&height=250&seq=projects-3&orientation=landscape"
    },
    {
      id: 4,
      title: "Sürdürülebilir Enerji Çözümleri",
      company: "GreenEnergy Corp",
      description: "Yenilenebilir enerji kaynaklarından elektrik üretimi ve akıllı şebeke entegrasyonu projesi.",
      support: "KOSGEB Çevre Desteği",
      category: "Enerji",
      budget: "₺750.000",
      status: "Aktif",
      deadline: "2025-01-15",
      location: "Ankara",
      tags: ["Yenilenebilir Enerji", "Çevre", "Güneş Enerjisi", "Akıllı Şebeke"],
      image: "https://readdy.ai/api/search-image?query=modern%20renewable%20energy%20solar%20panels%20and%20wind%20turbines%2C%20sustainable%20energy%20technology%2C%20green%20energy%20solutions%2C%20clean%20environmental%20technology%2C%20modern%20solar%20farm%20installation%2C%20professional%20renewable%20energy%20equipment&width=400&height=250&seq=projects-4&orientation=landscape"
    },
    {
      id: 5,
      title: "Blockchain Tabanlı Lojistik",
      company: "LogiChain Solutions",
      description: "Blockchain teknolojisi ile güvenli ve şeffaf lojistik takip sistemi geliştirme projesi.",
      support: "KOSGEB Ar-Ge Desteği",
      category: "Lojistik",
      budget: "₺520.000",
      status: "Aktif",
      deadline: "2024-12-01",
      location: "İstanbul",
      tags: ["Blockchain", "Lojistik", "Takip", "Güvenlik"],
      image: "https://readdy.ai/api/search-image?query=modern%20logistics%20blockchain%20technology%20with%20digital%20supply%20chain%20tracking%2C%20secure%20transportation%20network%2C%20high-tech%20logistics%20center%2C%20digital%20cargo%20tracking%20system%2C%20professional%20logistics%20technology%20infrastructure&width=400&height=250&seq=projects-5&orientation=landscape"
    },
    {
      id: 6,
      title: "Yapay Zeka Destekli Eğitim",
      company: "EduAI Technologies",
      description: "Kişiselleştirilmiş öğrenme deneyimi sunan yapay zeka destekli eğitim platformu.",
      support: "KOSGEB Teknoloji Geliştirme",
      category: "Eğitim",
      budget: "₺380.000",
      status: "Aktif",
      deadline: "2024-11-10",
      location: "Ankara",
      tags: ["Yapay Zeka", "Eğitim", "Kişiselleştirme", "Online Öğrenme"],
      image: "https://readdy.ai/api/search-image?query=modern%20artificial%20intelligence%20education%20technology%2C%20personalized%20learning%20platform%20interface%2C%20digital%20classroom%20with%20AI%20technology%2C%20educational%20technology%20innovation%2C%20modern%20e-learning%20system%2C%20professional%20educational%20software&width=400&height=250&seq=projects-6&orientation=landscape"
    },
    {
      id: 7,
      title: "Fintech Ödeme Sistemi",
      company: "PayTech Innovations",
      description: "Güvenli ve hızlı dijital ödeme çözümleri sunan fintech platformu geliştirme projesi.",
      support: "KOSGEB Girişimcilik",
      category: "Fintech",
      budget: "₺650.000",
      status: "Aktif",
      deadline: "2024-12-30",
      location: "İstanbul",
      tags: ["Fintech", "Ödeme", "Dijital", "Güvenlik"],
      image: "https://readdy.ai/api/search-image?query=modern%20fintech%20payment%20system%20technology%2C%20secure%20digital%20payment%20interface%2C%20financial%20technology%20innovation%2C%20mobile%20payment%20application%2C%20professional%20financial%20software%20development%2C%20clean%20payment%20technology%20design&width=400&height=250&seq=projects-7&orientation=landscape"
    },
    {
      id: 8,
      title: "Akıllı Şehir Altyapı",
      company: "SmartCity Solutions",
      description: "Şehir altyapısını dijitalleştiren ve optimize eden akıllı şehir teknolojileri projesi.",
      support: "KOSGEB Ar-Ge Desteği",
      category: "Akıllı Şehir",
      budget: "₺890.000",
      status: "Aktif",
      deadline: "2025-03-01",
      location: "Ankara",
      tags: ["Akıllı Şehir", "Altyapı", "IoT", "Optimizasyon"],
      image: "https://readdy.ai/api/search-image?query=modern%20smart%20city%20infrastructure%20with%20digital%20technology%2C%20urban%20IoT%20sensors%20and%20smart%20systems%2C%20futuristic%20city%20technology%2C%20intelligent%20urban%20planning%2C%20advanced%20city%20infrastructure%2C%20professional%20smart%20city%20development&width=400&height=250&seq=projects-8&orientation=landscape"
    },
    {
      id: 9,
      title: "Güvenlik Kamerası Analizi",
      company: "SecureVision Tech",
      description: "Yapay zeka destekli güvenlik kamerası analizi ve otomatik tehdit tespiti sistemi.",
      support: "KOSGEB Teknoloji Geliştirme",
      category: "Güvenlik",
      budget: "₺420.000",
      status: "Aktif",
      deadline: "2024-10-15",
      location: "İzmir",
      tags: ["Güvenlik", "Yapay Zeka", "Kamera", "Analiz"],
      image: "https://readdy.ai/api/search-image?query=modern%20security%20camera%20system%20with%20AI%20analysis%20technology%2C%20intelligent%20surveillance%20system%2C%20automated%20threat%20detection%2C%20professional%20security%20technology%2C%20advanced%20monitoring%20equipment%2C%20high-tech%20security%20infrastructure&width=400&height=250&seq=projects-9&orientation=landscape"
    },
    {
      id: 10,
      title: "Robotik Cerrahi Sistemi",
      company: "MedRobotics",
      description: "Hassas cerrahi operasyonlar için robotik cerrahi sistemi geliştirme projesi.",
      support: "KOSGEB Ar-Ge Desteği",
      category: "Sağlık",
      budget: "₺1.200.000",
      status: "Aktif",
      deadline: "2025-02-15",
      location: "İstanbul",
      tags: ["Robotik", "Cerrahi", "Sağlık", "Tıp"],
      image: "https://readdy.ai/api/search-image?query=modern%20robotic%20surgery%20system%20in%20hospital%20operating%20room%2C%20advanced%20medical%20robotics%20technology%2C%20precision%20surgical%20equipment%2C%20high-tech%20medical%20machinery%2C%20professional%20surgical%20robotics%2C%20clean%20medical%20technology%20environment&width=400&height=250&seq=projects-10&orientation=landscape"
    },
    {
      id: 11,
      title: "Drone Tabanlı Kargo",
      company: "SkyDelivery",
      description: "Otonom drone teknolojisi ile hızlı ve güvenli kargo teslimat sistemi projesi.",
      support: "KOSGEB Girişimcilik",
      category: "Lojistik",
      budget: "₺580.000",
      status: "Aktif",
      deadline: "2024-11-25",
      location: "Ankara",
      tags: ["Drone", "Kargo", "Otonom", "Lojistik"],
      image: "https://readdy.ai/api/search-image?query=modern%20delivery%20drone%20technology%20with%20autonomous%20cargo%20system%2C%20professional%20drone%20delivery%20service%2C%20high-tech%20logistics%20drones%2C%20advanced%20aerial%20delivery%20system%2C%20modern%20unmanned%20delivery%20technology%2C%20clean%20sky%20delivery%20infrastructure&width=400&height=250&seq=projects-11&orientation=landscape"
    },
    {
      id: 12,
      title: "Sanal Gerçeklik Eğitimi",
      company: "VR Learning Hub",
      description: "Sanal gerçeklik teknolojisi ile immersive eğitim deneyimi sunan platform.",
      support: "KOSGEB Teknoloji Geliştirme",
      category: "Eğitim",
      budget: "₺460.000",
      status: "Aktif",
      deadline: "2024-12-20",
      location: "İzmir",
      tags: ["Sanal Gerçeklik", "Eğitim", "VR", "İmmersive"],
      image: "https://readdy.ai/api/search-image?query=modern%20virtual%20reality%20education%20technology%2C%20immersive%20VR%20learning%20experience%2C%20educational%20VR%20headset%20technology%2C%20professional%20virtual%20reality%20training%20system%2C%20advanced%20VR%20education%20platform%2C%20clean%20educational%20technology%20environment&width=400&height=250&seq=projects-12&orientation=landscape"
    }
  ];

  interface Filters {
    search?: string;
    category?: string;
    location?: string;
    status?: string;
    support?: string;
  }

  const handleFilter = (filters: Filters) => {
    setLoading(true);
    
    let filtered = projects;

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm) ||
        project.company.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(project => 
        project.category === filters.category
      );
    }

    if (filters.support && filters.support !== 'all') {
      filtered = filtered.filter(project => 
        project.support === filters.support
      );
    }

    if (filters.location && filters.location !== 'all') {
      filtered = filtered.filter(project => 
        project.location === filters.location
      );
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(project => 
        project.status === filters.status
      );
    }

    setTimeout(() => {
      setFilteredProjects(filtered);
      setCurrentPage(1);
      setLoading(false);
    }, 300);
  };

  const displayedProjects = filteredProjects.length > 0 ? filteredProjects : projects;
  const totalPages = Math.ceil(displayedProjects.length / projectsPerPage);
  const currentProjects = displayedProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProjectHero />
      <ProjectFilters onFilter={handleFilter} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Tüm Projeler ({displayedProjects.length})
          </h2>
          <div className="flex items-center space-x-4">
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8">
              <option value="newest">En Yeni</option>
              <option value="oldest">En Eski</option>
              <option value="budget-high">Bütçe (Yüksek)</option>
              <option value="budget-low">Bütçe (Düşük)</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-md bg-white border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Önceki
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-md text-sm whitespace-nowrap ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-md bg-white border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    Sonraki
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
   );

}