import React, { useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo2.jpeg";
import bg from "../assets/home.jpg";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    countryCode: "+91",
    phone: "",
    address: "",
    restaurantName: "",
    image: null,
    role: "restaurant",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      countryCode,
      address,
      restaurantName,
      image
    } = formData;

    if (!firstName || !lastName || !email || !password || !phone || !countryCode || !address || !restaurantName || !image) {
      Swal.fire("Error", "Please fill in all fields including image", "error");
      return;
    }

    try {
      setLoading(true);
      const url = "http://192.168.1.12:5000/api/auth/signup/restaurant";

      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      const response = await axios.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      Swal.fire("Success", "Account created successfully", "success");
      navigate("/admin");
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Signup failed";
      setError(msg);
      Swal.fire("Signup Failed", msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <img src={logo} alt="Logo" className="mx-auto mb-3 w-24" />
          <h4 className="text-2xl font-bold text-gray-800">Sign Up</h4>
        </div>

        <form onSubmit={handleSignup} encType="multipart/form-data">
          <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Country Code" name="countryCode" value={formData.countryCode} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} sx={{ mb: 2 }} />
          <TextField fullWidth label="Restaurant Name" name="restaurantName" value={formData.restaurantName} onChange={handleChange} sx={{ mb: 2 }} />

         
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mb-4 w-full"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing up…" : "Create Account"}
          </button>
        </form>

        <p
          className="text-center mt-4 text-sm text-blue-600 hover:underline cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

export default Signup;
