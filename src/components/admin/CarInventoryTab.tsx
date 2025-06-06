import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus, Images, Settings } from 'lucide-react';
import SearchAndFilter from './SearchAndFilter';
import ImageUpload from './ImageUpload';
import CarSpecifications from './CarSpecifications';
import { exportToCSV } from '@/utils/exportUtils';

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

interface CarImage {
  id: string;
  car_id: string;
  image_url: string;
  storage_path: string;
  is_primary: boolean;
  alt_text: string | null;
  display_order: number;
}

const CarInventoryTab = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [carImages, setCarImages] = useState<Record<string, CarImage[]>>({});
  const [loading, setLoading] = useState(true);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showImageManager, setShowImageManager] = useState<string | null>(null);
  const [showSpecifications, setShowSpecifications] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: '',
    fuel_type: 'Petrol',
    transmission: 'Manual',
    description: '',
    image_url: ''
  });

  useEffect(() => {
    fetchCars();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('cars-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cars'
        },
        () => {
          console.log('Cars updated, refreshing...');
          fetchCars();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCars(data || []);
      
      // Fetch images for all cars
      if (data && data.length > 0) {
        const carIds = data.map(car => car.id);
        const { data: imagesData, error: imagesError } = await supabase
          .from('car_images')
          .select('*')
          .in('car_id', carIds)
          .order('display_order');

        if (imagesError) throw imagesError;
        
        // Group images by car_id
        const imagesByCarId = (imagesData || []).reduce((acc, image) => {
          if (!acc[image.car_id]) {
            acc[image.car_id] = [];
          }
          acc[image.car_id].push(image);
          return acc;
        }, {} as Record<string, CarImage[]>);
        
        setCarImages(imagesByCarId);
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast({
        title: "Error",
        description: "Failed to fetch cars",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCarImages = async (carId: string) => {
    try {
      const { data, error } = await supabase
        .from('car_images')
        .select('*')
        .eq('car_id', carId)
        .order('display_order');

      if (error) throw error;
      
      setCarImages(prev => ({
        ...prev,
        [carId]: data || []
      }));
    } catch (error) {
      console.error('Error fetching car images:', error);
    }
  };

  const filteredCars = useMemo(() => {
    if (!searchTerm) return cars;
    
    return cars.filter(car =>
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.fuel_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.transmission.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.year.toString().includes(searchTerm)
    );
  }, [cars, searchTerm]);

  const handleExport = () => {
    const exportData = filteredCars.map(car => ({
      Make: car.make,
      Model: car.model,
      Year: car.year,
      Price: `€${car.price}`,
      Mileage: car.mileage || '',
      'Fuel Type': car.fuel_type,
      Transmission: car.transmission,
      Description: car.description || ''
    }));
    
    exportToCSV(exportData, 'car-inventory');
    toast({
      title: "Success",
      description: "Car inventory exported successfully"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingCar) {
        const { error } = await supabase
          .from('cars')
          .update(formData)
          .eq('id', editingCar.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Car updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('cars')
          .insert([formData]);
        
        if (error) throw error;
        
        toast({
          title: "Success", 
          description: "Car added successfully"
        });
      }
      
      resetForm();
      fetchCars();
    } catch (error) {
      console.error('Error saving car:', error);
      toast({
        title: "Error",
        description: "Failed to save car",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setFormData({
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage || '',
      fuel_type: car.fuel_type,
      transmission: car.transmission,
      description: car.description || '',
      image_url: car.image_url || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this car?')) return;
    
    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Car deleted successfully"
      });
      
      fetchCars();
    } catch (error) {
      console.error('Error deleting car:', error);
      toast({
        title: "Error",
        description: "Failed to delete car",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setEditingCar(null);
    setShowForm(false);
    setFormData({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: '',
      fuel_type: 'Petrol',
      transmission: 'Manual',
      description: '',
      image_url: ''
    });
  };

  const getPrimaryImage = (carId: string): string | null => {
    const images = carImages[carId] || [];
    const primaryImage = images.find(img => img.is_primary);
    return primaryImage?.image_url || images[0]?.image_url || null;
  };

  if (loading) {
    return <div className="text-white text-center">Loading car inventory...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Car Inventory ({filteredCars.length} cars)</h2>
        <Button 
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Car
        </Button>
      </div>

      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onExport={handleExport}
        onRefresh={fetchCars}
        placeholder="Search by make, model, fuel type..."
      />

      {/* Image Manager Modal */}
      {showImageManager && (
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">Manage Images</CardTitle>
              <Button 
                variant="outline" 
                onClick={() => setShowImageManager(null)}
              >
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ImageUpload 
              carId={showImageManager}
              images={carImages[showImageManager] || []}
              onImagesUpdate={() => fetchCarImages(showImageManager)}
            />
          </CardContent>
        </Card>
      )}

      {/* Specifications Manager Modal */}
      {showSpecifications && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">Car Specifications</h3>
            <Button 
              variant="outline" 
              onClick={() => setShowSpecifications(null)}
            >
              Close
            </Button>
          </div>
          <CarSpecifications carId={showSpecifications} />
        </div>
      )}

      {showForm && (
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              {editingCar ? 'Edit Car' : 'Add New Car'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="make" className="text-white">Make</Label>
                <Input
                  id="make"
                  value={formData.make}
                  onChange={(e) => setFormData({...formData, make: e.target.value})}
                  required
                  className="bg-black border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="model" className="text-white">Model</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  required
                  className="bg-black border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="year" className="text-white">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                  required
                  className="bg-black border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="price" className="text-white">Price (€)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                  required
                  className="bg-black border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="mileage" className="text-white">Mileage</Label>
                <Input
                  id="mileage"
                  value={formData.mileage}
                  onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                  placeholder="e.g. 45,000 km"
                  className="bg-black border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="fuel_type" className="text-white">Fuel Type</Label>
                <select
                  id="fuel_type"
                  value={formData.fuel_type}
                  onChange={(e) => setFormData({...formData, fuel_type: e.target.value})}
                  className="w-full px-3 py-2 bg-black border border-gray-600 rounded-md text-white"
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="transmission" className="text-white">Transmission</Label>
                <select
                  id="transmission"
                  value={formData.transmission}
                  onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                  className="w-full px-3 py-2 bg-black border border-gray-600 rounded-md text-white"
                >
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="image_url" className="text-white">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  placeholder="https://example.com/car-image.jpg"
                  className="bg-black border-gray-600 text-white"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="description" className="text-white">Description</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 bg-black border border-gray-600 rounded-md text-white"
                  placeholder="Optional description of the car..."
                />
              </div>
              
              <div className="md:col-span-2 flex gap-4">
                <Button type="submit" className="btn-primary">
                  {editingCar ? 'Update Car' : 'Add Car'}
                </Button>
                <Button type="button" onClick={resetForm} variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="bg-gray-900 border-gray-700">
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300">Image</TableHead>
                  <TableHead className="text-gray-300">Make</TableHead>
                  <TableHead className="text-gray-300">Model</TableHead>
                  <TableHead className="text-gray-300">Year</TableHead>
                  <TableHead className="text-gray-300">Price</TableHead>
                  <TableHead className="text-gray-300">Mileage</TableHead>
                  <TableHead className="text-gray-300">Fuel</TableHead>
                  <TableHead className="text-gray-300">Trans.</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCars.map((car) => {
                  const primaryImage = getPrimaryImage(car.id);
                  const imageCount = carImages[car.id]?.length || 0;
                  
                  return (
                    <TableRow key={car.id}>
                      <TableCell>
                        <div className="relative">
                          {primaryImage ? (
                            <img 
                              src={primaryImage} 
                              alt={`${car.make} ${car.model}`}
                              className="w-16 h-12 object-cover rounded"
                            />
                          ) : car.image_url ? (
                            <img 
                              src={car.image_url} 
                              alt={`${car.make} ${car.model}`}
                              className="w-16 h-12 object-cover rounded"
                            />
                          ) : (
                            <div className="w-16 h-12 bg-gray-600 rounded flex items-center justify-center">
                              <span className="text-xs text-gray-400">No image</span>
                            </div>
                          )}
                          {imageCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {imageCount}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-white">{car.make}</TableCell>
                      <TableCell className="text-white">{car.model}</TableCell>
                      <TableCell className="text-white">{car.year}</TableCell>
                      <TableCell className="text-white">€{car.price.toLocaleString()}</TableCell>
                      <TableCell className="text-white">{car.mileage}</TableCell>
                      <TableCell className="text-white">{car.fuel_type}</TableCell>
                      <TableCell className="text-white">{car.transmission}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(car)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowImageManager(car.id)}
                            className="border-blue-600 text-blue-400 hover:bg-blue-800"
                          >
                            <Images className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowSpecifications(car.id)}
                            className="border-green-600 text-green-400 hover:bg-green-800"
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(car.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          {filteredCars.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              {searchTerm ? 'No cars match your search.' : 'No cars found in inventory.'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CarInventoryTab;
