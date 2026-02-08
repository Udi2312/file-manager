import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

   const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
     setLoading(true);
    console.log("Login Data:", form);

    // TODO: Backend API call
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }

      // ✅ Save token in localStorage
      localStorage.setItem("token", data.token);

      alert("✅ Login Successful!");
      navigate("/dashboard");
    } catch (error) {
      console.log("Login Error:", error);
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <AuthCard
      title="Login"
      footer={
        <>
          New user?{" "}
          <a href="/register" className="text-blue-600 font-semibold">
            Register
          </a>
        </>
      }
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </AuthCard>
  );
}
