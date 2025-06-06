
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, Mail, Calendar, ArrowLeft, Heart, Share2, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import SEOHead from '@/components/SEOHead';
import CarGallery from '@/components/CarGallery';
import CarSpecificationsDisplay from '@/components/CarSpecificationsDisplay';
import { useTranslation } from '@/components/LanguageSwitcher';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: string;
  fuel_type: string;
  transmission: string;
  description: string | null;
  image_url: string | null;
}

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    if (id) {
      fetchCar();
    }
  }, [id]);

  const fetchCar = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setCar(data);
    } catch (error) {
      console.error('Error fetching car:', error);
      toast({
        title: "Error",
        description: "Failed to load car details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInquiry = () => {
    // Store car ID in localStorage for the contact form
    localStorage.setItem('inquiryCarId', car?.id || '');
    // Navigate to contact page - this will be handled by Link component
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted ? 
        "Vehicle removed from your wishlist" : 
        "Vehicle added to your wishlist"
    });
  };

  const shareVehicle = () => {
    if (navigator.share) {
      navigator.share({
        title: `${car?.make} ${car?.model} ${car?.year}`,
        text: `Check out this ${car?.make} ${car?.model} for €${car?.price.toLocaleString()}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Vehicle link copied to clipboard"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading vehicle details...</div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Vehicle not found</h1>
          <Link to="/inventory" className="btn-primary">
            Back to Inventory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <SEOHead 
        title={`${car.make} ${car.model} ${car.year} - €${car.price.toLocaleString()}`}
        description={`${car.year} ${car.make} ${car.model} for sale in Cyprus. ${car.fuel_type} engine, ${car.transmission} transmission. Contact Andros An. Cars for more details.`}
        type="article"
        image={car.image_url || undefined}
      />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link 
              to="/inventory" 
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Inventory
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <CarGallery carId={car.id} />
            </div>

            {/* Car Details */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {car.make} {car.model}
                  </h1>
                  <p className="text-xl text-gray-400">{car.year}</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={toggleWishlist}
                    className={`p-3 rounded-full transition-colors ${
                      isWishlisted 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Heart size={24} fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={shareVehicle}
                    className="p-3 rounded-full bg-gray-800 text-gray-400 hover:text-white transition-colors"
                  >
                    <Share2 size={24} />
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold text-red-600">
                  €{car.price.toLocaleString()}
                </span>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Mileage</p>
                  <p className="text-white font-semibold">{car.mileage}</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Fuel Type</p>
                  <p className="text-white font-semibold">{car.fuel_type}</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Transmission</p>
                  <p className="text-white font-semibold">{car.transmission}</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Year</p>
                  <p className="text-white font-semibold">{car.year}</p>
                </div>
              </div>

              {/* Description */}
              {car.description && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{car.description}</p>
                </div>
              )}

              {/* Contact Actions */}
              <div className="space-y-4">
                <Link
                  to="/contact"
                  onClick={handleInquiry}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <Mail size={20} />
                  <span>Make an Inquiry</span>
                </Link>
                
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="tel:+35799676373"
                    className="btn-secondary flex items-center justify-center space-x-2"
                  >
                    <Phone size={20} />
                    <span>Call Now</span>
                  </a>
                  <a
                    href="https://wa.me/35799676373"
                    className="btn-outline flex items-center justify-center space-x-2"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.086" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 pt-8 border-t border-gray-800">
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Direct Finance Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Warranty Included</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-green-500" />
                    <span>Trade-in Welcome</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full Specifications */}
          <div className="mt-16">
            <CarSpecificationsDisplay carId={car.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
