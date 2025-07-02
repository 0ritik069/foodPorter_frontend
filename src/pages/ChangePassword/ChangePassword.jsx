import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bgImage from "../../assets/home.jpg";
import image from "../../assets/logo2.jpeg";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmNewPassword } = formData;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password should be at least 6 characters.");
      return;
    }

    try {
     
      setSuccess("Password changed successfully!");
      Swal.fire("Success", "Password changed successfully!", "success");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      setError("Failed to update password. Try again later.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-no-repeat bg-center bg-cover px-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md p-6 bg-white bg-opacity-95 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <img src={image} alt="Logo" className="mx-auto mb-3 w-24" />
          <h5 className="text-2xl font-bold text-gray-800">Change Password</h5>
          <p className="text-md font-bold text-gray-400">
            Update your account password below
          </p>
        </div>

        {error && (
          <span className="text-red-600 block text-center mb-2">{error}</span>
        )}
        {success && (
          <span className="text-green-600 block text-center mb-2">
            {success}
          </span>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <TextField
              fullWidth
              label="Current Password"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <TextField
              fullWidth
              label="New Password"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              helperText="Minimum 6 characters"
            />
          </div>

          <div className="mb-4">
            <TextField
              fullWidth
              label="Confirm New Password"
              name="confirmNewPassword"
              type="password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
            />
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-md inline-flex items-center gap-1"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
