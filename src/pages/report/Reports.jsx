import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line
} from "recharts";
import { Card, CardContent, CardHeader } from "@mui/material";
import "./Reports.css";

const revenueData = [
  { date: "May 13", revenue: 2400 },
  { date: "May 14", revenue: 2800 },
  { date: "May 15", revenue: 1800 },
  { date: "May 16", revenue: 3500 },
  { date: "May 17", revenue: 3000 },
  { date: "May 18", revenue: 4200 },
];

const topRestaurants = [
  { name: "Spice Villa", earnings: 12400 },
  { name: "Pizza Corner", earnings: 10800 },
  { name: "Grill House", earnings: 9800 },
  { name: "Biryani Express", earnings: 8600 },
  { name: "Tandoori Treats", earnings: 7400 },
];

const Reports = () => {
  return (
    <div className="reports-container">
      <h1 className="font-semibold">Reports & <span>Analytics</span></h1>
       {/* <Typography variant="h5" sx={{ fontWeight: 600 }} component="h2">
                Payments & <span>Earnings</span>
              </Typography> */}

      <div className="charts-container">
        <Card className="chart-card" variant="outlined" sx={{ mb: 3 }}>
          <CardHeader title="Revenue Over Time" />
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#ef4444" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="chart-card" variant="outlined">
          <CardHeader title="Top Earning Restaurants" />
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topRestaurants}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="earnings" fill="#eab308" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
