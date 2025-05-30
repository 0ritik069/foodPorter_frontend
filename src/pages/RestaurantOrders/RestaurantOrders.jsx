import React from "react";
import { Table, Tag, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import "./RestaurantOrders.css";

const orderData = [
  {
    key: "1",
    orderId: "#FD1023",
    customer: "Amit Sharma",
    items: "Pizza, Coke",
    total: "₹450",
    status: "Delivered",
    time: "12:30 PM",
  },
  {
    key: "2",
    orderId: "#FD1045",
    customer: "Pooja Reddy",
    items: "Burger, Fries",
    total: "₹320",
    status: "Pending",
    time: "1:10 PM",
  },
  {
    key: "3",
    orderId: "#FD1059",
    customer: "Rohit Verma",
    items: "Thali, Lassi",
    total: "₹550",
    status: "Cancelled",
    time: "11:45 AM",
  },
];

const RestaurantOrders = () => {
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        if (status === "Delivered") color = "green";
        else if (status === "Pending") color = "orange";
        else if (status === "Cancelled") color = "red";

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Button icon={<EyeOutlined />} size="small">
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="restaurant-orders-container">
      <h2 className="page-heading">
        Restaurant <span>Orders</span>
      </h2>
      <Table
        columns={columns}
        dataSource={orderData}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default RestaurantOrders;
