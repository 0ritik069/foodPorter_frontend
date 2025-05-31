import React, { useState } from "react";
import "./AdminAccess.css";
import { Typography } from "@mui/material";
const AdminAccess = () => {
  const [admins, setAdmins] = useState([
    { id: 1, name: "Ravi Kumar", email: "ravi@foodporter.com", role: "Manager" },
    { id: 2, name: "Neha Sharma", email: "neha@foodporter.com", role: "Support" },
  ]);

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    role: "Support",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    const newId = admins.length + 1;
    setAdmins([...admins, { id: newId, ...newAdmin }]);
    setNewAdmin({ name: "", email: "", role: "Support" });
    alert("Admin added successfully");
  };

  const handleDelete = (id) => {
    const updated = admins.filter((admin) => admin.id !== id);
    setAdmins(updated);
  };


  return (
    <div className="admin-access-container">
      {/* <h2 >Manage Admin <span >Access</span> </h2>
       */}
       
<Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }} component="h2">
  Manage Admin Access
</Typography>

      <form className="admin-form" onSubmit={handleAddAdmin}>
        <h3>Add New Admin</h3>
        <div className="form-row">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={newAdmin.name}
            onChange={handleChange}
            required
            style={{minWidth:"100%"}}
          />
    
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newAdmin.email}
            onChange={handleChange}
            required
            style={{minWidth:"100%"}}
          />
          <select name="role" value={newAdmin.role} onChange={handleChange}>
            <option value="Support">Support</option>
            <option value="Manager">Manager</option>
            <option value="Editor">Editor</option>
          </select>
          <button type="submit" className="add-btn">Add</button>
        </div>
      </form>

      <h3>Current Admins</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={admin.id}>
                 
              <td>{index + 1}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.role}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(admin.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAccess;
