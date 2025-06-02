
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface TestimonialFormData {
  customer_name: string;
  customer_email: string;
  rating: number;
  title: string;
  content: string;
  car_purchased: string;
  purchase_date: string;
}

const TestimonialForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TestimonialFormData>();

  const onSubmit = async (data: TestimonialFormData) => {
    if (rating === 0) {
      toast({
        title: "Error",
        description: "Please select a rating",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('testimonials')
        .insert([{
          ...data,
          rating,
          purchase_date: data.purchase_date || null,
        }]);

      if (error) throw error;

      toast({
        title: "Thank you!",
        description: "Your testimonial has been submitted for review.",
      });

      reset();
      setRating(0);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to submit testimonial. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Share Your Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer_name" className="text-white">
                Your Name
              </Label>
              <Input
                id="customer_name"
                {...register('customer_name', { required: 'Name is required' })}
                className="bg-black border-gray-600 text-white"
                placeholder="Your full name"
              />
              {errors.customer_name && (
                <p className="text-red-400 text-sm mt-1">{errors.customer_name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="customer_email" className="text-white">
                Email (Optional)
              </Label>
              <Input
                id="customer_email"
                type="email"
                {...register('customer_email')}
                className="bg-black border-gray-600 text-white"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <Label className="text-white">Rating</Label>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${
                    star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="title" className="text-white">
              Review Title
            </Label>
            <Input
              id="title"
              {...register('title')}
              className="bg-black border-gray-600 text-white"
              placeholder="Great experience, excellent service, etc."
            />
          </div>

          <div>
            <Label htmlFor="content" className="text-white">
              Your Review
            </Label>
            <Textarea
              id="content"
              {...register('content', { required: 'Review content is required' })}
              className="bg-black border-gray-600 text-white"
              placeholder="Tell us about your experience..."
              rows={4}
            />
            {errors.content && (
              <p className="text-red-400 text-sm mt-1">{errors.content.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="car_purchased" className="text-white">
                Vehicle Purchased (Optional)
              </Label>
              <Input
                id="car_purchased"
                {...register('car_purchased')}
                className="bg-black border-gray-600 text-white"
                placeholder="e.g., 2023 Toyota Camry"
              />
            </div>

            <div>
              <Label htmlFor="purchase_date" className="text-white">
                Purchase Date (Optional)
              </Label>
              <Input
                id="purchase_date"
                type="date"
                {...register('purchase_date')}
                className="bg-black border-gray-600 text-white"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TestimonialForm;
