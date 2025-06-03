import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Box,
  TablePagination,
  CircularProgress,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Swal from "sweetalert2";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const ManageCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://192.168.1.80:5000/api/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      Swal.fire("Error", "Failed to fetch customer data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleView = async (id) => {
    try {
      const res = await axios.get(`http://192.168.1.80:5000/api/customers/${id}`);
      const customer = res.data;
      Swal.fire({
        title: "Customer Details",
        html: `
          <strong>Name:</strong> ${customer.name}<br/>
          <strong>Email:</strong> ${customer.email}<br/>
          <strong>Phone:</strong> ${customer.phone}<br/>
          <strong>Status:</strong> ${customer.status}<br/>
          <strong>Date:</strong> ${customer.date}
        `,
        icon: "info",
      });
    } catch (error) {
      console.error("Error viewing customer:", error);
      Swal.fire("Error", "Failed to fetch customer details", "error");
    }
  };

  const handleEdit = (id) => {
    Swal.fire("Edit", `Edit form for Customer ID: ${id}`, "info");
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the customer permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://192.168.1.80:5000/api/customers/${id}`);
        Swal.fire("Deleted!", "Customer has been deleted.", "success");
        fetchCustomers();
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error", "Failed to delete customer", "error");
      }
    }
  };

  const handleAddCustomer = async () => {
    const { name, email, password, phone } = newCustomer;

    if (!name || !email || !password || !phone) {
      Swal.fire("Error", "Please fill all fields", "warning");
      return;
    }

    try {
      await axios.post("http://192.168.1.80:5000/api/customers", newCustomer);
      Swal.fire("Success", "Customer added successfully", "success");
      setOpenAddDialog(false);
      setNewCustomer({ name: "", email: "", password: "", phone: "" });
      fetchCustomers();
    } catch (error) {
      console.error("Add error:", error);
      Swal.fire("Error", "Failed to add customer", "error");
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={3}>
      {/* Header and Action Bar */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Manage Customers
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
          <TextField
            label="Search by Name"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{
              fontWeight: 600,
              textTransform: "none",
              backgroundColor: "#facc15",
              color: "#000",
              "&:hover": {
                backgroundColor: "#eab308",
              },
            }}
            onClick={() => setOpenAddDialog(true)}
          >
            + Add Customer
          </Button>
        </Box>
      </Box>

      {/* Loader */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Sr.No.</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Address</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((customer, index) => (
                    <TableRow hover key={customer.id}>
                      <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.address}</TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton
                            size="small"
                            sx={{ color: "#2563eb", border: "1px solid #2563eb", p: "4px" }}
                            onClick={() => handleView(customer.id)}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{ color: "#f59e0b", border: "1px solid #f59e0b", p: "4px" }}
                            onClick={() => handleEdit(customer.id)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{ color: "red", border: "1px solid red", p: "4px" }}
                            onClick={() => handleDelete(customer.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filteredCustomers.length}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[]}
            sx={{ px: 2 }}
          />
        </Paper>
      )}

      {/* Add Customer Modal */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} fullWidth>
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
          />
          <TextField
            label="Email"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            value={newCustomer.password}
            onChange={(e) => setNewCustomer({ ...newCustomer, password: e.target.value })}
          />
          <TextField
            label="Phone"
            value={newCustomer.phone}
            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddCustomer}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageCustomer;
