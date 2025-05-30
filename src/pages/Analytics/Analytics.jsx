import React from "react";
import "./Analytics.css"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const orderData = [
  { month: "Jan", orders: 120 },
  { month: "Feb", orders: 210 },
  { month: "Mar", orders: 160 },
  { month: "Apr", orders: 240 },
  { month: "May", orders: 300 },
  { month: "Jun", orders: 220 },
];

const revenueData = [
  { month: "Jan", revenue: 3200 },
  { month: "Feb", revenue: 5100 },
  { month: "Mar", revenue: 4200 },
  { month: "Apr", revenue: 6200 },
  { month: "May", revenue: 8000 },
  { month: "Jun", revenue: 7100 },
];

const customerData = [
  { name: "New", value: 400 },
  { name: "Returning", value: 300 },
];

const COLORS = ["#ef4444", "#f59e0b"];

const Analytics = () => {
  return (
    <div className="analytics-page">
      {/* <div>

      </div> */}
      <h2 style={{textAlign:"start"}}>Analytics <span>Overview</span></h2>

      {/* Line Chart */}
      <div className="chart-container">
        <h4>Total Orders Over Time</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={orderData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="#ef4444" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="chart-container mt-4">
        <h4>Monthly Revenue (₹)</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#ef4444" barSize={40} />
          </BarChart>
          
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="chart-container mt-4">
        <h4>Customer Type Distribution</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={customerData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {customerData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
