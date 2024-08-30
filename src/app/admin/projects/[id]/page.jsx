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

function Page({ params }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const [newData, setnewData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleem, setModalVisibleem] = useState(false);
  const [modalDescription, setModalDescription] = useState("");
  const [employees, setEmployees] = useState([]);
  const [projectid, setid] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  console.log("id asked for at frontend:", params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`../../../api/projects/${params.id}`);
        setnewData(response.data.data);
      } catch (error) {
        SweetAlert("Error", "Error in fetching data", "error");
      }
    };
    fetchData();
  }, []);

  const Assign = async () => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get("../../../api/employee", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Employees data: ", response.data.data);
      setEmployees(response.data.data);
      response.data.data.map((item) => console.log(item.picture));
    } catch (error) {
      console.log("Api not called");
    }
  };

  const handleCheckboxChange = (employeeId) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(employeeId)
        ? prevSelected.filter((id) => id !== employeeId)
        : [...prevSelected, employeeId]
    );
  };

  const handleAssign = async () => {
    const obj = {
      project_id: projectid,
      selected_emp: selectedEmployees,
    };
    try {
      const response = await axios.post("../../../api/assigned_project", obj);
      if (response.data.status === 200) {
        window.location.reload();
      }
      if (response.data.status === 500) {
        SweetAlert("Error", response.data.message, "error");
      }
    } catch (error) {
      SweetAlert("Error", "Api not hit", "error");
    }
  };

  console.log("Employees:", employees.name);
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
      const filtered = newData.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.status.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, newData]);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`../../../api/projects/${id}`);
      SweetAlert("Success", response.data.message, "success");
      window.location.reload();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error occurred";
      SweetAlert("Error", errorMessage, "error");
    }
  };

  const handleShowModal = (description) => {
    setModalDescription(description);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalDescription("");
  };

  const handleShowModalem = (id) => {
    console.log("project Id: ", id);
    setid(id);
    setModalVisibleem(true);
  };
  const handleCloseModalem = () => {
    setSelectedEmployees("");
    setModalVisibleem(false);
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
                    Customer Projects Overview
                  </h1>
                  <p className="font-light text-sm">
                    <span>
                      <Link href={"../customers/list"}>Customer overview</Link>
                    </span>{" "}
                    / Project Overview
                  </p>
                </div>

                <div className="flex items-center lg:order-2 ">
                  <div className="mx-4 px-2 py-1 rounded-lg">
                    <Link
                      className="text-md"
                      href={`../projects/add/${params.id}`}
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="mr-2 text-indigo-600"
                      />
                      Project
                    </Link>
                  </div>

                  <form className="max-w-md mx-auto">
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

          <div className="relative overflow-x-auto lg:overflow-x-auto pt-12">
            <div className="min-w-full max-w-screen-lg overflow-x-auto lg:overflow-x-auto ">
              <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 bg-white rounded-lg shadow-lg ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 overflow-x-auto lg:overflow-x-auto ">
                  <tr>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Timeline
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Budget
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      status
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Download
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Assign
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
                          {item.category}
                        </td>
                        <td className="px-6 py-4">{item.timeline}</td>
                        <td className="px-6 py-4">{item.budget}</td>
                        <td className="px-6 py-4">{item.status}</td>
                        <td
                          className="px-6 py-4 cursor-pointer"
                          onClick={() => handleShowModal(item.description)}
                        >
                          {item.description.substring(0, 5)}...
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDownload(item.file)}
                            className="text-green-500 hover:text-green-700"
                          >
                            File
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className={`text-indigo-500 hover:text-indigo-700 ml-1 ${
                              item.status.toLowerCase() === "pending"
                                ? ""
                                : "opacity-50 cursor-not-allowed"
                            }`}
                            onClick={() => {
                              if (item.status.toLowerCase() === "pending") {
                                Assign();
                                handleShowModalem(item._id);
                              }
                            }}
                            disabled={item.status.toLowerCase() !== "pending"}
                          >
                            Assign
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
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <p>{modalDescription}</p>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {modalVisibleem && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-12 rounded-lg shadow-lg max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Select Employees</h2>
            <ul className="space-y-2">
              {employees.map((employee) => (
                <li
                  key={employee._id}
                  className="flex items-center space-x-4 p-2 "
                >
                  <input
                    type="checkbox"
                    id={`employee-${employee._id}`}
                    checked={selectedEmployees.includes(employee._id)}
                    onChange={() => handleCheckboxChange(employee._id)}
                    className="h-5 w-5"
                  />
                  <img
                    src={employee.picture}
                    alt={employee.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                  <label
                    htmlFor={`employee-${employee._id}`}
                    className="ml-2 flex-1 text-gray-800"
                  >
                    {employee.name} - {employee.position}
                  </label>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleAssign}
                className="bg-indigo-500 text-white px-4 py-2 rounded m-4"
              >
                Assign
              </button>
              <button
                onClick={handleCloseModalem}
                className="bg-gray-500 text-white px-4 py-2 rounded m-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
