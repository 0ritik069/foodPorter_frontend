import React, { useState } from "react";
import "./Login";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import image from "../assets/logo2.jpeg";
import bgImage from "../assets/home.jpg";

import { baseUrl } from "../features/Api/BaseUrl";

const defaultState = {
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
  const ResetPassword = (event) => {
    const { name, value } = event.target;

    console.log(name, value);

    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  // const endpoint = "reset-password";

  // Define the data you want to send in the request body
  // const postData = {
  //   newPassword: state.email,
  //   confirmPassword: state.password,
  // };
  // var token = localStorage.getItem("token");
  // Define additional parameters to include in the URL
  // const params = {
  //   token: token,
  // };

  // Create the complete URL with query parameters
  // const url = `${baseUrl}${endpoint}?${new URLSearchParams(params).toString()}`;

  // Make the POST request
  // axios
  //   .post(url, postData)
  //   .then((response) => {
  //     // Handle the response here
  //     console.log(response.data);
  //   })
  //   .catch((error) => {
  //     // Handle errors here
  //     console.error(error);
  //   });

  // const resetData = (e) => {
  //   e.preventDefault();
  //   console.log(state);
  //   var tokenGet = localStorage.getItem("token");
  //   alert(tokenGet);
  //   const endpoint = "reset-password";

  //   const params = {
  //     token: tokenGet,
  //   };
  //   const url = `${baseUrl}${endpoint}?${new URLSearchParams(
  //     params
  //   ).toString()}`;

  //   axios
  //     .post(url, {
  //       newPassword: state?.email,
  //       confirmPassword: state?.password,
  //     })
  //     .then((response) => {
  //       // Access the response payload data
  //      console.log(response);

  //       // Now you can use responseData as needed
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setError({
  //         errors: error,
  //         isError: true,
  //       });
  //     });
  // };
  const resetData = (e) => {
    e.preventDefault();

    // Get the input field values from your component's state
    const newPasswordValue = state.newPassword; // Replace with the actual state variable
    const confirmPasswordValue = state.confirmPassword; // Replace with the actual state variable

    var tokenGet = localStorage.getItem("token");

    const endpoint = "reset-password";

    const params = {
      token: tokenGet,
    };

    const url = `${baseUrl}${endpoint}?${new URLSearchParams(params)}`;

    // Create an object to hold the data for the request body
    const requestBody = {
      newPassword: newPasswordValue,
      confirmPassword: confirmPasswordValue,
    };

    axios
      .post(url, requestBody) // This sends the data in the requestBody object as the request body
      .then((response) => {
        if (response.data.success) {
          Swal.fire(
            "Password Reset Successfully!",
            "You clicked the button!",
            "success"
          );
          navigate("/");
        }
        // Access the response payload data
        console.log(response);

        // Now you can use responseData as needed
      })
      .catch((error) => {
        console.log(error);
        setError({
          errors: error,
          isError: true,
        });
      });
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
            <h4 className="text-2xl font-bold text-gray-800">Reset Password</h4>
          </div>
          <span className="text-red-600 block text-center mb-2">
            {error.isError ? error.errors.response?.data?.msg : " "}
          </span>
          <form onSubmit={resetData}>
            <div className="mb-4">
              <TextField
                fullWidth
                classNameName="mb-1 mt-3 w-100"
                type="text"
                label="New Password"
                name="newPassword"
                onChange={ResetPassword}
                value={state.newPassword}
              />
              <span className="text-red-600 text-sm">
                {error.isError
                  ? error?.errors?.response?.data?.errors[0].msg
                  : " "}
              </span>
            </div>
            <div className="mb-4">
              <TextField
                fullWidth
                classNameName="mb-1 mt-3 w-100"
                type="text"
                label="Confirm Password"
                name="confirmPassword"
                onChange={ResetPassword}
                value={state.confirmPassword}
                size="normal"
              />
              <span className="text-red-600 text-sm">
                {error.isError ? error.errors.response.data?.msg : " "}
              </span>
            </div>
            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-md inline-flex items-center gap-1"
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
