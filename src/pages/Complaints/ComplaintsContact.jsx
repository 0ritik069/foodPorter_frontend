import React from "react";
import "./ComplaintsContact.css"
import { FaExclamationCircle, FaEnvelope } from "react-icons/fa";

const data = [
  {
    id: 1,
    type: "Complaint",
    name: "Ravi Kumar",
    email: "ravi@example.com",
    message: "Food was cold and delayed.",
    date: "2025-05-18",
    status: "Pending",
  },
  {
    id: 2,
    type: "Contact",
    name: "Sonia Singh",
    email: "sonia@example.com",
    message: "Need help with account setup.",
    date: "2025-05-17",
    status: "Resolved",
  },
  {
    id: 3,
    type: "Complaint",
    name: "Ajay Mehra",
    email: "ajay@example.com",
    message: "App is crashing while placing orders.",
    date: "2025-05-16",
    status: "Pending",
  },
];

const ComplaintsContact = () => {
  return (
    <div className="complaints-page">
      <h2 style={{textAlign:"left"}}>Complaints & <span>Contact</span> </h2>
                                                            
      <div className="complaints-table">
        <div className="table-header">
          <span>Type</span>
          <span>Name</span>
          <span>Email</span>
          <span>Message</span>
          <span>Date</span>
          <span>Status</span>
        </div>

        {data.map((item) => (
          <div key={item.id} className="table-row">
            <span className="icon-cell">
              {item.type === "Complaint" ? (
                <FaExclamationCircle className="icon red" />
              ) : (
                <FaEnvelope className="icon blue" />
              )}
              {item.type}
            </span>
            <span>{item.name}</span>
            <span>{item.email}</span>
            <span>{item.message}</span>
            <span>{item.date}</span>
            <span
              className={`status ${
                item.status === "Pending" ? "pending" : "resolved"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintsContact;
