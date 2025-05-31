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
  Avatar,
  Chip,
  TableContainer,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./RestaurantMenu.css";

const menuData = [
  {
    key: "1",
    image: "🍕",
    name: "Veg Pizza",
    category: "Main Course",
    price: "₹250",
    availability: "Available",
  },
  {
    key: "2",
    image: "🍔",
    name: "Cheese Burger",
    category: "Snacks",
    price: "₹180",
    availability: "Unavailable",
  },
  {
    key: "3",
    image: "🥗",
    name: "Green Salad",
    category: "Starters",
    price: "₹120",
    availability: "Available",
  },
];

const RestaurantMenu = () => {
  return (
    <div className="restaurant-menu-container">
      <Typography variant="h5"  gutterBottom>
        Menu <span >Management</span>
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Image</strong></TableCell>
              <TableCell><strong>Item Name</strong></TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuData.map((item) => (
              <TableRow key={item.key}>
                <TableCell>
                  <Avatar sx={{ width: 40, height: 40, fontSize: 22 }}>{item.image}</Avatar>
                </TableCell>
                <TableCell><strong>{item.name}</strong></TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <Chip
                    label={item.availability}
                    color={item.availability === "Available" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <div className="menu-actions">
                    <IconButton color="primary" size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="error" size="small">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RestaurantMenu;
