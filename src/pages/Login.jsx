import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/logo2.jpeg";
import bg from "../assets/home.jpg";


const getDashboardPath = (role) =>
  role === "admin" ? "/admin" : "/restaurant";

function Login() {
  const navigate = useNavigate();

  /* local state */
  const [role, setRole]       = useState("admin");   
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  /* submit */
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password)
      return Swal.fire("Error", "Enter email + password", "error");

    try {
      setLoading(true);

      /* dynamic endpoint */
      const url = `/api/auth/login/${role}`;
      const { data } = await axios.post(
        url,
        { email, password },
        { withCredentials: true }
      );

      const { token, user } = data;
      const { id, name, email: uEmail, role: dbRole } = user;

      /* localStorage */
      localStorage.setItem("id", id);
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("email", uEmail);
      localStorage.setItem("role", dbRole);

      Swal.fire("Success", "Logged in!", "success");
      navigate(getDashboardPath(dbRole));
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Login failed";
      setError(msg);
      Swal.fire("Login Failed", msg, "error");
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
          <h4 className="text-2xl font-bold text-gray-800">Login</h4>
        </div>

        <form onSubmit={handleLogin}>
          {/* Role selector */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="restaurant">Restaurant Owner</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />

          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>

        <p
          className="text-center mt-4 text-sm text-blue-600 hover:underline cursor-pointer"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot password?
        </p>
      </div>
    </div>
  );
}

export default Login;
