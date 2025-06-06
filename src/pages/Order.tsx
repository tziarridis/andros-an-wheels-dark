
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Globe, Shield, Clock, Phone, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Order = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    car_make: '',
    car_model: '',
    budget_range: '',
    special_requirements: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('car_orders')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Order Request Submitted!",
        description: "We'll find your perfect car and contact you within 24 hours.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        car_make: '',
        car_model: '',
        budget_range: '',
        special_requirements: ''
      });
    } catch (error) {
      console.error('Error submitting car order:', error);
      toast({
        title: "Error",
        description: "Failed to submit order request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: Globe,
      title: "Import Any Car",
      description: "We can import any car from Europe, Japan, or the US"
    },
    {
      icon: Shield,
      title: "Quality Guaranteed",
      description: "All imported cars come with our quality guarantee"
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Most cars delivered within 4-6 weeks"
    },
    {
      icon: CheckCircle,
      title: "Full Service",
      description: "We handle all paperwork, shipping, and registration"
    }
  ];

  const budgetRanges = [
    "Under €10,000",
    "€10,000 - €20,000",
    "€20,000 - €30,000",
    "€30,000 - €50,000",
    "€50,000 - €75,000",
    "€75,000 - €100,000",
    "Over €100,000"
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Car size={80} className="mx-auto text-white mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Import Any Car
          </h1>
          <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
            Can't find the car you want in our inventory? No problem! We can import any car from anywhere in the world.
          </p>
          <a href="tel:+35799676373" className="btn-secondary inline-flex items-center space-x-2">
            <Phone size={20} />
            <span>Discuss Your Requirements</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Features and Info */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">How It Works</h2>
            <div className="space-y-6 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-red-600 p-2 rounded-lg">
                    <feature.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Import Process */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Import Process</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <ol className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                    <span>Submit your car requirements</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                    <span>We find and inspect the car</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                    <span>Handle all shipping and paperwork</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                    <span>Car delivered to Cyprus registered and ready</span>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Order Form */}
          <div>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Car Import Request</CardTitle>
                <CardDescription className="text-gray-400">
                  Tell us what car you're looking for and we'll find it for you
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
                      <Label htmlFor="car_make" className="text-white">Car Make *</Label>
                      <Input
                        id="car_make"
                        type="text"
                        required
                        placeholder="e.g., BMW, Mercedes, Toyota"
                        value={formData.car_make}
                        onChange={(e) => setFormData({...formData, car_make: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="car_model" className="text-white">Car Model *</Label>
                      <Input
                        id="car_model"
                        type="text"
                        required
                        placeholder="e.g., 320i, C-Class, Camry"
                        value={formData.car_model}
                        onChange={(e) => setFormData({...formData, car_model: e.target.value})}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="budget_range" className="text-white">Budget Range</Label>
                    <Select value={formData.budget_range} onValueChange={(value) => setFormData({...formData, budget_range: value})}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select your budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="special_requirements" className="text-white">Special Requirements</Label>
                    <Textarea
                      id="special_requirements"
                      placeholder="Year, mileage, color preferences, specific features, etc."
                      value={formData.special_requirements}
                      onChange={(e) => setFormData({...formData, special_requirements: e.target.value})}
                      className="bg-gray-800 border-gray-700 text-white"
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Import Request'}
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

export default Order;
