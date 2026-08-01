import React from "react";
import { Users, Cloud, AlertTriangle, MapPin, Clock } from "../../utils/icons.jsx";
import { Flag } from "lucide-react";
import { crowdLevels } from "../../utils/constants.js";
import { getCrowdColor, getCrowdIntensity, getRecommendation } from "../../utils/utils.js";

// Hardcoded cultural context for the locations
const CULTURAL_CONTEXT = {
  1: "Baisi Pahacha: The 22 sacred steps connecting the Lion Gate to the inner compound. Devotees believe all sins are washed away by rolling on these steps.",
  2: "Bada Danda: The Grand Road where the magnificent chariots roll during Rath Yatra. A bustling artery of devotion and commerce.",
  3: "Singhadwara: The Lion Gate, principal entrance facing east toward the rising sun. Guarded by two massive crouching stone lions.",
  4: "Hasti Dwara: The Elephant Gate (North). The chariots are constructed near this gate every year.",
  5: "Aswadwara: The Horse Gate (South), named after the galloping horses of Lord Jagannath and Balabhadra.",
  6: "Swargadwar: The 'Gateway to Heaven'. The sacred cremation ground on the beach where Moksha is sought.",
  7: "Vyaghra Dwara: The Tiger Gate (West), representing asceticism and the spiritual energy of the saints."
};

function DetailsPanel({ selectedLocation }) {
  if (!selectedLocation) {
    return (
      <aside className="w-full lg:w-1/3 bg-[#0F0A1E] p-8 border-l border-[#C9922D]/20 flex flex-col justify-center items-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#C9922D] blur-xl opacity-20 rounded-full animate-pulse" />
          <div className="w-20 h-20 bg-[#1A1525] border border-[#C9922D]/40 rounded-full flex items-center justify-center relative z-10">
            <MapPin className="w-8 h-8 text-[#C9922D]" />
          </div>
        </div>
        <h3 className="text-2xl font-playfair font-bold text-white mb-3 text-center">
          Sacred Geography
        </h3>
        <p className="text-[#A19580] text-center text-sm leading-relaxed max-w-xs">
          Tap on any gate or location on the map to view live crowd density, weather conditions, and spiritual context.
        </p>
      </aside>
    );
  }

  const intensity = getCrowdIntensity(selectedLocation.crowdLevel);
  const color = getCrowdColor(selectedLocation.crowdLevel);
  const context = CULTURAL_CONTEXT[selectedLocation.id] || "A sacred location within the Puri Jagannath ecosystem.";

  // Mock forecast data (values 0-100)
  const mockForecast = [30, 45, 80, 95, 60, 40, 20];
  const timeLabels = ["8a", "10a", "12p", "2p", "4p", "6p", "8p"];

  return (
    <aside className="w-full lg:w-1/3 bg-[#0F0A1E] p-6 overflow-y-auto border-l border-[#C9922D]/20">
      <div className="space-y-6 animate-fade-in">
        
        {/* Header & Crowd Level */}
        <div className="bg-[#1A1525] rounded-xl p-5 border border-[#C9922D]/20 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C9922D]/10 to-transparent blur-2xl rounded-full" />
          
          <h3 className="text-2xl font-playfair font-bold text-[#C9922D] mb-4 relative z-10">
            {selectedLocation.name}
          </h3>
          
          <div className="flex items-center justify-between mb-5 relative z-10">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F0A1E] border border-gray-700/50">
              <span className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: color, color: color }} />
              <span className="text-sm font-semibold text-white">{selectedLocation.crowdLevel}</span>
            </div>
            <span className="text-[#A19580] text-sm flex items-center gap-1">
              <Users className="w-4 h-4" /> {intensity}% Capacity
            </span>
          </div>

          <div className="w-full bg-[#0F0A1E] rounded-full h-2 relative z-10 overflow-hidden border border-gray-800">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${intensity}%`, backgroundColor: color }}
            >
              {/* Shimmer on the bar */}
              <div className="absolute inset-0 bg-white/20 w-full h-full shimmer" />
            </div>
          </div>
        </div>

        {/* Cultural Context */}
        <div className="bg-[#1A1525] rounded-xl p-5 border border-[#C9922D]/10 shadow-lg">
          <p className="text-white text-sm leading-relaxed italic border-l-2 border-[#C9922D] pl-3">
            "{context}"
          </p>
        </div>

        {/* Real-time Factors */}
        <div className="bg-[#1A1525] rounded-xl p-5 border border-[#C9922D]/10 shadow-lg">
          <h4 className="text-sm font-semibold mb-4 flex items-center gap-2 text-[#C9922D] uppercase tracking-wider">
            <Cloud className="h-4 w-4" /> Current Conditions
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-[#A19580] flex items-center gap-1.5"><Clock className="w-4 h-4"/> Time</span>
              <span className="font-medium text-white">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-2">
              <span className="text-[#A19580] flex items-center gap-1.5"><Cloud className="w-4 h-4"/> Weather</span>
              <span className="font-medium text-white">{selectedLocation.weather}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#A19580] flex items-center gap-1.5"><Flag className="w-4 h-4"/> Status</span>
              <span className="font-medium text-white">
                Regular Day
              </span>
            </div>
          </div>
        </div>

        {/* Hourly Forecast Chart */}
        <div className="bg-[#1A1525] rounded-xl p-5 border border-[#C9922D]/10 shadow-lg">
          <h4 className="text-sm font-semibold mb-4 text-[#C9922D] uppercase tracking-wider">
            Predicted Flow Today
          </h4>
          <div className="flex items-end justify-between h-24 gap-1 mt-2">
            {mockForecast.map((val, idx) => {
              const barColor = val > 80 ? "#ef4444" : val > 60 ? "#f97316" : val > 40 ? "#f59e0b" : "#10b981";
              return (
                <div key={idx} className="flex flex-col items-center gap-2 flex-1 group h-full">
                  <div className="w-full bg-[#0F0A1E] rounded-t-sm h-full relative flex items-end overflow-hidden group-hover:bg-gray-800/50 transition-colors">
                    <div 
                      className="w-full rounded-t-sm transition-all duration-700" 
                      style={{ height: `${val}%`, backgroundColor: barColor, opacity: 0.8 }} 
                    />
                  </div>
                  <span className="text-[10px] text-[#A19580]">{timeLabels[idx]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Safety Recommendation */}
        <div className={`rounded-xl p-5 border shadow-lg relative overflow-hidden
          ${intensity >= 85 ? 'bg-red-900/20 border-red-500/30' : 'bg-[#1A1525] border-[#C9922D]/10'}`}
        >
          {intensity >= 85 && <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse" />}
          <h4 className={`text-sm font-semibold mb-2 flex items-center gap-2 uppercase tracking-wider
            ${intensity >= 85 ? 'text-red-400' : 'text-[#C9922D]'}`}>
            <AlertTriangle className="h-4 w-4" /> Recommendation
          </h4>
          <p className="text-white text-sm leading-relaxed">
            {getRecommendation(selectedLocation.crowdLevel)}
          </p>
        </div>

      </div>
    </aside>
  );
}

export default DetailsPanel;
