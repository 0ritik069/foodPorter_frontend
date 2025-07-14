import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Box,
  Grid,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", orders: 12 },
  { day: "Tue", orders: 18 },
  { day: "Wed", orders: 10 },
  { day: "Thu", orders: 22 },
  { day: "Fri", orders: 28 },
  { day: "Sat", orders: 35 },
  { day: "Sun", orders: 30 },
];

const cardData = [
  {
    title: "Total Orders",
    value: "1,240",
    icon: <ShoppingCartIcon />,
  },
  {
    title: "Revenue",
    value: "₹12,450",
    icon: <AttachMoneyIcon />,
  },
  {
    title: "Menu Items",
    value: "36",
    icon: <RestaurantMenuIcon />,
  },
];

const RestaurantDashboard = () => {
  return (
    <Box p={2}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Restaurant Dashboard
      </Typography>

      <Grid container spacing={3}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={2}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#eab308" }}>
                    {card.icon}
                  </Avatar>
                }
                title={
                  <Typography variant="subtitle1" fontWeight={500}>
                    {card.title}
                  </Typography>
                }
                subheader={
                  <Typography variant="h6" fontWeight={600}>
                    {card.value}
                  </Typography>
                }
              />
            </Card>
          </Grid>
        ))}
      </Grid>

    
      <Card sx={{ mt: 5 }} elevation={2}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Orders This Week
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#eab308"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RestaurantDashboard;
