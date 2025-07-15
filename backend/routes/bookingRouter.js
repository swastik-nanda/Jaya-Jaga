const express = require("express");
const {
  createBooking,
  getMyBookings,
} = require("../controller/bookingController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, createBooking); // To book a hotel
router.get("/my", protect, getMyBookings); // Get current user's bookings

module.exports = router;
