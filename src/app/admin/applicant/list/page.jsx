"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebarr";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import SweetAlert from "@/app/components/alert/SweetAlert";
import Cookie from "js-cookie";

function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const [newData, setnewData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`../../../api/applicant`);
        setnewData(response.data.data);
        console.log("applicant data:", response.data.data);
      } catch (error) {
        SweetAlert("Error", "Error in fetching data", "error");
      }
    };
    fetchData();
  }, []);

  const handleDownload = async (filename) => {
    try {
      const response = await axios({
        url: `../../../api/projects`,
        method: "POST",
        data: { filename },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };
  const handleLogout = (e) => {
    e.preventDefault();
    Cookie.remove("authToken");
    router.push("/auth/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    if (query === "") {
      setFilteredData(newData);
    } else {
      const filtered = newData.filter((item) =>
        item.name.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, newData]);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`../../../api/applicant/${id}`);
      SweetAlert("Success", response.data.message, "success");
      window.location.reload();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error occurred";
      SweetAlert("Error", errorMessage, "error");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header toggleSidebar={toggleSidebar} handleLogout={handleLogout} />

      <div className="flex flex-1 bg-white">
        <div className="fixed">
          <Sidebar isSidebarOpen={isSidebarOpen} handleLogout={handleLogout} />
        </div>

        <main className="flex-1 p-3 pt-4 h-screen bg-white overflow-y-auto z-1 lg:ml-64 lg:mt-20">
          <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 mt-4">
              <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <div className="flex flex-col">
                  <h1 className="text-gray-700 font-medium text-2xl">
                    Job Applicants Overview
                  </h1>
                </div>

                <div className="flex flex-wrap items-center lg:order-2 md:order-2 lg:mt-0 mt-4 w-full lg:w-auto justify-start ">
                  <form className="max-w-xs mt-2">
                    <label
                      htmlFor="default-search"
                      className="mb-2 text-sm font-medium sr-only text-white"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <input
                        type="search"
                        id="default-search"
                        className="block w-full pl-8 mr-2 text-sm text-gray-900 rounded-lg bg-gray-50 focus:ring-blue-500 border-[0.5px] border-gray-200 placeholder-gray-400 focus:border-blue-500 py-2"
                        placeholder="Search applicant"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                      <svg
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                  </form>
                </div>
              </div>
            </nav>
          </header>

          <div className="relative overflow-x-auto lg:overflow-x-auto pt-12">
            <div className="min-w-full max-w-screen-lg overflow-x-auto lg:overflow-x-auto ">
              <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 bg-white rounded-lg shadow-lg ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 overflow-x-auto lg:overflow-x-auto ">
                  <tr>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Number
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Country
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      City
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Gender
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Job Type
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      CV
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      React
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 ">
                  {(filteredData.length > 0 ? filteredData : newData).map(
                    (item) => (
                      <tr key={item._id} className="bg-white border-b">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {item.email}
                        </td>
                        <td className="px-6 py-4">{item.number}</td>
                        <td className="px-6 py-4">{item.country}</td>
                        <td className="px-6 py-4">{item.city}</td>
                        <td className="px-6 py-4">{item.gender}</td>
                        <td className="px-6 py-4">{item.jobTitle}</td>

                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDownload(item.file)}
                            className="text-green-500 hover:text-green-700"
                          >
                            File
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href={`../applicant/add/${item._id}`}
                            className="text-indigo-500 hover:text-indigo-700"
                          >
                            Accept
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Page;
