import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaLink, FaUser, FaSignOutAlt } from "react-icons/fa";
import { currentUser, logoutUser } from "../api/user.api";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // to get the current path

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await currentUser();
        console.log("Fetched user:", userData);
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <FaLink className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                URL Shortener
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/dashboard"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === "/dashboard"
                    ? "border-blue-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/create-url"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === "/create-url"
                    ? "border-blue-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Create URL
              </Link>
            </div>
          </div>

          {/* User Profile Section */}
          {user && (
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {user.data.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.data.email}</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <FaUser className="h-4 w-4 text-gray-600" />
                  </div>
                  <button
                    className="p-2 text-gray-500 hover:text-gray-700"
                    onClick={async () => {
                      try {
                        await logoutUser();
                        navigate("/login");
                      } catch (error) {
                        alert("Logout failed:", error);
                      }
                    }}
                  >
                    <FaSignOutAlt className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
