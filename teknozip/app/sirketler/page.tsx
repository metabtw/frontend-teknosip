'use client';

import MainHero from '@/components/MainHero';
import Filters from '@/components/Filters';
import Header from '@/components/Header';
import OrganizationCard from '@/components/OrganizationCard';
import { Footer } from '@/components/Footer';

// Örnek şirket verisi
const companies = [
  {
    id: '1',
    logo: '/logos/company1.svg',
    name: 'TechnoVision',
    sector: 'Yazılım',
    status: 'active',
    employeeCount: 250,
    city: 'İstanbul',
    foundedYear: 2015,
    expertise: ['Yapay Zeka', 'Bulut Bilişim', 'Veri Analizi'],
    projectCount: 45,
    rating: 4.8,
    type: 'company'
  },
  {
    id: '2',
    logo: '/logos/company2.svg',
    name: 'SmartSolutions',
    sector: 'Bilişim',
    status: 'active',
    employeeCount: 120,
    city: 'Ankara',
    foundedYear: 2018,
    expertise: ['IoT', 'Endüstri 4.0', 'Robotik'],
    projectCount: 32,
    rating: 4.6,
    type: 'company'
  },
  {
    id: '3',
    logo: '/logos/company3.svg',
    name: 'InnovaTech',
    sector: 'AR-GE',
    status: 'active',
    employeeCount: 85,
    city: 'İzmir',
    foundedYear: 2019,
    expertise: ['Biyoteknoloji', 'Nanoteknoloji', 'Malzeme Bilimi'],
    projectCount: 28,
    rating: 4.7,
    type: 'company'
  },
  {
    id: '4',
    logo: '/logos/company4.svg',
    name: 'DataMetrics',
    sector: 'Veri Analizi',
    status: 'active',
    employeeCount: 150,
    city: 'İstanbul',
    foundedYear: 2017,
    expertise: ['Büyük Veri', 'Makine Öğrenmesi', 'İş Zekası'],
    projectCount: 56,
    rating: 4.9,
    type: 'company'
  },
  {
    id: '5',
    logo: '/logos/company5.svg',
    name: 'CloudTech',
    sector: 'Bulut Bilişim',
    status: 'active',
    employeeCount: 180,
    city: 'Ankara',
    foundedYear: 2016,
    expertise: ['Bulut Altyapı', 'DevOps', 'Siber Güvenlik'],
    projectCount: 67,
    rating: 4.8,
    type: 'company'
  },
  {
    id: '6',
    logo: '/logos/company6.svg',
    name: 'MobileSoft',
    sector: 'Mobil Teknolojiler',
    status: 'active',
    employeeCount: 95,
    city: 'İstanbul',
    foundedYear: 2020,
    expertise: ['Mobil Uygulama', 'UI/UX Tasarım', 'Cross-Platform Geliştirme'],
    projectCount: 23,
    rating: 4.5,
    type: 'company'
  }
] as const;

export default function CompaniesPage() {
  return (
    <main>
      <Header />
      <MainHero />
      <Filters />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <OrganizationCard
              key={company.id}
              {...company}
              expertise={[...company.expertise]}
              type="company"
            />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}