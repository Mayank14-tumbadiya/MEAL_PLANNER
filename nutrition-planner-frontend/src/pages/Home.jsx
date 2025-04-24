import React from 'react';
import Hero from './Hero';
import NutritionSection from './NutritionSection' ;
import WhyChooseUs from './WhyChooseUs';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <NutritionSection/>
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default Home;
