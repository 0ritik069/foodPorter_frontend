import React from "react";
import { Typography, Card, Tag, Row, Col } from "antd";
import "./Offers.css";

const { Title } = Typography;

const offersData = [
  {
    key: "1",
    title: "Flat 20% Off",
    code: "SAVE20",
    description: "Get flat 20% off on orders above ₹300.",
    expiry: "2025-06-30",
    status: "Active",
  },
  {
    key: "2",
    title: "Free Delivery",
    code: "FREESHIP",
    description: "Enjoy free delivery on all orders this weekend.",
    expiry: "2025-05-25",
    status: "Active",
  },
  {
    key: "3",
    title: "₹100 Off",
    code: "FLAT100",
    description: "Flat ₹100 off on your first order.",
    expiry: "2025-04-30",
    status: "Expired",
  },
];

const statusColors = {
  Active: "green",
  Expired: "red",
};

const Offers = () => {
  return (
    <div className="offers-container">
      <Title level={3} className="page-heading">
        Offers & Promotions
      </Title>

      <Row gutter={[16, 16]}>
        {offersData.map((offer) => (
          <Col xs={24} sm={12} md={8} key={offer.key}>
            <Card className="offer-card" bordered={false}>
              <div className="offer-header">
                <strong className="offer-title">{offer.title}</strong>
                <Tag color={statusColors[offer.status]}>{offer.status}</Tag>
              </div>
              <p className="offer-description">{offer.description}</p>
              <p className="offer-code">Use Code: <strong>{offer.code}</strong></p>
              <p className="offer-expiry">Valid till: {offer.expiry}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Offers;
