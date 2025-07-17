import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import JagaEyes from "../components/JagaEyes";

const NAV_ITEMS = ["Home", "About", "Events", "Gallery", "Contact"];

function Navbar({ scrollY, scrollToSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("❌ Failed to parse user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleLoginRedirect = () => {
    window.location.href = "/login";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Branding */}
          <div className="text-2xl font-bold text-amber-400 flex items-center gap-2">
            <JagaEyes />
            <span className="font-playfair">Jay</span> Jagannath!
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-baseline space-x-6">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-yellow-500 hover:text-amber-700 px-3 py-2 text-sm font-extrabold transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-yellow-500 font-semibold text-sm">
                  Hello, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1 rounded-md text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLoginRedirect}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1 rounded-md text-sm"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-amber-700 p-2 font-bold"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-amber-200">
          <div className="px-4 pt-4 pb-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => {
                  scrollToSection(item.toLowerCase());
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-amber-900 hover:text-amber-700 hover:bg-amber-50 rounded-md transition-colors duration-200"
              >
                {item}
              </button>
            ))}

            {/* Auth in mobile view */}
            <div className="pt-2 border-t border-amber-300">
              {user ? (
                <div className="flex items-center justify-between px-3">
                  <span className="text-amber-800 text-sm">
                    Hello, {user.name}
                  </span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleLoginRedirect();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-amber-900 hover:text-amber-700 hover:bg-amber-50 rounded-md transition"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
