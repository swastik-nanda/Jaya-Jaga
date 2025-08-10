import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const SuccessfulPayment = () => {
  // THE FIX IS HERE: We get the ':id' from the route and rename it to 'bookingId'
  const { id: bookingId } = useParams();

  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication error. Please log in again.");
        setLoading(false);
        return;
      }
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/booking/${bookingId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookingDetails(data);
      } catch (err) {
        setError("Could not retrieve booking details.");
        console.error("Fetch booking error:", err.response || err);
      } finally {
        setLoading(false);
      }
    };

    // This check now works because bookingId will have the correct value
    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);

  if (loading) {
    return <div className="text-center p-20 text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-20 text-lg text-red-500">{error}</div>;
  }

  if (!bookingDetails) {
    return <div className="text-center p-20 text-lg">No booking found.</div>;
  }

  // This JSX was already correct and will now render properly.
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="bg-green-100 rounded-full p-4 mb-4">
            <svg
              className="w-16 h-16 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Booking Confirmed! ✅
          </h1>
          <p className="text-gray-600 mt-2">
            Hi{" "}
            <span className="font-semibold">
              {bookingDetails.user?.name || "Valued Customer"}
            </span>
            , your booking at{" "}
            <span className="font-semibold">
              {bookingDetails.hotelName || "the hotel"}
            </span>{" "}
            is complete.
          </p>
        </div>

        <div className="border-t border-b border-gray-200 py-6 my-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Booking Summary
          </h2>
          <div className="space-y-4 text-sm md:text-base">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Booking ID:</span>
              <span className="text-gray-800 font-mono">
                {bookingDetails._id || "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Check-in Date:</span>
              <span className="text-gray-800 font-semibold">
                {bookingDetails.fromDate
                  ? format(new Date(bookingDetails.fromDate), "dd MMMM yyyy")
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Check-out Date:</span>
              <span className="text-gray-800 font-semibold">
                {bookingDetails.toDate
                  ? format(new Date(bookingDetails.toDate), "dd MMMM yyyy")
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Guests:</span>
              <span className="text-gray-800">
                {bookingDetails.guests || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-dashed">
              <span className="text-lg font-bold text-gray-700">
                Total Amount Paid:
              </span>
              <span className="text-2xl text-green-600 font-bold">
                ₹{bookingDetails.totalPrice || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="bg-amber-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-600 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulPayment;
