'use client';

import Link from 'next/link';

export default function ProblemFormHero() {
  return (
    <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Sorununuzu Paylaşın
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-red-100 max-w-3xl mx-auto">
            İş dünyasındaki zorluklarınızı platformumuzda paylaşarak yenilikçi çözüm 
            ortaklarıyla buluşun ve projelerinizi hayata geçirin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/cozumler" 
              className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Çözümleri Gör
            </Link>
            <Link 
              href="/sorunlar" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors whitespace-nowrap"
            >
              Diğer Sorunlar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}