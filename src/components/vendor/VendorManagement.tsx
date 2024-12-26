import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import VendorCard from './VendorCard';
import VendorModal from './VendorModal';
import { useVendors } from '../../hooks/useVendors';
import type { Vendor } from '../../types/database';

const VendorManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | undefined>();
  const { vendors, loading, error, addVendor, updateVendor, removeVendor } = useVendors();

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleSubmit = async (data: Omit<Vendor, 'id' | 'created_at' | 'registration_date'>) => {
    try {
      if (selectedVendor) {
        await updateVendor(selectedVendor.id, data);
      } else {
        await addVendor(data);
      }
      setIsModalOpen(false);
      setSelectedVendor(undefined);
    } catch (err) {
      alert('Failed to save vendor');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading vendors: {error.message}
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Vendor Management</h2>
          <button
            onClick={() => {
              setSelectedVendor(undefined);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add Vendor
          </button>
        </div>
        
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search vendors..."
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map(vendor => (
            <VendorCard
              key={vendor.id}
              {...vendor}
              onEdit={() => {
                setSelectedVendor(vendor);
                setIsModalOpen(true);
              }}
              onDelete={async () => {
                if (window.confirm('Are you sure you want to delete this vendor?')) {
                  try {
                    await removeVendor(vendor.id);
                  } catch (err) {
                    alert('Failed to delete vendor');
                  }
                }
              }}
            />
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No vendors found matching your criteria
          </div>
        )}

        <VendorModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedVendor(undefined);
          }}
          vendor={selectedVendor}
          onSubmit={handleSubmit}
        />
      </div>
    </section>
  );
};

export default VendorManagement;