import React, { useEffect, useState } from "react";
import axios from "axios";

const AllEmergencies = () => {
  const [emergencies, setEmergencies] = useState([]);

  const fetchEmergencies = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://healthcare-backened.onrender.com/api/v1/emergency/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmergencies(res.data.emergencies);
    } catch (error) {
      console.error("Error fetching emergencies:", error);
    }
  };

  useEffect(() => {
    fetchEmergencies();
  }, []);

  const handleHelp = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`https://healthcare-backened.onrender.com/api/v1/emergency/help/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("You are now helping this emergency.");
      fetchEmergencies(); // Refresh list
    } catch (error) {
      console.error("Error sending help:", error);
      alert(error.response?.data?.message || "Error while helping.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>All Emergencies</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {emergencies.map((emergency) => (
          <div
            key={emergency._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "1rem",
              width: "300px",
            }}
          >
            {emergency.for === "self" ? (
              <>
                <h3>🚨 Emergency For: Self</h3>
                <p><strong>Name:</strong> {emergency.user?.name}</p>
                <p><strong>Age:</strong> {emergency.user?.age}</p>
                <p><strong>Gender:</strong> {emergency.user?.gender}</p>
                <p><strong>Phone:</strong> {emergency.user?.phone}</p> 

                 
                <p><strong>Address:</strong> {emergency.location?.address || "Not available"}</p>
                {/* <p><strong>Coordinates:</strong> Lat: {emergency.location?.lat}, Lng: {emergency.location?.lng}</p> */}
              </>
            ) : (
              <>
                <h3>🚨 Emergency For: Others</h3>
                {emergency.image && (
                  <img
                    src={emergency.image.url}
                    alt="Emergency"
                    style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
                  />
                )}
                <p><strong>Gender:</strong> {emergency.gender}</p>
                <p><strong>Address:</strong> {emergency.location?.address || "Not available"}</p>
                {/* <p><strong>Coordinates:</strong> Lat: {emergency.location?.lat}, Lng: {emergency.location?.lng}</p> */}
              </>
            )}

            {/* {emergency.helpedBy ? (
              <p style={{ color: "green", fontWeight: "bold" }}>
                 Helped By: {emergency.helpedBy?.id?.name}
               
              </p>
            ) : (
              <button onClick={() => handleHelp(emergency._id)} style={{ marginTop: "10px" }}>
                Help
              </button>
            )} */}
                {emergency.helpedBy ? (
  <div style={{ color: "green", fontWeight: "bold" }}>
    ✅ Helped By: {emergency.helpedBy?.id?.name}
    ✅ Helped By: {emergency.helpedBy?.id?.phone}
    {emergency.hospitalDetails && (
      <>
        <p><strong>Hospital Name:</strong> {emergency.hospitalDetails.name}</p>
        <p><strong>Hospital Phone:</strong> {emergency.hospitalDetails.phone}</p>
      </>
    )}
  </div>
) : (
  <button onClick={() => handleHelp(emergency._id)} style={{ marginTop: "10px" }}>
    Help
  </button>
)}


          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEmergencies;
