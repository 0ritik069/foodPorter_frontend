import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import image from "../assets/logo2.jpeg";
import bgImage from "../assets/home.jpg";

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [forgotErr, setForgotErr] = useState(false);
  const [error, setError] = useState({ errors: {}, isError: false });

  const navigate = useNavigate();

  const submitData = async (e) => {
    e.preventDefault();

    if (otp.trim() === "") {
      setForgotErr(true);
      return;
    }

    setForgotErr(false);

    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `http://192.168.1.82:5000/api/auth/verify-otp`,
        { email, otp: Number(otp) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        Swal.fire("OTP Verified!", "Redirecting to reset password", "success");
        navigate("/reset-password");
      }
    } catch (error) {
      setError({ errors: error, isError: true });
    }
  };

  const handleKey = (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
      e.preventDefault();
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <img src={image} alt="Logo" className="mx-auto mb-3 w-24" />
          <h2 className="text-2xl font-bold text-gray-800">OTP Verification</h2>
          <p className="text-sm text-gray-500">Enter the 6-digit code sent to your email</p>
        </div>

        {error.isError && (
          <p className="text-red-600 text-center text-sm mb-2">
            {error.errors.response?.data?.msg ||
             error.errors.response?.data?.message ||
             "Something went wrong"}
          </p>
        )}

        {forgotErr && (
          <p className="text-red-600 text-center text-sm mb-2">
            Please enter your OTP!
          </p>
        )}

        <form onSubmit={submitData}>
          <div className="flex justify-center mb-6">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              onKeyPress={handleKey}
              inputType="tel"
              inputStyle={{
                width: "3rem",
                height: "3rem",
                margin: "0 0.25rem",
                fontSize: "1.5rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                textAlign: "center",
              }}
              renderSeparator={<span></span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-md text-sm font-medium"
            >
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OtpVerification;
