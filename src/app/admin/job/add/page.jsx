"use client";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import SweetAlert from "@/app/components/alert/SweetAlert";
import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import Link from "next/link";
import Sidebar from "@/app/admin/components/sidebar/Sidebarr";
import Header from "@/app/admin/components/header/Header";

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

  const btnRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [Formdata, setFormdata] = useState({
    title: "",
    location: "",
    easyApplyLink: "",
    content: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    title: "",
    location: "",
    content: "",
  });

  const validateForm = () => {
    const { title, location, content } = Formdata;

    let valid = true;

    setErrorMessages({
      title: "",
      location: "",
      content: "",
    });

    if (title === "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        title: "Title name is required",
      }));
      valid = false;
    }

    if (location === "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        location: "Location is required",
      }));
      valid = false;
    }

    if (content === "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        content: "Content is required",
      }));
      valid = false;
    }

    return valid;
  };

  const handleChange = (name, value, countryData) => {
    setFormdata({ ...Formdata, [name]: value });

    if (name === "title") {
      if (value.trim() === "") {
        setErrorMessages((prevState) => ({
          ...prevState,
          title: "Title is required",
        }));
      } else {
        const easyApplyLink = `/apply/${value
          .toLowerCase()
          .replace(/\s+/g, "-")}`;

        setFormdata((prevState) => ({
          ...prevState,
          easyApplyLink: easyApplyLink,
        }));
        setErrorMessages((prevState) => ({ ...prevState, title: "" }));
      }
    } else if (name === "location") {
      if (value.trim() === "") {
        setErrorMessages((prevState) => ({
          ...prevState,
          location: "Location is required",
        }));
      } else {
        setErrorMessages((prevState) => ({
          ...prevState,
          location: "",
        }));
      }
    } else if (name === "content") {
      if (value.trim() === "") {
        setErrorMessages((prevState) => ({
          ...prevState,
          content: "Content is required",
        }));
      } else {
        setErrorMessages((prevState) => ({
          ...prevState,
          content: "",
        }));
      }
    }
  };

  const route = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      Formdata.title === "" &&
      Formdata.location === "" &&
      Formdata.content === ""
    ) {
      validateForm();
      return;
    }

    if (!validateForm()) {
      SweetAlert("Validation Error", "Enter valid values", "error");
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await axios.post(`../../../api/job_posts`, Formdata);

      btnRef.current.classList.add("disable");
      if (response.data.status == 200) {
        SweetAlert("Success", response.data.message, "success");
        setFormdata({
          title: "",
          location: "",
          content: "",
          easyApplyLink: "",
        });
        route.push(`./list`);
      }
      if (response.data.status == 500) {
        SweetAlert("Error", response.data.message, "error");
      }
    } catch (error) {
      console.error("Error:", error);
      SweetAlert("Error", "Internal Server error", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header toggleSidebar={toggleSidebar} handleLogout={handleLogout} />

      <div className="flex flex-1 w-full bg-white">
        <Sidebar isSidebarOpen={isSidebarOpen} handleLogout={handleLogout} />

        <main className="flex-1 p-3 pt-4 h-screen overflow-auto bg-white mt-4 lg:ml-20">
          <div className="mb-8 lg:ml-12">
            <h1 className="text-gray-700 font-medium text-2xl ">
              Add Job Post{" "}
            </h1>
            <p className="font-light text-sm">
              <Link href={`../job/list`}>Job</Link> / Add Job
            </p>
          </div>

          <form
            className="px-8  pb-8 mb-4 mx-auto max-w-4xl bg-white"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            method="post"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={Formdata.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  placeholder="Project Name*"
                />
                {errorMessages.title && (
                  <span className="text-red-500 font-bold text-xs validate">
                    {errorMessages.title}
                  </span>
                )}
              </div>

              <div className="col-span-2">
                <fieldset className="flex flex-col gap-2">
                  <legend className="text-sm font-light leading-7 text-gray-700 mb-2">
                    Location
                  </legend>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="onsite"
                        name="onsite"
                        value="onsite"
                        checked={Formdata.location === "onsite"}
                        onChange={(e) =>
                          handleChange("location", e.target.value)
                        }
                        className="mr-2"
                      />
                      <label htmlFor="onsite" className="text-gray-900 text-sm">
                        Onsite
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="remote"
                        name="remote"
                        value="remote"
                        checked={Formdata.location === "remote"}
                        onChange={(e) =>
                          handleChange("location", e.target.value)
                        }
                        className="mr-2"
                      />
                      <label htmlFor="remote" className="text-gray-900 text-sm">
                        Remote
                      </label>
                    </div>
                  </div>
                  {errorMessages.location && (
                    <span className="text-red-500 font-bold text-xs validate mt-2">
                      {errorMessages.location}
                    </span>
                  )}
                </fieldset>
              </div>
              <div className="mt-6">
                <textarea
                  id="content"
                  value={Formdata.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  name="content"
                  className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  cols={4}
                  rows={5}
                  placeholder="Please enter the content!"
                />
                {errorMessages.content && (
                  <span className="text-red-500 font-bold text-xs validate">
                    {errorMessages.content}
                  </span>
                )}
              </div>
            </div>

            <div>
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
