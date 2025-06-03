import React, { useState } from "react";
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
  TextField,
  Button,
  Switch,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./RestaurantMenu.css";

const initialMenuData = [
  {
    key: "1",
    image: "🍕",
    name: "Veg Pizza",
    category: "Main Course",
    price: "₹250",
    availability: true,
  },
  {
    key: "2",
    image: "🍔",
    name: "Cheese Burger",
    category: "Snacks",
    price: "₹180",
    availability: false,
  },
  {
    key: "3",
    image: "🥗",
    name: "Green Salad",
    category: "Starters",
    price: "₹120",
    availability: true,
  },
];

const RestaurantMenu = () => {
  const [menuData, setMenuData] = useState(initialMenuData);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAvailabilityToggle = (key) => {
    const updated = menuData.map((item) =>
      item.key === key ? { ...item, availability: !item.availability } : item
    );
    setMenuData(updated);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredData = menuData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>
        Menu <span>Management</span>
      </Typography>

      <div className="menu-header-actions" style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <TextField
          label="Search Items"
          variant="outlined"
          size="small"
          onChange={handleSearchChange}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#facc15",
            color: "#000",
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          + Add New Item
        </Button>
      </div>

      <div className="restaurant-menu-container">
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
              {filteredData.map((item) => (
                <TableRow key={item.key}>
                  <TableCell>
                    <Avatar sx={{ width: 40, height: 40, fontSize: 22 }}>
                      {item.image}
                    </Avatar>
                  </TableCell>
                  <TableCell><strong>{item.name}</strong></TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.availability ? "Available" : "Unavailable"}
                      color={item.availability ? "success" : "error"}
                      size="small"
                      sx={{ marginRight: 1 }}
                    />
                    <Switch
                      checked={item.availability}
                      onChange={() => handleAvailabilityToggle(item.key)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="menu-actions" style={{ display: "flex", gap: "0.3rem" }}>
                      <Tooltip title="View">
                        <IconButton color="info" size="small">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton color="primary" size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton color="error" size="small">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No menu items found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default RestaurantMenu;
