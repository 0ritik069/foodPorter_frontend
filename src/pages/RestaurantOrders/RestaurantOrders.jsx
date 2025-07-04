import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { baseUrl } from "../../features/Api/BaseUrl";

const statusOptions = ["All", "pending", "preparing", "delivered", "cancelled"];

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

const getToken = () => localStorage.getItem("token");

const RestaurantOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [currentEditOrder, setCurrentEditOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const [newOrder, setNewOrder] = useState({
    customer: "",
    items: "",
    amount: "",
    status: "Pending",
  });

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

  const filteredOrders = orders.filter((order) => {
    const text = searchText.toLowerCase();
    const matchesSearch =
      order.customer?.toLowerCase().includes(text) ||
      order.id?.toLowerCase().includes(text) ||
      order.items?.toLowerCase().includes(text);
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEditOpen = (order) => {
    setCurrentEditOrder(order);
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setCurrentEditOrder(null);
  };

  const handleEditSave = () => {
    setOrders((prev) =>
      prev.map((o) => (o.id === currentEditOrder.id ? currentEditOrder : o))
    );
    handleEditClose();
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders((prev) => prev.filter((order) => order.id !== id));
    }
  };

  const handleAddOrderOpen = () => setAddDialogOpen(true);
  const handleAddOrderClose = () => {
    setAddDialogOpen(false);
    setNewOrder({ customer: "", items: "", amount: "", status: "Pending" });
  };

  const handleAddOrderSave = () => {
    const newId = `ORD${Date.now().toString().slice(-4)}`;
    setOrders([...orders, { id: newId, ...newOrder }]);
    handleAddOrderClose();
  };

  const handleNewOrderChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({ ...prev, [name]: value }));
  };

 const handleStatusChangeInline = async (id, newStatus) => {
  try {
    const response = await axios.post(
      `${baseUrl}orders/update-status/${id}`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      const updatedOrders = orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
    } else {
      alert("Failed to update status");
    }
  } catch (error) {
    console.error("Status update error:", error?.response?.data || error.message);
    alert("Status update failed: " + (error.response?.data?.message || "Something went wrong"));
  }
};


  return (
    <Box p={2}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Manage Orders
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        mb={2}
        alignItems="center"
      >
        <TextField
          label="Search Orders"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ minWidth: 250 }}
        />
        <TextField
          select
          label="Filter by Status"
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
        {/* <Button
          variant="contained"
          onClick={handleAddOrderOpen}
          sx={{
            backgroundColor: "#facc15",
            color: "#000",
            textTransform: "none",
            "&:hover": { backgroundColor: "#eab308" },
          }}
        >
          + Add Order
        </Button> */}
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Order ID</strong></TableCell>
              <TableCell><strong>Customer</strong></TableCell>
              <TableCell><strong>Items</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>₹{order.amount}</TableCell>
                  <TableCell>
                    <TextField
                      select
                      size="small"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChangeInline(order.id, e.target.value)
                      }
                    >
                      {statusOptions
                        .filter((s) => s !== "All")
                        .map((status) => (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        ))}
                    </TextField>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Order">
                      <IconButton color="primary" size="small">
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Update Order">
                      <IconButton
                        color="info"
                        size="small"
                        onClick={() => handleEditOpen(order)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(order.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  {loading ? "Loading..." : "No matching orders found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Update Order</DialogTitle>
        <DialogContent dividers>
          {currentEditOrder && (
            <Stack spacing={2} mt={1}>
              <TextField label="Order ID" value={currentEditOrder.id} disabled />
              <TextField
                name="customer"
                label="Customer"
                value={currentEditOrder.customer}
                onChange={handleEditChange}
              />
              <TextField
                name="items"
                label="Items"
                value={currentEditOrder.items}
                onChange={handleEditChange}
              />
              <TextField
                name="amount"
                label="Amount"
                value={currentEditOrder.amount}
                onChange={handleEditChange}
              />
              <TextField
                select
                name="status"
                label="Status"
                value={currentEditOrder.status}
                onChange={handleEditChange}
              >
                {statusOptions
                  .filter((s) => s !== "All")
                  .map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
              </TextField>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addDialogOpen} onClose={handleAddOrderClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Order</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} mt={1}>
            <TextField
              name="customer"
              label="Customer"
              value={newOrder.customer}
              onChange={handleNewOrderChange}
            />
            <TextField
              name="items"
              label="Items"
              value={newOrder.items}
              onChange={handleNewOrderChange}
            />
            <TextField
              name="amount"
              label="Amount"
              value={newOrder.amount}
              onChange={handleNewOrderChange}
            />
            <TextField
              select
              name="status"
              label="Status"
              value={newOrder.status}
              onChange={handleNewOrderChange}
            >
              {statusOptions
                .filter((s) => s !== "All")
                .map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddOrderClose}>Cancel</Button>
          <Button onClick={handleAddOrderSave} variant="contained">
            Add Order
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RestaurantOrders;
