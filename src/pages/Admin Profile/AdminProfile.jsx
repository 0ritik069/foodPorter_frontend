import React from "react";

const MyProfile = () => {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
     
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            My Profile
          </h2>
          <p className="text-sm text-gray-600">
            View your admin information below
          </p>
        </div>
      </div>

      
      <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-semibold text-sm text-gray-500 mb-1">Name</p>
            <p className="text-lg font-medium">{name || "N/A"}</p>
          </div>

          <div>
            <p className="font-semibold text-sm text-gray-500 mb-1">Email</p>
            <p className="text-lg font-medium">
              {email || "example@admin.com"}
            </p>
          </div>

          <div>
            <p className="font-semibold text-sm text-gray-500 mb-1">Role</p>
            <p className="text-lg font-medium text-red-600">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
