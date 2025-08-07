
'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20corporate%20business%20meeting%20room%20with%20glass%20walls%2C%20professional%20teamwork%20collaboration%2C%20minimalist%20office%20interior%20design%2C%20clean%20white%20and%20blue%20color%20scheme%2C%20natural%20lighting%20through%20large%20windows%2C%20business%20people%20working%20together%20on%20innovative%20projects%2C%20high-tech%20corporate%20environment%20with%20contemporary%20furniture&width=1920&height=1080&seq=hero-bg&orientation=landscape')`
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Kurumsal İşbirliği<br />
            <span className="text-blue-600">Platformu</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            KOSGEB destekli projeler, kurumsal çözümler ve işbirliği fırsatlarını tek platformda buluşturuyoruz. 
            Şirketinizin sorunlarına çözüm bulun, projelerinizi paylaşın ve güçlü ortaklıklar kurun.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/projeler" 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Projeleri Gör
            </Link>
            <Link 
              href="/sorun-paylas" 
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors whitespace-nowrap"
            >
              Sorununu Paylaş
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}