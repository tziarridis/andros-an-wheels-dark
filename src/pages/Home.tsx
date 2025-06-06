import { Phone, Star, CheckCircle, Car, DollarSign, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadCaptureForm from '@/components/LeadCaptureForm';

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
      rating: 5,
      location: 'Limassol'
    },
    {
      name: 'Andreas Petrides',
      text: 'They imported my specific BMW model from Germany. Professional and reliable service.',
      rating: 5,
      location: 'Nicosia'
    },
    {
      name: 'Elena Georgiou',
      text: 'Best car dealership in Cyprus. Great prices and honest advice.',
      rating: 5,
      location: 'Ayia Napa'
    }
  ];

  const stats = [
    { number: '500+', label: 'Cars Sold' },
    { number: '15+', label: 'Years Experience' },
    { number: '98%', label: 'Customer Satisfaction' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Andros An. Cars - Premier Car Dealership in Ayia Napa, Cyprus"
        description="Find your perfect car at Andros An. Cars in Ayia Napa, Cyprus. Direct finance, import services, and quality vehicles. No bank hassle, competitive rates."
        keywords="car dealership Cyprus, Ayia Napa cars, direct finance, car import, used cars Cyprus"
        type="website"
      />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-600/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-red-600/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect
            <span className="text-red-600 block bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              Dream Car
            </span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Direct finance with no bank hassle. Import any car. Long-term leasing available.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="tel:+35799676373" className="btn-primary flex items-center space-x-3 text-lg px-8 py-4 hover:scale-105 transition-transform">
              <Phone size={24} />
              <span>Call Now</span>
            </a>
            <Link to="/finance" className="btn-secondary flex items-center space-x-3 text-lg px-8 py-4 hover:scale-105 transition-transform">
              <DollarSign size={24} />
              <span>Apply for Finance</span>
            </Link>
            <a 
              href="https://wa.me/35799676373" 
              className="btn-outline flex items-center space-x-3 text-lg px-8 py-4 hover:scale-105 transition-transform"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.086" />
              </svg>
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 200}ms`}}>
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Featured Vehicles</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Discover our handpicked selection of premium vehicles</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car, index) => (
              <div 
                key={car.id} 
                className="bg-gray-900 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-500 hover:-translate-y-2 animate-fade-in group"
                style={{animationDelay: `${index * 200}ms`}}
              >
                <div className="relative overflow-hidden">
                  <Link to={`/car/${car.id}`}>
                    <img 
                      src={car.image} 
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </Link>
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {car.year}
                  </div>
                </div>
                <div className="p-6">
                  <Link to={`/car/${car.id}`}>
                    <h3 className="text-xl font-bold text-white mb-4 hover:text-red-600 transition-colors">
                      {car.make} {car.model}
                    </h3>
                  </Link>
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-400 mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span>Fuel: {car.fuel}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span>{car.transmission}</span>
                    </div>
                    <div className="flex items-center space-x-2 col-span-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      <span>Mileage: {car.mileage}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-red-600">{car.price}</span>
                    <div className="flex space-x-2">
                      <Link to={`/car/${car.id}`} className="btn-secondary text-sm px-4 py-2">
                        Details
                      </Link>
                      <Link to="/contact" className="btn-primary text-sm px-4 py-2">
                        Inquire
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/inventory" className="btn-secondary inline-flex items-center space-x-2 text-lg px-8 py-4 hover:scale-105 transition-transform">
              <span>View All Inventory</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-xl text-gray-400 mb-6">
                We can import any vehicle you desire from anywhere in the world. 
                Let us know what you're looking for and we'll find it for you.
              </p>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span>Direct import from Europe and beyond</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span>Competitive pricing and transparent fees</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span>Full import assistance and documentation</span>
                </div>
              </div>
            </div>
            <div>
              <LeadCaptureForm 
                source="homepage_import"
                title="Request a Vehicle Import"
                description="Tell us what you're looking for and we'll find it"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Choose Andros An. Cars?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Your trusted partner in finding the perfect vehicle</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in" style={{animationDelay: '200ms'}}>
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
                <DollarSign className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Direct Finance - No Bank</h3>
              <p className="text-gray-400 leading-relaxed">
                Skip the bank hassle. We provide direct financing options with competitive rates 
                and flexible terms tailored to your needs.
              </p>
            </div>
            
            <div className="text-center animate-fade-in" style={{animationDelay: '400ms'}}>
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
                <CheckCircle className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Long-Term Leasing</h3>
              <p className="text-gray-400 leading-relaxed">
                Flexible leasing options that fit your lifestyle. Drive your dream car 
                with manageable monthly payments.
              </p>
            </div>
            
            <div className="text-center animate-fade-in" style={{animationDelay: '600ms'}}>
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300">
                <Globe className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Import Any Car</h3>
              <p className="text-gray-400 leading-relaxed">
                Can't find your dream car locally? We'll import any vehicle you desire 
                from anywhere in the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What Our Clients Say</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">Real experiences from satisfied customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-red-600/30 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{animationDelay: `${index * 200}ms`}}
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic text-lg leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Contact us today and let our experts help you find the car of your dreams with the best financing options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+35799676373" className="bg-white text-red-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
              <Phone size={20} />
              <span>Call Us Now</span>
            </a>
            <Link to="/contact" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
              <span>Get In Touch</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
