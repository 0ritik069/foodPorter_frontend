import React, { useState, useMemo } from "react";
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
import { DataGrid } from "@mui/x-data-grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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

const Payments = () => {
  const [payments] = useState(initialPayments);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [restaurant, setRestaurant] = useState("All");
  const [searchOrderId, setSearchOrderId] = useState("");

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

  const totalEarnings = filteredPayments.reduce((acc, p) => acc + p.amount, 0);
  const totalCommission = filteredPayments.reduce(
    (acc, p) => acc + p.commission,
    0
  );

  const columns = [
    { field: "orderId", headerName: "Order ID", flex: 1 },
    { field: "restaurant", headerName: "Restaurant", flex: 1 },
    { field: "customer", headerName: "Customer", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    {
      field: "amount",
      headerName: "Amount (₹)",
      type: "number",
      flex: 1,
      valueFormatter: ({ value }) => `₹${value}`,
    },
    {
      field: "commission",
      headerName: "Commission (₹)",
      type: "number",
      flex: 1,
      valueFormatter: ({ value }) => `₹${value}`,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === "Paid" ? "success" : "error"}
          size="small"
        />
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Payments & Earnings
        </Typography>
        <TextField
          size="small"
          label="Search Order ID"
          variant="outlined"
          value={searchOrderId}
          onChange={(e) => setSearchOrderId(e.target.value)}
          sx={{ width: { xs: "100%", sm: "30%" } }}
        />
      </Box>

 
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "center",
          mb: 3,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            slotProps={{ textField: { size: "small", sx: { width: 150 } } }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            slotProps={{ textField: { size: "small", sx: { width: 150 } } }}
          />
        </LocalizationProvider>

        <Box sx={{ minWidth: 200 }}>
          <InputLabel id="restaurant-select-label">Restaurant</InputLabel>
          <Select
            size="small"
            fullWidth
            labelId="restaurant-select-label"
            value={restaurant}
            onChange={(e) => setRestaurant(e.target.value)}
          >
            <MenuItem value="All">Select Restaurant</MenuItem>
            <MenuItem value="Spice Villa">Spice Villa</MenuItem>
            <MenuItem value="Pizza Corner">Pizza Corner</MenuItem>
            <MenuItem value="Grill House">Grill House</MenuItem>
          </Select>
        </Box>
      </Box>

      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                Total Earnings
              </Typography>
              <Typography variant="h6">₹{totalEarnings}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                Total Commission
              </Typography>
              <Typography variant="h6">₹{totalCommission}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Table */}
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={filteredPayments}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableRowSelectionOnClick
          autoHeight
        />
      </Box>
    </Box>
  );
};

export default Payments;
