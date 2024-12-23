const express = require("express");
const { getNearbyHospitals } = require("../controllers/hospitalController");
const router = express.Router();

router.get("/nearby-hospitals", getNearbyHospitals);

module.exports = router;