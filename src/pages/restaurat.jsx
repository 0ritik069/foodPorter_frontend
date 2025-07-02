import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
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
import { baseUrl } from "../features/Api/BaseUrl";

const statusOptions = ["All", "Pending", "In Progress", "Delivered", "Cancelled"];

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "success";
      case "In Progress":
        return "info";
        case "Cancelled":
          return "error";
          case "Pending":
            return "Warning";
}
};

const getToken = () => localStorage.getItem("token");

const Restaurant = () =>{
  const [orders, setOrders] = useState([]);
  const [searchText,setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openView, setOpenView] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const[currentEditOrder, setCurrentEditOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const [newOrder, setNewOrder] = useState({
    customer:"",
    items: "",
    amount: "",
    status: "Pending",
});

const fetchOrders = async () => {
  setLoading(true);
  try{
    const response = await axios.post(
      `${baseUrl}orders/order-list`,
      {},
      {
        headers:{
          Authorization: `Bearer ${getToken()}`,
        },
        }
    );
      if(response.data && Array.isArray(response.data.Orders)){
        setOrders(response.data.Orders);
      }else{
        console.error("Unexpected response format", response.data);
      }

      }
      catch(error) {
        console.log("Failed to fetch orders:", error);
      }
      finally {
        setLoading(false);
      }
      
    
  };
  
  useEffect(() => {
    fetchOrders();

  }, []);


  const filteredOrders = orders.filter((order)=>{
    const text = searchText.toLowerCase();
    const matchesSearch = order.customer?.toLowerCase().includes(text) ||
    order.id?.toLowerCase().includes(text) ||
    order.items?.toLowerCase().includes(text);

    const matchesStatus= statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  })

  const handleEditopen = (order) => {
    setCurrentEditOrder(order);
    setEditDialogOpen(true);
  };

  const handleEditClose = () =>{
    setEditDialogOpen(false);
    setCurrentEditOrder(null);
  };

  const handleEditopen = (order) => {
    setCurrentEditOrder(order);
    setEditDialogOpen(true);

  };
  const handleEditClose = () =>{
    setEditDialogOpen(false);
    setCurrentEditOrder(null);
  };

  const 


}