
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  is_featured: boolean;
}

interface FAQSectionProps {
  category?: string;
  featured?: boolean;
}

const FAQSection = ({ category, featured = false }: FAQSectionProps) => {
  const { data: faqs, isLoading } = useQuery({
    queryKey: ['faqs', category, featured],
    queryFn: async () => {
      let query = supabase
        .from('faqs')
        .select('*')
        .order('display_order', { ascending: true });

      if (category) {
        query = query.eq('category', category);
      }

      if (featured) {
        query = query.eq('is_featured', true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as FAQ[];
    },
  });

  if (isLoading) {
    return (
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-700 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!faqs || faqs.length === 0) {
    return (
      <Card className="bg-gray-900 border-gray-700">
        <CardContent className="p-6">
          <p className="text-gray-400 text-center">No FAQs available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">
          {featured ? 'Frequently Asked Questions' : `FAQs${category ? ` - ${category}` : ''}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.id} value={`item-${index}`} className="border-gray-700">
              <AccordionTrigger className="text-white hover:text-red-400 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default FAQSection;
