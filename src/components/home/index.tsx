'use client';

import { Fragment } from 'react';
import ActionButtons from './components/ActionButtons';
import FeatureCards from './components/FeatureCards';
import HeroSection from './components/HeroSection';
import ContactUs from './components/Contact';

export default function HomeModule() {
  return (
    <main>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-6 text-center">
        <HeroSection />
        <ActionButtons />
        <FeatureCards />
      </div>
        <ContactUs />
    </main>
  );
}