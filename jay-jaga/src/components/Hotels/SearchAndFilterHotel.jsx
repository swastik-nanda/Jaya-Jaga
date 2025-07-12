import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

export default function SearchAndFilterHotel({ hotels, setFilteredHotels }) {
  const [showFilters, setShowFilters] = useState(true);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilter = () => {
    let filtered = hotels;

    if (search) {
      filtered = filtered.filter((hotel) =>
        hotel.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (maxPrice) {
      filtered = filtered.filter(
        (hotel) => hotel.price && hotel.price <= parseInt(maxPrice)
      );
    }

    setFilteredHotels(filtered);
  };

  const resetFilters = () => {
    setSearch("");
    setMaxPrice("");
    setFilteredHotels(hotels);
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      <div className="md:hidden flex justify-end mb-2">
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="flex items-center mr-2.5 gap-2 text-orange-600 font-semibold border border-orange-500 px-3 py-1 rounded-lg hover:bg-orange-50"
        >
          <SlidersHorizontal size={32} />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filter Form */}
      {showFilters && (
        <div className="flex flex-col md:flex-row gap-4 px-0">
          <input
            type="text"
            placeholder="Search hotel name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 flex-1"
          />

          <input
            type="number"
            placeholder="Max price (₹)"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-40"
          />

          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={handleFilter}
              className="bg-amber-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition-colors duration-200"
            >
              Apply Filters
            </button>

            <button
              onClick={resetFilters}
              className="bg-orange-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition-colors duration-200"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </>
  );
}
