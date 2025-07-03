import React from "react";

const IMAGES = [
  "https://images.pexels.com/photos/3617457/pexels-photo-3617457.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
  "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
  "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
  "https://images.pexels.com/photos/3621120/pexels-photo-3621120.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
  "https://images.pexels.com/photos/3621119/pexels-photo-3621119.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
  "https://images.pexels.com/photos/3621084/pexels-photo-3621084.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
];

function GallerySection() {
  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-amber-900 mb-6 font-playfair">
            Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Glimpses from previous festivals and preparations for the upcoming
            celebration
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {IMAGES.map((src, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={src}
                alt={`Festival Gallery ${index + 1}`}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
