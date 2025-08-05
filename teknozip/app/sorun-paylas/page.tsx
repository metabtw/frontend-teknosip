'use client';

import Header from '../../components/Header';
import { Footer } from '@/components/Footer';
import ProblemFormHero from './ProblemFormHero';
import ProblemForm from './ProblemForm';

export default function ProblemPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <ProblemFormHero />
        <ProblemForm />
      </main>
      <Footer />
    </div>
  );
}