
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    brand: '',
    priceRange: '',
    year: '',
    fuel: '',
    transmission: ''
  });

  const cars = [
    {
      id: 1,
      make: 'Mazda',
      model: 'Demio',
      year: 2020,
      price: 12500,
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&h=300&fit=crop',
      fuel: 'Petrol',
      transmission: 'Manual',
      mileage: '45,000 km'
    },
    {
      id: 2,
      make: 'Range Rover',
      model: 'Evoque',
      year: 2019,
      price: 35000,
      image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=500&h=300&fit=crop',
      fuel: 'Petrol',
      transmission: 'Automatic',
      mileage: '60,000 km'
    },
    {
      id: 3,
      make: 'BMW',
      model: '320i',
      year: 2021,
      price: 28000,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop',
      fuel: 'Petrol',
      transmission: 'Automatic',
      mileage: '35,000 km'
    },
    {
      id: 4,
      make: 'Toyota',
      model: 'Corolla',
      year: 2022,
      price: 18500,
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&h=300&fit=crop',
      fuel: 'Hybrid',
      transmission: 'Automatic',
      mileage: '25,000 km'
    },
    {
      id: 5,
      make: 'Mercedes',
      model: 'C-Class',
      year: 2020,
      price: 32000,
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=300&fit=crop',
      fuel: 'Petrol',
      transmission: 'Automatic',
      mileage: '50,000 km'
    },
    {
      id: 6,
      make: 'Volkswagen',
      model: 'Golf',
      year: 2021,
      price: 22000,
      image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&h=300&fit=crop',
      fuel: 'Petrol',
      transmission: 'Manual',
      mileage: '30,000 km'
    }
  ];

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBrand = !filters.brand || car.make.toLowerCase() === filters.brand.toLowerCase();
    
    const matchesPrice = !filters.priceRange || (() => {
      switch(filters.priceRange) {
        case 'under-15000': return car.price < 15000;
        case '15000-25000': return car.price >= 15000 && car.price <= 25000;
        case '25000-35000': return car.price >= 25000 && car.price <= 35000;
        case 'over-35000': return car.price > 35000;
        default: return true;
      }
    })();
    
    const matchesYear = !filters.year || car.year.toString() === filters.year;
    const matchesFuel = !filters.fuel || car.fuel.toLowerCase() === filters.fuel.toLowerCase();
    const matchesTransmission = !filters.transmission || car.transmission.toLowerCase() === filters.transmission.toLowerCase();
    
    return matchesSearch && matchesBrand && matchesPrice && matchesYear && matchesFuel && matchesTransmission;
  });

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Our Inventory</h1>
          <p className="text-xl text-gray-400">Browse our extensive collection of quality vehicles</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search make or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-red-600 focus:outline-none"
              />
            </div>

            {/* Brand Filter */}
            <select
              value={filters.brand}
              onChange={(e) => setFilters({...filters, brand: e.target.value})}
              className="px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none"
            >
              <option value="">All Brands</option>
              <option value="BMW">BMW</option>
              <option value="Mazda">Mazda</option>
              <option value="Range Rover">Range Rover</option>
              <option value="Toyota">Toyota</option>
              <option value="Mercedes">Mercedes</option>
              <option value="Volkswagen">Volkswagen</option>
            </select>

            {/* Price Range Filter */}
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              className="px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none"
            >
              <option value="">All Prices</option>
              <option value="under-15000">Under €15,000</option>
              <option value="15000-25000">€15,000 - €25,000</option>
              <option value="25000-35000">€25,000 - €35,000</option>
              <option value="over-35000">Over €35,000</option>
            </select>

            {/* Fuel Type Filter */}
            <select
              value={filters.fuel}
              onChange={(e) => setFilters({...filters, fuel: e.target.value})}
              className="px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none"
            >
              <option value="">All Fuel Types</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>

            {/* Transmission Filter */}
            <select
              value={filters.transmission}
              onChange={(e) => setFilters({...filters, transmission: e.target.value})}
              className="px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none"
            >
              <option value="">All Transmissions</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredCars.length} of {cars.length} vehicles
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-300">
              <img 
                src={car.image} 
                alt={`${car.make} ${car.model}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {car.make} {car.model}
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 mb-4">
                  <span>Year: {car.year}</span>
                  <span>Fuel: {car.fuel}</span>
                  <span>Transmission: {car.transmission}</span>
                  <span>Mileage: {car.mileage}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-red-600">€{car.price.toLocaleString()}</span>
                  <Link to="/contact" className="btn-primary">
                    Inquire
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No vehicles found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilters({
                  brand: '',
                  priceRange: '',
                  year: '',
                  fuel: '',
                  transmission: ''
                });
              }}
              className="btn-primary mt-4"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
