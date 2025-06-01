
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CarInventoryTab from '@/components/admin/CarInventoryTab';
import ContactInquiriesTab from '@/components/admin/ContactInquiriesTab';
import FinanceApplicationsTab from '@/components/admin/FinanceApplicationsTab';
import CarOrdersTab from '@/components/admin/CarOrdersTab';

const Admin = () => {
  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="inventory" className="text-white data-[state=active]:bg-red-600">
              Car Inventory
            </TabsTrigger>
            <TabsTrigger value="contacts" className="text-white data-[state=active]:bg-red-600">
              Contact Inquiries
            </TabsTrigger>
            <TabsTrigger value="finance" className="text-white data-[state=active]:bg-red-600">
              Finance Applications
            </TabsTrigger>
            <TabsTrigger value="orders" className="text-white data-[state=active]:bg-red-600">
              Car Orders
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="inventory" className="mt-6">
            <CarInventoryTab />
          </TabsContent>
          
          <TabsContent value="contacts" className="mt-6">
            <ContactInquiriesTab />
          </TabsContent>
          
          <TabsContent value="finance" className="mt-6">
            <FinanceApplicationsTab />
          </TabsContent>
          
          <TabsContent value="orders" className="mt-6">
            <CarOrdersTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
