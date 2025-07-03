import React from "react";
import { Users, Star, Calendar, MapPin } from "lucide-react";

function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-amber-900 mb-6 font-playfair">
            About the Festival
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Immerse yourself in the world's greatest epic through authentic
            performances, traditional arts, and cultural experiences that bring
            the Ramayana to life.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <Users className="text-amber-600 mb-4" size={32} />
                <h3 className="text-xl font-semibold text-amber-900 mb-2">
                  Cultural Heritage
                </h3>
                <p className="text-gray-600">
                  Experience authentic traditional performances and artistic
                  expressions
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <Star className="text-amber-600 mb-4" size={32} />
                <h3 className="text-xl font-semibold text-amber-900 mb-2">
                  World-Class Artists
                </h3>
                <p className="text-gray-600">
                  Renowned performers from across the globe bringing epic
                  stories to life
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <Calendar className="text-amber-600 mb-4" size={32} />
                <h3 className="text-xl font-semibold text-amber-900 mb-2">
                  7-Day Celebration
                </h3>
                <p className="text-gray-600">
                  A week-long festival filled with performances, workshops, and
                  exhibitions
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <MapPin className="text-amber-600 mb-4" size={32} />
                <h3 className="text-xl font-semibold text-amber-900 mb-2">
                  Cultural Center
                </h3>
                <p className="text-gray-600">
                  Located in the heart of the city's cultural district
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3617457/pexels-photo-3617457.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Traditional Performance"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
