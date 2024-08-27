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
import DOMPurify from "dompurify";

function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const [data, setData] = useState([]);
  const [sendData, setsendData] = useState([]);
  const [description, setModalDescription] = useState("");
  const [modalVisible, setModalVisible] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  let csvdata = [];
  const [expandedHeader, setExpandedHeader] = useState(null);

  const handleHeaderClick = (header) => {
    if (expandedHeader === header) {
      setExpandedHeader(null);
    } else {
      setExpandedHeader(header);
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

  const stripHtmlTags = (html) => {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  };

  const prepareDataForCsv = (data) => {
    return data.map((item) => {
      const content = stripHtmlTags(item.blogDetails);
      return {
        Header: item.header,
        Sub_Heading: item.subheading,
        Date: item.date,
        Read_Time: item.readTime,
        Content: content,
      };
    });
  };

  const getPlainTextPreview = (htmlContent, maxLength = 10) => {
    const sanitizedContent = DOMPurify.sanitize(htmlContent);

    const tempElement = document.createElement("div");
    tempElement.innerHTML = sanitizedContent;
    const plainText = tempElement.textContent || tempElement.innerText || "";

    return plainText.substring(0, maxLength);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("authToken");
      const response = await axios.get("../../../api/blog_posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data.data);
      csvdata = prepareDataForCsv(response.data.data);
      setsendData(csvdata);

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    if (query === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.header.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`../../../api/blog_posts/${id}`);
      SweetAlert("Success", response.data.message, "success");
      window.location.reload();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error occurred";
      SweetAlert("Error", errorMessage, "error");
    }
  };

  const handleShowModal = (description) => {
    const sanitizedDetails = DOMPurify.sanitize(description);
    setModalDescription(sanitizedDetails);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalDescription("");
  };
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header toggleSidebar={toggleSidebar} handleLogout={handleLogout} />

      <div className="flex flex-1 bg-white">
        <Sidebar isSidebarOpen={isSidebarOpen} handleLogout={handleLogout} />

        <main className="flex-1 p-3 pt-4 h-screen bg-white overflow-auto">
          <header>
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 mt-4">
              <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <h1 className="text-gray-700 font-medium text-2xl">
                  Blog Posts Overview
                </h1>
                <div className="flex items-center lg:order-2 ">
                  <div className="mx-4 px-2 py-1 rounded-lg">
                    <Link className="text-md" href={"../blog_posts/add"}>
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="mr-2 text-indigo-600"
                      />
                      Blog Post
                    </Link>
                  </div>
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
                        placeholder="Search Blog Post"
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
                      Heading
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Sub-heading
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Read-Time
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Content
                    </th>
                    <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                      Action
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
                        <td
                          className="px-6 py-4 font-medium text-gray-900 cursor-pointer"
                          onClick={() => handleHeaderClick(item.header)}
                        >
                          {expandedHeader === item.header
                            ? item.header
                            : `${item.header.substring(0, 10)}...`}
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {item.subheading}
                        </td>
                        <td className="px-6 py-4">{item.date}</td>
                        <td className="px-6 py-4">{item.readTime}</td>
                        <td
                          className="px-6 py-4 cursor-pointer"
                          onClick={() => handleShowModal(item.blogDetails)}
                        >
                          {getPlainTextPreview(item.blogDetails)}...
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
                            href={`../blog_posts/${item._id}`}
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
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg mx-auto max-h-96 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <p dangerouslySetInnerHTML={{ __html: description }} />
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
