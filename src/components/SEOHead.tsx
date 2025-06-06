
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const SEOHead = ({ 
  title = "Andros An. Cars - Premier Car Dealership in Ayia Napa, Cyprus",
  description = "Find your perfect car at Andros An. Cars in Ayia Napa, Cyprus. Direct finance, import services, and quality vehicles. No bank hassle, competitive rates.",
  keywords = "cars, car dealership, Cyprus, Ayia Napa, car finance, import cars, used cars, new cars, automotive, vehicle sales",
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  url = window.location.href,
  type = "website"
}: SEOHeadProps) => {
  const siteName = "Andros An. Cars";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Andros An. Cars" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="geo.region" content="CY" />
      <meta name="geo.position" content="35.0138;33.9499" />
      <meta name="ICBM" content="35.0138, 33.9499" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="el_GR" />
      <meta property="og:locale:alternate" content="tr_TR" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@androsan_cars" />
      <meta name="twitter:creator" content="@androsan_cars" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#ef4444" />
      <meta name="msapplication-TileColor" content="#ef4444" />
      <meta name="application-name" content={siteName} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Local Business Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoDealer",
          "name": "Andros An. Cars",
          "description": description,
          "url": "https://androsan-cars.com",
          "logo": "https://lovable.dev/opengraph-image-p98pqg.png",
          "image": image,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Sotou Chatziprokopiou 20",
            "addressLocality": "Ayia Napa",
            "addressRegion": "Famagusta",
            "postalCode": "5330",
            "addressCountry": "CY"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "35.0138",
            "longitude": "33.9499"
          },
          "telephone": "+357 99 676 373",
          "email": "androsancars@gmail.com",
          "openingHours": [
            "Mo-Fr 09:00-18:00",
            "Sa 09:00-16:00"
          ],
          "priceRange": "€€",
          "areaServed": [
            {
              "@type": "Country",
              "name": "Cyprus"
            },
            {
              "@type": "City", 
              "name": "Ayia Napa"
            },
            {
              "@type": "City",
              "name": "Protaras"
            },
            {
              "@type": "City",
              "name": "Paralimni"
            }
          ],
          "serviceType": [
            "Car Sales",
            "Used Car Sales", 
            "Car Import",
            "Car Finance",
            "Vehicle Financing",
            "Auto Loans"
          ],
          "paymentAccepted": [
            "Cash",
            "Credit Card",
            "Financing"
          ],
          "currenciesAccepted": "EUR",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127"
          }
        })}
      </script>

      {/* Breadcrumb Structured Data for specific pages */}
      {url.includes('/car/') && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://androsan-cars.com"
              },
              {
                "@type": "ListItem", 
                "position": 2,
                "name": "Inventory",
                "item": "https://androsan-cars.com/inventory"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Vehicle Details",
                "item": url
              }
            ]
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
