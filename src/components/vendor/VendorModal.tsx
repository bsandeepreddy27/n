import React from 'react';
import type { Vendor } from '../../types/database';
import VendorForm from './VendorForm';

interface VendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendor?: Vendor;
  onSubmit: (data: Omit<Vendor, 'id' | 'created_at' | 'registration_date'>) => Promise<void>;
}

const VendorModal = ({ isOpen, onClose, vendor, onSubmit }: VendorModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black opacity-30"></div>
        <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6">
            {vendor ? 'Edit Vendor' : 'Add New Vendor'}
          </h2>
          <VendorForm
            initialData={vendor}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default VendorModal;