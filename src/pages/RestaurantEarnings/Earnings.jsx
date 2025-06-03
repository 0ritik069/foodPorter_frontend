import React from "react";
import {
  Typography,
  Card,
  Grid,
  Box,
  Button,
  MenuItem,
  Select,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
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

const summaryData = {
  totalEarnings: 125000,
  totalOrders: 320,
  avgOrderValue: 390,
  withdrawn: 40000,
  pendingPayout: 85000,
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

const earningsTable = [
  {
    id: "#ORD101",
    date: "01-Jun-2025",
    amount: 500,
    commission: 50,
    net: 450,
    status: "Paid",
    method: "UPI",
  },
  {
    id: "#ORD102",
    date: "02-Jun-2025",
    amount: 650,
    commission: 65,
    net: 585,
    status: "Pending",
    method: "Cash",
  },
];

const Earnings = () => {
  const theme = useTheme();
  const [filter, setFilter] = React.useState("This Month");

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Earnings Dashboard
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="subtitle2">Total Earnings</Typography>
            <Typography variant="h6" fontWeight="bold">
              ₹{summaryData.totalEarnings.toLocaleString()}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="subtitle2">Total Orders</Typography>
            <Typography variant="h6" fontWeight="bold">
              {summaryData.totalOrders}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="subtitle2">Avg. Order Value</Typography>
            <Typography variant="h6" fontWeight="bold">
              ₹{summaryData.avgOrderValue}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="subtitle2">Withdrawn</Typography>
            <Typography variant="h6" fontWeight="bold">
              ₹{summaryData.withdrawn.toLocaleString()}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography variant="subtitle2">Pending Payout</Typography>
            <Typography variant="h6" fontWeight="bold">
              ₹{summaryData.pendingPayout.toLocaleString()}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Filter and Withdraw Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          size="small"
        >
          <MenuItem value="Today">Today</MenuItem>
          <MenuItem value="This Week">This Week</MenuItem>
          <MenuItem value="This Month">This Month</MenuItem>
        </Select>
        <Button variant="contained" sx={{ bgcolor: "#facc15", color: "#000" }}>
          Request Withdrawal
        </Button>
      </Box>

      {/* Chart */}
      <Card sx={{ p: 2, mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Monthly Earnings Chart
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyEarnings}>
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

      {/* Table */}
      <Card sx={{ p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Recent Earnings
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Commission</TableCell>
                <TableCell>Net</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Method</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {earningsTable.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>₹{row.amount}</TableCell>
                  <TableCell>₹{row.commission}</TableCell>
                  <TableCell>₹{row.net}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.method}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default Earnings;
