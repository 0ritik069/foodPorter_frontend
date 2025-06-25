import React, { useState } from "react";
import "./Login";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../features/Api/BaseUrl";
import image from "../assets/logo2.jpeg";
import bgImage from "../assets/home.jpg";

const defaultState = {
  email: "",
};

function Forgotpassword() {
  const [state, setState] = useState(defaultState);
  const [emailErr, setEmailErr] = useState("");
  const [forgotErr, setForgotErr] = useState(false);
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const navigate = useNavigate();

  const forgotPass = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitData = async (e) => {
    e.preventDefault();
    if (state.email.trim() === "") {
      setForgotErr(true);
      return;
    }

    setForgotErr(false);

    try {
      const response = await axios.post(`http://192.168.1.82:5000/api/auth/forgot-password`, {
        email: state.email,
      });

      if (response.data.success) {
        const forgotToken = response.data.token;
        localStorage.setItem("token", forgotToken);
        Swal.fire(
          "Check your email!",
          "A password reset email was sent!",
          "success"
        );
        navigate("/otp-verify");
      }
    } catch (error) {
      setError({
        errors: error,
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
          <h5 className="text-2xl font-bold text-gray-800">Forgot Password?</h5>
          <p className="text-md font-bold text-gray-400">
            Enter your email to recover your password
          </p>
        </div>

        <span className="text-red-600 block text-center mb-2">
          {error.isError ? error.errors.response?.data?.msg : ""}
        </span>

        <form onSubmit={submitData}>
          <div className="mb-4">
            <span className="text-red-600 text-sm">
              {forgotErr ? "Please enter your Email address!" : ""}
            </span>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              autoComplete="off"
              onChange={forgotPass}
              value={state.email}
            />
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-md inline-flex items-center gap-1"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Forgotpassword;
