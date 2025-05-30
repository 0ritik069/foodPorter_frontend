import React, { useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { baseUrl } from "../features/Api/BaseUrl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import image from "../assets/logo2.jpeg";
import bgImage from "../assets/home.jpg";

function OtpVerification() {
  const [otp, setOtp] = useState("");

  const [forgotErr, setForgotErr] = useState(false);

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const navigate = useNavigate();

  const submitData = (e) => {
    console.log(otp);
    e.preventDefault();
    if (otp === "") {
      setForgotErr(true);
    } else {
      setForgotErr(false);

      axios
        .post(`${baseUrl}AdminverifyOTP`, {
          otp: otp,
        })
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            console.log(response.data.AdminId);
            const userId = response.data.AdminId;
            localStorage.setItem("adminid", userId);
            localStorage.setItem("userId", userId);
            Swal.fire(
              "Verify OTP Successfully",
              "You clicked the button!",
              "success"
            );
            navigate("/reset-password");
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
  const handlekey = (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
      e.preventDefault();
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
            <h4 className="text-2xl font-bold text-gray-800">Verify Otp</h4>
          </div>
          <span className="text-red-600 block text-center mb-2">
            {error.isError ? error.errors.response?.data?.msg : " "}
          </span>
          <form onSubmit={submitData}>
            <div className="mb-4">
              <span className="text-red-600 text-sm">
                {forgotErr ? "Please enter your Otp!" : " "}
              </span>
              <div className="d-flex text-center justify-center">
                <OtpInput
                  inputStyle={{
                    width: "3rem",
                    height: "3rem",
                    fontSize: "1rem",
                    borderRadius: 4,
                    border: "2px solid rgba(0,0,0,0.3)",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  onKeyPress={handlekey}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <span className="text-red-600 text-sm">
                {error.isError ? error.errors?.response?.data?.message : " "}
              </span>
            </div>
            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-md inline-flex items-center gap-1"
              >
                Verify Otp
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default OtpVerification;
