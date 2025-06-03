import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Chip,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Stack,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./Notifications.css";

const initialNotifications = [
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
  Read: "primary",
  Unread: "error",
};

const RestaurantNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleView = (item) => {
    setSelectedNotification(item);
    setModalOpen(true);

    if (item.status === "Unread") {
      setNotifications((prev) =>
        prev.map((noti) =>
          noti.key === item.key ? { ...noti, status: "Read" } : noti
        )
      );
    }
  };

  return (
    <Box className="notifications-container" sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Notifications
      </Typography>

      <List>
        {notifications.map((item) => (
          <Card
            key={item.key}
            variant="outlined"
            onClick={() => handleView(item)}
            sx={{
              marginBottom: 2,
              backgroundColor: item.status === "Unread" ? "#fff3f3" : "#f9f9f9",
              cursor: "pointer",
              transition: "0.3s",
              '&:hover': {
                boxShadow: 3,
              },
            }}
          >
            <CardContent>
              <ListItem disableGutters>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ width: "100%" }}
                >
                  {item.status === "Unread" && (
                    <Badge color="error" variant="dot">
                      <NotificationsIcon color="action" />
                    </Badge>
                  )}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.message}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                      {item.time}
                    </Typography>
                  </Box>
                  <Chip
                    label={item.status}
                    color={statusColors[item.status]}
                    size="small"
                  />
                </Stack>
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>

      {/* Dialog (Modal) */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>{selectedNotification?.title}</DialogTitle>
        <DialogContent dividers>
          <Typography>{selectedNotification?.message}</Typography>
          <Typography variant="caption" color="text.secondary">
            {selectedNotification?.time}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RestaurantNotifications;
