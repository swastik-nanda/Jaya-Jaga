import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { differenceInCalendarDays, parseISO } from "date-fns";
import NavBarSecondary from "../components/NavBarSecondary";

export default function ConfirmBooking() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [extraBed, setExtraBed] = useState(false);

  useEffect(() => {
    async function fetchHotelData() {
      try {
        const res = await fetch("/data/hotels.json");
        const data = await res.json();
        const selected = data.find((h) => h.id === id);
        setHotel(selected);
      } catch (err) {
        console.error("Failed to load hotel data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHotelData();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!hotel) return <p className="p-6">Hotel not found</p>;

  // Calculate nights
  let nights = 0;
  if (fromDate && toDate) {
    const start = parseISO(fromDate);
    const end = parseISO(toDate);
    nights = differenceInCalendarDays(end, start);
    if (nights < 1) nights = 0;
  }

  const basePrice = hotel.price || 0;
  const nightlyRate = extraBed ? basePrice * 1.1 : basePrice;
  const totalPrice = (nightlyRate * nights).toFixed(0);

  return (
    <div className="mt-20">
      <NavBarSecondary></NavBarSecondary>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
        <h1 className="text-3xl font-bold mb-4 text-amber-600">
          Confirm Booking: {hotel.name}
        </h1>
        <p className="text-gray-700 mb-2">📍 {hotel.address}</p>

        <form className="space-y-4 mt-6">
          {/* Date Inputs */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                From Date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                To Date
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Guests
            </label>
            <input
              type="number"
              value={guests}
              min={1}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="mt-1 w-24 border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Extra Bed */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="extraBed"
              checked={extraBed}
              onChange={() => setExtraBed(!extraBed)}
              className="h-5 w-5 text-amber-500"
            />
            <label htmlFor="extraBed" className="text-sm text-gray-700">
              Add extra bed (+10% per night)
            </label>
          </div>

          {/* Total Price */}
          <div className="text-lg font-semibold text-green-700">
            Total Nights: {nights || 0}
          </div>
          <div className="text-xl font-bold text-green-800">
            Final Price: ₹{nights > 0 ? totalPrice : 0}
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            className="mt-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg shadow"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
