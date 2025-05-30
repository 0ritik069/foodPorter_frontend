import React, { useState } from "react";
import Chart from "react-apexcharts";
const adminName = localStorage.getItem("name");

const Dashboard = () => {
  const [donutOptions] = useState({
    labels: ["New Orders", "Customer Growth", "Total Revenue"],
    legend: { show: false },
    colors: ["#ff6b6b", "#f4a460", "#f9c80e"],
  });

  const [donutSeries] = useState([45, 21, 34]);

  const [lineOptions] = useState({
    chart: { id: "line-chart" },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    stroke: { curve: "smooth" },
    colors: ["#1e90ff"],
  });

  const [lineSeries] = useState([
    {
      name: "Order",
      data: [20, 30, 35, 40, 50, 45, 40, 38, 30, 33, 37, 50],
    },
  ]);

  const [barOptions] = useState({
    chart: { id: "revenue-bar" },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    colors: ["#ff6b6b", "#f4a460", "#1e90ff"],
  });

  const [barSeries] = useState([
    {
      name: "Total Revenue",
      data: [120, 200, 250, 300, 280, 260, 310, 350, 400],
    },
  ]);

  const [stackedOptions] = useState({
    chart: { stacked: true },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    colors: ["#f9c80e", "#ff6b6b"],
  });

  const [stackedSeries] = useState([
    {
      name: "Returning Customers",
      data: [20, 30, 25, 35, 40, 30],
    },
    {
      name: "New Customers",
      data: [40, 50, 45, 40, 35, 45],
    },
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Hi <span className="text-blue-500">{adminName}</span>,
          </h2>
          <p className="text-sm text-gray-600">
            Welcome back to the Admin Dashboard
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "New Orders", value: 75, color: "bg-red-100 text-red-600" },
          {
            label: "New Customers",
            value: 357,
            color: "bg-yellow-100 text-yellow-600",
          },
          {
            label: "New Restaurants",
            value: 65,
            color: "bg-green-100 text-green-600",
          },
          {
            label: "Total Revenue",
            value: "$128",
            color: "bg-blue-100 text-blue-600",
          },
        ].map((item, idx) => (
          <div key={idx} className={`p-4 rounded shadow ${item.color}`}>
            <p className="text-sm font-medium">{item.label}</p>
            <h4 className="text-xl font-bold">{item.value}</h4>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Donut */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Pie Chart</h3>
          <Chart
            options={donutOptions}
            series={donutSeries}
            type="donut"
            width="100%"
          />
        </div>

        {/* Line */}
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Chart Order</h3>
            <button className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
              See Report
            </button>
          </div>
          <Chart
            options={lineOptions}
            series={lineSeries}
            type="line"
            width="100%"
          />
        </div>

        {/* Bar */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
          <Chart
            options={barOptions}
            series={barSeries}
            type="bar"
            width="100%"
          />
        </div>

        {/* Stacked */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Customer Map</h3>
          <Chart
            options={stackedOptions}
            series={stackedSeries}
            type="bar"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
