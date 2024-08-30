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
  const [assign, setassign] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [update, setupdate] = useState([]);
  const [modalVisibleupdate, setModalVisibleupdate] = useState(false);
  const [status, setstatus] = useState("");
  const [employeedata, setemployees] = useState();
  const [selectedemp, setselected] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

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
      //  const token = Cookies.get("authToken");
      const response = await axios.get("../../../api/assigned_project");
      setData(response.data.data);
      console.log(response.data.data);
      // csvdata = prepareDataForCsv(response.data.data);
      // setsendData(csvdata);

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
          item.name.toLowerCase().includes(query) ||
          item.status.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    }
  }, []);
  const handleShowModal = (proj) => {
    console.log("projects: ", proj);
    setassign(proj);
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleModelupdate = async (proj, status, selectedemp) => {
    console.log("projects: ", proj);
    setupdate(proj);
    setstatus(status);
    setModalVisibleupdate(true);
    setselected(selectedemp);
    setSelectedEmployees(selectedemp.map((emp) => emp.id));
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get("../../../api/employee", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("employee data:", response.data.data);
      setemployees(response.data.data);
    } catch (error) {
      console.log("Data not fetched");
    }
  };
  const handleCloseUpdate = () => {
    setModalVisibleupdate(false);
  };

  const handleStatusChange = (e) => {
    setstatus(e.target.value);
  };
  const handleCheckboxChange = (employeeId) => {
    setSelectedEmployees((prevSelectedEmployees) => {
      if (prevSelectedEmployees.includes(employeeId)) {
        return prevSelectedEmployees.filter((id) => id !== employeeId);
      } else {
        return [...prevSelectedEmployees, employeeId];
      }
    });
  };

  const handleUpdate = async () => {
    try {
      const obj = {
        assign: update,
        status: status,
        employees: selectedEmployees,
      };
      const response = await axios.put("../../../api/assigned_project", obj);
      if (response.data.status === 200) {
        SweetAlert("Success", response.data.message, "success");
        window.location.reload();
      } else {
        SweetAlert("Error", response.data.message, "error");
      }
    } catch (error) {
      SweetAlert("Error", "Try again later", "error");
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
                <h1 className="text-gray-700 font-medium text-2xl">
                  Assigned Projects Overview
                </h1>
                <div className="flex items-center lg:order-2 ">
                  <div className="mx-4 px-2 py-1 rounded-lg">
                    <button className="text-md" onClick={downloadcsv}>
                      <FontAwesomeIcon
                        icon={faArrowDown}
                        className="mr-2 text-indigo-600"
                      />
                      CSV
                    </button>
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
                        placeholder="Search Assigned Project or status"
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

          <div className="relative overflow-x-auto">
            <div className="min-w-full max-w-screen-lg overflow-x-auto">
              <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 bg-white rounded-lg shadow-lg  mt-12">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 overflow-x-auto">
                  <tr>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Timeline
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Budget
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Assigned Employees
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Action
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
                          {item.timeline}
                        </td>
                        <td className="px-6 py-4">{item.budget}</td>
                        <td className="px-6 py-4">{item.status}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleShowModal(item.assignedEmp)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Selected
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            className="text-green-500 hover:text-green-700"
                            onClick={() =>
                              handleModelupdate(
                                item._id,
                                item.status,
                                item.assignedEmp
                              )
                            }
                          >
                            Update
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
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-12 rounded-lg shadow-lg max-w-lg">
            <ul className="space-y-2">
              {assign.map((employee) => (
                <li
                  key={employee._doc._id}
                  className="flex items-center space-x-4 p-2"
                >
                  <img
                    src={employee._doc.picture}
                    alt={employee._doc.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <label className="flex-1 text-gray-800">
                    {employee._doc.name} - {employee._doc.position}
                  </label>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded m-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {modalVisibleupdate && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white px-20 rounded-lg shadow-lg max-w-xl">
            {/* Project Status Radio Buttons */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Project Status:
              </h3>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="status"
                    value="In Progress"
                    checked={status === "In Progress"}
                    onChange={handleStatusChange}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">In Progress</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="status"
                    value="Completed"
                    checked={status === "Completed"}
                    onChange={handleStatusChange}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">Completed</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="status"
                    value="Cancelled"
                    checked={status === "Cancelled"}
                    onChange={handleStatusChange}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">Cancelled</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="status"
                    value="On Hold"
                    checked={status === "On Hold"}
                    onChange={handleStatusChange}
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">On Hold</span>
                </label>
              </div>
            </div>

            {/* Employee Selection Checkboxes */}
            <h2 className="text-lg font-semibold mb-4 mt-6">
              Select Employees
            </h2>
            <div className="space-y-2">
              {Array.isArray(employeedata) && employeedata.length > 0 ? (
                employeedata.map((employee) => (
                  <li
                    key={employee._id}
                    className="flex items-center space-x-4 p-2"
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
                ))
              ) : (
                <p>No employees available.</p>
              )}
            </div>

            {/* Close Button */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleUpdate}
                className="bg-indigo-500 text-white px-4 py-2 rounded m-4"
              >
                Update
              </button>
              <button
                onClick={handleCloseUpdate}
                className="bg-gray-500 text-white px-4 py-2 rounded m-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
