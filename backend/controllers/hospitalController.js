const axios = require("axios");

const getNearbyHospitals = async (req, res) => {
  const { lat, lng, radius } = req.query;

  if (!lat || !lng || !radius) {
    return res.status(400).json({ error: "Latitude, Longitude, and Radius are required." });
  }

  const overpassUrl = "https://overpass-api.de/api/interpreter";
  const query = `
    [out:json];
    (
        node["amenity"="hospital"](around:${radius},${lat},${lng});
        way["amenity"="hospital"](around:${radius},${lat},${lng});
        relation["amenity"="hospital"](around:${radius},${lat},${lng});
    );
    out center;
  `;

  try {
    const response = await axios.post(
      overpassUrl,
      `data=${encodeURIComponent(query)}`,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    res.json(response.data.elements);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch data from Overpass API." });
  }
};

module.exports = { getNearbyHospitals };
