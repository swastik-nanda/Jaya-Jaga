import React from "react";
import { MapPin, Clock } from "../../utils/icons";

const CrowdIntensityHeader = ({ lastUpdated }) => {
  return (
    <header className="bg-white border-b border-gray-200 p-4 shrink-0 shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-lg md:text-2xl font-bold flex items-center gap-2 text-gray-900">
          <MapPin className="h-6 w-6 text-orange-500" />
          Puri Jagannath Temple - Crowd Density
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
        </div>
      </div>
    </header>
  );
};

export default CrowdIntensityHeader;
