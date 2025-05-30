import React from "react";
import "./TermsAndConditions.css"

const TermsAndConditions = () => {
  return (
    <div className="policy-page">
      <h2 className="page-title" style={{textAlign:"left"}}>Terms & <span className="page-title2">Conditions</span> </h2>
      
      <div className="policy-section">
        <h3>1. Introduction</h3>
        <p>
          Welcome to Foodporter Admin Panel. These Terms & Conditions govern your use of the platform and its features. By accessing this panel, you agree to these terms.
        </p>
      </div>

      <div className="policy-section">
        <h3>2. Admin Responsibilities</h3>
        <p>
          Admins are responsible for managing restaurant data, users, orders, payments, and ensuring compliance with Foodporter policies.
        </p>
      </div>

      <div className="policy-section">
        <h3>3. Data Privacy</h3>
        <p>
          All user and restaurant data must be handled securely. Sharing data without permission is strictly prohibited.
        </p>
        
      </div>

      <div className="policy-section">
        <h3>4. Misuse of Access</h3>
        <p>
          Any misuse of the admin panel such as unauthorized edits, deletion of critical data, or breach of user trust may result in termination of admin access.
        </p>
      </div>

      <div className="policy-section">
        <h3>5. Modifications</h3>
        <p>
          Foodporter reserves the right to update these terms anytime. Admins will be notified of significant changes.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
