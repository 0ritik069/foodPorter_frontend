// src/pages/RestaurantDashboard.jsx
import React from "react";
import { Card, Col, Row, Typography } from "antd";
import {
  DollarOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { yellow } from "@mui/material/colors";

const { Title } = Typography;

const data = [
  { day: "Mon", orders: 12 },
  { day: "Tue", orders: 18 },
  { day: "Wed", orders: 10 },
  { day: "Thu", orders: 22 },
  { day: "Fri", orders: 28 },
  { day: "Sat", orders: 35 },
  { day: "Sun", orders: 30 },
];

const RestaurantDashboard = () => {
  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>
        Restaurant <span style={{color:yellow}}>Dashboard</span> 
      </Title>

      {/* KPI Cards */}
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Card.Meta
              avatar={<ShoppingCartOutlined style={{ fontSize: 32, color: "#eab308" }} />}
              title="Total Orders"
              description="1,240"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Card.Meta
              avatar={<DollarOutlined style={{ fontSize: 32, color: "#eab308" }} />}
              title="Revenue"
              description="$12,450"
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Card.Meta
              avatar={<AppstoreOutlined style={{ fontSize: 32, color: "#eab308" }} />}
              title="Menu Items"
              description="36"
            />
          </Card>
        </Col>
      </Row>

      {/* Orders Chart */}
      <Card style={{ marginTop: 24 }}>
        <Title level={5}>Orders This Week</Title>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis /> 
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="#eab308" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default RestaurantDashboard;
