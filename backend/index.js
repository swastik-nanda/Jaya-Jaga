const express = require("express");
const dotenv = require("dotenv");
const hotelRouter = require("./routes/hotelsRouter");

dotenv.config();
const app = express();

app.use(express.json());

// Route for hotels
app.use("/api/hotels", hotelRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
