
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Mail, Phone } from 'lucide-react';
import SearchAndFilter from './SearchAndFilter';
import { exportToCSV, formatDateForExport } from '@/utils/exportUtils';

interface FinanceApplication {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  car_id: string | null;
  loan_amount: number | null;
  annual_income: number | null;
  employment_status: string | null;
  created_at: string;
}

const FinanceApplicationsTab = () => {
  const [applications, setApplications] = useState<FinanceApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('finance-applications-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'finance_applications'
        },
        () => {
          console.log('Finance applications updated, refreshing...');
          fetchApplications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('finance_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching finance applications:', error);
      toast({
        title: "Error",
        description: "Failed to fetch finance applications",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = useMemo(() => {
    if (!searchTerm) return applications;
    
    return applications.filter(application =>
      application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (application.employment_status && application.employment_status.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (application.phone && application.phone.includes(searchTerm))
    );
  }, [applications, searchTerm]);

  const handleExport = () => {
    const exportData = filteredApplications.map(application => ({
      Date: formatDateForExport(application.created_at),
      Name: application.name,
      Email: application.email,
      Phone: application.phone || '',
      'Loan Amount': application.loan_amount ? `€${application.loan_amount}` : '',
      'Annual Income': application.annual_income ? `€${application.annual_income}` : '',
      'Employment Status': application.employment_status || ''
    }));
    
    exportToCSV(exportData, 'finance-applications');
    toast({
      title: "Success",
      description: "Finance applications exported successfully"
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    
    try {
      const { error } = await supabase
        .from('finance_applications')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Finance application deleted successfully"
      });
      
      fetchApplications();
    } catch (error) {
      console.error('Error deleting application:', error);
      toast({
        title: "Error",
        description: "Failed to delete application",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="text-white text-center">Loading finance applications...</div>;
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Finance Applications ({filteredApplications.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onExport={handleExport}
          onRefresh={fetchApplications}
          placeholder="Search by name, email, or employment status..."
        />
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Email</TableHead>
                <TableHead className="text-gray-300">Phone</TableHead>
                <TableHead className="text-gray-300">Loan Amount</TableHead>
                <TableHead className="text-gray-300">Annual Income</TableHead>
                <TableHead className="text-gray-300">Employment</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="text-white">
                    {new Date(application.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-white">{application.name}</TableCell>
                  <TableCell className="text-white">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${application.email}`} className="text-blue-400 hover:text-blue-300">
                        {application.email}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">
                    {application.phone ? (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <a href={`tel:${application.phone}`} className="text-blue-400 hover:text-blue-300">
                          {application.phone}
                        </a>
                      </div>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-white">
                    {application.loan_amount ? `€${application.loan_amount.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell className="text-white">
                    {application.annual_income ? `€${application.annual_income.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell className="text-white">
                    {application.employment_status || '-'}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(application.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredApplications.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            {searchTerm ? 'No applications match your search.' : 'No finance applications found.'}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FinanceApplicationsTab;
