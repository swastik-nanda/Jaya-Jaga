const axios = require("axios");
const Festival = require("../models/Festival.js");

const LOCATIONS = [
  "Baisi Pahacha (22 Steps)",
  "Grand Road (Bada Danda)",
  "Main Temple Gate (Singhadwara)",
  "Northern Gate (Hasti Dwara)",
  "Southern Gate (Aswadwara)",
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
    return "No Event";
  }
};

const getCrowdData = async (req, res) => {
  const { WEATHER_API_KEY, FLASK_API_URL } = process.env;
  if (!WEATHER_API_KEY || !FLASK_API_URL) {
    return res.status(500).json({ error: "Server configuration error." });
  }

  try {
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${PURI_LAT}&lon=${PURI_LON}&appid=${WEATHER_API_KEY}`
    );
    const weather_condition = mapWeatherCondition(
      weatherResponse.data.weather[0].main
    );
    const event = await getEventStatus();
    const hour = new Date().getHours();

    const predictionPromises = LOCATIONS.map((location) =>
      axios.post(FLASK_API_URL, { hour, location, weather_condition, event })
    );
    const predictionResponses = await Promise.all(predictionPromises);
    const predictions = predictionResponses.map(
      (response) => response.data.predicted_crowd_level
    );

    // UPDATED: The response now includes the weather condition used for the prediction
    const responseData = LOCATIONS.map((name, index) => ({
      name: name,
      crowdLevel: predictions[index],
      weather: weather_condition,
    }));

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error in getCrowdData controller:", error.message);
    res.status(500).json({ error: "Failed to fetch crowd data." });
  }
};

module.exports = { getCrowdData };
