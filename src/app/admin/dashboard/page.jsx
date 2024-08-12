"use client";
import React, { useState } from "react";
import Sidebar from "../components/sidebar/Sidebarr";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import Header from "../components/header/Header";

function page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = (e) => {
    e.preventDefault();
    Cookie.remove("authToken");
    router.push("/auth/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} handleLogout={handleLogout} />
      <div className="flex flex-1">
        <Sidebar isSidebarOpen={isSidebarOpen} handleLogout={handleLogout} />
        <main className="flex-1 p-4"></main>
      </div>
    </div>
  );
}

export default page;
