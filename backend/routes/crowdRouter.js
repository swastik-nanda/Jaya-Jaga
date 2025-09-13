const express = require("express");
const router = express.Router();
const { getCrowdData } = require("../controller/crowdController");

router.get("/crowd-data", getCrowdData);

module.exports = router;
