
import { useState } from 'react';
import { CheckCircle, DollarSign, Clock, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Finance = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    carInterested: '',
    monthlyBudget: '',
    employmentStatus: '',
    monthlyIncome: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    console.log('Finance application submitted:', formData);
    
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and contact you within 24 hours.",
    });

    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      carInterested: '',
      monthlyBudget: '',
      employmentStatus: '',
      monthlyIncome: '',
      message: ''
    });
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
          <h1 className="text-4xl font-bold text-white mb-4">Car Finance Made Simple</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get approved for direct financing without the bank hassle. 
            We offer competitive rates and flexible terms tailored to your needs.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No Bank Required</h3>
            <p className="text-gray-400">Direct financing from our dealership</p>
          </div>
          
          <div className="text-center">
            <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Quick Approval</h3>
            <p className="text-gray-400">Get approved within 24 hours</p>
          </div>
          
          <div className="text-center">
            <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Competitive Rates</h3>
            <p className="text-gray-400">Starting from 3.9% APR</p>
          </div>
          
          <div className="text-center">
            <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-white" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Personal Service</h3>
            <p className="text-gray-400">Dedicated finance specialist</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Finance Information */}
          <div className="bg-gray-900 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Why Choose Our Direct Finance?</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Skip the Bank Hassle</h3>
                <p className="text-gray-400">
                  No need to visit multiple banks or deal with complex paperwork. 
                  We handle everything in-house for a seamless experience.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Flexible Terms</h3>
                <p className="text-gray-400">
                  Choose from 12 to 84 months financing terms with competitive rates. 
                  We work with you to find payments that fit your budget.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">All Credit Welcome</h3>
                <p className="text-gray-400">
                  Whether you have excellent credit or are rebuilding your credit history, 
                  we have financing solutions for everyone.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Trade-In Accepted</h3>
                <p className="text-gray-400">
                  Get top value for your current vehicle. We accept all makes and models 
                  as trade-ins to reduce your monthly payments.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-black rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Finance Calculator</h3>
              <p className="text-gray-400 mb-4">
                Estimate your monthly payments with our competitive rates:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-600">3.9%</div>
                  <div className="text-sm text-gray-400">Excellent Credit</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">6.9%</div>
                  <div className="text-sm text-gray-400">Good Credit</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">9.9%</div>
                  <div className="text-sm text-gray-400">Fair Credit</div>
                </div>
              </div>
            </div>
          </div>

          {/* Finance Application Form */}
          <div className="bg-gray-900 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Apply for Finance</h2>
            
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
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none"
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
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none"
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
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none"
                  placeholder="+357 99 123 456"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Car Interested In
                </label>
                <input
                  type="text"
                  name="carInterested"
                  value={formData.carInterested}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none"
                  placeholder="e.g., BMW 320i, Range Rover Evoque"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Monthly Budget
                  </label>
                  <select
                    name="monthlyBudget"
                    value={formData.monthlyBudget}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none"
                  >
                    <option value="">Select budget</option>
                    <option value="200-300">€200 - €300</option>
                    <option value="300-500">€300 - €500</option>
                    <option value="500-700">€500 - €700</option>
                    <option value="700-1000">€700 - €1,000</option>
                    <option value="1000+">€1,000+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Employment Status
                  </label>
                  <select
                    name="employmentStatus"
                    value={formData.employmentStatus}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none"
                  >
                    <option value="">Select status</option>
                    <option value="employed">Full-time Employed</option>
                    <option value="self-employed">Self-employed</option>
                    <option value="part-time">Part-time</option>
                    <option value="retired">Retired</option>
                    <option value="student">Student</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Monthly Income
                </label>
                <select
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none"
                >
                  <option value="">Select income range</option>
                  <option value="1000-2000">€1,000 - €2,000</option>
                  <option value="2000-3000">€2,000 - €3,000</option>
                  <option value="3000-5000">€3,000 - €5,000</option>
                  <option value="5000+">€5,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Additional Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none resize-none"
                  placeholder="Tell us more about your requirements..."
                />
              </div>

              <button type="submit" className="w-full btn-primary">
                Submit Application
              </button>
            </form>

            <p className="text-gray-400 text-sm mt-4 text-center">
              * Required fields. Your information is secure and confidential.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
