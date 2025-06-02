
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Mail, Phone } from 'lucide-react';
import SearchAndFilter from './SearchAndFilter';
import { exportToCSV, formatDateForExport } from '@/utils/exportUtils';

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  car_id: string | null;
  created_at: string;
}

const ContactInquiriesTab = () => {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchInquiries();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('contact-inquiries-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_inquiries'
        },
        () => {
          console.log('Contact inquiries updated, refreshing...');
          fetchInquiries();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching contact inquiries:', error);
      toast({
        title: "Error",
        description: "Failed to fetch contact inquiries",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredInquiries = useMemo(() => {
    if (!searchTerm) return inquiries;
    
    return inquiries.filter(inquiry =>
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inquiry.phone && inquiry.phone.includes(searchTerm))
    );
  }, [inquiries, searchTerm]);

  const handleExport = () => {
    const exportData = filteredInquiries.map(inquiry => ({
      Date: formatDateForExport(inquiry.created_at),
      Name: inquiry.name,
      Email: inquiry.email,
      Phone: inquiry.phone || '',
      Message: inquiry.message
    }));
    
    exportToCSV(exportData, 'contact-inquiries');
    toast({
      title: "Success",
      description: "Contact inquiries exported successfully"
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    
    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Contact inquiry deleted successfully"
      });
      
      fetchInquiries();
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to delete inquiry",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="text-white text-center">Loading contact inquiries...</div>;
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Contact Inquiries ({filteredInquiries.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onExport={handleExport}
          onRefresh={fetchInquiries}
          placeholder="Search by name, email, or message..."
        />
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Email</TableHead>
                <TableHead className="text-gray-300">Phone</TableHead>
                <TableHead className="text-gray-300">Message</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell className="text-white">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-white">{inquiry.name}</TableCell>
                  <TableCell className="text-white">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${inquiry.email}`} className="text-blue-400 hover:text-blue-300">
                        {inquiry.email}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">
                    {inquiry.phone ? (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <a href={`tel:${inquiry.phone}`} className="text-blue-400 hover:text-blue-300">
                          {inquiry.phone}
                        </a>
                      </div>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-white max-w-xs truncate">
                    {inquiry.message}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(inquiry.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredInquiries.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            {searchTerm ? 'No inquiries match your search.' : 'No contact inquiries found.'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactInquiriesTab;
