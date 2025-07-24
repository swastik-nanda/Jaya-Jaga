const express = require("express");
const {
  createOrder,
  verifyPayment,
} = require("../controller/paymentsController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify", protect, verifyPayment);

module.exports = router;
