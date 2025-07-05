import React from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import GoToButton from "./GoToButton";

function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-amber-900 to-red-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 font-playfair">
            Join Us
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Be part of this magnificent celebration of culture and heritage
          </p>
          <div className="mt-8">
            <GoToButton
              buttonText="Have a Question? Email us!"
              route="contact"
              className="text-lg"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 font-playfair">
              Festival Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="text-amber-300 mr-3 mt-1" size={20} />
                <div>
                  <p className="font-semibold">Dates</p>
                  <p className="opacity-90">March 15-21, 2025</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="text-amber-300 mr-3 mt-1" size={20} />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="opacity-90">
                    Cultural Arts Center
                    <br />
                    123 Heritage Plaza, City Center
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="text-amber-300 mr-3 mt-1" size={20} />
                <div>
                  <p className="font-semibold">Daily Schedule</p>
                  <p className="opacity-90">10:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6 font-playfair">
              Get Tickets
            </h3>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>General Admission</span>
                  <span className="font-bold text-amber-300">$25</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>VIP Experience</span>
                  <span className="font-bold text-amber-300">$75</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Premium Package</span>
                  <span className="font-bold text-amber-300">$150</span>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
