// routes/hotelRouter.js

const express = require("express");
const router = express.Router();
const { fetchHotels } = require("../controller/hotelController");

router.get("/fetch-hotels", fetchHotels);

module.exports = router;
