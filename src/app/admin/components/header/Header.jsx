"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SweetAlert from "@/app/components/alert/SweetAlert";

const Header = ({ toggleSidebar, handleLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const input = useRef();

  const handleSearch = (e) => {
    e.preventDefault();

    const routes = {
      dashboard: "/admin/dashboard",
      customer: "/admin/customers",
    };

    const route = routes[searchTerm.toLowerCase()];
    if (route) {
      router.push(route);
    } else {
      SweetAlert("Not Found", "No matching section found.", "error");
    }
  };

  return (
    <header className="bg-gray-50 w-full flex flex-col md:flex-row items-center justify-between px-4 py-[18px]">
      <div className="flex-shrink-0">
        <img
          src="/assets/pictures/cy2_copy.png"
          alt="Company Logo"
          className="w-40 h-10 bg-transparent"
        />
      </div>

      <form
        className="flex items-center space-x-2 flex-grow mt-4 md:mt-0 md:max-w-md w-full"
        onSubmit={handleSearch}
      >
        <label htmlFor="default-search" className="sr-only">
          Search
        </label>
        <div className="relative flex items-center w-full">
          <input
            type="search"
            id="default-search"
            ref={input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-2 px-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search..."
            required
          />
          <button
            type="submit"
            className="ml-6 absolute right-0 top-0 bottom-0 px-4 py-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-white"
          >
            Search
          </button>
        </div>
      </form>

      {/* Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden focus:ring-4 focus:outline-none font-lg rounded-lg text-sm px-4 py-2 text-black mt-4 md:mt-0"
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
      <Link
        href="/auth/login"
        onClick={handleLogout}
        className="hidden lg:block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-white mt-4 md:mt-0"
      >
        Log out
      </Link>
    </header>
  );
};

export default Header;
