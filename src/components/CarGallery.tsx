
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface CarImage {
  id: string;
  image_url: string;
  alt_text: string | null;
}

interface CarGalleryProps {
  carId: string;
}

const CarGallery = ({ carId }: CarGalleryProps) => {
  const [images, setImages] = useState<CarImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarImages();
  }, [carId]);

  const fetchCarImages = async () => {
    try {
      const { data, error } = await supabase
        .from('car_images')
        .select('*')
        .eq('car_id', carId)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching car images:', error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">Loading images...</span>
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-800 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative group">
        <img
          src={images[currentIndex]?.image_url}
          alt={images[currentIndex]?.alt_text || `Car Image ${currentIndex + 1}`}
          className="w-full h-96 object-cover rounded-lg cursor-pointer"
          onClick={() => openLightbox(currentIndex)}
        />
        
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 border-white/20 text-white hover:bg-black/70"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 border-white/20 text-white hover:bg-black/70"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
        
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <img
              key={image.id}
              src={image.image_url}
              alt={image.alt_text || `Thumbnail ${index + 1}`}
              className={`w-20 h-16 object-cover rounded cursor-pointer border-2 transition-all ${
                index === currentIndex
                  ? 'border-red-600 opacity-100'
                  : 'border-gray-600 opacity-70 hover:opacity-100'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative max-w-screen-lg max-h-screen-lg">
            <img
              src={images[currentIndex]?.image_url}
              alt={images[currentIndex]?.alt_text || `Car Image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            <Button
              variant="outline"
              size="sm"
              className="absolute top-4 right-4 bg-black/50 border-white/20 text-white hover:bg-black/70"
              onClick={closeLightbox}
            >
              <X className="h-4 w-4" />
            </Button>
            
            {images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarGallery;
