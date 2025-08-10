const express = require("express");
const {
  createBooking,
  getMyBookings,
  getBookingById,
} = require("../controller/bookingController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, createBooking); // To book a hotel
router.get("/my", protect, getMyBookings); // Get current user's bookings
router.get("/:id", protect, getBookingById);

module.exports = router;
