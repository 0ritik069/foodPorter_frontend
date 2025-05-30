import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineLogout,
  AiOutlineMoneyCollect,
  AiOutlineHistory,
  AiOutlineBell,
} from "react-icons/ai";
import { MdFastfood, MdOutlineSupportAgent } from "react-icons/md";
import { FaRegListAlt, FaUserEdit, FaRegStar } from "react-icons/fa";
import { RiCoupon3Line } from "react-icons/ri";
import { BiMessageDetail } from "react-icons/bi";
import { Layout, Menu, theme } from "antd";
import logo_png from "../assets/logo.png";
import "./RestaurantLayout.css"; 

const { Header, Sider, Content } = Layout;

const RestaurantLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getActiveKey = () => {
    const path = location.pathname.replace("/restaurant/", "");
    return path === "" ? "dashboard" : path;
  };

  const signOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const menuItems = [
    { key: "dashboard", icon: AiOutlineDashboard, label: "Dashboard" },
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
    <Layout>
      <Sider collapsible collapsed={collapsed} trigger={null} style={{ background: "#fff" }}>
        <div style={{ padding: "2px", textAlign: "center" }}>
          <img
            src={logo_png}
            alt="Logo"
            style={{ width: collapsed ? "50px" : "120px", transition: "width 0.3s" }}
          />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[getActiveKey()]}
          onClick={({ key }) => {
            if (key === "signout") signOut();
            else navigate(`/restaurant/${key === "dashboard" ? "" : key}`);
          }}
          items={menuItems.map((item) => ({
            key: item.key,
            icon: React.createElement(item.icon, {
              className: `custom-icon ${getActiveKey() === item.key ? "active-icon" : ""}`,
            }),
            label: item.label,
            className: `custom-menu-item ${getActiveKey() === item.key ? "active-item" : ""}`,
          }))}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            padding: "0 10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            onClick: () => setCollapsed(!collapsed),
            style: { fontSize: 20, color: "#ef4444", marginTop: "18px" },
          })}
          <div style={{ fontWeight: 600 }}>Welcome, Restaurant</div>
        </Header>

        <Content style={{ margin: "0px 0px", padding: 20, minHeight: 280, background: colorBgContainer }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default RestaurantLayout;
