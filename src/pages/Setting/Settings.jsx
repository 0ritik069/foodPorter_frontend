import React from "react";
import { Link } from "react-router-dom";
import "./Setting.css";
import { Typography } from "@mui/material";
const Settings = () => {
  const settingsList = [
    { title: "Update Contact Details", path: "/admin/settings/contact" },
    { title: "Admin Access Management", path: "/admin/settings/admin-access" },
    { title: "Terms & Conditions", path: "/admin/settings/terms" },
    { title: "Privacy Policy", path: "/admin/settings/privacy-policy" },
    { title: "Notifications", path: "/admin/settings/notifications" },
    { title: "App Configuration", path: "/admin/settings/app-config" }, // optional
  ];

  return (
    <div className="settings-container">
      {/* <h2 >System  <span>Settings</span></h2> */}
      
<Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }} component="h2">
  System Settings
</Typography>
      <div className="settings-list">
        {settingsList.map((item, idx) => (
          <Link to={item.path} className="settings-card" key={idx}>
            <h3>{item.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Settings;
