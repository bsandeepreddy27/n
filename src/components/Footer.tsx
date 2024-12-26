import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-sm">
            © 2024 NEEPCO | 
            <a href="/terms" className="hover:text-white ml-2">Terms & Conditions</a> | 
            <a href="/privacy" className="hover:text-white ml-2">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;