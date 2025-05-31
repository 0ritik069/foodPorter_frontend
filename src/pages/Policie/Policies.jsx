import React from "react";
import { FaShieldAlt, FaGavel, FaBalanceScale } from "react-icons/fa";

const policies = [
  {
    id: 1,
    title: "Delivery Safety Policy",
    icon: <FaShieldAlt className="text-blue-600 mr-2" />,
    description: "Ensures safe delivery by allowing police verification for delivery partners in sensitive zones.",
    effectiveDate: "2024-12-01",
  },
  {
    id: 2,
    title: "Law Enforcement Cooperation",
    icon: <FaGavel className="text-green-600 mr-2" />,
    description: "We share incident reports and app data with verified law enforcement requests under legal guidelines.",
    effectiveDate: "2025-01-10",
  },
  {
    id: 3,
    title: "Emergency Response Protocol",
    icon: <FaBalanceScale className="text-red-600 mr-2" />,
    description: "Rapid-response system in case of complaints involving safety threats, abuse, or criminal activity.",
    effectiveDate: "2025-02-18",
  },
];

const Policies = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
         Policies
      </h2>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-600">
          <span className="col-span-1">Policy</span>
          <span className="col-span-2">Description</span>
          <span className="col-span-1">Effective From</span>
        </div>

        {policies.map((policy) => (
          <div
            key={policy.id}
            className="grid grid-cols-4 px-6 py-4 border-t text-sm items-start hover:bg-gray-50"
          >
            <div className="col-span-1 flex items-center font-medium text-gray-800">
              {policy.icon}
              {policy.title}
            </div>
            <div className="col-span-2 text-gray-700">{policy.description}</div>
            <div className="col-span-1 text-gray-600">{policy.effectiveDate}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policies;
