import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Default marker icon setup
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom red icon for user location
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // Point where the popup opens relative to the iconAnchor
  shadowSize: [41, 41], // Size of the shadow
});

const LocationTracker = () => {
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(5000); // Default radius: 5 km
  const [hospitals, setHospitals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLocationError, setIsLocationError] = useState(false);

  const API_URL = "http://localhost:3000/api/nearby-hospitals";

  const fetchNearbyHospitals = async (lat, lng, radius) => {
    try {
      const response = await fetch(`${API_URL}?lat=${lat}&lng=${lng}&radius=${radius}`);
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      console.log("Fetched Hospital Data:", data); // Log the full data
      // Add random ratings and reviews to each hospital
      const enhancedHospitals = data.map((hospital) => ({
        ...hospital,
        rating: (Math.random() * 4 + 1).toFixed(1), // Rating between 1.0 to 5.0
        reviews: Math.floor(Math.random() * 500 + 1), // Reviews between 1 and 500
      }));
      setHospitals(enhancedHospitals);
    } catch (error) {
      console.error("Error fetching hospitals:", error.message);
      alert("Unable to fetch nearby hospitals. Please try again later.");
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          fetchNearbyHospitals(latitude, longitude, radius);
          setIsLocationError(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocationError(true);
        }
      );
    }
  };

  const updateLocationManually = () => {
    const lat = parseFloat(prompt("Enter Latitude:", location?.lat || ""));
    const lng = parseFloat(prompt("Enter Longitude:", location?.lng || ""));
    if (lat && lng) {
      setLocation({ lat, lng });
      fetchNearbyHospitals(lat, lng, radius);
    } else {
      alert("Invalid coordinates. Please try again.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.tags?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLocationError) {
    return (
      <div>
        <h2>Could not fetch your location. Please enter it manually:</h2>
        <button onClick={updateLocationManually}>Enter Location Manually</button>
      </div>
    );
  }

  return (
    <div>
      {location ? (
        <>
          <h2>Your Location: {location.lat}, {location.lng}</h2>
          <label>
            Search Radius (meters):
            <input
              type="number"
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value, 10))}
              style={{ marginLeft: "10px" }}
            />
            <button onClick={() => fetchNearbyHospitals(location.lat, location.lng, radius)}>
              Update Search
            </button>
          </label>
          <button onClick={updateLocationManually} style={{ marginLeft: "10px" }}>
            Update Latitude/Longitude
          </button>
          <br />
          <label>
            Search Hospitals:
            <input
              type="text"
              placeholder="Enter hospital name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ marginLeft: "10px", marginTop: "10px" }}
            />
          </label>
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={14}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[location.lat, location.lng]} icon={redIcon}>
              <Popup>Your Location</Popup>
            </Marker>
            {filteredHospitals.map((hospital, index) => (
              <Marker
                key={index}
                position={[hospital.lat || hospital.center?.lat, hospital.lon || hospital.center?.lon]}
              >
                <Popup>
                  <h3>{hospital.tags?.name || "Unnamed Hospital"}</h3>
                  <p>Address: {hospital.tags?.["addr:full"] || "Not Available"}</p>
                  <p>Postal Code: {hospital.tags?.["addr:postcode"] || "Not Available"}</p>
                  <p>Rating: ⭐ {hospital.rating} ({hospital.reviews} reviews)</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          <h3>Nearby Hospitals:</h3>
          {filteredHospitals.length > 0 ? (
            <ul>
              {filteredHospitals.map((hospital, index) => (
                <li key={index}>
                  <strong>{hospital.tags?.name || "Unnamed Hospital"}</strong>
                  <p>Address: {hospital.tags?.["addr:full"] || "Not Available"}</p>
                  <p>Rating: ⭐ {hospital.rating} ({hospital.reviews} reviews)</p>
                  <p>Latitude: {hospital.lat}, Longitude: {hospital.lon}</p>
                  <p>Postal Code: {hospital.tags?.["addr:postcode"] || "Not Available"}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hospitals found matching the search query.</p>
          )}
        </>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default LocationTracker;
