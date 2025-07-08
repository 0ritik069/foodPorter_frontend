import React, { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineBell,
  AiOutlineBarChart,
  AiOutlineSetting,
} from "react-icons/ai";
import {
  MdOutlineRestaurant,
  MdOutlineReportProblem,
  MdRateReview,
} from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegCreditCard } from "react-icons/fa";
import { IoIosListBox } from "react-icons/io";
import { TbFileDescription } from "react-icons/tb";
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import logo_png from "../assets/logo.png";

const adminName = localStorage.getItem("name");

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveKey = () => {
    const path = location.pathname.replace("/admin/", "");
    return path || "dashboard";
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const signOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuItems = [
    { key: "dashboard", icon: AiOutlineDashboard, label: "Dashboard" },
    { key: "manage-customers", icon: AiOutlineUser, label: "Manage Customers" },
    {
      key: "manage-restaurants",
      icon: MdOutlineRestaurant,
      label: "Manage Restaurants",
    },
    { key: "manage-orders", icon: IoIosListBox, label: "Manage Orders" },
    { key: "payments", icon: FaRegCreditCard, label: "Payments & Earnings" },
    { key: "reports", icon: MdRateReview, label: "Reports" },
    { key: "analytics", icon: AiOutlineBarChart, label: "Analytics" },
    { key: "notifications", icon: AiOutlineBell, label: "Notifications" },
    {
      key: "complaints",
      icon: MdOutlineReportProblem,
      label: "Complaints & Contact",
    },
    {
      key: "policies",
      icon: TbFileDescription,
      label: "Policies",
      children: [
        { key: "terms", label: "Terms & Conditions" },
        { key: "privacy", label: "Privacy Policy" },
        { key: "contact-details", label: "Update Contact Details" },
      ],
    },
    { key: "admin-access", icon: RiLockPasswordLine, label: "Admin Access" },
    { key: "settings", icon: AiOutlineSetting, label: "Settings" },
    { key: "signout", icon: AiOutlineLogout, label: "Logout" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Sidebar */}
      <div
        className={`bg-white transition-all duration-300 ease-in-out
          fixed top-0 left-0 h-full z-30
          md:relative md:translate-x-0
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          overflow-y-auto`}
        style={{
          width: collapsed ? "74px" : "256px",
          minWidth: collapsed ? "74px" : "256px",
        }}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <img
            src={logo_png}
            alt="Logo"
            className="transition-all duration-300 object-contain"
            style={{
              width: collapsed ? "40px" : "80px",
              height: "40px",
            }}
          />
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col gap-1 p-2">
          {menuItems.map((item) => (
            <div
              key={item.key}
              onClick={() => {
                if (item.key === "signout") signOut();
                else {
                  navigate(`/admin/${item.key === "dashboard" ? "" : item.key}`);
                  if (mobileMenuOpen) setMobileMenuOpen(false);
                }
              }}
              className={`flex items-center gap-3 px-4 py-2 m-1 cursor-pointer rounded-md transition-colors
                ${getActiveKey() === item.key
                  ? "bg-red-500 text-white"
                  : "hover:bg-red-500 hover:text-white text-gray-700"
                }`}
            >
              <item.icon style={{ fontSize: "20px", minWidth: 20 }} />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </div>
          ))}
        </nav>
      </div>

      {/* Overlay for Mobile */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black opacity-30 z-20 md:hidden"
        />
      )}

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Navbar */}
        <div className="flex justify-between items-center px-5 h-16 bg-white border-b border-gray-200">
          <div className="flex items-center gap-3">
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-red-500"
            >
              <MenuIcon />
            </button>

           
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:block text-red-500"
            >
              <MenuIcon />
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-red-500 font-medium">
            <IconButton onClick={handleClick}>
              <Avatar
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                sx={{ width: 35, height: 40 }}
              />
            </IconButton>
            <span className="hidden sm:inline">{adminName}</span>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/admin/my-profile");
                }}
              >
                My Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/admin/change-password");
                }}
              >
                Change Password
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleLogout();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>


        <div className="p-4 flex-1 overflow-y-auto page_layout">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
