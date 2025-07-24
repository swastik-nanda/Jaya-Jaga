const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const hotelRouter = require("./routes/hotelsRouter");
const userRouter = require("./routes/userRouter");
const bookingRouter = require("./routes/bookingRouter");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/hotels", hotelRouter);
app.use("/api/users", userRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/payments", paymentRoutes);

// MongoDB Connection & Server Start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
