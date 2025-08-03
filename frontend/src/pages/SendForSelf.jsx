

import React, { useState, useEffect, useRef, useContext } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

mapboxgl.accessToken = 'pk.eyJ1IjoiaXRzc2FyYW5oZXJlIiwiYSI6ImNsd3B3aDFybjFodTMyaXJ6cGQxeWdwYzcifQ.4HPJRlRvgTdHaXXTDQEWCg'
// mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;


const SendForSelf = () => {
  const { user, token } = useContext(AuthContext);
  const mapContainerRef = useRef(null);
  const geocoderRef = useRef(null);
  const [marker, setMarker] = useState(null);
  const [location, setLocation] = useState({
    coordinates: null,
    address: "",
  });

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [77.216721, 28.6448],
      zoom: 10,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: "Search your location",
    });

    if (geocoderRef.current) geocoderRef.current.clear();

    map.addControl(geocoder);
    geocoderRef.current = geocoder;

    geocoder.on("result", (e) => {
      const coords = e.result.geometry.coordinates;
      const address = e.result.place_name;

      setLocation({ coordinates: coords, address });

      if (marker) marker.remove();

      const newMarker = new mapboxgl.Marker().setLngLat(coords).addTo(map);
      setMarker(newMarker);

      map.flyTo({ center: coords, zoom: 14 });
    });

    return () => map.remove();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.address || !location.coordinates) {
      return alert("Please select your location first.");
    }

    try {
      await axios.post(
        "http://localhost:4000/api/v1/emergency/self",
        // { for: "self", location },
         {
    for: "self",
    name: user.name,
    email: user.email,
    phone: user.phone,
    age: user.age,
    gender: user.gender,
    location,
  },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Emergency Sent!");
    } catch (err) {
      console.error("Emergency submission error:", err);
      alert("Failed to send emergency.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto shadow-lg rounded-lg bg-white mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Send SOS For Self</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" value={user?.name} disabled className="p-2 border rounded" />
          <input type="email" value={user?.email} disabled className="p-2 border rounded" />
          <input type="text" value={user?.phone} disabled className="p-2 border rounded" />
          <input type="text" value={user?.age} disabled className="p-2 border rounded" />
          <input type="text" value={user?.gender} disabled className="p-2 border rounded" />
        </div>

        <input
          type="text"
          placeholder="Selected Address"
          value={location.address}
          disabled
          className="p-2 border rounded w-full bg-gray-100"
        />

        <div ref={mapContainerRef} className="h-80 rounded shadow" />

        <button
          type="submit"
          className="mt-4 w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
        >
          Send SOS
        </button>
      </form>
    </div>
  );
};

export default SendForSelf;
