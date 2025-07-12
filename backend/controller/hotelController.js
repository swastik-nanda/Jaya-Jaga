// controllers/hotelController.js

const axios = require("axios");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const GEOAPIFY_API_KEY = process.env.GEO_API_KEY;

const fetchHotels = async (req, res) => {
  try {
    const url = `https://api.geoapify.com/v2/places?categories=accommodation.hotel&filter=circle:85.8312,19.8135,5000&limit=20&apiKey=${GEOAPIFY_API_KEY}`;

    const response = await axios.get(url);

    const hotels = response.data.features.map((f) => ({
      id: f.properties.place_id,
      name: f.properties.name || "Unnamed Hotel",
      lat: f.geometry.coordinates[1],
      lng: f.geometry.coordinates[0],
      address: f.properties.formatted,
      price: null,
      rating: null,
      image: null,
    }));

    if (req.query.save) {
      const filePath = path.join(
        __dirname,
        "../../jay-jaga/src/data/hotels.json"
      );
      fs.writeFileSync(filePath, JSON.stringify(hotels, null, 2));
      console.log("✅ Hotel data saved to hotels.json");
    }

    res.status(200).json(hotels);
  } catch (err) {
    console.error("❌ Error fetching hotels:", err.message);
    res.status(500).json({ error: "Failed to fetch hotel data" });
  }
};

module.exports = { fetchHotels };
