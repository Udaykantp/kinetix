import React from 'react';
import { Hero } from './Hero';
import { CompatibilityFinder } from './CompatibilityFinder';
import { CategoryGrid } from './CategoryGrid';
import { FeaturedProducts } from './FeaturedProducts';
import { TechShowcase } from './TechShowcase';
import { ComparisonSection } from './ComparisonSection';
import { Testimonials } from './Testimonials';
import { TrustedBrands } from './TrustedBrands';
import { FAQSection } from './FAQSection';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#17191C]">
      <Hero />
      <CompatibilityFinder />
      <CategoryGrid />
      <FeaturedProducts />
      <TechShowcase />
      <ComparisonSection />
      <Testimonials />
      <TrustedBrands />
      <FAQSection />
    </div>
  );
};
