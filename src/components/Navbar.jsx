import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UsersIcon, UserPlusIcon, LayoutDashboardIcon } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path
      ? "border-blue-500 text-gray-900"
      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700";

  const isActiveMobile = (path) =>
    location.pathname === path
      ? "bg-blue-50 border-blue-500 text-blue-700"
      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700";

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <div className="bg-teal-600 p-2 rounded-lg">
                <UsersIcon className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">
                TalentScout
              </span>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link
                to="/dashboard"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${isActive(
                  "/"
                )}`}
              >
                <LayoutDashboardIcon className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
              <Link
                to="/submit"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${isActive(
                  "/submit"
                )}`}
              >
                <UserPlusIcon className="w-4 h-4 mr-2" />
                Add Candidate
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  className="h-8 w-8 rounded-full bg-gray-100"
                  src="https://i.pravatar.cc/150?img=68"
                  alt="User avatar"
                />
                <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-green-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden border-t border-gray-200">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/dashboard"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActiveMobile(
              "/"
            )}`}
          >
            Dashboard
          </Link>
          <Link
            to="/submit"
            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActiveMobile(
              "/submit"
            )}`}
          >
            Add Candidate
          </Link>
        </div>
      </div>
    </nav>
  );
}