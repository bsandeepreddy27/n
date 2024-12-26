import { supabase } from '../lib/supabase';
import type { Vendor } from '../types/database';

export async function getVendors() {
  const { data, error } = await supabase
    .from('vendors')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data;
}

export async function createVendor(vendor: Omit<Vendor, 'id' | 'created_at' | 'registration_date'>) {
  const { data, error } = await supabase
    .from('vendors')
    .insert([vendor])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateVendor(
  id: string,
  vendor: Partial<Omit<Vendor, 'id' | 'created_at' | 'registration_date'>>
) {
  const { data, error } = await supabase
    .from('vendors')
    .update(vendor)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteVendor(id: string) {
  const { error } = await supabase
    .from('vendors')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}