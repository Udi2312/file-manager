import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT token
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white px-6 py-4 flex justify-between items-center rounded-lg mb-6 shadow-sm">
      <h1 className="text-xl font-semibold text-gray-900">
        File Manager
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 font-medium text-sm"
      >
        Logout
      </button>
    </nav>
  );
}
