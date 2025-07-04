import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { baseUrl } from "../../features/Api/BaseUrl";


const ManageOrders = () => {
  const [openView, setOpenView] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newOrder, setNewOrder] = useState({
    customer: "",
    items: "",
    amount: "",
    status: "Pending",
  });

  const getToken = () => localStorage.getItem("token");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}orders/order-list`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (response.data && Array.isArray(response.data.Orders)) {
        setOrders(response.data.Orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const showModal = (order) => {
    setSelectedOrder(order);
    setOpenView(true);
  };

  const handleAddOrder = () => {
    if (!newOrder.customer || !newOrder.items || !newOrder.amount) {
      alert("Please fill in all fields.");
      return;
    }

    const newId = `ORD${(orders.length + 1).toString().padStart(3, "0")}`;
    const orderToAdd = {
      id: newId,
      customer: newOrder.customer,
      items: newOrder.items,
      amount: parseFloat(newOrder.amount),
      status: newOrder.status,
      order_date_time: new Date().toISOString(),
    };

    setOrders([...orders, orderToAdd]);
    handleAddCancel();
  };

  const handleChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
  };

  const handleAddCancel = () => {
    setOpenAdd(false);
    setNewOrder({ customer: "", items: "", amount: "", status: "Pending" });
  };

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredOrders = orders.filter(
    (o) =>
      o.id?.toString().toLowerCase().includes(searchTerm) ||
      o.customer?.toLowerCase().includes(searchTerm) ||
      o.items?.toLowerCase().includes(searchTerm)
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "success";
      case "preparing":
        return "info";
      case "cancelled":
        return "error";
      case "confirmed":
        return "success";
      case "pending":
      default:
        return "warning";
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  
const handleStatusChange = async (newStatus) => {
  try {
    const response = await axios.post(
      `${baseUrl}orders/update-status/${selectedOrder.id}`,
      { status: newStatus }, 
      {
        headers: {
          Authorization: `Bearer ${getToken()}`, 
          "Content-Type": "application/json",    
        },
      }
    );

    if (response.data.success) {
      const updatedOrders = orders.map((o) =>
        o.id === selectedOrder.id ? { ...o, status: newStatus } : o
      );
      setOrders(updatedOrders);
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    } else {
      alert("Status update failed.");
    }
  } catch (error) {
    if (error.response) {
      console.error("Server response:", error.response.data);
      alert("Status update failed: " + (error.response.data.message || "Unknown error"));
    } else {
      console.error("Error updating status:", error);
      alert("An error occurred while updating the order status.");
    }
  }
};



  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
        <Typography variant="h5" fontWeight={600}>Manage Orders</Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            size="small"
            placeholder="Search orders..."
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 540 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {["Order ID", "Customer", "Items", "Amount", "Status", "Date & Time", "Action"].map((h) => (
                <TableCell key={h}><strong>{h}</strong></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>₹{order.amount}</TableCell>
                <TableCell>
                  <Chip label={order.status} color={getStatusColor(order.status)} size="small" />
                </TableCell>
                <TableCell>
                  {order.order_date_time ? formatDateTime(order.order_date_time) : "N/A"}
                </TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick={() => showModal(order)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  {loading ? "Loading orders..." : "No matching orders found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Modal with Editable Status */}
      <Dialog open={openView} onClose={() => setOpenView(false)}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <>
              <Typography mb={1}><strong>Order ID:</strong> {selectedOrder.id}</Typography>
              <Typography mb={1}><strong>Customer:</strong> {selectedOrder.customer}</Typography>
              <Typography mb={1}><strong>Items:</strong> {selectedOrder.items}</Typography>
              <Typography mb={1}><strong>Amount:</strong> ₹{selectedOrder.amount}</Typography>
              <Typography mb={1}><strong>Date & Time:</strong> {formatDateTime(selectedOrder.order_date_time)}</Typography>

              <TextField
                fullWidth
                select
                label="Update Status"
                value={selectedOrder.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                margin="normal"
              >
                {["pending", "preparing", "delivered", "cancelled", "confirmed"].map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </TextField>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenView(false)} color="secondary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add Order Modal (Same as Before) */}
      <Dialog open={openAdd} onClose={handleAddCancel}>
        <DialogTitle>Add New Order</DialogTitle>
        <DialogContent dividers>
          <TextField fullWidth label="Customer Name" name="customer" value={newOrder.customer} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Items" name="items" value={newOrder.items} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Amount" name="amount" type="number" value={newOrder.amount} onChange={handleChange} margin="normal" />
          <TextField fullWidth select label="Status" name="status" value={newOrder.status} onChange={handleChange} margin="normal">
            {["Pending", "Preparing", "Delivered", "Cancelled"].map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddCancel} color="secondary">Cancel</Button>
          <Button onClick={handleAddOrder} color="primary" variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageOrders;
