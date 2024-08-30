"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebarr";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import SweetAlert from "@/app/components/alert/SweetAlert";
import Cookies from "js-cookie";

function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const [data, setData] = useState([]);
  const [sendData, setsendData] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [activeCustomers, setActiveCustomers] = useState(0);
  const [inactiveCustomers, setInactiveCustomers] = useState(0);

  const handleLogout = (e) => {
    e.preventDefault();
    Cookie.remove("authToken");
    router.push("/auth/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const prepareDataForCsv = (data) => {
    return data.map((item) => ({
      name: item.contact.name,
      email: item.contact.email,
      number: item.contact.number,
      country: item.contact.country,
      city: item.contact.city,
      projects: item.projectsQuoted,
      status: item.status,
    }));
  };

  let csvdata = [];

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("authToken");
      const response = await axios.get("../../../api/customer", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data);
      csvdata = prepareDataForCsv(response.data.data);
      setsendData(csvdata);

      const total = response.data.data.length;

      const inactiveCount = response.data.data.filter(
        (item) => item.status === "inactive"
      ).length;

      const activeCount = total - inactiveCount;

      setTotalCustomers(total);
      setActiveCustomers(activeCount);
      setInactiveCustomers(inactiveCount);

      setFilteredData(response.data.data);
    };
    fetchData();
  }, []);

  const downloadcsv = async () => {
    try {
      const response = await axios.post("../../../api/csv", sendData, {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "text/csv" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    if (query === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (item) =>
          item.contact.name.toLowerCase().includes(query) ||
          item.status.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`../../../api/customer/${id}`);
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
        <div className="fixed z-50">
          <Sidebar isSidebarOpen={isSidebarOpen} handleLogout={handleLogout} />
        </div>

        <main className="flex-1 p-3 pt-4 h-screen bg-white overflow-y-auto z-1 lg:ml-64 lg:mt-20">
          <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 mt-4">
              <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <h1 className="text-gray-700 font-medium text-2xl">
                  Customers Overview
                </h1>
                <div className="flex flex-wrap items-center lg:order-2 md:order-2 lg:mt-0 mt-6 w-full lg:w-auto justify-start z-1">
                  <div className="mx-4 px-1 py-1 rounded-lg ml-0">
                    <Link className="text-md" href={"../customers/add"}>
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="mr-2 text-indigo-600"
                      />
                      Customer
                    </Link>
                  </div>
                  <div className="mx-4 px-1 py-1 rounded-lg">
                    <button className="text-md" onClick={downloadcsv}>
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        className="mr-2 text-indigo-600"
                      />
                      CSV
                    </button>
                  </div>
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
                        placeholder="Search customer or status"
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

          <section className="text-gray-700 body-font mb-4">
            <div className="container px-5 py-6 mx-auto">
              <div className="flex flex-wrap -m-4 text-center justify-center w-full">
                {/* Box 1 */}
                <div className="p-2 md:w-1/4 sm:w-1/2 w-full">
                  <div className="bg-white shadow-md px-3 py-4 rounded-lg transform transition duration-500 hover:scale-105">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="text-indigo-500 w-8 h-8 mb-2 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                    </svg>
                    <h2 className="title-font font-medium text-xl text-gray-900">
                      {totalCustomers}
                    </h2>
                    <p className="leading-relaxed text-sm">Total Customers</p>
                  </div>
                </div>
                {/* Box 2 */}
                <div className="p-2 md:w-1/4 sm:w-1/2 w-full">
                  <div className="bg-white shadow-md px-3 py-4 rounded-lg transform transition duration-500 hover:scale-105">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="text-indigo-500 w-8 h-8 mb-2 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                    </svg>
                    <h2 className="title-font font-medium text-xl text-gray-900">
                      {activeCustomers}
                    </h2>
                    <p className="leading-relaxed text-sm">Active Customers</p>
                  </div>
                </div>
                {/* Box 3 */}
                <div className="p-2 md:w-1/4 sm:w-1/2 w-full">
                  <div className="bg-white shadow-md px-3 py-4 rounded-lg transform transition duration-500 hover:scale-105">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="text-indigo-500 w-8 h-8 mb-2 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                    </svg>
                    <h2 className="title-font font-medium text-xl text-gray-900">
                      {inactiveCustomers}
                    </h2>
                    <p className="leading-relaxed text-sm">
                      Inactive Customers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="relative overflow-x-auto ">
            <div className="min-w-full max-w-screen-lg overflow-x-auto">
              <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 bg-white rounded-lg shadow-lg ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 overflow-x-auto">
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
                      Projects
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Projects
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 ">
                  {(filteredData.length > 0 ? filteredData : data).map(
                    (item) => (
                      <tr key={item._id} className="bg-white border-b">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {item.contact.name}
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {item.contact.email}
                        </td>
                        <td className="px-6 py-4">{item.contact.number}</td>
                        <td className="px-6 py-4">{item.contact.country}</td>
                        <td className="px-6 py-4">{item.contact.city}</td>
                        <td className="px-6 py-4">{item.projectsQuoted}</td>
                        <td className="px-6 py-4">{item.status}</td>
                        <td className="px-6 py-4">
                          {item.status === "closed" ? (
                            <span className="text-gray-500 cursor-not-allowed">
                              Quoted
                            </span>
                          ) : (
                            <Link
                              href={`../projects/${item._id}`}
                              className="text-green-500 hover:text-green-700"
                            >
                              Quoted
                            </Link>
                          )}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(item.contact._id)}
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
