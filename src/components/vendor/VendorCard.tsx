import React from 'react';
import { Star, MapPin, Phone, Mail, Edit2, Trash2 } from 'lucide-react';
import type { Vendor } from '../../types/database';

interface VendorCardProps extends Vendor {
  onEdit: () => void;
  onDelete: () => void;
}

const VendorCard = ({
  name,
  email,
  contact_number,
  address,
  onEdit,
  onDelete
}: VendorCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative group">
      <div className="absolute top-4 right-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="p-1 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Edit2 className="h-4 w-4" />
        </button>
        <button
          onClick={onDelete}
          className="p-1 text-gray-600 hover:text-red-600 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">{name}</h3>
      </div>

      <div className="space-y-2 text-gray-600">
        {address && (
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{address}</span>
          </div>
        )}
        {contact_number && (
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            <span>{contact_number}</span>
          </div>
        )}
        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-2" />
          <span>{email}</span>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;