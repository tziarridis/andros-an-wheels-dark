
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

interface CarSpecification {
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

interface CarSpecificationsDisplayProps {
  carId: string;
}

const CarSpecificationsDisplay = ({ carId }: CarSpecificationsDisplayProps) => {
  const [specifications, setSpecifications] = useState<CarSpecification | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpecifications();
  }, [carId]);

  const fetchSpecifications = async () => {
    try {
      const { data, error } = await supabase
        .from('car_specifications')
        .select('*')
        .eq('car_id', carId)
        .single();

      if (error) {
        console.error('Error fetching specifications:', error);
        setSpecifications(null);
      } else {
        setSpecifications(data);
      }
    } catch (error) {
      console.error('Error fetching specifications:', error);
      setSpecifications(null);
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (value: any, unit?: string) => {
    if (value === null || value === undefined) return 'N/A';
    return unit ? `${value} ${unit}` : value;
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-white">Loading specifications...</div>
      </div>
    );
  }

  if (!specifications) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400">No detailed specifications available</div>
      </div>
    );
  }

  const specSections = [
    {
      title: 'Engine & Performance',
      specs: [
        { label: 'Engine Size', value: formatValue(specifications.engine_size) },
        { label: 'Horsepower', value: formatValue(specifications.horsepower, 'hp') },
        { label: 'Torque', value: formatValue(specifications.torque, 'Nm') },
        { label: '0-100 km/h', value: formatValue(specifications.acceleration_0_100, 's') },
        { label: 'Top Speed', value: formatValue(specifications.top_speed, 'km/h') },
        { label: 'Drivetrain', value: formatValue(specifications.drivetrain) },
      ]
    },
    {
      title: 'Fuel Economy',
      specs: [
        { label: 'City Consumption', value: formatValue(specifications.fuel_consumption_city, 'L/100km') },
        { label: 'Highway Consumption', value: formatValue(specifications.fuel_consumption_highway, 'L/100km') },
        { label: 'Combined Consumption', value: formatValue(specifications.fuel_consumption_combined, 'L/100km') },
        { label: 'CO₂ Emissions', value: formatValue(specifications.co2_emissions, 'g/km') },
      ]
    },
    {
      title: 'Design & Comfort',
      specs: [
        { label: 'Exterior Color', value: formatValue(specifications.exterior_color) },
        { label: 'Interior Color', value: formatValue(specifications.interior_color) },
        { label: 'Doors', value: formatValue(specifications.number_of_doors) },
        { label: 'Seats', value: formatValue(specifications.number_of_seats) },
        { label: 'Boot Capacity', value: formatValue(specifications.boot_capacity, 'L') },
        { label: 'Warranty', value: formatValue(specifications.warranty_years, 'years') },
      ]
    },
    {
      title: 'Dimensions',
      specs: [
        { label: 'Length', value: formatValue(specifications.length, 'mm') },
        { label: 'Width', value: formatValue(specifications.width, 'mm') },
        { label: 'Height', value: formatValue(specifications.height, 'mm') },
        { label: 'Wheelbase', value: formatValue(specifications.wheelbase, 'mm') },
        { label: 'Weight', value: formatValue(specifications.weight, 'kg') },
      ]
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-8">Full Specifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {specSections.map((section) => (
          <Card key={section.title} className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.specs.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <span className="text-gray-300">{spec.label}</span>
                    <span className="text-white font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CarSpecificationsDisplay;
