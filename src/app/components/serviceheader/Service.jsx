'use client'
import React, { useState } from 'react';
import Nav from '../navbar/Nav';

function Service({ videoSrc, title, subtitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <section className="relative bg-gray-500 h-screen">
        <div className="absolute inset-0 z-0">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={videoSrc}
            autoPlay
            loop
            muted
          />
        </div>
        <div className="absolute inset-0 bg-gray-500 opacity-10 z-10"></div> {/* Semi-transparent overlay */}
        <div className="relative z-20 h-screen">
          {/* Navigation component (assuming Nav is another component) */}
          {/* Replace Nav with your actual navigation component */}
          <Nav/>
          <div className="flex flex-col items-start justify-center h-full px-12">
            <h1 className="text-white text-5xl font-semibold m-0">{title}</h1>
            <p className="text-white text-3xl font-light">{subtitle}</p>
            <button
              onClick={toggleSidebar}
              aria-controls="default-sidebar"
              type="button"
              className="absolute top-8 left-8 md:hidden z-30 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Service;
