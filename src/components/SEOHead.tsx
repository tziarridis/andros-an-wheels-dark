
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead = ({
  title = "Premium Auto Dealership | Quality Cars & Financing",
  description = "Discover quality pre-owned and new vehicles with competitive financing options. Browse our extensive inventory and find your perfect car today.",
  keywords = "cars, auto dealership, used cars, new cars, car financing, automotive, vehicles",
  image = "/placeholder.svg",
  url = "https://yourdomain.com",
  type = "website"
}: SEOHeadProps) => {
  const fullTitle = title.includes("Auto Dealership") ? title : `${title} | Auto Dealership`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Auto Dealership" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="author" content="Auto Dealership" />
      <meta name="theme-color" content="#dc2626" />
      <link rel="canonical" href={url} />
      
      {/* Structured Data for Auto Dealership */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoDealer",
          "name": "Auto Dealership",
          "description": description,
          "url": url,
          "logo": image,
          "sameAs": [
            "https://facebook.com/yourpage",
            "https://twitter.com/yourhandle",
            "https://instagram.com/yourhandle"
          ],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Main Street",
            "addressLocality": "Your City",
            "addressRegion": "Your State",
            "postalCode": "12345",
            "addressCountry": "US"
          },
          "telephone": "+1-555-123-4567",
          "openingHours": [
            "Mo-Fr 09:00-18:00",
            "Sa 09:00-17:00",
            "Su 12:00-17:00"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;
