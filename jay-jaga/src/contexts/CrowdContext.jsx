import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { locationData } from "../utils/constants";

const CROWD_LEVEL_ORDER = ["Low", "Moderate", "High", "Very High", "Critical"];
const API_URL = "http://localhost:5000/api/crowd/crowd-data";

export const CrowdContext = createContext(null);

export function useCrowd() {
  const ctx = useContext(CrowdContext);
  if (!ctx) throw new Error("useCrowd must be used inside CrowdProvider");
  return ctx;
}

export function CrowdProvider({ children }) {
  const [locations, setLocations]         = useState([]);
  const [isLoading, setIsLoading]         = useState(true);
  const [error, setError]                 = useState(null);
  const [lastUpdated, setLastUpdated]     = useState(null);
  const [worstCrowdLevel, setWorstLevel]  = useState("");

  const computeWorst = (locs) => {
    if (!locs.length) return "";
    let worstIdx = -1;
    locs.forEach((loc) => {
      const idx = CROWD_LEVEL_ORDER.indexOf(loc.crowdLevel);
      if (idx > worstIdx) worstIdx = idx;
    });
    return worstIdx >= 0 ? CROWD_LEVEL_ORDER[worstIdx] : "";
  };

  const fetchData = async () => {
    setError(null);
    try {
      const response = await axios.get(API_URL);
      const liveData = locationData.map((staticLoc) => {
        const live = response.data.find((l) => l.name === staticLoc.name);
        return {
          ...staticLoc,
          crowdLevel: live ? live.crowdLevel : "Low",
          weather:    live ? live.weather    : "Unknown",
        };
      });
      setLocations(liveData);
      setWorstLevel(computeWorst(liveData));
      setLastUpdated(new Date());
    } catch (err) {
      console.error("CrowdContext: failed to fetch crowd data:", err);
      setError("Could not load live crowd data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <CrowdContext.Provider
      value={{ locations, isLoading, error, lastUpdated, worstCrowdLevel }}
    >
      {children}
    </CrowdContext.Provider>
  );
}
