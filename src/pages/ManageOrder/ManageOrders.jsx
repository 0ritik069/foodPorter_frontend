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
    } else {
      console.error("Unexpected response format", response.data);
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
    switch (status) {
      case "Delivered":
        return "success";
      case "Preparing":
        return "info";
      case "Cancelled":
        return "error";
      case "Pending":
      default:
        return "warning";
    }
  };

  return (
    <Box p={3}>
      
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="h5" fontWeight={600}>
          Manage Orders
        </Typography>
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
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#facc15",
              color: "#000",
              textTransform: "none",
              "&:hover": { backgroundColor: "#eab308" },
            }}
            onClick={() => setOpenAdd(true)}
          >
            + Add Order
          </Button>
        </Box>
      </Box>

    
      <TableContainer component={Paper} sx={{ maxHeight: 540 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {["Order ID", "Customer", "Amount", "Status", "Action"].map((h) => (
                <TableCell key={h}>
                  <strong>{h}</strong>
                </TableCell>
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
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => showModal(order)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  {loading ? "Loading orders..." : "No matching orders found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

     
      <Dialog open={openView} onClose={() => setOpenView(false)}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <>
              {["id", "customer", "items", "amount", "status"].map((key) => (
                <Typography key={key} mb={1}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                  {key === "amount"
                    ? `₹${selectedOrder[key]}`
                    : selectedOrder[key]}
                </Typography>
              ))}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenView(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Modal */}
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
            {["Pending", "Preparing", "Delivered", "Cancelled"].map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
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
    </Box>
  );
};

export default ManageOrders;
