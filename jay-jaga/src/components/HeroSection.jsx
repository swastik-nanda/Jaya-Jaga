import React from "react";
import { ChevronRight } from "lucide-react";

function HeroSection({ scrollY, scrollToSection }) {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-amber-900/90 via-red-900/85 to-orange-900/90"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/3617457/pexels-photo-3617457.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 font-playfair">
            Ramayana Festival
            <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2 text-amber-300">
              2025
            </span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Experience the timeless epic through magnificent performances,
            cultural exhibitions, and spiritual celebrations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection("events")}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View Events
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="border-2 border-white text-white hover:bg-white hover:text-amber-900 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronRight className="transform rotate-90" size={32} />
      </div>
    </section>
  );
}

export default HeroSection;
