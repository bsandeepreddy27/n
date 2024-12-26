import React from 'react';
import { ShoppingCart, Users, Wallet, FileText, ClipboardCheck, Building, Shield, BarChart } from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features = () => {
  const features = [
    {
      Icon: ShoppingCart,
      title: "Procurement Management",
      description: "Simplified purchase order creation and vendor selection process with automated workflows."
    },
    {
      Icon: Users,
      title: "Vendor Management",
      description: "Centralized database to track vendor performance, contact details, and compliance statuses."
    },
    {
      Icon: Wallet,
      title: "Payment Tracking",
      description: "Real-time updates on payment statuses and due amounts with automated notifications."
    },
    {
      Icon: FileText,
      title: "Documentation",
      description: "Comprehensive document management system for all procurement-related files."
    },
    {
      Icon: ClipboardCheck,
      title: "Compliance Monitoring",
      description: "Automated compliance checks and regulatory requirement tracking."
    },
    {
      Icon: Building,
      title: "Department Integration",
      description: "Seamless coordination between different departments for procurement needs."
    },
    {
      Icon: Shield,
      title: "Security",
      description: "Advanced security measures to protect sensitive procurement data."
    },
    {
      Icon: BarChart,
      title: "Analytics",
      description: "Detailed insights and reports on procurement performance metrics."
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Features of the Portal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;