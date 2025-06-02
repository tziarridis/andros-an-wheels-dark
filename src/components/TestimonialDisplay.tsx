
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface Testimonial {
  id: string;
  customer_name: string;
  rating: number;
  title: string;
  content: string;
  car_purchased: string;
  purchase_date: string;
  created_at: string;
}

const TestimonialDisplay = () => {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data as Testimonial[];
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-gray-900 border-gray-700 animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-700 rounded mb-4"></div>
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials?.map((testimonial) => (
        <Card key={testimonial.id} className="bg-gray-900 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < testimonial.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-400'
                  }`}
                />
              ))}
            </div>
            
            {testimonial.title && (
              <h3 className="text-white font-semibold mb-2">{testimonial.title}</h3>
            )}
            
            <p className="text-gray-300 mb-4 line-clamp-4">{testimonial.content}</p>
            
            <div className="border-t border-gray-700 pt-4">
              <p className="text-white font-medium">{testimonial.customer_name}</p>
              {testimonial.car_purchased && (
                <p className="text-gray-400 text-sm">{testimonial.car_purchased}</p>
              )}
              {testimonial.purchase_date && (
                <p className="text-gray-500 text-xs">
                  {new Date(testimonial.purchase_date).toLocaleDateString()}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TestimonialDisplay;
