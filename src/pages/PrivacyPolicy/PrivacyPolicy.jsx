import React from "react";
import "./PrivacyPolicy.css"
const PrivacyPolicy = () => {
  return (
    <div className="policy-page">
      <h2 className="page-title">Privacy  <span className="page-title2">Policy</span></h2>

      <div className="policy-section">
        <h3>1. Data Collection</h3>
        <p>
          We collect information such as names, email addresses, contact details, and restaurant data to ensure efficient platform operation.
        </p>
      </div>

      <div className="policy-section">
                                          
        <h3>2. Data Usage</h3>
        <p>
          The collected data is used strictly for managing restaurant operations, processing orders, handling payments, and communication purposes.
        </p>
      </div>

      <div className="policy-section">
        <h3>3. Data Security</h3>
        <p>
          All data is stored securely and accessible only to authorized admins. We implement industry-standard encryption and access controls.
        </p>
      </div>

      <div className="policy-section">
        <h3>4. Third-party Sharing</h3>
        <p>
          Foodporter does not sell or share personal data with third parties unless required by law or explicitly agreed upon by the user.
        </p>
      </div>

      <div className="policy-section">
        <h3>5. Updates</h3>
        <p>
          We may update this Privacy Policy occasionally. Any significant changes will be communicated to the admins.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
