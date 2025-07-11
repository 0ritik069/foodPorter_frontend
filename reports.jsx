import React, { useState } from "react";
import "./AdminAccess.css";
import { Typography } from "@mui/material";
const AdminAccess = () => {
    const [admins, setAdmins] = useState([]);

    const [newAdmin, setNewAdmin] = useState({
        name: "",
        email: "",
        role: "Support",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAdmin((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddAdmin = (e) => {
        e.preventDefault();
        const newId = admins.length + 1;
        setAdmins([...admins, { id: newId, ...newAdmin }]);
        setNewAdmin({name: "", email: "", role: "support" });
        alert("Admin added sucessfully");
    };

    const handleDelete = (id) => {
        const 
    }


}