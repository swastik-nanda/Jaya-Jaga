const mongoose = require("mongoose");

const festivalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Rath Yatra",
    },
    year: {
      type: Number,
      required: true,
      unique: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Festival = mongoose.model("Festival", festivalSchema);

module.exports = Festival;
