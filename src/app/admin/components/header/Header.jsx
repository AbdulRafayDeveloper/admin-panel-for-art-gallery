"use client";
import React from "react";
import Link from "next/link";

const Header = ({ toggleSidebar, handleLogout }) => {
  return (
    <header className="bg-gray-50 w-full flex items-center justify-between px-4 py-[18px] lg:fixed z-10">
      {/* Logo */}
      <div className="flex-shrink-0">
        <img
          src="/assets/pictures/cy2_copy.png"
          alt="Company Logo"
          className="w-40 h-10 bg-transparent"
        />
      </div>
      <div className="hidden lg:flex flex-grow justify-end">
        <Link
          href="/auth/login"
          onClick={handleLogout}
          className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-white"
        >
          Log out
        </Link>
      </div>

      {/* Menu Button on the right for small screens */}
      <div className="flex-grow flex justify-end lg:hidden">
        <button
          onClick={toggleSidebar}
          className="focus:ring-4 focus:outline-none font-lg rounded-lg text-sm px-4 py-2 text-black"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
