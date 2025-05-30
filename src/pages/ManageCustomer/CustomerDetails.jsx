import React, { useEffect, useState } from "react";
import "./CustomerDetails.css";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";
import { useLocation } from "react-router-dom";
import StarsIcon from "@mui/icons-material/Stars";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";
import { baseUrl } from "../../features/Api/BaseUrl";

function CustomerDetails() {
  const [rows, setRows] = useState([]);
  const location = useLocation();

  const selectedUser = location.state?.response?.find(
    (item) => item.id === location.state?.id
  );
  const getData = selectedUser;

  useEffect(() => {
    if (!getData?.id) return;
    axios
      .post(`${baseUrl}customer/bookings`, { visitorId: getData.id })
      .then((res) => setRows(res.data.data))
      .catch((err) => console.error(err));
  }, [getData?.id]);

  const renderStatus = (status) => {
    const statusMap = {
      0: { label: "Pending", color: "#fec400" },
      1: { label: "Accepted", color: "#29cc97" },
      2: { label: "Rejected", color: "#13cae1" },
      3: { label: "Cancelled", color: "red" },
    };
    const { label, color } = statusMap[status] || { label: "Unknown", color: "grey" };
    return (
      <p className="mb-2 mr-2 badge" style={{ color: "#fff", backgroundColor: color }}>
        {label}
      </p>
    );
  };

  return (
    <>
      <div className="container emp-profile">
               
        <form method="post">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img
                  src={
                    getData?.profile
                      ? `http://suppr.me/images/${getData.profile}`
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{`${getData?.first_name || ""} ${getData?.last_name || ""}`}</h5>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home">
                      About
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-8">
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel">
                  {[
                    { label: "User Id", value: getData?.id },
                    { label: "Email", value: getData?.email },
                    { label: "Phone Number", value: getData?.mobile_no },
                    { label: "Address", value: getData?.address },
                    { label: "Join Date", value: getData?.join_date },
                  ].map((item, idx) => (
                    <div className="row" key={idx}>
                      <div className="col-md-6">
                        <label>{item.label}</label>
                      </div>
                      <div className="col-md-6">
                        <p>{item.value || "_"}</p>
                      </div>
                    </div>
                  ))}

                  <div className="row">
                    <div className="col-md-6">
                      <label>Document</label>
                    </div>
                    <div className="col-md-6 mb-2">
                      {getData?.Identify_document ? (
                        <a
                          href={`http://suppr.me/identification/${getData.Identify_document}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <PictureAsPdfIcon />
                        </a>
                      ) : (
                        "_"
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Rating</label>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <StarsIcon className="rating_icon_style" />
                        {getData?.ratings || "_"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Booking History */}
      <div>
        <h6 className="mt-4 mb-2">Booking History</h6>
        <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
          <Divider />
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {["Host Name", "Booking Number", "Guests", "Amount", "Date", "Status"].map(
                    (col, i) => (
                      <TableCell key={i} align="left" style={{ minWidth: "100px" }}>
                        {col}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.length > 0 ? (
                  rows.map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell align="left">{row.host_name}</TableCell>
                      <TableCell align="left">{row.booking_id}</TableCell>
                      <TableCell align="center">{row.no_of_guests}</TableCell>
                      <TableCell align="left">{row.price}</TableCell>
                      <TableCell align="left">{row.booking_date}</TableCell>
                      <TableCell align="left">{renderStatus(row.status)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No bookings found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );
}

export default CustomerDetails;
