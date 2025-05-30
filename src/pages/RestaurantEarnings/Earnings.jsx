import React from "react";
import { Typography, Card, Row, Col } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Earnings.css";

const { Title } = Typography;

// Sample data
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
  return (
    <div className="earnings-container">
      <Title level={3} className="page-heading">
        Earnings
      </Title>

      <Row gutter={16} style={{ marginBottom: 30 }}>
        <Col xs={24} sm={8}>
          <Card className="summary-card" bordered={false}>
            <h3>Total Earnings</h3>
            <p className="summary-value">₹{summaryData.totalEarnings.toLocaleString()}</p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="summary-card" bordered={false}>
            <h3>Total Orders</h3>
            <p className="summary-value">{summaryData.totalOrders}</p>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="summary-card" bordered={false}>
            <h3>Avg. Order Value</h3>
            <p className="summary-value">₹{summaryData.avgOrderValue}</p>
          </Card>
        </Col>
      </Row>

      <Card className="chart-card" bordered={false}>
        <h3>Monthly Earnings</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyEarnings} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            <Line type="monotone" dataKey="earnings" stroke="#d32f2f" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Earnings;
