import React from "react";
import { Table, Button, Tag, Avatar } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./RestaurantMenu.css";

const menuData = [
  {
    key: "1",
    image: "🍕",
    name: "Veg Pizza",
    category: "Main Course",
    price: "₹250",
    availability: "Available",
  },
  {
    key: "2",
    image: "🍔",
    name: "Cheese Burger",
    category: "Snacks",
    price: "₹180",
    availability: "Unavailable",
  },
  {
    key: "3",
    image: "🥗",
    name: "Green Salad",
    category: "Starters",
    price: "₹120",
    availability: "Available",
  },
];

const RestaurantMenu = () => {
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (emoji) => <Avatar size="large">{emoji}</Avatar>,
    },
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Availability",
      dataIndex: "availability",
      key: "availability",
      render: (status) => (
        <Tag color={status === "Available" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <div className="menu-actions">
          <Button icon={<EditOutlined />} size="small" />
          <Button
            icon={<DeleteOutlined />}
            size="small"
            danger
            style={{ marginLeft: 8 }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="restaurant-menu-container">
      <h2 className="page-heading">Menu <span className="page-heading2">Management</span></h2>
      <Table
        columns={columns}
        dataSource={menuData}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default RestaurantMenu;
