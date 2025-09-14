const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Corrected the model import to match your project's convention
const Festival = require("../models/Festival.js");

// This correctly locates the .env file within your 'backend' directory
dotenv.config({ path: __dirname + "/../.env" });

// Known Rath Yatra dates for the next 5 years.
const festivalDates = [
  {
    name: "Rath Yatra",
    year: 2025,
    startDate: new Date("2025-07-07T00:00:00.000Z"),
    endDate: new Date("2025-07-15T23:59:59.000Z"),
  },
  {
    name: "Rath Yatra",
    year: 2026,
    startDate: new Date("2026-06-26T00:00:00.000Z"),
    endDate: new Date("2026-07-04T23:59:59.000Z"),
  },
  {
    name: "Rath Yatra",
    year: 2027,
    startDate: new Date("2027-07-15T00:00:00.000Z"),
    endDate: new Date("2027-07-23T23:59:59.000Z"),
  },
  {
    name: "Rath Yatra",
    year: 2028,
    startDate: new Date("2028-07-04T00:00:00.000Z"),
    endDate: new Date("2028-07-12T23:59:59.000Z"),
  },
  {
    name: "Rath Yatra",
    year: 2029,
    startDate: new Date("2029-06-23T00:00:00.000Z"),
    endDate: new Date("2029-07-01T23:59:59.000Z"),
  },
];

const importData = async () => {
  try {
    // Step 1: Connect to the database using the MONGO_URI from your .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected for Seeding...");

    // Step 2: Clear any existing festival data to avoid duplicates
    await Festival.deleteMany();
    console.log("Cleared existing festival data.");

    // Step 3: Insert the new dates
    await Festival.insertMany(festivalDates);
    console.log("✅ Data Seeded Successfully!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  } finally {
    // Step 4: Disconnect from the database and exit the script
    await mongoose.disconnect();
    console.log("MongoDB disconnected.");
    process.exit();
  }
};

importData();
