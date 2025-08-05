'use client';

import Header from '../../components/Header';
import { Footer } from '@/components/Footer';
import SolutionFormHero from './SolutionFormHero';
import SolutionForm from './SolutionForm';

export default function SolutionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <SolutionFormHero />
        <SolutionForm />
      </main>
      <Footer />
    </div>
  );
}