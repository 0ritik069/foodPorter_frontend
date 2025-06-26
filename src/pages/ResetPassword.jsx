import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import image from "../assets/logo2.jpeg";
import bgImage from "../assets/home.jpg";
import { baseUrl } from "../features/Api/BaseUrl";

const defaultState = {
  email: "",
  newPassword: "",
  confirmPassword: "",
};

function ResetPassword() {
  const [state, setState] = useState(defaultState);
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetData = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}auth/change-password`, {
        email: state.email,
        newPassword: state.newPassword,
        confirmPassword: state.confirmPassword,
      });

      if (response.data.success) {
        Swal.fire("Success", "Password reset successfully", "success");
        navigate("/");
      } else {
        Swal.fire("Error", response.data?.msg || "Something went wrong", "error");
      }
    } catch (err) {
      console.log(err);
      setError({
        errors: err,
        isError: true,
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <img src={image} alt="Logo" className="mx-auto mb-3 w-24" />
          <h4 className="text-2xl font-bold text-gray-800">Reset Password</h4>
        </div>

        <span className="text-red-600 block text-center mb-2">
          {error.isError ? error.errors?.response?.data?.msg : " "}
        </span>

        <form onSubmit={resetData}>
          <div className="mb-4">
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              onChange={handleChange}
              value={state.email}
            />
          </div>

          <div className="mb-4">
            <TextField
              fullWidth
              label="New Password"
              name="newPassword"
              type="text"
              onChange={handleChange}
              value={state.newPassword}
            />
            <span className="text-red-600 text-sm">
              {error.isError
                ? error?.errors?.response?.data?.errors?.[0]?.msg
                : " "}
            </span>
          </div>

          <div className="mb-4">
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="text"
              onChange={handleChange}
              value={state.confirmPassword}
            />
            <span className="text-red-600 text-sm">
              {error.isError ? error?.errors?.response?.data?.msg : " "}
            </span>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-md inline-flex items-center gap-1"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
