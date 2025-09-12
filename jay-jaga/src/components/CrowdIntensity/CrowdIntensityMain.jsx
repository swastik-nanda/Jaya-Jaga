import React, { useState, useEffect } from "react";
import CrowdIntensityHeader from "./CrowdIntensityHeader.jsx";
import MapPanel from "./MapPanel.jsx";
import DetailsPanel from "./DetailsPanel.jsx";
import {
  locationData,
  crowdLevels,
  weatherOptions,
} from "../../utils/constants.js";

function CrowdIntensityMain() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const generateMockData = () => {
    return locationData.map((data, index) => ({
      id: index + 1,
      ...data,
      crowdLevel: crowdLevels[Math.floor(Math.random() * crowdLevels.length)],
      weather:
        weatherOptions[Math.floor(Math.random() * weatherOptions.length)],
      x: data.coords.x,
      y: data.coords.y,
    }));
  };

  useEffect(() => {
    setLocations(generateMockData());
    setLastUpdated(new Date());
    const interval = setInterval(() => {
      setLocations(generateMockData());
      setLastUpdated(new Date());
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      const updatedSelected = locations.find(
        (loc) => loc.id === selectedLocation.id
      );
      if (updatedSelected) setSelectedLocation(updatedSelected);
    }
  }, [locations, selectedLocation]);

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] text-gray-800 flex flex-col">
      <CrowdIntensityHeader lastUpdated={lastUpdated} />
      <div className="flex flex-grow h-[calc(100vh-73px)]">
        <MapPanel locations={locations} handleMarkerClick={handleMarkerClick} />
        <DetailsPanel selectedLocation={selectedLocation} />
      </div>
    </div>
  );
}

export default CrowdIntensityMain;
