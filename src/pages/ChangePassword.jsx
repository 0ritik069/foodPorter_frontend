import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../features/Api/BaseUrl";

import { useNavigate } from "react-router-dom";

const defaultState = {
  oldPassword: "",
  newpassword: "",
  confirmpassword: "",
};

const ChangePassword = (props) => {
  const adminId = localStorage.getItem("id");
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  const navigate = useNavigate();
  const [state, setState] = useState(defaultState);
  const submitData = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitFormData = () => {
    console.log(state);
    axios
      .post(`${baseUrl}admin/changePassword`, {
        id: adminId,
        oldpassword: state.oldPassword,
        newpassword: state.newpassword,
        confirmpassword: state.confirmpassword,
      })
      .then((response) => {
        console.log(response.data.success);

        if (response.data.success) {
          Swal.fire(
            "Password  update  successfully!",
            "You clicked the button!",
            "success"
          );
        }
        // if (response.data.success) {
        //   Swal.fire(
        //     "Password  update  successfully!",
        //     "You clicked the button!",
        //     "success"
        //   );
        //   navigate("/admin");
        // }
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
      <div className="container " style={{ backgroundColor: "#fff" }}>
        <div className="row m-0 ">
          <div className="col-12 my-3">
            <h4 className="text-center"> Change password</h4>
          </div>
          <div className="col-12 my-3">
            <TextField
              fullWidth
              variant="outlined"
              size="large"
              label={"oldPassword "}
              name="oldPassword"
              onChange={submitData}
              value={state.oldPassword}
            />
            <span style={{ color: "red" }}>
              {error.isError ? error.errors.response.data.message : " "}
            </span>
          </div>
          <div className="col-12 my-3">
            <TextField
              fullWidth
              variant="outlined"
              size="large"
              label={"newpassword "}
              name="newpassword"
              onChange={submitData}
              value={state.newpassword}
            />
            <span style={{ color: "red" }}>
              {error.isError ? error.errors.response.data.errmsg : " "}
            </span>
          </div>
          <div className="col-12 my-3">
            <TextField
              fullWidth
              variant="outlined"
              size="large"
              label={"confirmpassword "}
              name="confirmpassword"
              onChange={submitData}
              value={state.confirmpassword}
            />
            <span style={{ color: "red" }}>
              {error.isError ? error.errors.response.data.msg : " "}
            </span>
          </div>
          <div className="col-12 my-3 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary  "
              onClick={submitFormData}
            >
              Submit <ArrowRightAltIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
