
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Calculator, Clock, Shield, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Finance = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    annual_income: '',
    employment_status: '',
    loan_amount: '',
    car_id: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('finance_applications')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          annual_income: formData.annual_income ? parseFloat(formData.annual_income) : null,
          employment_status: formData.employment_status,
          loan_amount: formData.loan_amount ? parseFloat(formData.loan_amount) : null,
          car_id: formData.car_id
        }]);

      if (error) throw error;

      toast({
        title: "Application Submitted!",
        description: "We'll review your finance application and get back to you within 24 hours.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        annual_income: '',
        employment_status: '',
        loan_amount: '',
        car_id: null
      });
    } catch (error) {
      console.error('Error submitting finance application:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: CheckCircle,
      title: "Direct Finance",
      description: "No bank hassle - we handle everything directly"
    },
    {
      icon: Calculator,
      title: "Competitive Rates",
      description: "Best interest rates in Cyprus"
    },
    {
      icon: Clock,
      title: "Quick Approval",
      description: "Get approved within 24 hours"
    },
    {
      icon: Shield,
      title: "Flexible Terms",
      description: "Customized payment plans to fit your budget"
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Car Finance Made Easy
          </h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
            Get direct financing with competitive rates and flexible terms. No bank hassle - we handle everything for you.
          </p>
          <a href="tel:+35799676373" className="btn-secondary inline-flex items-center space-x-2">
            <Phone size={20} />
            <span>Call for Instant Quote</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Benefits Section */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Why Choose Our Finance?</h2>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-red-600 p-2 rounded-lg">
                    <benefit.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Finance Info Cards */}
            <div className="mt-12 space-y-4">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Loan Terms</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <ul className="space-y-2">
                    <li>• Loan amounts from €5,000 to €100,000</li>
                    <li>• Repayment periods from 12 to 84 months</li>
                    <li>• Interest rates starting from 3.9% APR</li>
                    <li>• No early repayment penalties</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Application Form */}
          <div>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Finance Application</CardTitle>
                <CardDescription className="text-gray-400">
                  Fill out this form and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="annual_income" className="text-white">Annual Income (€)</Label>
                      <Input
                        id="annual_income"
                        type="number"
                        value={formData.annual_income}
                        onChange={(e) => setFormData({...formData, annual_income: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="employment_status" className="text-white">Employment Status</Label>
                      <Select value={formData.employment_status} onValueChange={(value) => setFormData({...formData, employment_status: value})}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employed">Employed</SelectItem>
                          <SelectItem value="self_employed">Self Employed</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="loan_amount" className="text-white">Requested Loan Amount (€)</Label>
                    <Input
                      id="loan_amount"
                      type="number"
                      value={formData.loan_amount}
                      onChange={(e) => setFormData({...formData, loan_amount: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
