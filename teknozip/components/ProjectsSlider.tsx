
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProjectsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const projects = [
    {
      id: 1,
      title: "Akıllı Tarım Teknolojileri",
      company: "AgroTech Solutions",
      description: "IoT sensörler ile tarım alanlarında verimlilik artırma projesi. Toprak analizi ve otomatik sulama sistemi geliştirilmektedir.",
      support: "KOSGEB Teknoloji Geliştirme",
      budget: "₺450.000",
      status: "Aktif",
      image: "https://readdy.ai/api/search-image?query=modern%20smart%20agriculture%20technology%20with%20IoT%20sensors%20in%20green%20farm%20field%2C%20automated%20irrigation%20system%2C%20digital%20farming%20equipment%2C%20sustainable%20agriculture%20technology%2C%20clean%20modern%20agricultural%20machinery%2C%20professional%20agricultural%20innovation&width=400&height=300&seq=project-1&orientation=landscape"
    },
    {
      id: 2,
      title: "Endüstri 4.0 Üretim Sistemi",
      company: "ManufactureTech",
      description: "Fabrika otomasyonu ve veri analizi ile üretim süreçlerini optimize eden akıllı manufacturing çözümü.",
      support: "KOSGEB Ar-Ge Desteği",
      budget: "₺680.000",
      status: "Aktif",
      image: "https://readdy.ai/api/search-image?query=modern%20industrial%20factory%20with%20automated%20machinery%2C%20Industry%204.0%20smart%20manufacturing%20system%2C%20robotic%20production%20line%2C%20digital%20factory%20automation%2C%20high-tech%20manufacturing%20equipment%2C%20clean%20industrial%20environment&width=400&height=300&seq=project-2&orientation=landscape"
    },
    {
      id: 3,
      title: "Sağlık Takip Mobil Uygulaması",
      company: "HealthTech Innovations",
      description: "Kişisel sağlık verilerini takip eden ve doktorlarla iletişim kurmayı sağlayan mobil sağlık platformu.",
      support: "KOSGEB Girişimcilik",
      budget: "₺320.000",
      status: "Aktif",
      image: "https://readdy.ai/api/search-image?query=modern%20healthcare%20mobile%20application%20interface%20on%20smartphone%2C%20digital%20health%20monitoring%20system%2C%20medical%20technology%20innovation%2C%20clean%20user%20interface%20design%2C%20healthcare%20app%20development%2C%20professional%20medical%20technology&width=400&height=300&seq=project-3&orientation=landscape"
    },
    {
      id: 4,
      title: "Sürdürülebilir Enerji Çözümleri",
      company: "GreenEnergy Corp",
      description: "Yenilenebilir enerji kaynaklarından elektrik üretimi ve akıllı şebeke entegrasyonu projesi.",
      support: "KOSGEB Çevre Desteği",
      budget: "₺750.000",
      status: "Aktif",
      image: "https://readdy.ai/api/search-image?query=modern%20renewable%20energy%20solar%20panels%20and%20wind%20turbines%2C%20sustainable%20energy%20technology%2C%20green%20energy%20solutions%2C%20clean%20environmental%20technology%2C%20modern%20solar%20farm%20installation%2C%20professional%20renewable%20energy%20equipment&width=400&height=300&seq=project-4&orientation=landscape"
    },
    {
      id: 5,
      title: "Blockchain Tabanlı Lojistik",
      company: "LogiChain Solutions",
      description: "Blockchain teknolojisi ile güvenli ve şeffaf lojistik takip sistemi geliştirme projesi.",
      support: "KOSGEB Ar-Ge Desteği",
      budget: "₺520.000",
      status: "Aktif",
      image: "https://readdy.ai/api/search-image?query=modern%20logistics%20blockchain%20technology%20with%20digital%20supply%20chain%20tracking%2C%20secure%20transportation%20network%2C%20high-tech%20logistics%20center%2C%20digital%20cargo%20tracking%20system%2C%20professional%20logistics%20technology%20infrastructure&width=400&height=250&seq=projects-5&orientation=landscape"
    },
    {
      id: 6,
      title: "Yapay Zeka Destekli Eğitim",
      company: "EduAI Technologies",
      description: "Kişiselleştirilmiş öğrenme deneyimi sunan yapay zeka destekli eğitim platformu.",
      support: "KOSGEB Teknoloji Geliştirme",
      budget: "₺380.000",
      status: "Aktif",
      image: "https://readdy.ai/api/search-image?query=modern%20artificial%20intelligence%20education%20technology%2C%20personalized%20learning%20platform%20interface%2C%20digital%20classroom%20with%20AI%20technology%2C%20educational%20technology%20innovation%2C%20modern%20e-learning%20system%2C%20professional%20educational%20software&width=400&height=250&seq=projects-6&orientation=landscape"
    },
    {
      id: 7,
      title: "Fintech Ödeme Sistemi",
      company: "PayTech Innovations",
      description: "Güvenli ve hızlı dijital ödeme çözümleri sunan fintech platformu geliştirme projesi.",
      support: "KOSGEB Girişimcilik",
      budget: "₺650.000",
      status: "Aktif",
      image: "https://readdy.ai/api/search-image?query=modern%20fintech%20payment%20system%20technology%2C%20secure%20digital%20payment%20interface%2C%20financial%20technology%20innovation%2C%20mobile%20payment%20application%2C%20professional%20financial%20software%20development%2C%20clean%20payment%20technology%20design&width=400&height=250&seq=projects-7&orientation=landscape"
    },
    {
      id: 8,
      title: "Akıllı Şehir Altyapı",
      company: "SmartCity Solutions",
      description: "Şehir altyapısını dijitalleştiren ve optimize eden akıllı şehir teknolojileri projesi.",
      support: "KOSGEB Ar-Ge Desteği",
      budget: "₺890.000",
      status: "Aktif",
      image: "https://readdy.ai/api/search-image?query=modern%20smart%20city%20infrastructure%20with%20digital%20technology%2C%20urban%20IoT%20sensors%20and%20smart%20systems%2C%20futuristic%20city%20technology%2C%20intelligent%20urban%20planning%2C%20advanced%20city%20infrastructure%2C%20professional%20smart%20city%20development&width=400&height=250&seq=projects-8&orientation=landscape"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [projects.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Öne Çıkan Projeler
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            KOSGEB desteği alan başarılı projeler ve yenilikçi çözümler
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-xl bg-gray-50">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={project.id} className="w-full flex-shrink-0">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 lg:h-96 object-cover"
                      />
                    </div>
                    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                      <div className="mb-4">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {project.support}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm font-medium">
                        {project.company}
                      </p>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-sm text-gray-500">
                          Bütçe: <span className="font-semibold text-gray-900">{project.budget}</span>
                        </div>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {project.status}
                        </span>
                      </div>
                      <Link
                        href={`/projeler/${project.id}`}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap inline-block text-center"
                      >
                        Proje Detayı
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-arrow-left-line text-xl text-gray-600"></i>
            </div>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-arrow-right-line text-xl text-gray-600"></i>
            </div>
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}