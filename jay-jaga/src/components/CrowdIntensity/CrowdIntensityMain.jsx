import React, { useState, useEffect } from "react";
import axios from "axios";
import CrowdIntensityHeader from "./CrowdIntensityHeader.jsx";
import MapPanel from "./MapPanel.jsx";
import DetailsPanel from "./DetailsPanel.jsx";
import { locationData } from "../../utils/constants.js";

function CrowdIntensityMain() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const API_URL = "http://localhost:5000/api/crowd/crowd-data";
        const response = await axios.get(API_URL);

        const liveData = locationData.map((staticLocation) => {
          const liveLocationData = response.data.find(
            (live) => live.name === staticLocation.name
          );
          return {
            ...staticLocation,
            crowdLevel: liveLocationData ? liveLocationData.crowdLevel : "Low",
            weather: liveLocationData ? liveLocationData.weather : "Unknown",
          };
        });

        setLocations(liveData);
        setLastUpdated(new Date());
      } catch (err) {
        console.error("Failed to fetch crowd data:", err);
        setError(
          "Could not load live crowd data. Please ensure the backend server is running."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
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
        {isLoading ? (
          <div className="w-2/3 flex items-center justify-center">
            <p className="text-xl text-gray-500 animate-pulse">
              Loading Live Crowd Data...
            </p>
          </div>
        ) : error ? (
          <div className="w-2/3 flex items-center justify-center p-8">
            <p className="text-xl text-red-500 text-center">{error}</p>
          </div>
        ) : (
          <MapPanel
            locations={locations}
            handleMarkerClick={handleMarkerClick}
          />
        )}
        <DetailsPanel selectedLocation={selectedLocation} />
      </div>
    </div>
  );
}

export default CrowdIntensityMain;
