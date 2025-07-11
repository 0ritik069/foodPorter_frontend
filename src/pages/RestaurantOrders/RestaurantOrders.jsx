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

const statusOptions = ["All", "Pending", "Preparing", "Delivered", "Cancelled"];

const getToken = () => localStorage.getItem("token");
const getRestaurantId = () => localStorage.getItem("restaurant_id"); 

const RestaurantOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentEditOrder, setCurrentEditOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}orders/restaurant-orders`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (response.data?.Orders) {
        const restId = getRestaurantId();
        const filtered = response.data.Orders.filter(
          (order) => order.restaurant_id?.toString() === restId
        );
        setOrders(filtered);
      } else {
        console.error("Unexpected response", response.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer_name?.toLowerCase().includes(searchText.toLowerCase()) ||
      order.restaurant_name?.toLowerCase().includes(searchText.toLowerCase()) ||
      order.order_id?.toString().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      order.items?.some((item) => item.order_status?.toLowerCase() === statusFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  return (
    <Box p={2}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Restaurant Orders
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
        <TextField
          label="Search Orders"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          size="small"
          sx={{ minWidth: 240 }}
        />

        <TextField
          select
          label="Filter by Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
        >
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <TableContainer component={Paper} sx={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.order_id}>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>{order.customer_name}</TableCell>
                  <TableCell>
                    {order.items.map((item, idx) => (
                      <div key={idx}>
                        {item.dish_name} × {item.quantity} ({item.order_status})
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>₹{order.final_amount}</TableCell>
                  <TableCell>
                    {
                      [...new Set(order.items.map((i) => i.order_status))].join(", ")
                    }
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  {loading ? "Loading..." : "No orders found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RestaurantOrders;
