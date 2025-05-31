import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  IconButton,
  Chip,
  TableContainer,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./RestaurantOrders.css";

const orderData = [
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

const RestaurantOrders = () => {
  return (
    <div>
<Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
        Restaurant <span>Orders</span>
      </Typography>
 
    
         <div className="restaurant-orders-container">
    
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Order ID</strong></TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData.map((order) => (
              <TableRow key={order.key}>
                <TableCell><strong>{order.orderId}</strong></TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.time}</TableCell>
                <TableCell>
                  <Chip label={order.status} color={getStatusColor(order.status)} />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" size="small">
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </div>
  );
};

export default RestaurantOrders;
