import React, { useState } from "react";
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
  Chip,
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

const initialOrders = [
  {
    key: "1",
    orderId: "#FD1023",
    customer: "Amit Sharma",
    items: "Pizza, Coke",
    total: "₹450",
    status: "Delivered",
    time: "12:30 PM",
  },
  {
    key: "2",
    orderId: "#FD1045",
    customer: "Pooja Reddy",
    items: "Burger, Fries",
    total: "₹320",
    status: "Pending",
    time: "1:10 PM",
  },
  {
    key: "3",
    orderId: "#FD1059",
    customer: "Rohit Verma",
    items: "Thali, Lassi",
    total: "₹550",
    status: "Cancelled",
    time: "11:45 AM",
  },
];

const statusOptions = ["All", "Delivered", "Pending", "Cancelled"];

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "success";
    case "Pending":
      return "warning";
    case "Cancelled":
      return "error";
    default:
      return "default";
  }
};

const PageNotFound = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [currentEditOrder, setCurrentEditOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({
    orderId: "",
    customer: "",
    items: "",
    total: "",
    time: "",
    status: "Pending",
  });

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchText.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
      order.items.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ? true : order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleDelete = (key) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders((prev) => prev.filter((order) => order.key !== key));
    }
  };

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
      prev.map((order) =>
        order.key === currentEditOrder.key ? currentEditOrder : order
      )
    );
    handleEditClose();
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentEditOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrderOpen = () => {
    setAddDialogOpen(true);
  };

  const handleAddOrderClose = () => {
    setAddDialogOpen(false);
    setNewOrder({
      orderId: "",
      customer: "",
      items: "",
      total: "",
      time: "",
      status: "Pending",
    });
  };

  const handleAddOrderSave = () => {
    const newKey = Date.now().toString();
    setOrders((prev) => [...prev, { key: newKey, ...newOrder }]);
    handleAddOrderClose();
  };

  const handleNewOrderChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChangeInline = (key, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.key === key ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
         <span >Manage Orders</span>
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

        <Button
          variant="contained"
          color="primary"
          sx={{ ml: "auto" }}
          onClick={handleAddOrderOpen}
        >
          Add New Order
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><strong>Order ID</strong></TableCell>
              <TableCell><strong>Customer</strong></TableCell>
              <TableCell><strong>Items</strong></TableCell>
              <TableCell><strong>Total</strong></TableCell>
              <TableCell><strong>Time</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.key} hover>
                  <TableCell><strong>{order.orderId}</strong></TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.time}</TableCell>
                  <TableCell>
                    <TextField
                      select
                      size="small"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChangeInline(order.key, e.target.value)
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
                        onClick={() => handleDelete(order.key)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No orders found.
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
              <TextField label="Order ID" value={currentEditOrder.orderId} disabled />
              <TextField name="customer" label="Customer" value={currentEditOrder.customer} onChange={handleEditChange} />
              <TextField name="items" label="Items" value={currentEditOrder.items} onChange={handleEditChange} />
              <TextField name="total" label="Total" value={currentEditOrder.total} onChange={handleEditChange} />
              <TextField name="time" label="Time" value={currentEditOrder.time} onChange={handleEditChange} />
              <TextField select name="status" label="Status" value={currentEditOrder.status} onChange={handleEditChange}>
                {statusOptions.filter(s => s !== "All").map(status => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </TextField>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addDialogOpen} onClose={handleAddOrderClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Order</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} mt={1}>
            <TextField name="orderId" label="Order ID" value={newOrder.orderId} onChange={handleNewOrderChange} />
            <TextField name="customer" label="Customer" value={newOrder.customer} onChange={handleNewOrderChange} />
            <TextField name="items" label="Items" value={newOrder.items} onChange={handleNewOrderChange} />
            <TextField name="total" label="Total" value={newOrder.total} onChange={handleNewOrderChange} />
            <TextField name="time" label="Time" value={newOrder.time} onChange={handleNewOrderChange} />
            <TextField select name="status" label="Status" value={newOrder.status} onChange={handleNewOrderChange}>
              {statusOptions.filter(s => s !== "All").map(status => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddOrderClose}>Cancel</Button>
          <Button onClick={handleAddOrderSave} variant="contained">Add Order</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RestaurantOrders;
