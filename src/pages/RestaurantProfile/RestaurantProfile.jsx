import React from "react";
import { Box, Typography, Card, Avatar, Grid, Button, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import StorefrontIcon from "@mui/icons-material/Storefront";
import "./Profile.css";

const profileData = {
  name: "Spice Villa",
  email: "spicevilla@gmail.com",
  phone: "+91 9876543210",
  address: "123, Food Street, Mumbai, India",
  owner: "Ramesh Mehta",
  registeredOn: "March 15, 2024",
};

const RestaurantProfile = () => {
  return (
    <Box className="profile-container">
      <Typography variant="h5" className="page-heading" gutterBottom>
        Restaurant Profile
      </Typography>

      <Card className="profile-card" sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} className="avatar-col">
            <Avatar sx={{ bgcolor: '#d32f2f', width: 80, height: 80 }}>
              <StorefrontIcon fontSize="large" />
            </Avatar>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box className="profile-details">
              <Typography variant="subtitle1"><strong>Restaurant Name:</strong> {profileData.name}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle1"><strong>Owner:</strong> {profileData.owner}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle1"><strong>Email:</strong> {profileData.email}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle1"><strong>Phone:</strong> {profileData.phone}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle1"><strong>Address:</strong> {profileData.address}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle1"><strong>Registered On:</strong> {profileData.registeredOn}</Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<EditIcon />}
              sx={{ mt: 2 }}
              className="edit-button"
            >
              Edit Profile
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default RestaurantProfile;
