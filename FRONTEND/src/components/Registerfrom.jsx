import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/user.api.js";

const Registerform = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending to backend:", { name, email, password });
      const response = await registerUser({
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });
      if (response.success) {
        navigate("/dashboard"); // Redirect to homepage after successful registration
      }
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="bg-[#111] h-screen w-full flex justify-center items-center">
      <div className="bg-[#e7e5e5] w-[40%] h-[70%] rounded-md">
        <h1 className="text-4xl font-bold text-center mt-8">Register</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center mt-10"
        >
          <div className="w-[80%] mb-4">
            <label
              htmlFor="name"
              className="block text-lg font-semibold text-blue-700 mb-2"
            >
              Name:
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white border-2 border-blue-500 w-full p-2 rounded-md"
              placeholder="Enter your name"
              required
            />
          </div>

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

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <button
            type="submit"
            className="bg-blue-500 w-[80%] text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Register
          </button>

          <p className="mt-4 text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:text-blue-600"
            >
              Login here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registerform;
