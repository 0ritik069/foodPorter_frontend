import React from "react";
import { Typography, List, Tag, Card, Badge } from "antd";
import "./Notifications.css";

const { Title } = Typography;

const notificationsData = [
  {
    key: "1",
    title: "New Order Received",
    message: "You have a new order from Amit Sharma.",
    time: "Today at 12:45 PM",
    status: "Unread",
  },
  {
    key: "2",
    title: "Payment Successful",
    message: "Payment of ₹450 has been received.",
    time: "Today at 12:47 PM",
    status: "Read",
  },
  {
    key: "3",
    title: "Offer Expiring Soon",
    message: "Flat 20% OFF offer will expire in 2 days.",
    time: "Yesterday at 6:30 PM",
    status: "Unread",
  },
];

const statusColors = {
  Read: "blue",
  Unread: "red",
};

const RestaurantNotifications = () => {
  return (
    <div className="notifications-container">
      <Title level={3} className="page-heading">
        Notifications
      </Title>

      <List
        dataSource={notificationsData}
        renderItem={(item) => (
          <Card
            className={`notification-card ${
              item.status === "Unread" ? "unread" : ""
            }`}
            bordered={false}
          >
            <List.Item>
              <List.Item.Meta
                title={
                  <div className="notification-header">
                    <span className="notification-title">{item.title}</span>
                    <Tag color={statusColors[item.status]}>{item.status}</Tag>
                  </div>
                }
                description={
                  <>
                    <p className="notification-message">{item.message}</p>
                    <span className="notification-time">{item.time}</span>
                  </>
                }
              />
            </List.Item>
          </Card>
        )}
      />
    </div>
  );
};

export default RestaurantNotifications;
