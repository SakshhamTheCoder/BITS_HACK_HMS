const express = require("express");
const { getNearbyHospitals, getSavedHospitals } = require("../controllers/hospitalController");
const router = express.Router();

router.get("/nearby-hospitals", getNearbyHospitals);
router.get("/saved-hospitals/:userId", getSavedHospitals);

module.exports = router;