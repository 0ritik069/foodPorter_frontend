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

  const forgotPassword = () => {
    navigate("/forgot-password");
  };

  const forgotPass = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitData = (e) => {
    console.log(state);
    e.preventDefault();
    console.log(state.email);
    if (state.email == "") {
      setForgotErr(true);
    } else {
      setForgotErr(false);

      axios
        .post(`${baseUrl}forgotPassword`, {
          email: state.email,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            const forgotToken = response.data.token;
            localStorage.setItem("token", forgotToken);
            Swal.fire(
              "Check your email a password reset email was sent!",
              "You clicked the button!",
              "success"
            );
            navigate("/otp-verify");
          }
        })
        .catch((error) => {
          console.log(error);
          setError({
            errors: error,
            isError: true,
          });
          // handdale error in proper way
        });
    }
  };
  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-center mb-6">
            <img src={image} alt="Logo" className="mx-auto mb-3 w-24" />
            <h5 className="text-2xl font-bold text-gray-800">
              Forgot Password ?
            </h5>
            <p className="text-md font-bold text-gray-400">
              Enter your email to recover your password
            </p>
          </div>
          <span className="text-red-600 block text-center mb-2">
            {error.isError ? error.errors.response?.data?.msg : " "}
          </span>
          <form onSubmit={submitData}>
            <div className="mb-4">
              <span className="text-red-600 text-sm">
                {forgotErr ? "Please enter your Email address!" : " "}
              </span>
              <TextField
                fullWidth
                classNameName="mb-1 mt-3 w-100"
                label="Email"
                name="email"
                type="text"
                autoComplete="off"
                onChange={forgotPass}
                value={state.email}
                size="normal"
              />
              <span className="text-red-600 text-sm">
                {error.isError ? error.errors?.response?.data?.msg : " "}
              </span>
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
    </>
  );
}

export default Forgotpassword;
