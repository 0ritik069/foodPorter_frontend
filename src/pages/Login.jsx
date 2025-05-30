import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import image from "../assets/logo2.jpeg";
import bgImage from "../assets/home.jpg";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../slices/login/adminSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error } = useSelector((state) => state.admin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire("Error", "Please enter both email and password", "error");
      return;
    }

    const credentials = { email, password };

    try {
      const resultAction = await dispatch(loginAdmin(credentials));

      if (loginAdmin.fulfilled.match(resultAction)) {
        const { token, user } = resultAction.payload;
        const { id, name, email, role } = user;

        localStorage.setItem("id", id);
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);

        navigate("/admin");
      } else {
        Swal.fire(
          "Login Failed",
          resultAction.payload?.message || "Invalid credentials",
          "error"
        );
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
      Swal.fire("Error", error.message, "error");
    }
  };

  const forgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="text-center mb-6">
          <img src={image} alt="Logo" className="mx-auto mb-3 w-24" />
          <h4 className="text-2xl font-bold text-gray-800">Admin</h4>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="text"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-4">
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          {error && typeof error === "string" && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
          {error?.message && (
            <p className="text-red-600 text-sm">{error.message}</p>
          )}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-md inline-flex items-center gap-1"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <span
            className="text-sm text-blue-600 hover:underline cursor-pointer"
            onClick={forgotPassword}
          >
            Forgot password?
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
