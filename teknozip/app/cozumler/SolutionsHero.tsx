
'use client';

import Link from 'next/link';

export default function SolutionsHero() {
  return (
    <section 
      className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 overflow-hidden"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20office%20environment%20with%20technology%20professionals%20working%20on%20innovative%20solutions%20and%20digital%20transformation%20projects%20in%20a%20bright%20collaborative%20workspace%20with%20blue%20and%20white%20color%20scheme%20corporate%20setting%20clean%20background&width=1920&height=600&seq=solutions-hero&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-blue-900 bg-opacity-80"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Çözümlerimizi Keşfedin
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Deneyimli şirketler tarafından sunulan yenilikçi çözümleri inceleyin. 
            İhtiyacınıza uygun teknoloji ortaklarını bulun.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/cozum-sun" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Çözüm Paylaş
            </Link>
            <Link 
              href="/sorunlar" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              Sorunlara Bak
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-white bg-opacity-20 rounded-full">
                <i className="ri-lightbulb-line text-3xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Yenilikçi Çözümler</h3>
              <p className="text-blue-100 text-sm">
                En son teknolojiler kullanılarak geliştirilen çözümler
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-white bg-opacity-20 rounded-full">
                <i className="ri-team-line text-3xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Uzman Ekipler</h3>
              <p className="text-blue-100 text-sm">
                Deneyimli ve sertifikalı profesyoneller
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-white bg-opacity-20 rounded-full">
                <i className="ri-shield-check-line text-3xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Güvenilir Hizmet</h3>
              <p className="text-blue-100 text-sm">
                Kaliteli ve güvenilir çözüm ortaklıkları
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
