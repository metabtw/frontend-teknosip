'use client';

import Link from 'next/link';

export default function ProjectHero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          KOSGEB Destekli Projeler
        </h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
          Türkiye'nin en büyük kurumsal işbirliği platformunda binlerce proje ile tanışın. 
          İş ortaklıkları kurun, çözümler sunun ve projelerinizi büyütün.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/proje-ekle"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            Proje Ekle
          </Link>
          <Link
            href="/cozum-sun"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors whitespace-nowrap"
          >
            Çözüm Sun
          </Link>
        </div>
      </div>
    </div>
  );
}