
'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import DirectionCards from '../components/DirectionCards';
import Stats from '../components/Stats';
import ProjectsSlider from '../components/ProjectsSlider';
import CompanyLogos from '../components/CompanyLogos';
import ContactForm from '../components/ContactForm';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <DirectionCards />
      <Stats />
      <ProjectsSlider />
      <CompanyLogos />
      <ContactForm />
      <Footer />
    </div>
  );
}