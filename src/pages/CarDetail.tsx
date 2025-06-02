
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import SEOHead from '@/components/SEOHead';
import CarGallery from '@/components/CarGallery';
import CarSpecificationsDisplay from '@/components/CarSpecificationsDisplay';
import AppointmentBooking from '@/components/AppointmentBooking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign, Fuel, Gauge, Navigation, Phone } from 'lucide-react';

const CarDetail = () => {
  const { id } = useParams();

  const { data: car, isLoading } = useQuery({
    queryKey: ['car', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cars')
        .select(`
          *,
          car_images(*),
          car_specifications(*)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-gray-800 rounded-lg"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-32 bg-gray-800 rounded-lg"></div>
                <div className="h-64 bg-gray-800 rounded-lg"></div>
              </div>
              <div className="h-96 bg-gray-800 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Car Not Found</h1>
          <p className="text-gray-300">The car you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const carTitle = `${car.year} ${car.make} ${car.model}`;

  return (
    <div className="min-h-screen bg-black py-20">
      <SEOHead
        title={`${carTitle} - For Sale`}
        description={`${carTitle} available for sale. ${car.description || 'Quality vehicle with competitive pricing and financing options.'}`}
        keywords={`${car.make}, ${car.model}, ${car.year}, used car, auto dealership`}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <CarGallery images={car.car_images || []} carTitle={carTitle} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Car Details */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-2xl text-white">{carTitle}</CardTitle>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-400" />
                    <span className="text-2xl font-bold text-green-400">
                      ${car.price?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-white">{car.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-gray-400" />
                    <span className="text-white">{car.mileage || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-gray-400" />
                    <span className="text-white">{car.fuel_type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-gray-400" />
                    <span className="text-white">{car.transmission}</span>
                  </div>
                </div>

                {car.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                    <p className="text-gray-300 leading-relaxed">{car.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Specifications */}
            {car.car_specifications && car.car_specifications.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Specifications</h2>
                <CarSpecificationsDisplay specifications={car.car_specifications[0]} />
              </div>
            )}
          </div>

          {/* Contact & Booking */}
          <div className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now: (555) 123-4567
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800">
                  Send WhatsApp Message
                </Button>
              </CardContent>
            </Card>

            <AppointmentBooking carId={car.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
