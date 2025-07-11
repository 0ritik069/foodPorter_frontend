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
  TablePagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { baseUrl } from "../../features/Api/BaseUrl";

const ManageOrders = () => {
  const [openView, setOpenView] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const getToken = () => localStorage.getItem("token");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}orders/order-list`, {}, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (Array.isArray(response.data.Orders)) {
        setOrders(response.data.Orders);
      } else {
        console.error("Unexpected response format:", response.data);
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

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredOrders = orders.filter(
    (o) =>
      o.order_id?.toString().toLowerCase().includes(searchTerm) ||
      o.customer_name?.toLowerCase().includes(searchTerm) ||
      o.restaurant_name?.toLowerCase().includes(searchTerm)
  );

  const paginatedOrders = filteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
      case "confirmed":
        return "success";
      case "preparing":
        return "info";
      case "cancelled":
        return "error";
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

  const showModal = (order) => {
    setSelectedOrder(order);
    setOpenView(true);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await axios.post(
        `${baseUrl}orders/update-status/${selectedOrder.order_id}`,
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
          o.order_id === selectedOrder.order_id ? { ...o, items: o.items.map(i => ({ ...i, order_status: newStatus })) } : o
        );
        setOrders(updatedOrders);
        setSelectedOrder({
          ...selectedOrder,
          items: selectedOrder.items.map(i => ({ ...i, order_status: newStatus })),
        });
      } else {
        alert("Status update failed.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred while updating the order status.");
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexWrap="wrap" gap={2}>
        <Typography variant="h5" fontWeight={600}>Manage Orders</Typography>
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

      <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 250px)', overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {["Order ID", "Customer", "Restaurant", "Amount", "Status", "Date & Time", "Action"].map((h) => (
                <TableCell key={h}><strong>{h}</strong></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow key={order.order_id}>
                <TableCell>{order.order_id}</TableCell>
                <TableCell>{order.customer_name}</TableCell>
                <TableCell>{order.restaurant_name}</TableCell>
                <TableCell>₹{order.final_amount}</TableCell>
                <TableCell>
                  <Chip label={order.items[0]?.order_status || "Pending"} color={getStatusColor(order.items[0]?.order_status)} size="small" />
                </TableCell>
                <TableCell>{formatDateTime(order.created_at)}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick={() => showModal(order)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
            {paginatedOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  {loading ? "Loading orders..." : "No matching orders found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredOrders.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />

      {/* View Modal */}
      <Dialog open={openView} onClose={() => setOpenView(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <>
              <Typography><strong>Customer:</strong> {selectedOrder.customer_name}</Typography>
              <Typography><strong>Restaurant:</strong> {selectedOrder.restaurant_name}</Typography>
              <Typography><strong>Total:</strong> ₹{selectedOrder.final_amount}</Typography>
              <Typography><strong>Payment:</strong> {selectedOrder.payment_method}</Typography>
              <Typography><strong>Date & Time:</strong> {formatDateTime(selectedOrder.created_at)}</Typography>

              <Box mt={2}>
                <Typography variant="subtitle1" fontWeight={600}>Items:</Typography>
                {selectedOrder.items.map((item, idx) => (
                  <Box key={idx} borderBottom="1px solid #eee" py={1}>
                    <Typography><strong>{item.dish_name}</strong> (x{item.quantity}) - ₹{item.price}</Typography>
                    <Typography variant="caption">Status: {item.order_status}</Typography>
                    {item.cancel_reason && (
                      <Typography color="error" variant="caption">Cancelled Reason: {item.cancel_reason}</Typography>
                    )}
                  </Box>
                ))}
              </Box>

              <TextField
                fullWidth
                select
                label="Update Status"
                value={selectedOrder.items[0]?.order_status}
                onChange={(e) => handleStatusChange(e.target.value)}
                margin="normal"
              >
                {["Pending", "Preparing", "Delivered", "Cancelled", "Confirmed"].map((s) => (
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
    </Box>
  );
};

export default ManageOrders;
