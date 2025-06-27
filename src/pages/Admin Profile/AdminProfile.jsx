import React from "react";

const MyProfile = () => {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email"); 

  return (
    <div className="bg-white shadow-md rounded p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-red-500">My Profile</h2>
      <div className="space-y-4 text-gray-700">
        <div>
          <strong>Name:</strong> {name || "N/A"}
        </div>
        <div>
          <strong>Email:</strong> {email || "example@admin.com"}
        </div>
        <div>
          <strong>Role:</strong> Admin
        </div>
     
      </div>
    </div>
  );
};

export default MyProfile;
