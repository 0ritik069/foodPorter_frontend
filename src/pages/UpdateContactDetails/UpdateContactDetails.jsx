import React, { useState } from "react";
import "./UpdateContactDetails.css";

const UpdateContactDetails = () => {
  const [contact, setContact] = useState({
    phone: "",
    email: "",
    address: "",
    facebook: "",
    instagram: "",
    twitter: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send to API here
    console.log("Updated Contact Details:", contact);
    alert("Contact details updated successfully!");
  };

  return (
    <div className="update-contact-container">
      <h2 className="page-title">Update Contact <span className="page-title2">Details</span> </h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            placeholder="+91 1234567890"
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            placeholder="support@foodporter.com"
          />
        </div>

        <div className="form-group">
          <label>Business Address</label>
          <textarea
            name="address"
            value={contact.address}
            onChange={handleChange}
            rows={3}
            placeholder="123 Street Name, City, State, ZIP"
          />
        </div>

        <div className="form-group">
          <label>Facebook URL</label>
          <input
            type="text"
            name="facebook"
            value={contact.facebook}
            onChange={handleChange}
            placeholder="https://facebook.com/yourpage"
          />
        </div>

        <div className="form-group">
          <label>Instagram URL</label>
          <input
            type="text"
            name="instagram"
            value={contact.instagram}
            onChange={handleChange}
            placeholder="https://instagram.com/yourpage"
          />
        </div>

        <div className="form-group">
          <label>Twitter URL</label>
          <input
            type="text"
            name="twitter"
            value={contact.twitter}
            onChange={handleChange}
            placeholder="https://twitter.com/yourpage"
          />
        </div>

        <button type="submit" className="submit-btn">Update</button>
      </form>
    </div>
  );
};

export default UpdateContactDetails;
