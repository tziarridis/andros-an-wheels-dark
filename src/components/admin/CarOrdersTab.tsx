
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Mail, Phone } from 'lucide-react';
import SearchAndFilter from './SearchAndFilter';
import { exportToCSV, formatDateForExport } from '@/utils/exportUtils';

interface CarOrder {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  car_make: string;
  car_model: string;
  budget_range: string | null;
  special_requirements: string | null;
  created_at: string;
}

const CarOrdersTab = () => {
  const [orders, setOrders] = useState<CarOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('car-orders-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'car_orders'
        },
        () => {
          console.log('Car orders updated, refreshing...');
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('car_orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching car orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch car orders",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders;
    
    return orders.filter(order =>
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.car_make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.car_model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.budget_range && order.budget_range.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.phone && order.phone.includes(searchTerm))
    );
  }, [orders, searchTerm]);

  const handleExport = () => {
    const exportData = filteredOrders.map(order => ({
      Date: formatDateForExport(order.created_at),
      Name: order.name,
      Email: order.email,
      Phone: order.phone || '',
      'Car Make': order.car_make,
      'Car Model': order.car_model,
      'Budget Range': order.budget_range || '',
      'Special Requirements': order.special_requirements || ''
    }));
    
    exportToCSV(exportData, 'car-orders');
    toast({
      title: "Success",
      description: "Car orders exported successfully"
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    
    try {
      const { error } = await supabase
        .from('car_orders')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Car order deleted successfully"
      });
      
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
      toast({
        title: "Error",
        description: "Failed to delete order",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="text-white text-center">Loading car orders...</div>;
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Car Orders ({filteredOrders.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onExport={handleExport}
          onRefresh={fetchOrders}
          placeholder="Search by name, email, car make/model..."
        />
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Email</TableHead>
                <TableHead className="text-gray-300">Phone</TableHead>
                <TableHead className="text-gray-300">Car</TableHead>
                <TableHead className="text-gray-300">Budget</TableHead>
                <TableHead className="text-gray-300">Requirements</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="text-white">
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-white">{order.name}</TableCell>
                  <TableCell className="text-white">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${order.email}`} className="text-blue-400 hover:text-blue-300">
                        {order.email}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">
                    {order.phone ? (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <a href={`tel:${order.phone}`} className="text-blue-400 hover:text-blue-300">
                          {order.phone}
                        </a>
                      </div>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-white">
                    {order.car_make} {order.car_model}
                  </TableCell>
                  <TableCell className="text-white">
                    {order.budget_range || '-'}
                  </TableCell>
                  <TableCell className="text-white max-w-xs truncate">
                    {order.special_requirements || '-'}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(order.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredOrders.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            {searchTerm ? 'No orders match your search.' : 'No car orders found.'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CarOrdersTab;
