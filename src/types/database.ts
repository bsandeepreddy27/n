export type UserRole = 'procurement_officer' | 'vendor' | 'admin';
export type ProcurementStatus = 'pending' | 'approved' | 'rejected';
export type PaymentStatus = 'pending' | 'completed' | 'failed';
export type ReportType = 'procurement' | 'payment' | 'compliance';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  contact_number?: string;
  created_at: string;
}

export interface Vendor {
  id: string;
  name: string;
  email: string;
  contact_number?: string;
  address?: string;
  registration_date: string;
  created_at: string;
}

export interface ProcurementRequest {
  id: string;
  created_by: string;
  vendor_id: string;
  item_description: string;
  quantity: number;
  status: ProcurementStatus;
  created_at: string;
}

export interface Payment {
  id: string;
  procurement_id: string;
  amount: number;
  payment_date?: string;
  status: PaymentStatus;
  created_at: string;
}

export interface Report {
  id: string;
  report_type: ReportType;
  generated_by: string;
  created_at: string;
}

export interface ComplianceLog {
  id: string;
  action: string;
  performed_by: string;
  created_at: string;
}