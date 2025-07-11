import React, { useState, useEffect } from "react";
import "./AdminAccess.css";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import axios from "axios";
import {baseUrl} from "../../features/Api/BaseUrl"; 

// const baseUrl = "http://localhost:5000/api/admins";

const AdminAccess = () => {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    role: "Support",
  });

  const [editAdmin, setEditAdmin] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(baseUrl);
      if (res.data.success) setAdmins(res.data.data);
    } catch (err) {
      console.error("Error fetching admins:", err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(baseUrl, newAdmin);
      if (res.data.success) {
        alert("Admin added successfully");
        setNewAdmin({ name: "", email: "", role: "Support" });
        fetchAdmins();
      }
    } catch (err) {
      alert("Error adding admin");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this admin?");
    if (!confirm) return;
    try {
      const res = await axios.delete(`${baseUrl}/${id}`);
      if (res.data.success) {
        alert("Admin deleted");
        fetchAdmins();
      }
    } catch (err) {
      alert("Error deleting admin");
    }
  };

  const openEditDialog = (admin) => {
    setEditAdmin(admin);
    setEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    try {
      const res = await axios.put(`${baseUrl}/${editAdmin.id}`, {
        email: editAdmin.email,
        role: editAdmin.role,
      });
      if (res.data.success) {
        alert("Admin updated");
        fetchAdmins();
        setEditDialogOpen(false);
      }
    } catch (err) {
      alert("Error updating admin");
    }
  };

  const openPasswordDialog = (admin) => {
    setEditAdmin(admin);
    setNewPassword("");
    setPasswordDialogOpen(true);
  };

  const handlePasswordUpdate = async () => {
    try {
      const res = await axios.put(`${baseUrl}/${editAdmin.id}/password`, {
        newPassword,
      });
      if (res.data.success) {
        alert("Password updated");
        setPasswordDialogOpen(false);
      }
    } catch (err) {
      alert("Error updating password");
    }
  };

  return (
    <div className="admin-access-container">
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Manage Admin Access
      </Typography>

      <form className="admin-form" onSubmit={handleAddAdmin}>
        <h3>Add New Admin</h3>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            name="name"
            label="Full Name"
            value={newAdmin.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            name="email"
            label="Email"
            value={newAdmin.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={newAdmin.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="Support">Support</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Editor">Editor</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" type="submit">
            Add Admin
          </Button>
        </Box>
      </form>

      <h3>Current Admins</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
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
                <Button size="small" onClick={() => openEditDialog(admin)}>
                  Edit
                </Button>
                <Button size="small" onClick={() => openPasswordDialog(admin)}>
                  Change Password
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(admin.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Admin</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={editAdmin?.email || ""}
            onChange={handleEditChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={editAdmin?.role || ""}
              onChange={handleEditChange}
              label="Role"
            >
              <MenuItem value="Support">Support</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Editor">Editor</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🔐 Change Password Dialog */}
      <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handlePasswordUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminAccess;
