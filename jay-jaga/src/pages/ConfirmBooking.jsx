import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { differenceInCalendarDays, parseISO } from "date-fns";
import NavBarSecondary from "../components/NavBarSecondary";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function ConfirmBooking() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [extraBed, setExtraBed] = useState(false);

  const handleBookingPayment = async (e) => {
    e.preventDefault();

    if (!fromDate || !toDate || nights === 0) {
      alert("Please select valid dates");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    try {
      // Step 1: Create order
      const { data } = await axios.post(
        "http://localhost:5000/api/payments/create-order",
        {
          totalPrice: totalPrice,
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // or process.env.REACT_APP...
        amount: data.order.amount,
        currency: "INR",
        name: "Hotel Booking",
        description: `Booking for ${hotel.name}`,
        order_id: data.order.id,
        handler: async function (response) {
          // Step 2: Send to backend to verify + store booking
          const token = localStorage.getItem("token");
          const user = JSON.parse(localStorage.getItem("user"));
          console.log("User from localStorage:", user);
          const bookingData = {
            hotelId: hotel.id,
            hotelName: hotel.name,
            fromDate,
            toDate,
            guests,
            extraBed,
            totalPrice,
            name: user?.name,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };
          console.log("Final booking data sent to backend:", bookingData);

          await axios.post(
            "http://localhost:5000/api/payments/verify",
            bookingData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          toast.success("Booking successful!", {
            position: "top-right",
            autoClose: 3000,
          });
        },
        prefill: {
          name: "Swastik Nanda",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#f59e0b",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    }
  };

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
            type="button"
            onClick={handleBookingPayment}
            className="mt-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg shadow"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
