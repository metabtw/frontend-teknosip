'use client';

import Link from 'next/link';

export default function ProblemsHero() {
  return (
    <section 
      className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-20 bg-cover bg-center"
      style={{
        backgroundImage: `url('https://readdy.ai/api/search-image?query=business%20problem%20solving%20concept%20with%20team%20collaboration%2C%20professionals%20working%20together%20to%20find%20solutions%2C%20modern%20office%20environment%20with%20problem-solving%20charts%20and%20diagrams%2C%20corporate%20challenge%20and%20solution%20visualization%2C%20clean%20white%20and%20red%20color%20scheme%20with%20professional%20atmosphere&width=1920&height=1080&seq=problems-hero&orientation=landscape')`
      }}
    >
      <div className="absolute inset-0 bg-red-600 bg-opacity-80"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            İş Sorunları ve Çözüm Arayışları
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-red-100 max-w-3xl mx-auto">
            Şirketlerin karşılaştığı teknik sorunları keşfedin ve expertise alanınızda 
            çözümler sunarak yeni iş ortaklıkları kurun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/sorun-paylas" 
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Sorun Paylaş
            </Link>
            <Link 
              href="/cozumler" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors whitespace-nowrap"
            >
              Çözümleri Gör
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}