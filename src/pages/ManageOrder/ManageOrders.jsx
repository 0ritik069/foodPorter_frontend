import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  MenuItem,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ManageOrders = () => {
  const [openView, setOpenView] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customer: "Ravi Sharma",
      items: "Paneer Tikka, Butter Naan",
      amount: 350,
      status: "Pending",
    },
    {
      id: "ORD002",
      customer: "Anjali Verma",
      items: "Veg Biryani, Raita",
      amount: 280,
      status: "Delivered",
    },
    {
      id: "ORD003",
      customer: "Mohit Singh",
      items: "Chole Bhature, Lassi",
      amount: 300,
      status: "Preparing",
    },
    {
      id: "ORD004",
      customer: "Sneha Gupta",
      items: "Masala Dosa, Filter Coffee",
      amount: 250,
      status: "Cancelled",
    },
  ]);

  const [newOrder, setNewOrder] = useState({
    customer: "",
    items: "",
    amount: "",
    status: "Pending",
  });

  const showModal = (order) => {
    setSelectedOrder(order);
    setOpenView(true);
  };

  const handleCancelView = () => {
    setOpenView(false);
    setSelectedOrder(null);
  };

  const handleAddOpen = () => {
    setOpenAdd(true);
  };

  const handleAddCancel = () => {
    setOpenAdd(false);
    setNewOrder({
      customer: "",
      items: "",
      amount: "",
      status: "Pending",
    });
  };

  const handleChange = (e) => {
    setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
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
    };

    setOrders([...orders, orderToAdd]);
    handleAddCancel();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchTerm) ||
    order.customer.toLowerCase().includes(searchTerm) ||
    order.items.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="p-4">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
        <Typography variant="h5" fontWeight={600}>
          Manage Orders
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            size="small"
            placeholder="Search orders..."
            variant="outlined"
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="success"
            sx={{
              fontWeight: 600,
              textTransform: "none",
              backgroundColor: "#facc15",
              color: "#000",
              "&:hover": {
                backgroundColor: "#eab308",
              },
            }}
            onClick={handleAddOpen}
          >
            Add Order
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell><strong>Order ID</strong></TableCell>
              <TableCell><strong>Customer</strong></TableCell>
              <TableCell><strong>Items</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>₹{order.amount}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => showModal(order)}
                    size="small"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No matching orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Order Modal */}
      <Dialog open={openView} onClose={handleCancelView}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <>
              <Typography variant="body1"><strong>Order ID:</strong> {selectedOrder.id}</Typography>
              <Typography variant="body1"><strong>Customer:</strong> {selectedOrder.customer}</Typography>
              <Typography variant="body1"><strong>Items:</strong> {selectedOrder.items}</Typography>
              <Typography variant="body1"><strong>Amount:</strong> ₹{selectedOrder.amount}</Typography>
              <Typography variant="body1"><strong>Status:</strong> {selectedOrder.status}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelView} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Order Modal */}
      <Dialog open={openAdd} onClose={handleAddCancel}>
        <DialogTitle>Add New Order</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            label="Customer Name"
            name="customer"
            value={newOrder.customer}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Items"
            name="items"
            value={newOrder.items}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            type="number"
            value={newOrder.amount}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Status"
            name="status"
            value={newOrder.status}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Preparing">Preparing</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddOrder} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageOrders;
