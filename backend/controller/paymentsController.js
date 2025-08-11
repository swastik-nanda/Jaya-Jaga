const crypto = require("crypto");
const RazorPay = require("razorpay");
const Booking = require("../models/Booking");

const createOrder = async (req, res) => {
  const { totalPrice } = req.body;

  try {
    const instance = new RazorPay({
      key_id: process.env.RAZORPAY_TEST_KEY_ID,
      key_secret: process.env.RAZORPAY_TEST_KEY_SECRET,
    });

    const options = {
      amount: totalPrice * 100,
      currency: process.env.CURRENCY,
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await instance.orders.create(options);
    if (!order) {
      return res.status(500).json({
        message: "Error creating order",
      });
    }
    res.status(200).json({
      order,
      message: "Order created successfully",
    });
  } catch (err) {
    console.error("Razorpay order error:", err.message);
    res.status(500).json({
      error: "Server error while creating Razorpay order",
    });
  }
};

const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    hotelId,
    hotelName,
    fromDate,
    toDate,
    guests,
    extraBed,
    totalPrice,
    name,
  } = req.body;
  console.log("📦 Received in /verify:", req.body);
  const userId = req.user._id;

  try {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_TEST_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    console.log("✅ Razorpay signature verified");

    const booking = await Booking.create({
      user: userId,
      name,
      hotelId,
      hotelName,
      fromDate,
      toDate,
      guests,
      extraBed,
      totalPrice,
    });

    return res.status(201).json({
      success: true,
      message: "Payment verified and booking saved",
      booking,
    });
  } catch (err) {
    console.error("❌ Error in verifyPayment:", err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
module.exports = { createOrder, verifyPayment };
