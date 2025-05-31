import React from "react";
import {
  Typography,
  Card,
  Grid,
  Box,
  useTheme,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const { Title } = Typography;

const summaryData = {
  totalEarnings: 125000,
  totalOrders: 320,
  avgOrderValue: 390,
};

const monthlyEarnings = [
  { month: "Jan", earnings: 10000 },
  { month: "Feb", earnings: 12000 },
  { month: "Mar", earnings: 15000 },
  { month: "Apr", earnings: 13000 },
  { month: "May", earnings: 18000 },
  { month: "Jun", earnings: 22000 },
  { month: "Jul", earnings: 25000 },
];

const Earnings = () => {
  const theme = useTheme();

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Earnings
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="subtitle1">Total Earnings</Typography>
            <Typography variant="h6" fontWeight="bold">
              ₹{summaryData.totalEarnings.toLocaleString()}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="subtitle1">Total Orders</Typography>
            <Typography variant="h6" fontWeight="bold">
              {summaryData.totalOrders}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="subtitle1">Avg. Order Value</Typography>
            <Typography variant="h6" fontWeight="bold">
              ₹{summaryData.avgOrderValue}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Monthly Earnings
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyEarnings} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke={theme.palette.primary.main}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Box>
  );
};

export default Earnings;
