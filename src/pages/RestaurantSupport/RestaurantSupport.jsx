import React, { useState } from "react";
import {
  Typography,
  Card,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
  Avatar,
  Box,
  CardContent,
  CardHeader,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const RestaurantSupport = () => {
  const [form, setForm] = useState({ subject: "", message: "" });
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.subject && form.message) {
      setOpen(true);
      setForm({ subject: "", message: "" });
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Support & Help Center
      </Typography>

      {/* Info Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: "#1976d2" }}><EmailIcon /></Avatar>}
              title={
                <Typography variant="subtitle1" fontWeight={500}>
                  Email Us
                </Typography>
              }
              subheader="support@foodporter.com"
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: "#388e3c" }}><PhoneIcon /></Avatar>}
              title={
                <Typography variant="subtitle1" fontWeight={500}>
                  Call Us
                </Typography>
              }
              subheader="+91 99999 88888"
            />
          </Card>
        </Grid>
      </Grid>

      {/* Contact Form */}
      <Card sx={{ mt: 4 }} elevation={2}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Submit a Query
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Subject"
                name="subject"
                fullWidth
                value={form.subject}
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
                value={form.message}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: "#facc15",
                  color: "#000",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#eab308" },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Snackbar Success Message */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Your support query has been submitted!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RestaurantSupport;
