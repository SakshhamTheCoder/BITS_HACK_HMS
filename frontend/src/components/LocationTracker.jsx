import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const LocationTracker = () => {
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(5000); // Default radius: 5 km
  const [hospitals, setHospitals] = useState([]);
  const [isLocationError, setIsLocationError] = useState(false);

  const API_URL = "http://localhost:3000/api/nearby-hospitals";

  const fetchNearbyHospitals = async (lat, lng, radius) => {
    try {
      const response = await fetch(`${API_URL}?lat=${lat}&lng=${lng}&radius=${radius}`);
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setHospitals(data);
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

  const handleLocationInput = () => {
    const lat = parseFloat(prompt("Enter Latitude:"));
    const lng = parseFloat(prompt("Enter Longitude:"));
    if (lat && lng) {
      setLocation({ lat, lng });
      fetchNearbyHospitals(lat, lng, radius);
      setIsLocationError(false);
    } else {
      alert("Invalid coordinates. Please try again.");
    }
  };

  const handleManualLatLngUpdate = () => {
    const lat = parseFloat(prompt("Update Latitude:", location?.lat || ""));
    const lng = parseFloat(prompt("Update Longitude:", location?.lng || ""));
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

  if (isLocationError) {
    return (
      <div>
        <h2>Could not fetch your location. Please enter it manually:</h2>
        <button onClick={handleLocationInput}>Enter Location Manually</button>
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
          <button onClick={handleManualLatLngUpdate} style={{ marginLeft: "10px" }}>
            Update Latitude/Longitude
          </button>
          <MapContainer
            center={[location.lat, location.lng]}
            zoom={14}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[location.lat, location.lng]}>
              <Popup>Your Location</Popup>
            </Marker>
            {hospitals.map((hospital, index) => (
              <Marker
                key={index}
                position={[
                  hospital.lat || hospital.center?.lat,
                  hospital.lon || hospital.center?.lon,
                ]}
              >
                <Popup>
                  <h3>{hospital.tags?.name || "Unnamed Hospital"}</h3>
                  <p>{hospital.tags?.amenity || "Hospital"}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          <h3>Nearby Hospitals:</h3>
          {hospitals.length > 0 ? (
            <ul>
              {hospitals.map((hospital, index) => (
                <li key={index}>
                  <strong>{hospital.tags?.name || "Unnamed Hospital"}</strong>
                  <p>Type: {hospital.tags?.amenity || "Unknown"}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hospitals found in this radius.</p>
          )}
        </>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default LocationTracker;
