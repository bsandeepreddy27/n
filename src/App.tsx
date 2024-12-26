import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Features from './components/Features';
import VendorManagement from './components/vendor/VendorManagement';
import WhyChooseUs from './components/WhyChooseUs';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Mission />
        <Features />
        <VendorManagement />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  );
}

export default App;