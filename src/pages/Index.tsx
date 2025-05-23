
import React from 'react';
import HeroSection from '../components/HeroSection';
import Navigation from '../components/Navigation';
import TransitionSection from '../components/TransitionSection';
import LightSection from '../components/LightSection';
import CathedralGallery from '../components/CathedralGallery';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <TransitionSection />
      <LightSection />
      <CathedralGallery />
      <Footer />
    </div>
  );
};

export default Index;
