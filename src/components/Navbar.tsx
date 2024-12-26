import React from 'react';
import { Building2 } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Building2 className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold">NEEPCO</span>
          </div>
          <div className="flex space-x-4">
            <a href="/" className="hover:bg-blue-700 px-3 py-2 rounded-md">Home</a>
            <a href="/about" className="hover:bg-blue-700 px-3 py-2 rounded-md">About Us</a>
            <a href="/login" className="hover:bg-blue-700 px-3 py-2 rounded-md">Login</a>
            <a href="/signup" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md">Sign Up</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;