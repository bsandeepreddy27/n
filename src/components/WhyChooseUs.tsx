import React from 'react';

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="space-y-6">
            <p className="text-lg text-gray-600">
              Our portal offers a comprehensive solution for all procurement needs with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Enhanced transparency in procurement processes</li>
              <li>Streamlined vendor management and evaluation</li>
              <li>Real-time tracking and monitoring capabilities</li>
              <li>Automated compliance checks and documentation</li>
              <li>Integrated payment processing system</li>
              <li>Advanced reporting and analytics tools</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;