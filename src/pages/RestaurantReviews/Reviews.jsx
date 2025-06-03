import React, { useState } from "react";
import {
  Typography,
  List,
  Rate,
  Card,
  Button,
  Modal,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import "./Reviews.css";

const { Title } = Typography;

const reviewsData = [
  {
    key: "1",
    customer: "Amit Sharma",
    rating: 5,
    review: "Great food and quick delivery. Highly recommend!",
    date: "2025-05-10",
  },
  {
    key: "2",
    customer: "Pooja Reddy",
    rating: 4,
    review: "Tasty dishes but packaging could be improved.",
    date: "2025-05-12",
  },
  {
    key: "3",
    customer: "Rohit Verma",
    rating: 3,
    review: "Average experience, food was a bit cold.",
    date: "2025-05-13",
  },
];

const Reviews = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleView = (item) => {
    setSelectedReview(item);
    setIsModalVisible(true);
  };

  return (
    
    <div className="reviews-container">
      <Title level={3} className="page-heading">
        Customer Reviews
      </Title>

      <List
        itemLayout="vertical"
        dataSource={reviewsData}
        renderItem={(item) => (
          <Card key={item.key} className="review-card" bordered={false}>
            <List.Item>
              <List.Item.Meta
                title={<strong>{item.customer}</strong>}
                description={
                  <>
                    <Rate disabled defaultValue={item.rating} />
                    <span className="review-date">{item.date}</span>
                  </>
                }
              />
              <div className="review-text">{item.review}</div>
              <Button
                icon={<EyeOutlined />}
                size="small"
                type="primary"
                onClick={() => handleView(item)}
                style={{ marginTop: "10px" }}
              >
                View
              </Button>
            </List.Item>
          </Card>
        )}
      />

      <Modal
        title="Review Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedReview && (
          <div>
            <p><strong>Customer:</strong> {selectedReview.customer}</p>
            <p><strong>Date:</strong> {selectedReview.date}</p>
            <p><strong>Rating:</strong> <Rate disabled defaultValue={selectedReview.rating} /></p>
            <p><strong>Review:</strong> {selectedReview.review}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Reviews;
