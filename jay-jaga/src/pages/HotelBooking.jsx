import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HotelMap from "../components/Hotels/HotelMap";
import HotelList from "../components/Hotels/HotelList";
import SearchAndFilter from "../components/Hotels/SearchAndFilterHotel";

export default function HotelBooking() {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    async function fetchHotels() {
      const res = await fetch("/data/hotels.json");
      const data = await res.json();
      setHotels(data);
      setFilteredHotels(data);
    }
    fetchHotels();
  }, []);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--color-ivory)" }}>
      <Navbar />

      {/* Sticky Filter Bar — offset by h-16 (64px) of Navbar */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-sm shadow-md flex items-center
                      justify-end md:justify-center px-4 md:px-8 py-4 border-b border-amber-100">
        <SearchAndFilter hotels={hotels} setFilteredHotels={setFilteredHotels} />
      </div>

      {/* Main Content: Map + Hotel List */}
      <div className="flex flex-col md:flex-row gap-6 flex-grow px-4 md:px-12 py-6 mt-4">
        {/* Map */}
        <div className="md:w-1/2 h-[400px] md:h-[75vh] rounded-2xl shadow-md overflow-hidden z-10">
          <HotelMap hotels={filteredHotels} onMarkerClick={setSelectedHotel} />
        </div>

        {/* List */}
        <div className="md:w-1/2 space-y-6 overflow-y-auto max-h-[75vh] pr-2">
          <HotelList hotels={filteredHotels} setSelectedHotel={setSelectedHotel} />
        </div>
      </div>
    </div>
  );
}
