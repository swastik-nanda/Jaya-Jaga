import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CrowdContext } from "../contexts/CrowdContext";
import { getCrowdColor } from "../utils/utils";
import { Cloud, Clock, MapPin, ArrowRight } from "lucide-react";

function IntelligenceBanner() {
  const { locations, isLoading, error } = useContext(CrowdContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // Only show on Home, Hotels, and Confirm Booking pages
  const allowedPaths = ["/", "/hotels"];
  const isConfirmBooking = location.pathname.startsWith("/confirm-booking");
  const shouldShow = allowedPaths.includes(location.pathname) || isConfirmBooking;

  useEffect(() => {
    // Slide down animation trigger
    if (shouldShow && !isLoading && locations.length > 0) {
      setTimeout(() => setIsVisible(true), 100);
    } else {
      setIsVisible(false);
    }
  }, [shouldShow, isLoading, locations.length]);

  if (!shouldShow) return null;

  if (isLoading) {
    return (
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 bg-[#1A1525]/90 backdrop-blur-md border border-[#C9922D]/40 rounded-full h-12 w-64 flex items-center justify-center px-4 shadow-2xl">
        <div className="h-4 w-48 bg-[#C9922D]/20 rounded-full animate-pulse" />
      </div>
    );
  }

  if (error || !locations.length) return null;

  // Derive intelligence from current crowd data
  const mainGate = locations.find((l) => l.id === 3) || locations[0]; // Singhadwara
  
  // Find the gate with the lowest crowd (best entry)
  const gates = locations.filter((l) => [3, 4, 5, 7].includes(l.id)); // The 4 main gates
  const bestGate = gates.reduce((prev, curr) => {
    const levels = { "Low": 1, "Moderate": 2, "High": 3, "Very High": 4, "Critical": 5 };
    return levels[curr.crowdLevel] < levels[prev.crowdLevel] ? curr : prev;
  }, gates[0]);

  return (
    <div 
      className={`fixed top-24 left-1/2 -translate-x-1/2 z-40 bg-[#0F0A1E]/95 backdrop-blur-md border border-[#C9922D]/40 rounded-full py-3 px-6 shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all duration-700 ease-out flex items-center
        ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'}`}
    >
      <div className="flex items-center justify-center gap-4 md:gap-6 text-sm font-medium whitespace-nowrap">
        
        {/* Mobile View */}
        <div className="md:hidden flex items-center gap-3 cursor-pointer" onClick={() => navigate("/crowd")}>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: getCrowdColor(mainGate.crowdLevel) }} />
            <span className="text-white font-semibold">{mainGate.shortName}: <span style={{ color: getCrowdColor(mainGate.crowdLevel) }}>{mainGate.crowdLevel}</span></span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#C9922D]" />
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex items-center gap-5">
          <span className="flex items-center gap-2 text-[#A19580]">
            <Cloud className="w-4 h-4 text-[#C9922D]" />
            <span className="text-white">{mainGate.weather}</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-[#C9922D]/40"></span>
          <span className="flex items-center gap-2 text-[#A19580]">
            <Clock className="w-4 h-4 text-[#C9922D]" />
            <span className="text-white">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-[#C9922D]/40"></span>
          
          <span className="flex items-center gap-2 text-white">
            <span className="text-[#A19580]">{mainGate.name}:</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1A1525] border border-[#C9922D]/30 flex items-center gap-1.5" style={{ color: getCrowdColor(mainGate.crowdLevel) }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getCrowdColor(mainGate.crowdLevel) }} />
              {mainGate.crowdLevel}
            </span>
          </span>
          <span className="w-1 h-1 rounded-full bg-[#C9922D]/40"></span>
          
          <span className="flex items-center gap-2 cursor-pointer hover:bg-white/5 px-2 py-1 -my-1 rounded-md transition-colors" onClick={() => navigate("/crowd")}>
            <span className="text-[#A19580]">Best entry:</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1A1525] border border-[#C9922D]/30 flex items-center gap-1.5" style={{ color: getCrowdColor(bestGate.crowdLevel) }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getCrowdColor(bestGate.crowdLevel) }} />
              {bestGate.shortName}
            </span>
            <ArrowRight className="w-4 h-4 text-[#C9922D] ml-1" />
          </span>
        </div>

      </div>
    </div>
  );
}

export default IntelligenceBanner;
