import { useNavigate } from "react-router-dom";

export default function HotelList({ hotels, setSelectedHotel }) {
  const navigate = useNavigate();

  const handleOnBook = (hotel) => {
    setSelectedHotel(hotel);
    navigate(`/confirm-booking/${hotel.id}`);
  };

  return (
    <div className="grid gap-6">
      {hotels.map((hotel) => (
        <div
          key={hotel.id}
          className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row items-center hover:shadow-2xl transition-shadow duration-300"
        >
          {/* Image Section (optional) */}
          {/* <img
            src={hotel.image || "/hotel-placeholder.jpg"}
            alt={hotel.name}
            className="w-full md:w-48 h-40 object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"
            onError={(e) => (e.target.src = "/hotel-placeholder.jpg")}
          /> */}

          {/* Content Section */}
          <div className="flex-1 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {hotel.name}
            </h3>
            <p className="text-gray-500 mb-2">{hotel.address}</p>
            <div className="flex items-center gap-4 text-gray-700 mb-3">
              <span className="text-sm">⭐ {hotel.rating || "—"}</span>
              <span className="text-sm">₹{hotel.price || "—"}/night</span>
            </div>

            <button
              onClick={() => handleOnBook(hotel)}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition-colors duration-200"
            >
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
