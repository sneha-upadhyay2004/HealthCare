

import axios from "axios";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useState, useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

//  Set  Mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoiaXRzc2FyYW5oZXJlIiwiYSI6ImNsd3B3aDFybjFodTMyaXJ6cGQxeWdwYzcifQ.4HPJRlRvgTdHaXXTDQEWCg'

const SendForOthers = () => {
  const [gender, setGender] = useState("male");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState({ coordinates: [], address: "" });

  const geocoderRef = useRef(null);

  const handleLocationSelect = (lng, lat, address) => {
    setLocation({ coordinates: [lng, lat], address });

    // Optional: Update Mapbox input value too
    if (geocoderRef.current) {
      const input = geocoderRef.current.container.querySelector(".mapboxgl-ctrl-geocoder--input");
      if (input) input.value = address;
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.address) {
      alert("Please select a location");
      return;
    }

    const formData = new FormData();
    formData.append("gender", gender);
    formData.append("location", JSON.stringify(location));
    formData.append("for", "others"); // ✅ REQUIRED FIELD
    if (image) {
      formData.append("image", image);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post("https://healthcare-backened.onrender.com/api/v1/emergency/other", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Emergency sent successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to send emergency");
    }
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [77.209, 28.6139],
      zoom: 10,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: true,
      placeholder: "Search location...",
    });

    geocoderRef.current = geocoder;
    map.addControl(geocoder);

    geocoder.on("result", (e) => {
      const lng = e.result.center[0];
      const lat = e.result.center[1];
      const address = e.result.place_name;
      handleLocationSelect(lng, lat, address);
    });

    return () => map.remove();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold">Send Emergency for Others</h2>

      <label className="block">Gender:</label>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="w-full border p-2"
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <label className="block">Upload Image:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full border p-2"
      />

      <div>
        <label className="block mb-1">Selected Address:</label>
        <input
          type="text"
          value={location.address}
          placeholder="Selected address will appear here"
          readOnly
          className="w-full border p-2 mb-2 bg-gray-100"
        />
      </div>

      <div>
        <label className="block mb-1">Pick Location:</label>
        <div id="map" className="h-60 w-full border rounded" />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Emergency
      </button>
    </form>
  );
};

export default SendForOthers;
