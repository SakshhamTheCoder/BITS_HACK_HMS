const axios = require('axios');
const { firestore } = require('../services/firebase');

const getNearbyHospitals = async (req, res) => {
    const { lat, lng, radius } = req.query;

    if (!lat || !lng || !radius) {
        return res.status(400).json({ error: 'Latitude, Longitude, and Radius are required.' });
    }

    const overpassUrl = 'https://overpass-api.de/api/interpreter';
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
        const response = await axios.post(overpassUrl, `data=${encodeURIComponent(query)}`, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        res.json(response.data.elements);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch data from Overpass API.' });
    }
};

const getSavedHospitals = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required.' });
    }

    try {
        const snapshot = await firestore.collection('data').doc(userId).get();
        if (!snapshot.exists) {
            return res.status(404).json({ message: 'No data found for the user.' });
        }

        const data = snapshot.data();
        res.json(data.hospitals);
    } catch (error) {
        console.error('Error fetching saved hospitals:', error.message);
        res.status(500).json({ error: 'Error fetching saved hospitals.' });
    }
};

module.exports = { getNearbyHospitals, getSavedHospitals };

