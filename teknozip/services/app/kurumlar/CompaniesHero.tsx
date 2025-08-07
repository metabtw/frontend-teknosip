'use client';

import Link from 'next/link';

export default function CompaniesHero() {
  return (
    <section 
      className="relative bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20 overflow-hidden"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20corporate%20office%20building%20with%20glass%20facade%20professional%20business%20environment%20companies%20working%20together%20collaboration%20corporate%20success%20blue%20and%20purple%20color%20scheme%20clean%20professional%20background&width=1920&height=600&seq=companies-hero&orientation=landscape')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-purple-900 bg-opacity-80"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Platformumuzda Kayıtlı Kurumlar
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
            İşbirliği platformumuza güvenen ve aktif olarak çözüm üreten kurumları keşfedin. 
            Güçlü ortaklıklar kurun ve projelerde işbirliği yapın.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/projeler" 
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Projeleri İncele
            </Link>
            <Link 
              href="/cozumler" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors whitespace-nowrap"
            >
              Çözümleri Gör
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-white bg-opacity-20 rounded-full">
                <i className="ri-building-line text-3xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">500+ Kurum</h3>
              <p className="text-purple-100 text-sm">
                Farklı sektörlerden güvenilir kurumlar
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-white bg-opacity-20 rounded-full">
                <i className="ri-handshake-line text-3xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">1000+ Ortaklık</h3>
              <p className="text-purple-100 text-sm">
                Başarılı işbirliği projeleri
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-white bg-opacity-20 rounded-full">
                <i className="ri-award-line text-3xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">%95 Başarı</h3>
              <p className="text-purple-100 text-sm">
                Yüksek proje başarı oranı
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}