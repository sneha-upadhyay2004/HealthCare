

// import React, { useState, useEffect } from "react";
// import mapboxgl from "mapbox-gl";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

// mapboxgl.accessToken = "pk.eyJ1IjoiaXRzc2FyYW5oZXJlIiwiYSI6ImNsd3B3aDFybjFodTMyaXJ6cGQxeWdwYzcifQ.4HPJRlRvgTdHaXXTDQEWCg"; // replace

// const MapPicker = ({ onLocationSelect }) => {
//   const [map, setMap] = useState(null);
//   const [marker, setMarker] = useState(null);

//   useEffect(() => {
//     const initMap = new mapboxgl.Map({
//       container: "map",
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [77.209, 28.6139], // Default: Delhi
//       zoom: 10,
//     });

//     const geocoder = new MapboxGeocoder({
//       accessToken: mapboxgl.accessToken,
//       mapboxgl,
//     });

//     initMap.addControl(geocoder);

//     initMap.on("click", async (e) => {
//       const lng = e.lngLat.lng;
//       const lat = e.lngLat.lat;

//       if (marker) marker.remove();

//       const newMarker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(initMap);
//       setMarker(newMarker);

//       // Reverse geocode
//       const response = await fetch(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
//       );
//       const data = await response.json();
//       const place = data.features[0]?.place_name || "Unknown location";

//       onLocationSelect({ coordinates: [lng, lat], address: place });
//     });

//     setMap(initMap);

//     return () => initMap.remove();
//   }, []);

//   return <div id="map" style={{ width: "100%", height: "300px", borderRadius: "10px" }} />;
// };

// export default MapPicker;


import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaXRzc2FyYW5oZXJlIiwiYSI6ImNsd3B3aDFybjFodTMyaXJ6cGQxeWdwYzcifQ.4HPJRlRvgTdHaXXTDQEWCg";

const MapPicker = ({ onLocationSelect }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const initMap = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [77.209, 28.6139], // Delhi
      zoom: 10,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl,
      placeholder: "Search location...",
      marker: false,
    });

    initMap.addControl(geocoder, "top-left");

    initMap.on("click", async (e) => {
      const lng = e.lngLat.lng;
      const lat = e.lngLat.lat;

      if (marker) marker.remove();

      const newMarker = new mapboxgl.Marker({ color: "#2563eb" }) // nice blue
        .setLngLat([lng, lat])
        .addTo(initMap);
      setMarker(newMarker);

      // Reverse geocode
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      const place = data.features[0]?.place_name || "Unknown location";

      onLocationSelect({ coordinates: [lng, lat], address: place });
    });

    setMap(initMap);

    return () => initMap.remove();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "350px",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <div id="map" style={{ width: "100px", height: "100px" , borderRadius: "12px" }} />
    </div>
  );
};

export default MapPicker;
