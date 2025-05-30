import React from "react";
import { Typography, Card, Avatar, Row, Col, Button, Descriptions } from "antd";
import { EditOutlined, ShopOutlined } from "@ant-design/icons";
import "./Profile.css";

const { Title } = Typography;

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
    <div className="profile-container">
      <Title level={3} className="page-heading">
        Restaurant Profile
      </Title>

      <Card className="profile-card">
        <Row gutter={[24, 16]}>
          <Col xs={24} md={6} className="avatar-col">
            <Avatar
              size={100}
              icon={<ShopOutlined />}
              style={{ backgroundColor: "#d32f2f" }}
            />
          </Col>
          <Col xs={24} md={18}>
            <Descriptions column={1} bordered size="middle">
              <Descriptions.Item label="Restaurant Name">{profileData.name}</Descriptions.Item>
              <Descriptions.Item label="Owner">{profileData.owner}</Descriptions.Item>
              <Descriptions.Item label="Email">{profileData.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{profileData.phone}</Descriptions.Item>
              <Descriptions.Item label="Address">{profileData.address}</Descriptions.Item>
              <Descriptions.Item label="Registered On">{profileData.registeredOn}</Descriptions.Item>
            </Descriptions>

            <Button
              type="primary"
              icon={<EditOutlined />}
              className="edit-button"
            >
              Edit Profile
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default RestaurantProfile;
