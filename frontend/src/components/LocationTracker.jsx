import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { db, auth } from "../helpers/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import API_URL from "../helpers/Config";
import { toast } from 'react-toastify';

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
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LocationTracker = () => {
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(5000);
  const [hospitals, setHospitals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLocationError, setIsLocationError] = useState(false);

  const LOC_API_URL = `${API_URL}/nearby-hospitals`;
  const userId = auth.currentUser?.uid;

  const fetchNearbyHospitals = async (lat, lng, radius) => {
    try {
      const response = await fetch(`${LOC_API_URL}?lat=${lat}&lng=${lng}&radius=${radius}`);
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      const enhancedHospitals = data.map((hospital) => ({
        ...hospital,
        rating: (Math.random() * 4 + 1).toFixed(1),
        reviews: Math.floor(Math.random() * 500 + 1),
      }));
      setHospitals(enhancedHospitals);

      // Save to Firebase if the conditions are met
      const lastSaved = JSON.parse(localStorage.getItem("lastSaved")) || {};
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - lastSaved.timestamp > 30 * 60 * 1000; // 30 minutes

      if (userId && (timeElapsed || lastSaved.radius !== radius)) {
        const userRef = doc(db, "data", userId); // Document path: data > userId
        await setDoc(userRef, {
          hospitals: enhancedHospitals,
          location: { lat, lng },
          radius,
          timestamp: Timestamp.fromMillis(currentTime),
        });
        localStorage.setItem("lastSaved", JSON.stringify({ timestamp: currentTime, radius }));
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error.message);
      toast.error("Unable to fetch nearby hospitals. Please try again later.");
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
      toast.error("Invalid coordinates. Please try again.");
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
      <div className="flex flex-col items-center justify-center h-screen bg-teal-50 p-4">
        <h2 className="text-xl font-semibold text-teal-700 mb-4">Could not fetch your location. Please enter it manually:</h2>
        <button
          onClick={updateLocationManually}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300"
        >
          Enter Location Manually
        </button>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-teal-50 p-4">
        <h2 className="text-xl font-semibold text-teal-700 mb-4">Loading location...</h2>
      </div>
    );
  }

  return (
<div className="bg-gray-50 mt-12 min-h-screen">
  {/* Hero Section */}
  <section className="relative pt-24 pb-16 bg-gray-50 text-center">
    <div className=" bg-gray-50 -m-0 container mx-auto px-6">
      <h2 className="text-3xl font-bold text-[#14737e] mb-6">
        Your Location: {location.lat}, {location.lng}
      </h2>
      <div className="bg-white rounded-lg shadow-md px-8 py-6 max-w-lg mx-auto">
  <label className="block text-lg font-medium text-gray-700 mb-4">
    Search Radius (meters):
  </label>
  <div className="flex items-center space-x-4">
    <input
      type="number"
      value={radius}
      onChange={(e) => setRadius(parseInt(e.target.value, 10))}
      className="flex-1 p-3 rounded-md border border-gray-300 focus:ring-[#14737e] focus:border-[#14737e]"
    />
    <button
      onClick={() => fetchNearbyHospitals(location.lat, location.lng, radius)}
      className="px-6 py-3 bg-[#14737e] text-white rounded-lg hover:bg-[#125e55] transition duration-300 shadow-md"
    >
      Update Search
    </button>
  </div>
</div>
      <button
        onClick={updateLocationManually}
        className="mt-6 px-6 py-3 bg-[#14737e] text-white rounded-lg hover:bg-[#125e55] transition duration-300 shadow-md"
      >
        Update Latitude/Longitude
      </button>
    </div>
  </section>

  {/* Map and Hospitals List */}
  <section className="py-12">
    <div className="container mx-auto px-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                <p>Rating: ⭐ {hospital.rating} ({hospital.reviews} reviews)</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <h3 className="text-3xl font-bold text-[#14737e] mt-12 mb-6">Nearby Hospitals:</h3>
      {filteredHospitals.length > 0 ? (
        <ul className="space-y-6">
          {filteredHospitals.map((hospital, index) => (
            <li
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <strong className="block text-lg font-bold text-[#14737e] mb-2">
                {hospital.tags?.name || "Unnamed Hospital"}
              </strong>
              <p className="text-gray-700 mb-2">
                Address: {hospital.tags?.["addr:full"] || "Not Available"}
              </p>
              <p className="text-gray-700 mb-2">
                Rating: ⭐ {hospital.rating} ({hospital.reviews} reviews)
              </p>
              <p className="text-gray-700 mb-2">
                Latitude: {hospital.lat}, Longitude: {hospital.lon}
              </p>
              <p className="text-gray-700">
                Postal Code: {hospital.tags?.["addr:postcode"] || "Not Available"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-red-700 text-lg font-medium">
          No hospitals found matching the search query.
        </p>
      )}
    </div>
  </section>
</div>

  );
};

export default LocationTracker;
