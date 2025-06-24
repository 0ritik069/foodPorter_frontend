import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", p: 3 }}>
       <Typography variant="h5" fontWeight={600}>Contact Us</Typography>
      {/* <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
        Contact Us
      </Typography> */}

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="body1" gutterBottom>
          Have questions or need support? Fill out the form below or reach us directly.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Message"
                name="message"
                multiline
                rows={4}
                fullWidth
                required
                value={formData.message}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Send Message
              </Button>
            </Grid>
          </Grid>
        </form>

        {submitted && (
          <Alert
            severity="success"
            sx={{ mt: 3 }}
            onClose={() => setSubmitted(false)}
          >
            Thank you for contacting us! We will get back to you shortly.
          </Alert>
        )}
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Our Contact Details
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> support@spicevilla.com
        </Typography>
        <Typography variant="body1">
          <strong>Phone:</strong> +91 9876543210
        </Typography>
        <Typography variant="body1">
          <strong>Address:</strong> 123, Food Street, Mumbai, India
        </Typography>
      </Paper>
    </Box>
  );
};

export default Contact;
