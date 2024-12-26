export interface Vendor {
  id: string;
  name: string;
  category: string;
  rating: number;
  location: string;
  phone: string;
  email: string;
  complianceStatus: 'Approved' | 'Pending' | 'Under Review';
}

export const vendors: Vendor[] = [
  {
    id: '1',
    name: 'PowerTech Solutions Ltd.',
    category: 'Power Equipment',
    rating: 4.8,
    location: 'Guwahati, Assam',
    phone: '+91-361-2345678',
    email: 'contact@powertech.com',
    complianceStatus: 'Approved'
  },
  {
    id: '2',
    name: 'Northeast Industrial Supplies',
    category: 'Industrial Materials',
    rating: 4.5,
    location: 'Shillong, Meghalaya',
    phone: '+91-364-2789012',
    email: 'nis@supplies.com',
    complianceStatus: 'Approved'
  },
  {
    id: '3',
    name: 'Hydro Equipment Specialists',
    category: 'Hydroelectric Equipment',
    rating: 4.2,
    location: 'Itanagar, Arunachal Pradesh',
    phone: '+91-360-2234567',
    email: 'info@hydroequip.com',
    complianceStatus: 'Under Review'
  },
  {
    id: '4',
    name: 'Eastern Engineering Works',
    category: 'Engineering Services',
    rating: 4.0,
    location: 'Dimapur, Nagaland',
    phone: '+91-386-2345678',
    email: 'contact@eew.com',
    complianceStatus: 'Pending'
  }
];