
import { useState } from 'react';
import { Phone, Mail, User, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LeadCaptureFormProps {
  source?: string;
  carId?: string;
  title?: string;
  description?: string;
}

const LeadCaptureForm = ({ 
  source = 'website', 
  carId, 
  title = "Get More Information",
  description = "Leave your details and we'll get back to you within 24 hours"
}: LeadCaptureFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `${formData.message}\n\nSource: ${source}${carId ? `\nCar ID: ${carId}` : ''}`,
          car_id: carId || null
        });

      if (error) throw error;

      toast({
        title: "Thank you!",
        description: "We've received your inquiry and will contact you within 24 hours."
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none"
          />
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none"
          />
        </div>

        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 text-gray-400" size={20} />
          <textarea
            name="message"
            placeholder="Tell us what you're looking for..."
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full pl-10 pr-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : 'Send Inquiry'}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-800 text-center">
        <p className="text-gray-400 text-sm mb-4">Or contact us directly:</p>
        <div className="flex justify-center space-x-6">
          <a 
            href="tel:+35799676373" 
            className="flex items-center space-x-2 text-red-600 hover:text-red-500 transition-colors"
          >
            <Phone size={16} />
            <span>+357 99 676 373</span>
          </a>
          <a 
            href="mailto:androsancars@gmail.com"
            className="flex items-center space-x-2 text-red-600 hover:text-red-500 transition-colors"
          >
            <Mail size={16} />
            <span>Email</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureForm;
