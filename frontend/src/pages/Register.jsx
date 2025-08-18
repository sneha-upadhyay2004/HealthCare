// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "", username: "", age: "", gender: "", phone: "", email: "", password: "", role: "user",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await register(formData);
//       navigate("/login");
//     } catch {
//       alert("Registration failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="name" placeholder="Name" onChange={handleChange} required />
//       <input name="username" placeholder="Username" onChange={handleChange} required />
//       <input name="age" placeholder="Age" onChange={handleChange} required />
//       <input name="gender" placeholder="Gender" onChange={handleChange} required />
//       <input name="phone" placeholder="Phone" onChange={handleChange} required />
//       <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
//       <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
//       <select name="role" value={formData.role} onChange={handleChange}>
//         <option value="user">User</option>
//         <option value="hospital">Hospital</option>
//       </select>
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default Register;

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
    <div className="flex min-h-screen bg-white">
      {/* Left Section */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-50 to-blue-100 items-center justify-center">
        <div className="max-w-md text-center px-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png"
            alt="Register Illustration"
            className="w-60 mx-auto mb-6"
          />
          <h2 className="text-3xl font-bold text-blue-700">Join HealthCare SOS</h2>
          <p className="text-gray-600 mt-3">
            Register now to send and receive emergency alerts instantly.
          </p>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-5"
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">Create your account</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="inputZ" name="name" placeholder="Full Name" onChange={handleChange} required />
            <input className="inputZ" name="username" placeholder="Username" onChange={handleChange} required />
            <input className="inputZ" name="age" placeholder="Age" onChange={handleChange} required />
            <input className="inputZ" name="gender" placeholder="Gender" onChange={handleChange} required />
          </div>

          <input className="inputZ" name="phone" placeholder="Phone Number" onChange={handleChange} required />
          <input className="inputZ" name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input className="inputZ" name="password" type="password" placeholder="Password" onChange={handleChange} required />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="inputZ"
          >
            <option value="user">User</option>
            <option value="hospital">Hospital</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

const inputZ =
  "w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-gray-50";
export default Register;
