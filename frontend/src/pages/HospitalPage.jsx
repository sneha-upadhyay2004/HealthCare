

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const HospitalPage = () => {
  const { user, token } = useContext(AuthContext);

  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");

  const fetchHospitals = async () => {
    const res = await axios.get("https://healthcare-backened.onrender.com/api/v1/hospital/all");
    setHospitals(res.data.hospitals);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://healthcare-backened.onrender.com/api/v1/hospital/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchHospitals();
      setFormData({ name: "", phone: "", address: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Error creating hospital");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://healthcare-backened.onrender.com/api/v1/hospital/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchHospitals();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting hospital");
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const filteredHospitals = hospitals.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Hospital Management</h2>

      <input
        type="text"
        placeholder="Search hospital by name or address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      {user?.role === "hospital" && (
        <form onSubmit={handleCreate} className="space-y-2 mb-6">
          <input
            type="text"
            placeholder="Hospital Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border p-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="border p-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="border p-2 w-full"
            required
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Create Hospital
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHospitals.map((h) => (
          <div key={h._id} className="border p-4 rounded shadow">
            <h3 className="font-bold text-lg">{h.name}</h3>
            <p><strong>Phone:</strong> {h.phone}</p>
            <p><strong>Address:</strong> {h.address}</p>
            {user?.role === "hospital" && user._id === h.adminUserId && (
              <button
                onClick={() => handleDelete(h._id)}
                className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalPage;
