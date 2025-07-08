import React, { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineLogout,
  AiOutlineMoneyCollect,
  AiOutlineHistory,
  AiOutlineBell,
} from "react-icons/ai";
import {
  MdFastfood,
  MdOutlineSupportAgent,
} from "react-icons/md";
import {
  FaRegListAlt,
  FaUserEdit,
  FaRegStar,
} from "react-icons/fa";
import { RiCoupon3Line } from "react-icons/ri";
import { BiMessageDetail } from "react-icons/bi";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import logo_png from "../assets/logo.png";

const RestaurantLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const adminName = localStorage.getItem("name");

  const getActiveKey = () => {
    const path = location.pathname.replace("/restaurant/", "").split("/")[0];
    return path || "restaurant";
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuItems = [
    { key: "restaurant", icon: AiOutlineDashboard, label: "Dashboard" },
    { key: "orders", icon: FaRegListAlt, label: "Orders" },
    { key: "menu", icon: MdFastfood, label: "Menu" },
    { key: "earnings", icon: AiOutlineMoneyCollect, label: "Earnings" },
    { key: "transactions", icon: AiOutlineHistory, label: "Transactions" },
    { key: "reviews", icon: FaRegStar, label: "Reviews" },
    { key: "offers", icon: RiCoupon3Line, label: "Offers" },
    { key: "notifications", icon: AiOutlineBell, label: "Notifications" },
    { key: "profile", icon: FaUserEdit, label: "Profile" },
    { key: "support", icon: MdOutlineSupportAgent, label: "Support" },
    { key: "about", icon: BiMessageDetail, label: "About Us" },
    { key: "contact", icon: BiMessageDetail, label: "Contact Us" },
    { key: "signout", icon: AiOutlineLogout, label: "Logout" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
    
      <div
        className={`
          bg-white transition-all duration-300 ease-in-out
          fixed top-0 left-0 h-full z-30
          md:relative md:translate-x-0
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          overflow-y-auto
        `}
        style={{
          width: collapsed ? "74px" : "256px",
          minWidth: collapsed ? "74px" : "256px",
        }}
      >
      
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <img
            src={logo_png}
            alt="Logo"
            className="object-contain transition-all duration-300"
            style={{ width: collapsed ? "40px" : "80px", height: "40px" }}
          />
        </div>

       
        <nav className="flex flex-col gap-1 p-2">
          {menuItems.map((item) => (
            <div
              key={item.key}
              onClick={() => {
                if (item.key === "signout") handleLogout();
                else {
                  navigate(
                    `/restaurant/${item.key === "restaurant" ? "" : item.key}`
                  );
                  if (mobileMenuOpen) setMobileMenuOpen(false);
                }
              }}
              className={`flex items-center gap-3 px-4 py-2 m-1 rounded-md cursor-pointer transition-colors
              ${
                getActiveKey() === item.key
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

     
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black opacity-30 z-20 md:hidden"
        />
      )}


      <div className="flex-1 flex flex-col overflow-hidden">
  
        <div className="flex justify-between items-center h-16 px-5 bg-white border-b border-gray-200">
          <div className="flex items-center gap-3">
          {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-red-500"
            >
              <MenuIcon />
            </button>

            {/* Collapse sidebar toggle */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:block text-red-500"
            >
              <MenuIcon />
            </button>
          </div>

          {/* Profile menu */}
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
                  navigate("/restaurant/profile");
                }}
              >
                My Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  navigate("/reset-password");
                }}
              >
                Reset Password
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

        {/* Outlet */}
        <div className="p-4 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RestaurantLayout;
