
import { Users, Award, Clock, MapPin, Phone, Mail } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { useTranslation } from '@/components/LanguageSwitcher';

const About = () => {
  const { t } = useTranslation();

  const teamMembers = [
    {
      name: 'Andros Andreou',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      description: 'With over 15 years in the automotive industry, Andros founded the company with a vision to provide honest, reliable car sales in Cyprus.'
    },
    {
      name: 'Maria Constantinou',
      role: 'Sales Manager',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b2c93053?w=300&h=300&fit=crop',
      description: 'Maria brings 8 years of automotive sales experience and specializes in helping customers find their perfect vehicle match.'
    },
    {
      name: 'Dimitris Petrides',
      role: 'Finance Specialist',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
      description: 'Dimitris handles all financing options and works directly with customers to provide the best loan terms without bank hassles.'
    }
  ];

  const milestones = [
    { year: '2009', event: 'Company Founded', description: 'Andros An. Cars was established in Ayia Napa' },
    { year: '2012', event: 'First 100 Cars Sold', description: 'Reached our first major milestone' },
    { year: '2015', event: 'Direct Finance Program Launched', description: 'Introduced no-bank financing options' },
    { year: '2018', event: 'Import Services Added', description: 'Started importing vehicles from across Europe' },
    { year: '2024', event: '500+ Happy Customers', description: 'Celebrating over 500 successful car sales' }
  ];

  return (
    <div className="min-h-screen bg-black">
      <SEOHead 
        title="About Us - Andros An. Cars"
        description="Learn about Andros An. Cars, your trusted car dealership in Ayia Napa, Cyprus. Over 15 years of experience in automotive sales, direct finance, and import services."
      />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Andros An. Cars</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              For over 15 years, we've been Cyprus's trusted automotive partner, providing exceptional 
              service, direct financing, and helping families find their perfect vehicles.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <div className="text-center bg-gray-900 p-6 rounded-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">15+</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
            <div className="text-center bg-gray-900 p-6 rounded-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">500+</div>
              <div className="text-gray-400">Cars Sold</div>
            </div>
            <div className="text-center bg-gray-900 p-6 rounded-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">98%</div>
              <div className="text-gray-400">Customer Satisfaction</div>
            </div>
            <div className="text-center bg-gray-900 p-6 rounded-lg">
              <div className="text-3xl font-bold text-red-600 mb-2">24/7</div>
              <div className="text-gray-400">Support Available</div>
            </div>
          </div>

          {/* Our Story */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Andros An. Cars was founded in 2009 with a simple mission: to provide honest, 
                    reliable automotive services to the people of Cyprus. What started as a small 
                    family business has grown into one of Ayia Napa's most trusted car dealerships.
                  </p>
                  <p>
                    We recognized early on that traditional bank financing was often complicated 
                    and time-consuming for our customers. That's why we developed our direct 
                    finance program, allowing customers to get approved and drive away their 
                    dream car without the typical banking hassles.
                  </p>
                  <p>
                    Today, we continue to innovate and expand our services, including our import 
                    program that allows us to source any vehicle our customers desire from across 
                    Europe and beyond.
                  </p>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop" 
                  alt="Andros An. Cars Dealership"
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Journey</h2>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-6 bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold min-w-fit">
                    {milestone.year}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{milestone.event}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-300">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-red-600 font-semibold mb-4">{member.role}</p>
                    <p className="text-gray-400 leading-relaxed">{member.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Customer First</h3>
                <p className="text-gray-400">
                  Every decision we make is centered around providing the best possible 
                  experience for our customers.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Quality Assurance</h3>
                <p className="text-gray-400">
                  We thoroughly inspect every vehicle and stand behind the quality 
                  of every car we sell.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Reliability</h3>
                <p className="text-gray-400">
                  When we make a commitment, we keep it. Our word is our bond, 
                  and our reputation speaks for itself.
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Perfect Car?</h2>
            <p className="text-xl text-red-100 mb-6">
              Contact our experienced team today and let us help you get behind the wheel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+35799676373" 
                className="bg-white text-red-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Phone size={20} />
                <span>Call Now</span>
              </a>
              <a 
                href="mailto:androsancars@gmail.com"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Mail size={20} />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
