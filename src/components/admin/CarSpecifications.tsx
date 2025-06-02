
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface CarSpecification {
  id?: string;
  car_id: string;
  engine_size?: string;
  horsepower?: number;
  torque?: number;
  acceleration_0_100?: number;
  top_speed?: number;
  fuel_consumption_city?: number;
  fuel_consumption_highway?: number;
  fuel_consumption_combined?: number;
  co2_emissions?: number;
  drivetrain?: string;
  exterior_color?: string;
  interior_color?: string;
  number_of_doors?: number;
  number_of_seats?: number;
  boot_capacity?: number;
  weight?: number;
  length?: number;
  width?: number;
  height?: number;
  wheelbase?: number;
  warranty_years?: number;
}

interface CarSpecificationsProps {
  carId: string;
}

const CarSpecifications = ({ carId }: CarSpecificationsProps) => {
  const [specifications, setSpecifications] = useState<CarSpecification>({ car_id: carId });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSpecifications();
  }, [carId]);

  const fetchSpecifications = async () => {
    try {
      const { data, error } = await supabase
        .from('car_specifications')
        .select('*')
        .eq('car_id', carId)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setSpecifications(data);
      }
    } catch (error) {
      console.error('Error fetching specifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (specifications.id) {
        // Update existing
        const { error } = await supabase
          .from('car_specifications')
          .update(specifications)
          .eq('id', specifications.id);
        
        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('car_specifications')
          .insert(specifications);
        
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Specifications saved successfully"
      });
      
      fetchSpecifications();
    } catch (error) {
      console.error('Error saving specifications:', error);
      toast({
        title: "Error",
        description: "Failed to save specifications",
        variant: "destructive"
      });
    }
  };

  const updateSpecification = (field: keyof CarSpecification, value: string | number) => {
    setSpecifications(prev => ({
      ...prev,
      [field]: value === '' ? null : value
    }));
  };

  if (loading) {
    return <div className="text-white">Loading specifications...</div>;
  }

  return (
    <Card className="bg-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Car Specifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Engine & Performance */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">
              Engine & Performance
            </h3>
            
            <div>
              <Label className="text-white">Engine Size</Label>
              <Input
                value={specifications.engine_size || ''}
                onChange={(e) => updateSpecification('engine_size', e.target.value)}
                placeholder="e.g., 2.0L"
                className="bg-black border-gray-600 text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">Horsepower</Label>
              <Input
                type="number"
                value={specifications.horsepower || ''}
                onChange={(e) => updateSpecification('horsepower', parseInt(e.target.value))}
                placeholder="e.g., 200"
                className="bg-black border-gray-600 text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">Torque (Nm)</Label>
              <Input
                type="number"
                value={specifications.torque || ''}
                onChange={(e) => updateSpecification('torque', parseInt(e.target.value))}
                placeholder="e.g., 300"
                className="bg-black border-gray-600 text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">0-100 km/h (seconds)</Label>
              <Input
                type="number"
                step="0.1"
                value={specifications.acceleration_0_100 || ''}
                onChange={(e) => updateSpecification('acceleration_0_100', parseFloat(e.target.value))}
                placeholder="e.g., 8.5"
                className="bg-black border-gray-600 text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">Top Speed (km/h)</Label>
              <Input
                type="number"
                value={specifications.top_speed || ''}
                onChange={(e) => updateSpecification('top_speed', parseInt(e.target.value))}
                placeholder="e.g., 200"
                className="bg-black border-gray-600 text-white"
              />
            </div>
          </div>

          {/* Fuel Economy & Environment */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">
              Fuel & Environment
            </h3>
            
            <div>
              <Label className="text-white">City Consumption (L/100km)</Label>
              <Input
                type="number"
                step="0.1"
                value={specifications.fuel_consumption_city || ''}
                onChange={(e) => updateSpecification('fuel_consumption_city', parseFloat(e.target.value))}
                placeholder="e.g., 7.5"
                className="bg-black border-gray-600 text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">Highway Consumption (L/100km)</Label>
              <Input
                type="number"
                step="0.1"
                value={specifications.fuel_consumption_highway || ''}
                onChange={(e) => updateSpecification('fuel_consumption_highway', parseFloat(e.target.value))}
                placeholder="e.g., 5.5"
                className="bg-black border-gray-600 text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">Combined Consumption (L/100km)</Label>
              <Input
                type="number"
                step="0.1"
                value={specifications.fuel_consumption_combined || ''}
                onChange={(e) => updateSpecification('fuel_consumption_combined', parseFloat(e.target.value))}
                placeholder="e.g., 6.5"
                className="bg-black border-gray-600 text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">CO2 Emissions (g/km)</Label>
              <Input
                type="number"
                value={specifications.co2_emissions || ''}
                onChange={(e) => updateSpecification('co2_emissions', parseInt(e.target.value))}
                placeholder="e.g., 150"
                className="bg-black border-gray-600 text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">Drivetrain</Label>
              <select
                value={specifications.drivetrain || ''}
                onChange={(e) => updateSpecification('drivetrain', e.target.value)}
                className="w-full px-3 py-2 bg-black border border-gray-600 rounded-md text-white"
              >
                <option value="">Select drivetrain</option>
                <option value="FWD">Front-wheel drive</option>
                <option value="RWD">Rear-wheel drive</option>
                <option value="AWD">All-wheel drive</option>
                <option value="4WD">Four-wheel drive</option>
              </select>
            </div>
          </div>

          {/* Design & Comfort */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white border-b border-gray-600 pb-2">
              Design & Comfort
            </h3>
            
            <div>
              <Label className="text-white">Exterior Color</Label>
              <Input
                value={specifications.exterior_color || ''}
                onChange={(e) => updateSpecification('exterior_color', e.target.value)}
                placeholder="e.g., Metallic Black"
                className="bg-black border-gray-600 text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">Interior Color</Label>
              <Input
                value={specifications.interior_color || ''}
                onChange={(e) => updateSpecification('interior_color', e.target.value)}
                placeholder="e.g., Black Leather"
                className="bg-black border-gray-600 text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">Number of Doors</Label>
              <Input
                type="number"
                value={specifications.number_of_doors || ''}
                onChange={(e) => updateSpecification('number_of_doors', parseInt(e.target.value))}
                placeholder="e.g., 4"
                className="bg-black border-gray-600 text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">Number of Seats</Label>
              <Input
                type="number"
                value={specifications.number_of_seats || ''}
                onChange={(e) => updateSpecification('number_of_seats', parseInt(e.target.value))}
                placeholder="e.g., 5"
                className="bg-black border-gray-600 text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">Boot Capacity (L)</Label>
              <Input
                type="number"
                value={specifications.boot_capacity || ''}
                onChange={(e) => updateSpecification('boot_capacity', parseInt(e.target.value))}
                placeholder="e.g., 450"
                className="bg-black border-gray-600 text-white"
              />
            </div>
            
            <div>
              <Label className="text-white">Warranty (years)</Label>
              <Input
                type="number"
                value={specifications.warranty_years || ''}
                onChange={(e) => updateSpecification('warranty_years', parseInt(e.target.value))}
                placeholder="e.g., 3"
                className="bg-black border-gray-600 text-white"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={handleSave} className="btn-primary">
            Save Specifications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarSpecifications;
