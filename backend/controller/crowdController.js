const axios = require("axios");
// Corrected the import to match the model filename
const Festival = require("../models/Festival.js");

const LOCATIONS = [
  "Baisi Pahacha (22 Steps)",
  "Grand Road (Bada Danda)",
  "Main Temple Gate (Singhadwara)",
  "Northern Gate (Hasti Dwara)",
  "Southern Gate (Aswadwara)",
  // CORRECTED: Removed the trailing parenthesis
  "Swargadwar Cremation Ground",
  "Western Gate (Vyaghra Dwara)",
];
const PURI_LAT = 19.8135;
const PURI_LON = 85.8315;

const mapWeatherCondition = (apiWeather) => {
  const weather = apiWeather.toLowerCase();
  if (weather.includes("rain")) return "Heavy Rain";
  if (weather.includes("clouds")) return "Cloudy";
  if (weather.includes("haze") || weather.includes("mist")) return "Humid";
  return "Sunny";
};

const getEventStatus = async () => {
  const now = new Date();
  try {
    const activeFestival = await Festival.findOne({
      name: "Rath Yatra",
      startDate: { $lte: now },
      endDate: { $gte: now },
    });
    return activeFestival ? "Rath Yatra Day" : "No Event";
  } catch (error) {
    console.error("Error querying festival status from DB:", error.message);
    return "No Event"; // Default to No Event on DB error
  }
};

const getCrowdData = async (req, res) => {
  console.log("Received request for crowd data...");

  // --- Configuration Validation ---
  // Checks that environment variables are loaded before making any API calls.
  const { WEATHER_API_KEY, FLASK_API_URL } = process.env;
  if (!WEATHER_API_KEY || !FLASK_API_URL) {
    console.error(
      "CRITICAL: Missing WEATHER_API_KEY or FLASK_API_URL in .env file."
    );
    return res
      .status(500)
      .json({
        error: "Server configuration error. Please contact the administrator.",
      });
  }

  try {
    // Step A: Gather Live Environmental Data
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${PURI_LAT}&lon=${PURI_LON}&appid=${WEATHER_API_KEY}`;
    console.log(`Fetching weather from: ${weatherUrl}`);
    const weatherResponse = await axios.get(weatherUrl);
    const weather_condition = mapWeatherCondition(
      weatherResponse.data.weather[0].main
    );

    const event = await getEventStatus();
    const hour = new Date().getHours();

    console.log(
      `Live data gathered: Weather=${weather_condition}, Event=${event}, Hour=${hour}`
    );

    // Step B: Get Predictions for ALL Locations from our Flask API
    console.log(`Requesting predictions from model at: ${FLASK_API_URL}`);
    const predictionPromises = LOCATIONS.map((location) => {
      return axios.post(FLASK_API_URL, {
        hour,
        location,
        weather_condition,
        event,
      });
    });

    const predictionResponses = await Promise.all(predictionPromises);
    const predictions = predictionResponses.map(
      (response) => response.data.predicted_crowd_level
    );

    console.log("Received all predictions from model:", predictions);

    // Step C: Combine Data and Send Response
    const responseData = LOCATIONS.map((name, index) => ({
      name: name,
      crowdLevel: predictions[index],
    }));

    res.status(200).json(responseData);
  } catch (error) {
    // Provide more detailed error logging
    if (error.code === "ECONNREFUSED") {
      console.error(
        `Error: Connection refused. Is the Flask API running at ${FLASK_API_URL}?`
      );
    } else {
      console.error("Error in getCrowdData controller:", error.message);
    }
    res.status(500).json({ error: "Failed to fetch crowd data." });
  }
};

module.exports = {
  getCrowdData,
};
