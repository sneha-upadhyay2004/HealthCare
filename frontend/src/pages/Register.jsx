import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", username: "", age: "", gender: "", phone: "", email: "", password: "", role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="age" placeholder="Age" onChange={handleChange} required />
      <input name="gender" placeholder="Gender" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="hospital">Hospital</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;



