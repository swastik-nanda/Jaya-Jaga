import React, { useContext } from "react";
import CrowdIntensityHeader from "./CrowdIntensityHeader.jsx";
import MapPanel from "./MapPanel.jsx";
import DetailsPanel from "./DetailsPanel.jsx";
import { CrowdContext } from "../../contexts/CrowdContext";
import Navbar from "../Navbar";

function CrowdIntensityMain() {
  // Reads from the global CrowdContext — no duplicate fetch
  const { locations, isLoading, error } = useContext(CrowdContext);
  const [selectedLocation, setSelectedLocation] = React.useState(null);

  React.useEffect(() => {
    if (selectedLocation) {
      const updated = locations.find((l) => l.id === selectedLocation.id);
      if (updated) setSelectedLocation(updated);
    }
  }, [locations]);

  return (
    <div className="min-h-screen text-gray-800 flex flex-col" style={{ backgroundColor: "var(--color-ivory)" }}>
      <Navbar />
      <CrowdIntensityHeader />
      <div className="flex flex-grow h-[calc(100vh-73px)]">
        {isLoading ? (
          <div className="w-2/3 flex items-center justify-center">
            <p className="text-xl text-gray-500 animate-pulse">Loading Live Crowd Data…</p>
          </div>
        ) : error ? (
          <div className="w-2/3 flex items-center justify-center p-8">
            <p className="text-xl text-red-500 text-center">{error}</p>
          </div>
        ) : (
          <MapPanel locations={locations} handleMarkerClick={setSelectedLocation} />
        )}
        <DetailsPanel selectedLocation={selectedLocation} />
      </div>
    </div>
  );
}

export default CrowdIntensityMain;
