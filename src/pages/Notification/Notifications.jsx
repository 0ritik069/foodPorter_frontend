import React, { useState } from "react";
import { MdNotificationsActive } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import "./Notification.css";
import { Typography } from "@mui/material";

const dummyNotifications = [
  {
    id: 1,
    title: "New Restaurant Request",
    message: "‘Pizza Villa’ has submitted a registration request.",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Order Issue",
    message: "Order #245 failed to be delivered.",
    timestamp: "5 hours ago",
    read: true,
  },
  {
    id: 3,
    title: "Weekly Summary",
    message: "Your weekly performance report is ready.",
    timestamp: "1 day ago",
    read: false,
  },
  {
    id: 4,
    title: "New User Sign-up",
    message: "A new admin assistant has been added.",
    timestamp: "2 days ago",
    read: true,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(dummyNotifications);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <div className="notifications-page">
      <div>
    {/* <h2 style={{textAlign:"start"}}>Notifications</h2> */}
    <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }} component="h2">
  Notification
</Typography>
    

      </div>
      
      
      <div className="notification-list">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`notification-item ${notif.read ? "read" : "unread"}`}
          >
            <div className="icon">
              <MdNotificationsActive size={24} />
            </div>
            <div className="details">
              <h4>{notif.title}</h4>
              <p>{notif.message}</p>
              <small>{notif.timestamp}</small>
            </div>
            {!notif.read && (
              <button
                className="mark-btn"
                onClick={() => markAsRead(notif.id)}
              >
                <FaCheckCircle size={18} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
