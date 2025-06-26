import React, { useState } from "react";
import {
  Typography,
  Card,
  Tag,
  Row,
  Col,
  Modal,
  Button,
  Switch,
  message,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import "./Offers.css";

const { Title } = Typography;

const initialOffersData = [
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
  const [offers, setOffers] = useState(initialOffersData);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleToggleStatus = (key) => {
    const updatedOffers = offers.map((offer) => {
      if (offer.key === key) {
        const newStatus = offer.status === "Active" ? "Expired" : "Active";
        message.success(`Offer status changed to ${newStatus}`);
        return { ...offer, status: newStatus };
      }
      return offer;
    });
    setOffers(updatedOffers);
  };

  const showModal = (offer) => {
    setSelectedOffer(offer);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOffer(null);
  };

  return (
    <div className="offers-container">
      <Title level={3} className="page-heading">
        Offers & Promotions
      </Title>

      <Row gutter={[16, 16]}>
        {offers.map((offer) => (
          <Col xs={24} sm={12} md={8} key={offer.key}>
            <Card className="offer-card" bordered={false}>
              <div className="offer-header">
                <strong className="offer-title">{offer.title}</strong>
                <Tag color={statusColors[offer.status]}>{offer.status}</Tag>
              </div>
              <p className="offer-description">{offer.description}</p>
              <p className="offer-code">
                <strong>Use Code:</strong> {offer.code}
              </p>
              <p className="offer-expiry">Valid till: {offer.expiry}</p>
              <div className="offer-actions">
                <Button
                  type="link"
                  icon={<EyeOutlined />}
                  onClick={() => showModal(offer)}
                >
                  View
                </Button>
                <Switch
                  checked={offer.status === "Active"}
                  onChange={() => handleToggleStatus(offer.key)}
                  checkedChildren="Active"
                  unCheckedChildren="Expired"
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Offer Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedOffer && (
          <div className="offer-modal-content">
            <p>
              <strong>Title:</strong> {selectedOffer.title}
            </p>
            <p>
              <strong>Description:</strong> {selectedOffer.description}
            </p>
            <p>
              <strong>Code:</strong> {selectedOffer.code}
            </p>
            <p>
              <strong>Expiry:</strong> {selectedOffer.expiry}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <Tag color={statusColors[selectedOffer.status]}>
                {selectedOffer.status}
              </Tag>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Offers;
