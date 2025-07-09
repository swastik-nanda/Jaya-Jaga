import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import JagaEyes from "../components/JagaEyes";

// Map navigation items to their respective routes
const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Festivals", path: "/festivals" },
  { name: "History", path: "/history" },
  { name: "Rathyatra", path: "/rathyatra" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

function NavBarSecondary() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // For scrollY-based background (optional, remove if not needed)
  const [scrollY, setScrollY] = React.useState(0);
  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 mb-5 z-50 transition-all duration-300
    bg-white/95 border-b border-amber-200
    ${scrollY > 50 ? "backdrop-blur-md shadow-lg" : ""}
  `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-amber-400 flex items-center gap-2">
            <JagaEyes />
            <span className="font-playfair">Jay</span> Jagannath!
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {NAV_LINKS.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className="text-amber-900 hover:text-amber-700 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-amber-900 hover:text-amber-700 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-amber-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {NAV_LINKS.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-amber-900 hover:text-amber-700 hover:bg-amber-50 rounded-md transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBarSecondary;
