import React from "react";
import { Typography, Table, Tag, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import "./Transactions.css";

const { Title } = Typography;

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
];

const statusColors = {
  Success: "green",
  Pending: "orange",
  Failed: "red",
};

const Transactions = () => {
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
      render: (amount) => `₹${amount}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={statusColors[status]} key={status}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="primary" size="small" icon={<EyeOutlined />}>
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
      <Table
        columns={columns}
        dataSource={transactionsData}
        pagination={{ pageSize: 5 }}
        bordered={false}
        className="transactions-table"
      />
    </div>
  );
};

export default Transactions;
