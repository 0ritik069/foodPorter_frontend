import React from "react";
import {
  Typography,
  Card,
  Grid,
  Box,
  useTheme
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const {Title} = Typography;

const summaryData = {
  totalEarnings: 125000,
  totalOrders: 320,
  avgOrderValue: 390,
};

const monthlyEarnings = {
  Jan: 10000,
  Feb: 12000,
  Mar: 15000,
  Apr: 13000,
  May: 18000,
  Jun: 22000,
  Jul: 25000,
};

const Earnings = () => {
  const theme = useTheme();

  return(
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom fontWeight={"bold"}>
        Earnings
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{p: 2}}>
            <Typography variant="subtitle1">Total Earnings</Typography>
            <Typography variant="h6" fontWeight={"bold"}>
              ₹{summaryData.totalEarnings.toLocaleString()}
            </Typography>
            
  )
}
