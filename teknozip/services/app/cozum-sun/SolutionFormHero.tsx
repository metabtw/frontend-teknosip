'use client';

import Link from 'next/link';

export default function SolutionFormHero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Çözümünüzü Paylaşın
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Şirketinizin sunduğu çözümleri platformumuzda paylaşarak iş dünyasındaki 
            projelere katkı sağlayın ve yeni ortaklıklar kurun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/projeler" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Projeleri İncele
            </Link>
            <Link 
              href="/cozumler" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              Çözümleri Gör
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}