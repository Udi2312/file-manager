import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT token
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center rounded-xl mb-6">
      <h1 className="text-2xl font-bold text-blue-600">
        Secure File Manager
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
      >
        Logout
      </button>
    </nav>
  );
}
