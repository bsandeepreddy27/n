import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">NEEPCO Procurement Portal</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Streamlining procurement processes with enhanced transparency and efficiency for North Eastern Electric Power Corporation Limited
          </p>
          <div className="space-x-4">
            <button className="bg-white text-blue-800 px-8 py-3 rounded-md font-semibold hover:bg-blue-50 transition-colors">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;