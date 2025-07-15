const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const hotelRouter = require("./routes/hotelsRouter");
const userRouter = require("./routes/userRouter");
const bookingRouter = require("./routes/bookingRouter");

dotenv.config();
const app = express();

app.use(express.json());

// Routes
app.use("/api/hotels", hotelRouter);
app.use("/api/users", userRouter);
app.use("/api/booking", bookingRouter);

// MongoDB Connection & Server Start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
