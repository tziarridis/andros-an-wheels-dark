
import { Phone, Star, CheckCircle, Car, DollarSign, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const featuredCars = [
    {
      id: 1,
      make: 'Mazda',
      model: 'Demio',
      year: 2020,
      price: '€12,500',
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
      price: '€35,000',
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
      price: '€28,000',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop',
      fuel: 'Petrol',
      transmission: 'Automatic',
      mileage: '35,000 km'
    }
  ];

  const testimonials = [
    {
      name: 'Maria Constantinou',
      text: 'Excellent service! Got my dream car with their direct finance option. No hassle with banks!',
      rating: 5
    },
    {
      name: 'Andreas Petrides',
      text: 'They imported my specific BMW model from Germany. Professional and reliable service.',
      rating: 5
    },
    {
      name: 'Elena Georgiou',
      text: 'Best car dealership in Cyprus. Great prices and honest advice.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Find Your Perfect
            <span className="text-red-600 block">Dream Car</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Direct finance with no bank hassle. Import any car. Long-term leasing available.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:+35799123456" className="btn-primary flex items-center space-x-2">
              <Phone size={20} />
              <span>Call Now</span>
            </a>
            <Link to="/finance" className="btn-secondary">
              Apply for Finance
            </Link>
            <a 
              href="https://wa.me/35799123456" 
              className="btn-outline flex items-center space-x-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.086" />
              </svg>
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Vehicles</h2>
            <p className="text-xl text-gray-400">Discover our handpicked selection of premium vehicles</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <div key={car.id} className="bg-black rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-300">
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
                    <span className="text-2xl font-bold text-red-600">{car.price}</span>
                    <Link to="/contact" className="btn-primary">
                      Inquire
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/inventory" className="btn-secondary">
              View All Inventory
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Andros An. Cars?</h2>
            <p className="text-xl text-gray-400">Your trusted partner in finding the perfect vehicle</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Direct Finance - No Bank</h3>
              <p className="text-gray-400">
                Skip the bank hassle. We provide direct financing options with competitive rates 
                and flexible terms tailored to your needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Long-Term Leasing</h3>
              <p className="text-gray-400">
                Flexible leasing options that fit your lifestyle. Drive your dream car 
                with manageable monthly payments.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Import Any Car</h3>
              <p className="text-gray-400">
                Can't find your dream car locally? We'll import any vehicle you desire 
                from anywhere in the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-400">Real experiences from satisfied customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-black p-8 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-400 mb-6 italic">"{testimonial.text}"</p>
                <p className="text-white font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
