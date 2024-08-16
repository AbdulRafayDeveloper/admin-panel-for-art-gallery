"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faUserGear,
  faDiagramProject,
  faCheckToSlot,
  faEnvelopesBulk,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Sidebar = ({ isSidebarOpen, handleLogout }) => {
  return (
    <aside
      id="default-sidebar"
      className={`fixed left-0 z-40 w-64 h-screen transition-transform  ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } bg-gray-50 shadow-lg pt-4 mt-10 rounded-tr-md lg:translate-x-0 lg:relative lg:w-64`}
      aria-label="Sidebar"
    >
      <div className="px-3 py-4 overflow-y-auto h-full">
        <ul className="space-y-2 font-medium pl-4">
          <li>
            <Link
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group font-light"
            >
              <svg
                className="w-5 h-5 text-gray-400 transition duration-75 group-hover:text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/customers/list"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group font-light"
            >
              <FontAwesomeIcon
                icon={faUserGroup}
                className="flex-shrink-0 w-5 h-5 text-gray-400 transition duration-75 group-hover:text-gray-900"
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Customers</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/messages"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group font-light"
            >
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-400 transition duration-75 group-hover:text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">Messages</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/employees/list"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group font-light"
            >
              <FontAwesomeIcon
                icon={faUserGear}
                className="flex-shrink-0 w-5 h-5 text-gray-400 transition duration-75 group-hover:text-gray-900"
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Employees</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/assigned_projects/list"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group font-light"
            >
              <FontAwesomeIcon
                icon={faDiagramProject}
                className="flex-shrink-0 w-5 h-5 text-gray-400 transition duration-75 group-hover:text-gray-900"
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Projects</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group font-light"
            >
              <FontAwesomeIcon
                icon={faCheckToSlot}
                className="flex-shrink-0 w-5 h-5 text-gray-400 transition duration-75 group-hover:text-gray-900"
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Services</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group font-light"
            >
              <FontAwesomeIcon
                icon={faEnvelopesBulk}
                className="flex-shrink-0 w-5 h-5 text-gray-400 transition duration-75 group-hover:text-gray-900"
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Job Posts</span>
            </Link>
          </li>
        </ul>

        {/* Logout Button inside Sidebar */}
        <div className="mt-auto p-4 lg:hidden">
          <Link
            href="/auth/login"
            onClick={handleLogout}
            className="block w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-white text-center"
          >
            Log out
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
