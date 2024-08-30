"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import axios from "axios";
import Sidebar from "../components/sidebar/Sidebarr";
import Header from "../components/header/Header";
import SweetAlert from "@/app/components/alert/SweetAlert";

function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDescription, setModalDescription] = useState("");
  const [modalMessages, setModalMessages] = useState([]);

  const handleShowModal = (messages) => {
    setModalMessages(messages);
    setModalVisible(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("../../../api/messages");
      setData(response.data.data);
      console.log(response.data);
      setFilteredData(response.data.data);
    };
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    if (query === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.contact.name.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  const handleDeleteMessage = async (id) => {
    try {
      const response = await axios.delete(`../../../api/messages/${id}`);
      if (response.data.status == 200) {
        SweetAlert("Success", response.data.message, "success");
        window.location.reload();
      } else {
        SweetAlert("Error", response.data.message, "error");
      }
    } catch (error) {
      SweetAlert("Error", "Please try again later", "error");
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

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalDescription("");
  };

  console.log("filtered data: ", filteredData);
  console.log("data: ", data);
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
                    Messages overview
                  </h1>
                </div>

                <div className="flex items-center lg:order-2 ">
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

          <div className="relative overflow-x-auto mt-12">
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
                      Messages and action
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {(filteredData.length > 0 ? filteredData : data).map(
                    (item) => (
                      <tr key={item.contact._id} className="bg-white border-b">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {item.contact.name}
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {item.contact.email}
                        </td>
                        <td className="px-6 py-4">{item.contact.number}</td>
                        <td className="px-6 py-4">{item.contact.country}</td>
                        <td className="px-6 py-4">{item.contact.city}</td>
                        <td
                          className="px-6 py-4 cursor-pointer text-green-600"
                          onClick={() => handleShowModal(item.messages)}
                        >
                          Show Messages
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
          <div className="bg-white p-12 rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 className="text-lg font-semibold mb-4">Messages</h2>
            <div className="space-y-2">
              {modalMessages.map((message) => (
                <div key={message._id} className="border p-12 rounded-lg">
                  <p>{message.description}</p>
                  <button
                    onClick={() => handleDeleteMessage(message._id)}
                    className="mt-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
