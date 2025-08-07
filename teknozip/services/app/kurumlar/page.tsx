'use client';

import MainHero from '@/components/MainHero';
import Header from '@/components/Header';
import Filters from '@/components/Filters';
import OrganizationCard from '@/components/OrganizationCard';
import { Footer } from '@/components/Footer';

// Örnek kurum verisi
const institutions = [
  {
    id: '1',
    logo: '/logos/institution1.svg',
    name: 'İstanbul Teknik Üniversitesi',
    sector: 'Eğitim',
    status: 'active',
    employeeCount: 5000,
    city: 'İstanbul',
    foundedYear: 1773,
    expertise: [...['Mühendislik', 'AR-GE', 'İnovasyon']],
    projectCount: 187,
    rating: 4.9,
    type: 'institution'
  },
  {
    id: '2',
    logo: '/logos/institution2.svg',
    name: 'TÜBİTAK',
    sector: 'Araştırma',
    status: 'active',
    employeeCount: 3000,
    city: 'Ankara',
    foundedYear: 1963,
    expertise: [...['Bilimsel Araştırma', 'Teknoloji Geliştirme', 'AR-GE Destekleri']],
    projectCount: 520,
    rating: 4.7,
    type: 'institution'
  },
  {
    id: '3',
    logo: '/logos/institution3.svg',
    name: 'İstanbul Büyükşehir Belediyesi',
    sector: 'Yerel Yönetim',
    status: 'active',
    employeeCount: 15000,
    city: 'İstanbul',
    foundedYear: 1855,
    expertise: [...['Akıllı Şehir', 'Sürdürülebilirlik', 'Ulaşım']],
    projectCount: 245,
    rating: 4.5,
    type: 'institution'
  },
  {
    id: '4',
    logo: '/logos/institution4.svg',
    name: 'Sanayi ve Teknoloji Bakanlığı',
    sector: 'Kamu',
    status: 'active',
    employeeCount: 8000,
    city: 'Ankara',
    foundedYear: 1957,
    expertise: [...['Endüstriyel Politikalar', 'Teknoloji Geliştirme', 'Yatırım Teşvikleri']],
    projectCount: 312,
    rating: 4.6,
    type: 'institution'
  },
  {
    id: '5',
    logo: '/logos/institution5.svg',
    name: 'KOSGEB',
    sector: 'Kamu',
    status: 'active',
    employeeCount: 2000,
    city: 'Ankara',
    foundedYear: 1990,
    expertise: [...['KOBİ Destekleri', 'Girişimcilik', 'İş Geliştirme']],
    projectCount: 890,
    rating: 4.4,
    type: 'institution'
  },
  {
    id: '6',
    logo: '/logos/institution6.svg',
    name: 'Boğaziçi Üniversitesi',
    sector: 'Eğitim',
    status: 'active',
    employeeCount: 4000,
    city: 'İstanbul',
    foundedYear: 1863,
    expertise: [...['Temel Bilimler', 'Sosyal Bilimler', 'Mühendislik']],
    projectCount: 156,
    rating: 4.8,
    type: 'institution'
  }
];

export default function InstitutionsPage() {
  return (
    <main>
      <Header />
      <MainHero />
      <Filters />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {institutions.map((institution) => (
            <OrganizationCard
              key={institution.id}
              {...institution}
              type="institution"
              status={institution.status as 'active' | 'inactive'}
            />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}