
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Star } from 'lucide-react';

interface CarImage {
  id: string;
  car_id: string;
  image_url: string;
  storage_path: string;
  is_primary: boolean;
  alt_text: string | null;
  display_order: number;
}

interface ImageUploadProps {
  carId: string;
  images: CarImage[];
  onImagesUpdate: () => void;
}

const ImageUpload = ({ carId, images, onImagesUpdate }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${carId}/${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('car-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('car-images')
      .getPublicUrl(filePath);

    return { publicUrl, filePath };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const { publicUrl, filePath } = await uploadImage(file);
        
        // Get next display order
        const nextOrder = images.length > 0 ? Math.max(...images.map(img => img.display_order)) + 1 : 0;
        
        await supabase
          .from('car_images')
          .insert({
            car_id: carId,
            image_url: publicUrl,
            storage_path: filePath,
            is_primary: images.length === 0, // First image is primary
            display_order: nextOrder,
            alt_text: `Car image ${nextOrder + 1}`
          });
      }

      toast({
        title: "Success",
        description: `${files.length} image(s) uploaded successfully`
      });
      
      onImagesUpdate();
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: "Error",
        description: "Failed to upload images",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const setPrimaryImage = async (imageId: string) => {
    try {
      // Remove primary from all images
      await supabase
        .from('car_images')
        .update({ is_primary: false })
        .eq('car_id', carId);

      // Set new primary
      await supabase
        .from('car_images')
        .update({ is_primary: true })
        .eq('id', imageId);

      toast({
        title: "Success",
        description: "Primary image updated"
      });
      
      onImagesUpdate();
    } catch (error) {
      console.error('Error setting primary image:', error);
      toast({
        title: "Error",
        description: "Failed to set primary image",
        variant: "destructive"
      });
    }
  };

  const deleteImage = async (image: CarImage) => {
    try {
      // Delete from storage
      await supabase.storage
        .from('car-images')
        .remove([image.storage_path]);

      // Delete from database
      await supabase
        .from('car_images')
        .delete()
        .eq('id', image.id);

      toast({
        title: "Success",
        description: "Image deleted successfully"
      });
      
      onImagesUpdate();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="image-upload" className="text-white">Upload Car Images</Label>
        <Input
          id="image-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="bg-black border-gray-600 text-white"
        />
      </div>

      {uploading && (
        <div className="text-white text-center">Uploading images...</div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images
            .sort((a, b) => a.display_order - b.display_order)
            .map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.image_url}
                  alt={image.alt_text || 'Car image'}
                  className="w-full h-32 object-cover rounded border-2 border-gray-600"
                />
                
                {image.is_primary && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                    PRIMARY
                  </div>
                )}
                
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  {!image.is_primary && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setPrimaryImage(image.id)}
                      className="p-1 h-6 w-6"
                    >
                      <Star className="h-3 w-3" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteImage(image)}
                    className="p-1 h-6 w-6"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
