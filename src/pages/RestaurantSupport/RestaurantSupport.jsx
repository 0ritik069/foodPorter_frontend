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
} from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
// import "./Support.css";

const { Title } = Typography;

const RestaurantSupport = () => {
  const [form, setForm] = useState({
    subject: "",
    message: "",
  });

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
    <Box className="support-container">
       <Typography variant="h5" fontWeight={600}>Support & Help Center</Typography>
      {/* <Typography variant="h5" className="page-heading">
        Support & Help Center
      </Typography> */}

      <Grid container spacing={2} className="support-info">
        <Grid item xs={12} md={6}>
          <Card className="support-card">
            <Grid container alignItems="center">
              <Grid item>
                <Avatar className="support-avatar" sx={{ bgcolor: "#1976d2" }}>
                  <EmailIcon />
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="subtitle1" fontWeight="bold">
                  Email Us
                </Typography>
                <Typography variant="body2">support@foodporter.com</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="support-card">
            <Grid container alignItems="center">
              <Grid item>
                <Avatar className="support-avatar" sx={{ bgcolor: "#388e3c" }}>
                  <PhoneIcon />
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="subtitle1" fontWeight="bold">
                  Call Us
                </Typography>
                <Typography variant="body2">+91 99999 88888</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <Card className="support-card form-section">
        <Typography variant="h6" gutterBottom>
          Submit a Query
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Subject"
              fullWidth
              name="subject"
              value={form.subject}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              fullWidth
              multiline
              rows={4}
              name="message"
              value={form.message}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: "100%" }}>
          Your support query has been submitted!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RestaurantSupport;