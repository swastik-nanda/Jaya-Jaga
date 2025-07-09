import React from "react";

function Footer() {
  return (
    <footer className="bg-amber-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-3xl font-bold mb-4 font-playfair">
            Ramayana Festival
          </div>
          <p className="text-amber-200 mb-8 max-w-2xl mx-auto">
            Celebrating the timeless epic through art, culture, and spiritual
            awakening
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="text-amber-200 hover:text-white transition-colors duration-200"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-amber-200 hover:text-white transition-colors duration-200"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-amber-200 hover:text-white transition-colors duration-200"
            >
              Twitter
            </a>
          </div>
          <div className="mt-8 pt-8 border-t border-amber-800 text-amber-200">
            <p>&copy; 2025 Ramayana Festival. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
