import React, { useState } from "react";
import {
  Typography,
  Table,
  Tag,
  Button,
  Space,
  Modal,
  Segmented,
} from "antd";
import { EyeOutlined } from "@ant-design/icons";
import "./Transactions.css";

const { Title } = Typography;

// Dummy data
const transactionsData = [
  {
    key: "1",
    transactionId: "#TXN1001",
    date: "2025-05-01",
    customer: "Amit Sharma",
    amount: 450,
    status: "Success",
  },
  {
    key: "2",
    transactionId: "#TXN1002",
    date: "2025-05-02",
    customer: "Pooja Reddy",
    amount: 320,
    status: "Pending",
  },
  {
    key: "3",
    transactionId: "#TXN1003",
    date: "2025-05-03",
    customer: "Rohit Verma",
    amount: 550,
    status: "Failed",
  },
  {
    key: "4",
    transactionId: "#TXN1004",
    date: "2025-05-04",
    customer: "Suman Sinha",
    amount: 600,
    status: "Success",
  },
];

const statusColors = {
  Success: "green",
  Pending: "orange",
  Failed: "red",
};

const Transactions = () => {
  const [filterStatus, setFilterStatus] = useState("All");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleView = (record) => {
    setSelectedTransaction(record);
    setModalVisible(true);
  };

  const filteredData =
    filterStatus === "All"
      ? transactionsData
      : transactionsData.filter((t) => t.status === filterStatus);

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <span>₹{amount.toLocaleString()}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={statusColors[status] || "default"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          size="small"
          onClick={() => handleView(record)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="transactions-container">
      <Title level={3} className="page-heading">
        Transactions
      </Title>

      <Segmented
        options={["All", "Success", "Pending", "Failed"]}
        value={filterStatus}
        onChange={setFilterStatus}
        style={{ marginBottom: 20 }}
      />

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        rowKey="transactionId"
        className="transactions-table"
      />

      <Modal
        title="Transaction Details"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedTransaction && (
          <div>
            <p><strong>Transaction ID:</strong> {selectedTransaction.transactionId}</p>
            <p><strong>Date:</strong> {selectedTransaction.date}</p>
            <p><strong>Customer:</strong> {selectedTransaction.customer}</p>
            <p><strong>Amount:</strong> ₹{selectedTransaction.amount}</p>
            <p>
              <strong>Status:</strong>{" "}
              <Tag color={statusColors[selectedTransaction.status]}>
                {selectedTransaction.status}
              </Tag>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Transactions;
