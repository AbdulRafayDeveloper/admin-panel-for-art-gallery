"use client";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import SweetAlert from "@/app/components/alert/SweetAlert";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";
import { getCountryCallingCode, getName } from "country-list";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import Link from "next/link";
import Sidebar from "@/app/admin/components/sidebar/Sidebarr";
import Header from "@/app/admin/components/header/Header";

function page({ params }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = (e) => {
    e.preventDefault();
    Cookie.remove("authToken");
    router.push("/auth/login");
  };

  console.log(params);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const status = "pending";
  const btnRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [Formdata, setFormdata] = useState({
    projectName: "",
    projectCategory: "",
    projectTimeline: "",
    projectBudget: "",
    file: null,
  });

  const [errorMessages, setErrorMessages] = useState({
    projectName: "",
    projectCategory: "",
    projectTimeline: "",
    projectBudget: "",
    file: null,
  });

  const validateForm = () => {
    const {
      projectName,
      projectCategory,
      projectTimeline,
      projectBudget,
      file,
    } = Formdata;

    let valid = true;

    setErrorMessages({
      projectName: "",
      projectCategory: "",
      projectTimeline: "",
      projectBudget: "",
      file: null,
    });

    if (projectName === "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        projectName: "Project name is required",
      }));
      valid = false;
    }

    if (projectCategory === "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        projectCategory: "Project category is required",
      }));
      valid = false;
    } else if (projectCategory == "Project Category") {
      setErrorMessages((prevState) => ({
        ...prevState,
        city: "Project category is required",
      }));
      valid = false;
    }

    if (projectTimeline === "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        projectTimeline: "Project timeline is required",
      }));
      valid = false;
    } else if (projectTimeline === "Project Timeline") {
      setErrorMessages((prevState) => ({
        ...prevState,
        city: "Project timeline is required",
      }));
      valid = false;
    }

    if (projectBudget === "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        projectBudget: "Project budget is required",
      }));
      valid = false;
    } else if (projectBudget === "Project Budget") {
      setErrorMessages((prevState) => ({
        ...prevState,
        city: "Project budget is required",
      }));
      valid = false;
    }

    if (!file) {
      setErrorMessages((prevState) => ({
        ...prevState,
        file: "File is required",
      }));
      valid = false;
    }

    return valid;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedFormats = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.ms-powerpoint",
    ];

    if (!allowedFormats.includes(file.type)) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        file: "File format must be PDF, DOCX, XLSX or PPTX",
      }));
      setFormdata((prevData) => ({
        ...prevData,
        file: null,
      }));
    } else {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        file: "",
      }));
      setFormdata((prevData) => ({
        ...prevData,
        file,
      }));
    }
  };

  const handleChange = (name, value, countryData) => {
    setFormdata({ ...Formdata, [name]: value });

    if (name === "projectName") {
      if (value.trim() === "") {
        setErrorMessages((prevState) => ({
          ...prevState,
          projectName: "Project name is required",
        }));
      } else {
        setErrorMessages((prevState) => ({ ...prevState, projectName: "" }));
      }
    } else if (name === "projectCategory") {
      if (value.trim() === "" || value === "Project Category") {
        setErrorMessages((prevState) => ({
          ...prevState,
          projectCategory: "Project category is required",
        }));
      } else {
        setErrorMessages((prevState) => ({
          ...prevState,
          projectCategory: "",
        }));
      }
    } else if (name === "projectTimeline") {
      if (value.trim() === "" || value === "Project Timeline") {
        setErrorMessages((prevState) => ({
          ...prevState,
          projectTimeline: "Project timeline is required",
        }));
      } else {
        setErrorMessages((prevState) => ({
          ...prevState,
          projectTimeline: "",
        }));
      }
    } else if (name === "projectBudget") {
      if (value.trim() === "" || value === "Project Budget") {
        setErrorMessages((prevState) => ({
          ...prevState,
          projectBudget: "Project budget is required",
        }));
      } else {
        setErrorMessages((prevState) => ({ ...prevState, projectBudget: "" }));
      }
    }
  };

  const route = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      Formdata.projectName === "" &&
      Formdata.projectCategory === "" &&
      Formdata.projectTimeline === "" &&
      Formdata.projectBudget === "" &&
      Formdata.file === null
    ) {
      validateForm();
      return;
    }

    if (!validateForm()) {
      SweetAlert("Validation Error", "Enter valid values", "error");
      return;
    }
    setIsSubmitting(true);

    const FormdataToSend = new FormData();

    FormdataToSend.append("projname", Formdata.projectName);
    FormdataToSend.append("cat", Formdata.projectCategory);
    FormdataToSend.append("timeline", Formdata.projectTimeline);
    FormdataToSend.append("budget", Formdata.projectBudget);

    // Check if file exists before appending
    if (Formdata.file) {
      FormdataToSend.append("file", Formdata.file);
    } else {
      console.warn("No file to append");
    }

    FormdataToSend.append("status", status);

    // Log FormData entries
    for (let [key, value] of FormdataToSend.entries()) {
      console.log(`${key}:`, value);
    }
    try {
      console.log("Data sent: ", FormdataToSend);
      const response = await axios.post(
        `../../../api/projects/${params.id}`,
        FormdataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      btnRef.current.classList.add("disable");
      if (response.data.status == 200) {
        SweetAlert("Success", response.data.message, "success");
        setFormdata({
          projectName: "",
          projectCategory: "",
          projectTimeline: "",
          projectBudget: "",
          file: null,
        });
        route.push(`../${params.id}`);
      }
      if (response.data.status == 500) {
        SweetAlert("Error", response.data.message, "error");
      }
    } catch (error) {
      console.error("Error:", error);
      SweetAlert("Error", response.data.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header toggleSidebar={toggleSidebar} handleLogout={handleLogout} />

      <div className="flex flex-1 w-full bg-white">
        <div className="fixed">
          <Sidebar isSidebarOpen={isSidebarOpen} handleLogout={handleLogout} />
        </div>

        <main className="flex-1 p-3 pt-4 h-screen bg-white overflow-y-auto z-1 lg:ml-64 lg:mt-20">
          <div className="mb-8 lg:ml-20 ml-8 mt-4">
            <h1 className="text-gray-700 font-medium text-2xl ">
              Add Project{" "}
            </h1>
            <p className="font-light text-sm">
              <Link href={`../${params.id}`}>Projects</Link> / Add Project
            </p>
          </div>

          <form
            className="px-8  pb-8 mb-4 mx-auto max-w-4xl bg-white"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            method="post"
          >
            <h1 className="text-xl text-gray-900 mb-4 mt-8">Project Details</h1>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={Formdata.projectName}
                  onChange={(e) => handleChange("projectName", e.target.value)}
                  className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  placeholder="Project Name*"
                />
                {errorMessages.projectName && (
                  <span className="text-red-500 font-bold text-xs validate">
                    {errorMessages.projectName}
                  </span>
                )}
              </div>

              <div>
                <select
                  id="projectCategory"
                  name="projectCategory"
                  value={Formdata.projectCategory}
                  onChange={(e) =>
                    handleChange("projectCategory", e.target.value)
                  }
                  className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                >
                  <option value="" className="text-gray-400">
                    Project Category
                  </option>
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile App Development</option>
                  <option value="ai">AI/ML</option>
                  <option value="other">Other</option>
                </select>
                {errorMessages.projectCategory && (
                  <span className="text-red-500 font-bold text-xs validate">
                    {errorMessages.projectCategory}
                  </span>
                )}
              </div>
              <div>
                <select
                  id="projectTimeline"
                  name="projectTimeline"
                  value={Formdata.projectTimeline}
                  onChange={(e) =>
                    handleChange("projectTimeline", e.target.value)
                  }
                  className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                >
                  <option value="" className="text-gray-400">
                    Project Timeline
                  </option>
                  <option value="urgent">Urgent (within 1 month)</option>
                  <option value="moderate">Moderate (1-3 months)</option>
                  <option value="flexible">
                    Flexible (more than 3 months)
                  </option>
                </select>
                {errorMessages.projectTimeline && (
                  <span className="text-red-500 font-bold text-xs validate">
                    {errorMessages.projectTimeline}
                  </span>
                )}
              </div>
              <div>
                <select
                  id="projectBudget"
                  value={Formdata.projectBudget}
                  onChange={(e) =>
                    handleChange("projectBudget", e.target.value)
                  }
                  name="projectBudget"
                  typeof="text"
                  className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                >
                  <option value="" className="text-gray-400">
                    Project Budget
                  </option>
                  <option value="less1k">Less than $1000</option>
                  <option value="1k-5k">$1000 - $5000</option>
                  <option value="5k-10k">$5000 - $10000</option>
                  <option value="more10k">More than $10000</option>
                </select>
                {errorMessages.projectBudget && (
                  <span className="text-red-500 font-bold text-xs validate">
                    {errorMessages.projectBudget}
                  </span>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-base font-semibold leading-7 text-white">
                Upload Files
              </h2>
              <div className="mt-6">
                <div className="mt-2 flex items-center gap-x-3">
                  <div className="relative">
                    <input
                      id="file-upload"
                      name="file"
                      type="file"
                      accept=".pdf,.docx,.xlsx,.pptx"
                      className="sr-only"
                      onChange={handleFileChange}
                    ></input>
                    <label
                      htmlFor="file-upload"
                      className="rounded-md bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                    >
                      {" "}
                      Requirement document
                    </label>
                    <span className="ml-3 text-gray-600">or drag and drop</span>
                  </div>
                  {errorMessages.file && (
                    <span className="text-red-500 font-bold text-xs validate">
                      {errorMessages.file}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs leading-5 text-gray-600">
                  Only PDF,Docx,XLSX and PPTX Files are allowed
                </p>
                {Formdata.file && (
                  <p className="mt-2 text-xs leading-5 text-gray-600">
                    Selected file: {Formdata.file.name}
                  </p>
                )}
              </div>
            </div>

            <div className="text-right">
              <button
                type="submit"
                ref={btnRef}
                disabled={isSubmitting}
                className={` text-black bg-transparent hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center border-[0.1px] border-gray-800 hover:text-white hover:border-white mt-6 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } `}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default page;
