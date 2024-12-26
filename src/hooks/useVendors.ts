import { useState, useEffect } from 'react';
import { Vendor } from '../types/database';
import * as vendorService from '../services/vendorService';

export function useVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadVendors();
  }, []);

  async function loadVendors() {
    try {
      setLoading(true);
      const data = await vendorService.getVendors();
      setVendors(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load vendors'));
    } finally {
      setLoading(false);
    }
  }

  async function addVendor(vendor: Omit<Vendor, 'id' | 'created_at' | 'registration_date'>) {
    try {
      const newVendor = await vendorService.createVendor(vendor);
      setVendors(prev => [...prev, newVendor]);
      return newVendor;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to add vendor');
    }
  }

  async function updateVendor(
    id: string,
    vendor: Partial<Omit<Vendor, 'id' | 'created_at' | 'registration_date'>>
  ) {
    try {
      const updatedVendor = await vendorService.updateVendor(id, vendor);
      setVendors(prev => prev.map(v => v.id === id ? updatedVendor : v));
      return updatedVendor;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update vendor');
    }
  }

  async function removeVendor(id: string) {
    try {
      await vendorService.deleteVendor(id);
      setVendors(prev => prev.filter(v => v.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete vendor');
    }
  }

  return {
    vendors,
    loading,
    error,
    addVendor,
    updateVendor,
    removeVendor,
    refresh: loadVendors
  };
}