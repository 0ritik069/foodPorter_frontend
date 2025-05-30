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
} from "@mui/material";

const ManageOrders = () => {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const showModal = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const orderData = [
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
  ];

  return (
    <div className="p-4">
      <Typography variant="h5" sx={{ fontWeight: 600 }}gutterBottom>
        Manage Orders
      </Typography>

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
            {orderData.map((order, index) => (
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
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <div>
              <Typography variant="body1"><strong>Order ID:</strong> {selectedOrder.id}</Typography>
              <Typography variant="body1"><strong>Customer:</strong> {selectedOrder.customer}</Typography>
              <Typography variant="body1"><strong>Items:</strong> {selectedOrder.items}</Typography>
              <Typography variant="body1"><strong>Amount:</strong> ₹{selectedOrder.amount}</Typography>
              <Typography variant="body1"><strong>Status:</strong> {selectedOrder.status}</Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageOrders;
