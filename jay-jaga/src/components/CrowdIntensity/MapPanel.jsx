import React from "react";
import { getCrowdColor } from "../../utils/utils";
import { crowdLevels } from "../../utils/constants";

function MapPanel({ locations, handleMarkerClick }) {
  // Enhanced pulse animations based on crowd level
  const getPulseDuration = (level) => {
    switch (level) {
      case "Low":       return "2s";
      case "Moderate":  return "1.5s";
      case "High":      return "1s";
      case "Very High": return "0.75s";
      case "Critical":  return "0.5s";
      default:          return "2s";
    }
  };

  const getGlowRadius = (level) => {
    switch (level) {
      case "High":      return "24";
      case "Very High": return "30";
      case "Critical":  return "36";
      default:          return "20";
    }
  };

  return (
    <main className="w-full lg:w-2/3 bg-[#0F0A1E] border-r border-[#C9922D]/20 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0D1B2A]">
        {/* Subtle gold dot pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: "radial-gradient(#C9922D 1px, transparent 1px)", 
            backgroundSize: "24px 24px" 
          }}
        />
      </div>

      <div className="relative w-full h-full p-4 flex items-center justify-center">
        <svg
          viewBox="0 0 600 500"
          className="w-full h-full max-h-[700px] mx-auto rounded-lg"
          style={{ filter: "drop-shadow(0 0 20px rgba(0,0,0,0.5))" }}
        >
          <defs>
            <filter id="label-glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            <filter id="critical-glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Compass */}
          <g className="text-sm font-bold" transform="translate(540, 40)" fill="#C9922D" stroke="#C9922D">
            <text x="5" y="0" textAnchor="middle" stroke="none">N</text>
            <text x="5" y="50" textAnchor="middle" stroke="none">S</text>
            <path d="M5 8 L5 36 M0 15 L5 8 L10 15 M0 29 L5 36 L10 29" strokeWidth="2" fill="none" />
          </g>

          {/* Main Temple Outline (Sacred Wireframe) */}
          <rect x="200" y="150" width="200" height="200" fill="none" stroke="#C9922D" strokeWidth="2" strokeDasharray="4 4" rx="8" className="opacity-40" />
          <rect x="210" y="160" width="180" height="180" fill="#1A1525" stroke="#C9922D" strokeWidth="3" rx="8" />
          
          <text x="300" y="245" textAnchor="middle" className="fill-[#C9922D] text-sm font-playfair font-bold tracking-widest" style={{ filter: "url(#label-glow)" }}>
            JAGANNATH TEMPLE
          </text>
          
          {/* Sudarshana Chakra indicator in center */}
          <circle cx="300" cy="265" r="12" fill="none" stroke="#E8B455" strokeWidth="1.5" />
          <circle cx="300" cy="265" r="4" fill="#E8B455" />
          <path d="M288 265 L312 265 M300 253 L300 277 M291 256 L309 274 M291 274 L309 256" stroke="#E8B455" strokeWidth="1" />

          {/* Singhadwara (East Gate - Lion) */}
          <rect x="390" y="235" width="25" height="30" fill="#0F0A1E" stroke="#C9922D" strokeWidth="2" />
          <text x="425" y="254" textAnchor="start" className="fill-white text-[10px] font-semibold tracking-wider opacity-90">SINGHADWARA</text>

          {/* Hasti Dwara (North Gate - Elephant) */}
          <rect x="285" y="150" width="30" height="20" fill="#0F0A1E" stroke="#C9922D" strokeWidth="2" />
          <text x="300" y="142" textAnchor="middle" className="fill-white text-[10px] font-semibold tracking-wider opacity-90">HASTI DWARA</text>

          {/* Aswadwara (South Gate - Horse) */}
          <rect x="285" y="330" width="30" height="20" fill="#0F0A1E" stroke="#C9922D" strokeWidth="2" />
          <text x="300" y="365" textAnchor="middle" className="fill-white text-[10px] font-semibold tracking-wider opacity-90">ASWADWARA</text>

          {/* Vyaghra Dwara (West Gate - Tiger) */}
          <rect x="190" y="235" width="20" height="30" fill="#0F0A1E" stroke="#C9922D" strokeWidth="2" />
          <text x="180" y="254" textAnchor="end" className="fill-white text-[10px] font-semibold tracking-wider opacity-90">VYAGHRA DWARA</text>

          {/* Grand Road (Bada Danda) */}
          <path d="M430 220 L580 220 M430 280 L580 280" stroke="#C9922D" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />
          <path d="M440 250 L580 250" stroke="white" strokeWidth="1" strokeDasharray="10 10" opacity="0.3" />
          <text x="510" y="246" textAnchor="middle" className="fill-white text-xs font-playfair italic opacity-80">Grand Road (Bada Danda)</text>

          {/* Swargadwar */}
          <rect x="40" y="390" width="80" height="50" fill="none" stroke="#C9922D" strokeWidth="1.5" rx="4" opacity="0.6" />
          <path d="M45 425 Q60 415 80 425 T115 425" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.4" />
          <path d="M45 432 Q60 422 80 432 T115 432" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.4" />
          <text x="80" y="415" textAnchor="middle" className="fill-white text-[11px] font-semibold tracking-wider opacity-90">SWARGADWAR</text>

          {/* Dynamic Crowd Markers */}
          {locations.map((location) => {
            const color = getCrowdColor(location.crowdLevel);
            const isCritical = location.crowdLevel === "Critical";
            const isHigh = location.crowdLevel === "High" || location.crowdLevel === "Very High";
            
            return (
              <g 
                key={location.id} 
                className="cursor-pointer group transition-transform hover:scale-110"
                onClick={() => handleMarkerClick(location)}
                style={{ transformOrigin: `${location.coords.x}px ${location.coords.y}px` }}
              >
                {/* Glow ring */}
                <circle
                  cx={location.coords.x}
                  cy={location.coords.y}
                  r={getGlowRadius(location.crowdLevel)}
                  fill={color}
                  fillOpacity={isCritical ? "0.4" : "0.25"}
                  className="origin-center"
                  style={{
                    animation: `pulse-dot ${getPulseDuration(location.crowdLevel)} ease-in-out infinite`,
                    transformOrigin: `${location.coords.x}px ${location.coords.y}px`,
                    filter: isCritical ? "url(#critical-glow)" : "none"
                  }}
                />
                
                {/* Secondary outer ring for High/Very High/Critical */}
                {(isHigh || isCritical) && (
                  <circle
                    cx={location.coords.x}
                    cy={location.coords.y}
                    r={parseInt(getGlowRadius(location.crowdLevel)) + 10}
                    fill="none"
                    stroke={color}
                    strokeWidth="1.5"
                    strokeOpacity="0.5"
                    style={{
                      animation: `pulse-dot ${getPulseDuration(location.crowdLevel)} ease-in-out infinite alternate-reverse`,
                      transformOrigin: `${location.coords.x}px ${location.coords.y}px`,
                    }}
                  />
                )}

                {/* Core dot */}
                <circle
                  cx={location.coords.x}
                  cy={location.coords.y}
                  r="8"
                  fill={color}
                  stroke="#0F0A1E"
                  strokeWidth="2"
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))" }}
                />

                {/* Critical warning icon */}
                {isCritical && (
                  <text x={location.coords.x} y={location.coords.y + 4} textAnchor="middle" className="fill-white text-xs font-black tracking-tighter" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))" }}>
                    !
                  </text>
                )}
                
                {/* Label tooltips (show on hover/always) */}
                <rect 
                  x={location.coords.x - 45} 
                  y={location.coords.y + (location.labelPos === "bottom" ? 15 : -30)} 
                  width="90" 
                  height="22" 
                  rx="4" 
                  fill="#0F0A1E" 
                  fillOpacity="0.8" 
                  stroke={color} 
                  strokeWidth="1"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <text
                  x={location.coords.x}
                  y={location.coords.y + (location.labelPos === "bottom" ? 30 : -15)}
                  textAnchor="middle"
                  className="fill-white text-[10px] font-bold tracking-wider"
                  style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.9))" }}
                >
                  {location.shortName}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Mini Legend */}
        <div className="absolute bottom-6 left-6 bg-[#0F0A1E]/80 backdrop-blur-md border border-[#C9922D]/30 rounded-lg p-3 shadow-xl">
          <p className="text-[#C9922D] text-xs font-semibold mb-2 uppercase tracking-widest">Live Density</p>
          <div className="flex flex-col gap-2">
            {crowdLevels.map(level => (
              <div key={level} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shadow-[0_0_5px_rgba(0,0,0,0.5)]" style={{ backgroundColor: getCrowdColor(level) }} />
                <span className="text-[#F5EDD4] text-[10px] font-medium">{level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default MapPanel;
