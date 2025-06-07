import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/user.api.js";

const Loginform = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      if (response.success) {
        navigate("/dashboard"); // Redirect to homepage after successful login
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-[#111] h-screen w-full flex justify-center items-center">
      <div className="bg-[#e7e5e5] w-[40%] h-[60%] rounded-md">
        <h1 className="text-4xl font-bold text-center mt-8">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center mt-10">
          <div className="w-[80%] mb-4">
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-blue-700 mb-2"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border-2 border-blue-500 w-full p-2 rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="w-[80%] mb-6">
            <label
              htmlFor="password"
              className="block text-lg font-semibold text-blue-700 mb-2"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white border-2 border-blue-500 w-full p-2 rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 mb-4">{error}</div>
          )}

          <button
            type="submit"
            className="bg-blue-500 w-[80%] text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>

          <p className="mt-4 text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-500 hover:text-blue-600"
            >
              Register here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Loginform; 