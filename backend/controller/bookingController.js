const Booking = require("../models/Booking");
const User = require("../models/User");

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Protected (Assuming auth middleware)
const createBooking = async (req, res) => {
  const { hotelId, hotelName, fromDate, toDate, guests, extraBed, totalPrice } =
    req.body;

  try {
    if (
      !hotelId ||
      !hotelName ||
      !fromDate ||
      !toDate ||
      !guests ||
      !totalPrice
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const booking = await Booking.create({
      user: req.user.id, // assuming req.user is set by auth middleware
      hotelId,
      hotelName,
      fromDate,
      toDate,
      guests,
      extraBed,
      totalPrice,
    });

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (err) {
    console.error("Booking error:", err.message);
    res.status(500).json({ error: "Server error while creating booking" });
  }
};

// @desc    Get bookings for a user
// @route   GET /api/bookings/my
// @access  Protected
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Fetch bookings error:", err.message);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
};
