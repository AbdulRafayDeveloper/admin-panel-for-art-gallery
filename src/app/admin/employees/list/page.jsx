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
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [activeEmployees, setActiveEmployees] = useState(0);
  const [inactiveEmployees, setInactiveEmployees] = useState(0);

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
      name: item.name,
      email: item.email,
      number: item.number,
      country: item.country,
      city: item.city,
      position: item.position,
      salary: item.salary,
      date: item.date_of_join,
      gender: item.gender,
      jobType: item.job_type,
      status: item.status,
    }));
  };

  let csvdata = [];

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("authToken");
      const response = await axios.get("../../../api/employee", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data);
      csvdata = prepareDataForCsv(response.data.data);
      setsendData(csvdata);

      const total = response.data.data.length;
      const activeCount = response.data.data.map(
        (item) => item.status === "active"
      ).length;
      const inactiveCount = total - activeCount;

      setTotalEmployees(total);
      setActiveEmployees(activeCount);
      setInactiveEmployees(inactiveCount);

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
          item.name.toLowerCase().includes(query) ||
          item.status.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  const handleDelete = async (id) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.delete(`../../../api/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      SweetAlert("Success", response.data.message, "success");
      window.location.reload();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error occurred";
      SweetAlert("Error", errorMessage, "error");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} handleLogout={handleLogout} />

      <div className="flex flex-1 bg-white">
        <div className="fixed z-50">
          <Sidebar isSidebarOpen={isSidebarOpen} handleLogout={handleLogout} />
        </div>

        <main className="flex-1 p-3 pt-4 h-screen bg-white overflow-y-auto lg:ml-64 lg:mt-20">
          <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 mt-4 overflow-auto">
              <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <h1 className="text-gray-700 font-medium text-2xl">
                  Employees Overview
                </h1>

                <div className="flex flex-wrap items-center lg:order-2 md:order-2 lg:mt-0 mt-6 w-full lg:w-auto justify-start z-1">
                  <div className="mx-4 px-1 py-1 rounded-lg ml-0">
                    <Link className="text-md" href={"../employees/add"}>
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="mr-2 text-indigo-600"
                      />
                      Employee
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
                        placeholder="Search Employee or status"
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

          <div className="relative overflow-x-auto overflow-y-auto mt-8">
            <div className="min-w-full max-w-screen-lg overflow-x-auto overflow-y-auto">
              <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 bg-white rounded-lg shadow-lg ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 overflow-x-auto overflow-y-auto">
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
                      Position
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Salary
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Date of Join
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Gender
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Job Type
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Picture
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      CV
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Delete
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 ">
                  {(filteredData.length > 0 ? filteredData : data).map(
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
                        <td className="px-6 py-4">{item.position}</td>
                        <td className="px-6 py-4 text-gray-900">
                          {item.salary}
                        </td>
                        <td className="px-6 py-4">{item.date_of_join}</td>
                        <td className="px-6 py-4">{item.gender}</td>
                        <td className="px-6 py-4">{item.job_type}</td>

                        <td className="px-6 py-4">
                          <img
                            src={`${item.picture}`}
                            alt="Software Company team member"
                            className="w-12 h-12"
                          />
                        </td>
                        <td className="px-6 py-4">{item.status}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDownload(item.cv)}
                            className="text-green-500 hover:text-green-700"
                          >
                            CV
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            className="text-indigo-500 hover:text-indigo-700"
                            href={`../employees/${item._id}`}
                          >
                            Update
                          </Link>
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
