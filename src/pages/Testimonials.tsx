
import React from 'react';
import SEOHead from '@/components/SEOHead';
import TestimonialDisplay from '@/components/TestimonialDisplay';
import TestimonialForm from '@/components/TestimonialForm';

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-black py-20">
      <SEOHead
        title="Customer Testimonials"
        description="Read what our satisfied customers have to say about their experience with our auto dealership."
        keywords="customer reviews, testimonials, auto dealership reviews, car buying experience"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            What Our Customers Say
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with us.
          </p>
        </div>

        <div className="mb-16">
          <TestimonialDisplay />
        </div>

        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Share Your Experience
          </h2>
          <TestimonialForm />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
