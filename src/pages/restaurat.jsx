import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {DatePicker} from "@mui/x-date-pickers/DatePicker"
import dayjs from "dayjs";

const initialPayments = [
  {
    id: 1,
    orderId: "ORD001",
    restaurant: "Spice Villa",
    customer: "Ravi Sharma",
    date: "2025-05-18",
    amount: 1200,
    commission: 120,
    status: "Paid",
  },
  {
    id: 2,
    orderId: "ORD002",
    restaurant: "Pizza Corner",
    customer: "Neha Patel",
    date: "2025-05-18",
    amount: 750,
    commission: 75,
    status: "Unpaid",
  },
  {
    id: 3,
    orderId: "ORD003",
    restaurant: "Grill House",
    customer: "Amit Singh",
    date: "2025-05-17",
    amount: 980,
    commission: 98,
    status: "Paid",
  },
];

const Restaurants =() =>{
  const[payments]=useState(initialPayments);
  const[searchOrderId,setSearchOrderId] = useState("");
  const [restaurant,setRestaurant] =useState("All");
  const [startDate,setStartDate]=useState(null);
  const [endDate,setEndDate]=useState(null);

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      if (restaurant !== "All" && p.restaurant !== restaurant) return false;

      if (
        searchOrderId.trim() !== "" &&
        !p.orderId.toLowerCase().includes(searchOrderId.toLowerCase())
      )
        return false;

      if (startDate && endDate) {
        const paymentDate = dayjs(p.date);
        if (
          paymentDate.isBefore(dayjs(startDate), "day") ||
          paymentDate.isAfter(dayjs(endDate), "day")
        ) {
          return false;
        }
      }

      return true;
    });
  }, [payments, restaurant, searchOrderId, startDate, endDate]);

  const totalEarnings = filteredPayments.reduce((acc,p) => acc+p.amount,0);
  const totalCommission = filteredPayments.reduce((acc,p)=> acc+ p.commission,0);

  const columns=[
    {fields:"orderId", headerName:"Order ID",flex: 1},
    {fields:"restaurants", headerName:"Restaurant", flex:1},
    {fields:"customer",}
    
  ]



}