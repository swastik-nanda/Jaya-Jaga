const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  hotelId: {
    type: String,
    required: true,
  },

  hotelName: {
    type: String,
    required: true,
  },

  fromDate: {
    type: Date,
    required: true,
  },

  toDate: {
    type: Date,
    required: true,
  },

  guests: {
    type: Number,
    required: true,
    min: 1,
  },

  extraBed: {
    type: Boolean,
    default: false,
  },

  totalPrice: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
