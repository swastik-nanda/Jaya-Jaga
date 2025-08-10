const Booking = require("../models/Booking");

/**
 * @desc    Get a single booking by its ID
 * @route   GET /api/bookings/:id
 * @access  Protected
 * @purpose This is the new function your frontend confirmation page will call.
 */
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Optional: Check if the booking belongs to the user making the request
    if (booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json(booking);
  } catch (err) {
    console.error("Error fetching booking:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * @desc    Create a new booking
 * @route   POST /api/bookings
 * @access  Protected
 * @update  Modified to store only the user's ID, aligning with best practices.
 */
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
      user: req.user._id, // Storing only the user's ID reference
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

/**
 * @desc    Get all bookings for the logged-in user
 * @route   GET /api/bookings/my
 * @access  Protected
 * @update  Corrected query to work with the user ID reference.
 */
const getMyBookings = async (req, res) => {
  try {
    // This query now correctly finds bookings by the user's ID
    const bookings = await Booking.find({ user: req.user._id }).sort({
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
  getBookingById, // Export the new function
};
