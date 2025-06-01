
import { useState } from 'react';
import { Car, Globe, CheckCircle, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Order = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    carMake: '',
    carModel: '',
    carYear: '',
    budget: '',
    preferredColor: '',
    preferredTransmission: '',
    preferredFuel: '',
    contactMethod: '',
    timeline: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.carMake || !formData.carModel) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Build special requirements string
      const requirements = [];
      if (formData.carYear) requirements.push(`Year: ${formData.carYear}`);
      if (formData.preferredColor) requirements.push(`Color: ${formData.preferredColor}`);
      if (formData.preferredTransmission) requirements.push(`Transmission: ${formData.preferredTransmission}`);
      if (formData.preferredFuel) requirements.push(`Fuel: ${formData.preferredFuel}`);
      if (formData.contactMethod) requirements.push(`Preferred contact: ${formData.contactMethod}`);
      if (formData.timeline) requirements.push(`Timeline: ${formData.timeline}`);
      if (formData.message) requirements.push(`Additional notes: ${formData.message}`);

      const { error } = await supabase
        .from('car_orders')
        .insert([
          {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            car_make: formData.carMake,
            car_model: formData.carModel,
            budget_range: formData.budget || null,
            special_requirements: requirements.length > 0 ? requirements.join('\n') : null
          }
        ]);

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      toast({
        title: "Order Request Submitted!",
        description: "We'll find your dream car and contact you within 24 hours with options and pricing.",
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        carMake: '',
        carModel: '',
        carYear: '',
        budget: '',
        preferredColor: '',
        preferredTransmission: '',
        preferredFuel: '',
        contactMethod: '',
        timeline: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting car order:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Order Your Dream Car</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Can't find the perfect car in our inventory? No problem! 
            We can import any vehicle from anywhere in the world to match your exact specifications.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">1. Tell Us Your Dream</h3>
            <p className="text-gray-400">Specify the exact car you want</p>
          </div>
          
          <div className="text-center">
            <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">2. We Source Globally</h3>
            <p className="text-gray-400">Find the best options worldwide</p>
          </div>
          
          <div className="text-center">
            <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">3. You Approve</h3>
            <p className="text-gray-400">Review options and choose your favorite</p>
          </div>
          
          <div className="text-center">
            <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">4. We Deliver</h3>
            <p className="text-gray-400">Import and deliver to Cyprus</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Information Section */}
          <div className="bg-gray-900 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Why Order Through Us?</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Global Network</h3>
                <p className="text-gray-400">
                  Our extensive network spans across Europe, Japan, and North America, 
                  giving us access to the largest selection of vehicles worldwide.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Expert Inspection</h3>
                <p className="text-gray-400">
                  Every vehicle is thoroughly inspected by our certified technicians 
                  before shipping to ensure you receive a quality car.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">All-Inclusive Service</h3>
                <p className="text-gray-400">
                  We handle everything: sourcing, inspection, shipping, customs clearance, 
                  and registration. You just pick up your dream car.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Competitive Pricing</h3>
                <p className="text-gray-400">
                  Our bulk importing and established relationships ensure you get 
                  the best possible price for your imported vehicle.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-black rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Popular Import Requests</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-red-600 font-medium">European Models:</div>
                  <div className="text-gray-400 text-sm">BMW M Series, Audi RS, Mercedes AMG</div>
                </div>
                <div className="space-y-2">
                  <div className="text-red-600 font-medium">Japanese Imports:</div>
                  <div className="text-gray-400 text-sm">Toyota Supra, Nissan GT-R, Honda Type R</div>
                </div>
                <div className="space-y-2">
                  <div className="text-red-600 font-medium">Luxury Vehicles:</div>
                  <div className="text-gray-400 text-sm">Porsche, Bentley, Maserati</div>
                </div>
                <div className="space-y-2">
                  <div className="text-red-600 font-medium">Electric Cars:</div>
                  <div className="text-gray-400 text-sm">Tesla, Lucid Air, BMW iX</div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="bg-gray-900 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Car Order Form</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none disabled:opacity-50"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none disabled:opacity-50"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none disabled:opacity-50"
                  placeholder="+357 99 123 456"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Car Make *
                  </label>
                  <input
                    type="text"
                    name="carMake"
                    value={formData.carMake}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none disabled:opacity-50"
                    placeholder="e.g., BMW"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Car Model *
                  </label>
                  <input
                    type="text"
                    name="carModel"
                    value={formData.carModel}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none disabled:opacity-50"
                    placeholder="e.g., M3"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Year
                  </label>
                  <select
                    name="carYear"
                    value={formData.carYear}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none disabled:opacity-50"
                  >
                    <option value="">Any</option>
                    {Array.from({ length: 10 }, (_, i) => 2024 - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none disabled:opacity-50"
                >
                  <option value="">Select budget</option>
                  <option value="15000-25000">€15,000 - €25,000</option>
                  <option value="25000-35000">€25,000 - €35,000</option>
                  <option value="35000-50000">€35,000 - €50,000</option>
                  <option value="50000-75000">€50,000 - €75,000</option>
                  <option value="75000+">€75,000+</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Preferred Color
                  </label>
                  <input
                    type="text"
                    name="preferredColor"
                    value={formData.preferredColor}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none disabled:opacity-50"
                    placeholder="e.g., Black, White"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Transmission
                  </label>
                  <select
                    name="preferredTransmission"
                    value={formData.preferredTransmission}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none disabled:opacity-50"
                  >
                    <option value="">No preference</option>
                    <option value="manual">Manual</option>
                    <option value="automatic">Automatic</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Fuel Type
                  </label>
                  <select
                    name="preferredFuel"
                    value={formData.preferredFuel}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none disabled:opacity-50"
                  >
                    <option value="">No preference</option>
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="electric">Electric</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Preferred Contact Method
                  </label>
                  <select
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none disabled:opacity-50"
                  >
                    <option value="">Select method</option>
                    <option value="phone">Phone Call</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">Email</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none disabled:opacity-50"
                  >
                    <option value="">When do you need it?</option>
                    <option value="asap">ASAP</option>
                    <option value="1-2months">1-2 months</option>
                    <option value="3-6months">3-6 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Additional Requirements
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  rows={4}
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none resize-none disabled:opacity-50"
                  placeholder="Any specific requirements, features, or additional information..."
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Order Request'}
              </button>
            </form>

            <p className="text-gray-400 text-sm mt-4 text-center">
              * Required fields. We'll contact you within 24 hours with available options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
