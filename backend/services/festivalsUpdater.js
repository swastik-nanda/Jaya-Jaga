const cron = require("node-cron");
const axios = require("axios");
const Festival = require("../models/Festival.js");

const API_KEY = process.env.LUNAR_API_KEY;
// The coordinates for Puri are essential for accurate astronomical calculations.
const PURI_COORDS = { latitude: 19.81, longitude: 85.83, timezone: 5.5 };

/**
 * A helper function to call the astrology API with a specific endpoint and date.
 * @param {string} endpoint - The API endpoint to call (e.g., 'lunarmonthinfo').
 * @param {Date} date - The date for the calculation.
 * @returns {Promise<object>} The JSON response from the API.
 */
const callAPI = async (endpoint, date) => {
  const options = {
    method: "POST",
    url: `https://json.freeastrologyapi.com/${endpoint}`,
    headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
    data: JSON.stringify({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
      ...PURI_COORDS,
    }),
  };
  const { data } = await axios(options);
  return data;
};

/**
 * Finds the first calendar day on which the Ashadha lunar month begins.
 * @param {number} year - The year to search in.
 * @returns {Promise<Date>} The start date of the Ashadha month.
 */
const findAshadhaStartDate = async (year) => {
  let searchDate = new Date(`${year}-06-15`); // Start search in mid-June
  let prevMonth = "";

  for (let i = 0; i < 45; i++) {
    // Search a 45-day window to be safe
    const res = await callAPI("lunarmonthinfo", searchDate);
    const currentMonth = res.lunar_month_name;

    // The condition is met on the first day of the new lunar month.
    if (
      i > 0 &&
      currentMonth.toLowerCase() === "ashadha" &&
      prevMonth.toLowerCase() !== "ashadha"
    ) {
      console.log(
        `Found start of Ashadha month on ${
          searchDate.toISOString().split("T")[0]
        }`
      );
      return searchDate;
    }
    prevMonth = currentMonth;
    searchDate.setDate(searchDate.getDate() + 1); // Check the next day
  }
  throw new Error("Could not find start of Ashadha month.");
};

/**
 * Finds the exact date of Rath Yatra by searching for the correct tithi and paksha.
 * @param {Date} ashadhaStartDate - The first day of the Ashadha month.
 * @returns {Promise<Date>} The start date of the Rath Yatra festival.
 */
const findRathYatraDate = async (ashadhaStartDate) => {
  let searchDate = new Date(ashadhaStartDate);

  for (let i = 0; i < 30; i++) {
    // Search within the month
    const res = await callAPI("daily_panchang", searchDate);

    if (res.paksha === "Shukla Paksha" && res.tithi.tithi_name === "Dwitiya") {
      console.log(
        `Found Rath Yatra (Ashadha Shukla Dwitiya) on: ${
          searchDate.toISOString().split("T")[0]
        }`
      );
      return searchDate;
    }
    searchDate.setDate(searchDate.getDate() + 1);
  }
  throw new Error("Could not find Shukla Paksha Dwitiya in Ashadha month.");
};

/**
 * The main function that orchestrates checking, fetching, and saving the festival dates.
 */
const updateRathYatraDate = async () => {
  const year = new Date().getFullYear();
  console.log(`Checking Rath Yatra dates for year ${year}...`);

  try {
    // 1. Check if dates for the current year already exist in the DB.
    const existing = await Festival.findOne({ name: "Rath Yatra", year });
    if (existing) {
      console.log(
        `Dates for ${year} already exist in the database. No update needed.`
      );
      return;
    }

    // 2. If not, calculate the dates using the API.
    console.log(`No dates found for ${year}. Fetching from Astrology API...`);
    const ashadhaStartDate = await findAshadhaStartDate(year);
    const rathYatraStartDate = await findRathYatraDate(ashadhaStartDate);

    const rathYatraEndDate = new Date(rathYatraStartDate);
    rathYatraEndDate.setDate(rathYatraStartDate.getDate() + 8); // Rath Yatra is a 9-day festival.

    // 3. Save the new dates to the database.
    await Festival.findOneAndUpdate(
      { name: "Rath Yatra", year },
      { startDate: rathYatraStartDate, endDate: rathYatraEndDate },
      { upsert: true } // Creates the document if it doesn't exist.
    );
    console.log(
      `Successfully added Rath Yatra dates for ${year} to the database.`
    );
  } catch (error) {
    console.error(
      "Failed to automatically update festival dates:",
      error.message
    );
  }
};

/**
 * Schedules the update process to run automatically.
 */
const scheduleFestivalUpdate = () => {
  // This cron job is scheduled to run at 2:00 AM on January 1st, every year.
  cron.schedule("0 2 1 1 *", updateRathYatraDate, {
    scheduled: true,
    timezone: "Asia/Kolkata",
  });
  console.log("Festival date updater is scheduled to run annually on Jan 1st.");

  // For immediate verification, we also run the check once when the server starts.
  updateRathYatraDate();
};

module.exports = { scheduleFestivalUpdate };
