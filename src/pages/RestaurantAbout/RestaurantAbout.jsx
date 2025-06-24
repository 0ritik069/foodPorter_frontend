import React from "react";
import {
  Typography,
  Box,
  Paper,
  Divider,
  Avatar,
  Grid,
  Stack,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

const AboutUs = () => {
  return (
    <Box
      sx={{
        padding: 3,
        maxWidth: 900,
        margin: "auto",
      }}
    >
       <Typography variant="h5" fontWeight={600}>About Us</Typography>

       {/* <Typography variant="h5" gutterBottom>
       About Us
      </Typography> */}
      {/* <Typography variant="h5" component="h1" gutterBottom fontWeight="bold" color="primary">
        About Us
      </Typography> */}

      {/* Restaurant Story */}
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom fontWeight="medium">
          Our Story
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Founded in 2020, Spice Villa started as a small family restaurant with a passion for authentic Indian flavors.
          Over the years, we’ve grown to serve thousands of happy customers, blending tradition with innovation to deliver
          delicious meals right at your doorstep.
        </Typography>
      </Paper>

      {/* Mission & Vision */}
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom fontWeight="medium">
          Mission & Vision
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Our mission is to provide fresh, high-quality meals that bring joy and comfort to every customer.
          We envision being the go-to restaurant for authentic and quick food delivery across Mumbai.
        </Typography>
      </Paper>

      {/* Core Values */}
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom fontWeight="medium">
          Our Core Values
        </Typography>
        <ul>
          <li><Typography variant="body1" color="text.secondary">Quality ingredients and authentic flavors</Typography></li>
          <li><Typography variant="body1" color="text.secondary">Customer satisfaction above all</Typography></li>
          <li><Typography variant="body1" color="text.secondary">Sustainability and community care</Typography></li>
          <li><Typography variant="body1" color="text.secondary">Timely and hygienic delivery</Typography></li>
        </ul>
      </Paper>

      {/* Team Introduction */}
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
        <Typography variant="h6" gutterBottom fontWeight="medium" sx={{ mb: 2 }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: "primary.main" }}>
                <RestaurantMenuIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">Ramesh Mehta</Typography>
                <Typography variant="body2" color="text.secondary">
                  Founder & Head Chef
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: "primary.main" }}>
                <RestaurantMenuIcon />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">Sonia Patel</Typography>
                <Typography variant="body2" color="text.secondary">
                  Operations Manager
                </Typography>
              </Box>
            </Stack>
          </Grid>
          {/* Add more team members if needed */}
        </Grid>
      </Paper>

      {/* Contact & Social Links */}
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="medium" sx={{ mb: 1 }}>
          Contact & Support
        </Typography>
        <Typography variant="body1" color="text.secondary">
          For any queries or support, please reach out to us at <strong>support@spicevilla.com</strong> or call us at <strong>+91 9876543210</strong>.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary">
          Follow us on social media for the latest updates and offers.
        </Typography>
      </Paper>
    </Box>
  );
};

export default AboutUs;
