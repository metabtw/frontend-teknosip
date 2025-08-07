
'use client';

import Link from 'next/link';

export default function DirectionCards() {
  const cards = [
    {
      title: "Proje Ekle",
      description: "KOSGEB destekli projenizi platforma ekleyin ve işbirliği ortakları bulun.",
      icon: "ri-add-box-line",
      href: "/proje-ekle",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
      title: "Çözüm Sun",
      description: "Expertise alanınızda diğer şirketlere çözüm önerileri sunun.",
      icon: "ri-lightbulb-line",
      href: "/cozum-sun",
      color: "bg-green-50 border-green-200 hover:bg-green-100"
    },
    {
      title: "İlanlar",
      description: "Sektörünüzle ilgili iş ilanlarını ve işbirliği fırsatlarını keşfedin.",
      icon: "ri-megaphone-line",
      href: "/sorunlar",
      color: "bg-green-50 border-green-200 hover:bg-green-100"

    }
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Link
              key={index}
              href={card.href}
              className={`${card.color} border-2 rounded-xl p-8 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer`}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <i className={`${card.icon} text-4xl text-blue-600`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}