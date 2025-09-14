import React from "react";
import { Users, Cloud, AlertTriangle, MapPin } from "../../utils/icons.jsx";
import { crowdLevels } from "../../utils/constants.js";
import {
  getCrowdColor,
  getCrowdIntensity,
  getRecommendation,
} from "../../utils/utils.js";

function DetailsPanel({ selectedLocation }) {
  if (!selectedLocation) {
    return (
      <aside className="w-1/3 bg-[#FFFBF5] p-6 overflow-y-auto">
        <div className="h-full flex items-center justify-center">
          <div className="text-center text-gray-400">
            <MapPin className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2 text-gray-600">
              Select a Location
            </h3>
            <p>
              Click on any marker on the map to view detailed crowd information.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-1/3 bg-[#FFFBF5] p-6 overflow-y-auto">
      <div className="space-y-6 animate-fade-in">
        {/* Crowd Level Details */}
        <div className="bg-white rounded-lg p-4 border border-orange-200 shadow-sm">
          <h3 className="text-xl font-bold text-orange-600 mb-2">
            {selectedLocation.name}
          </h3>
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-gray-500" />
            <span className="text-lg font-semibold text-gray-700">
              Crowd Level: {selectedLocation.crowdLevel}
            </span>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Crowd Density
              </span>
              <span className="text-sm text-gray-500">
                {getCrowdIntensity(selectedLocation.crowdLevel)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${getCrowdIntensity(selectedLocation.crowdLevel)}%`,
                  backgroundColor: getCrowdColor(selectedLocation.crowdLevel),
                }}
              />
            </div>
          </div>
        </div>

        {/* Contributing Factors */}
        <div className="bg-white rounded-lg p-4 border border-orange-200 shadow-sm">
          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-700">
            <Cloud className="h-5 w-5 text-gray-500" />
            Contributing Factors
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Current Time:</span>
              <span className="font-medium text-gray-800">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Weather:</span>
              <span className="font-medium text-gray-800">
                {selectedLocation.weather}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Event Status:</span>
              <span className="font-medium text-gray-800">
                {selectedLocation.crowdLevel === "Critical" ||
                selectedLocation.crowdLevel === "Very High"
                  ? "Festival Day"
                  : "Regular Day"}
              </span>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-white rounded-lg p-4 border border-orange-200 shadow-sm">
          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-700">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Recommendation
          </h4>
          <p className="text-gray-600 leading-relaxed">
            {getRecommendation(selectedLocation.crowdLevel)}
          </p>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg p-4 border border-orange-200 shadow-sm">
          <h4 className="text-lg font-semibold mb-3 text-gray-700">
            Crowd Level Legend
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {crowdLevels.map((level) => (
              <div key={level} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: getCrowdColor(level) }}
                />
                <span className="text-sm text-gray-600">{level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default DetailsPanel;
