'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import { Footer } from '@/components/Footer';
import ProjectForm from './ProjectForm';
import ProjectFormHero from './ProjectFormHero';

export default function AddProjectPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProjectFormHero />
      <ProjectForm />
      <Footer />
    </div>
  );
}