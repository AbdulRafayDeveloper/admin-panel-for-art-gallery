"use client";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
//import Cookies from "js-cookie";
import Link from "next/link";
import Sidebar from "../../components/sidebar/Sidebarr";
import Header from "../../components/header/Header";
import SweetAlert from "@/app/components/alert/SweetAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // You can keep the CSS import at the top
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

function page({ params }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const btnRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    Cookie.remove("authToken");
    router.push("/auth/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [Formdata, setFormdata] = useState({
    mainTitle: "",
    title: "",
    header: "",
    subheading: "",
    date: "",
    readTime: "",
    blogDetails: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    mainTitle: "",
    title: "",
    header: "",
    subheading: "",
    date: "",
    readTime: "",
    blogDetails: "",
  });

  const validateForm = () => {
    const { mainTitle, title, header, subheading, date, readTime } = Formdata;

    let valid = true;

    setErrorMessages({
      mainTitle: "",
      title: "",
      header: "",
      subheading: "",
      date: "",
      readTime: "",
    });

    if (!mainTitle.trim()) {
      setErrorMessages((prevState) => ({
        ...prevState,
        mainTitle: "Blog main heading is required",
      }));
      valid = false;
    }

    if (!title.trim()) {
      setErrorMessages((prevState) => ({
        ...prevState,
        title: "Title is required",
      }));
      valid = false;
    }

    if (!header.trim()) {
      setErrorMessages((prevState) => ({
        ...prevState,
        header: "Header title is required",
      }));
      valid = false;
    }

    if (!subheading.trim()) {
      setErrorMessages((prevState) => ({
        ...prevState,
        subheading: "Sub-heading is required",
      }));
      valid = false;
    }

    if (!date.trim()) {
      setErrorMessages((prevState) => ({
        ...prevState,
        date: "Date is required",
      }));
      valid = false;
    }

    if (!readTime.trim()) {
      setErrorMessages((prevState) => ({
        ...prevState,
        readTime: "Read-Time is required",
      }));
      valid = false;
    }

    return valid;
  };

  const handleChange = (name, value, countryData) => {
    setFormdata({ ...Formdata, [name]: value });

    if (name === "mainTitle") {
      if (value.trim() === "") {
        setErrorMessages((prevState) => ({
          ...prevState,
          mainTitle: "Main title is required",
        }));
      } else {
        setErrorMessages((prevState) => ({ ...prevState, mainTitle: "" }));
      }
    } else if (name === "title") {
      if (value.trim() === "") {
        setErrorMessages((prevState) => ({
          ...prevState,
          title: "Title is required",
        }));
      } else {
        setErrorMessages((prevState) => ({ ...prevState, title: "" }));
      }
    } else if (name === "header") {
      if (value.trim() === "") {
        setErrorMessages((prevState) => ({
          ...prevState,
          header: "Header is required",
        }));
      } else {
        setErrorMessages((prevState) => ({ ...prevState, header: "" }));
      }
    } else if (name === "subheading") {
      if (value.trim() === "") {
        setErrorMessages((prevState) => ({
          ...prevState,
          subheading: "Subheading is required",
        }));
      } else {
        setErrorMessages((prevState) => ({ ...prevState, subheading: "" }));
      }
    } else if (name === "date") {
      if (value.trim() === "") {
        setErrorMessages((prevState) => ({
          ...prevState,
          date: "Date is required",
        }));
      } else {
        setErrorMessages((prevState) => ({ ...prevState, date: "" }));
      }
    } else if (name === "readTime") {
      if (value.trim() === "") {
        setErrorMessages((prevState) => ({
          ...prevState,
          readTime: "Read time is required",
        }));
      } else {
        setErrorMessages((prevState) => ({ ...prevState, readTime: "" }));
      }
    }
  };
  const handleContentChange = (value) => {
    setFormdata((prevData) => ({
      ...prevData,
      blogDetails: value,
    }));
  };
  const route = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      Formdata.mainTitle === "" &&
      Formdata.title === "" &&
      Formdata.header === "" &&
      Formdata.subheading === "" &&
      Formdata.date === "" &&
      Formdata.readTime === "" &&
      Formdata.blogDetails === ""
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

    FormdataToSend.append("mainTitle", Formdata.mainTitle);
    FormdataToSend.append("title", Formdata.title);
    FormdataToSend.append("header", Formdata.header);
    FormdataToSend.append("subheading", Formdata.subheading);
    FormdataToSend.append("date", Formdata.date);
    FormdataToSend.append("readTime", Formdata.readTime);
    FormdataToSend.append("blogDetails", Formdata.blogDetails);

    console.log(FormdataToSend);
    try {
      //const token = Cookies.get("authToken");
      const response = await axios.put(
        `../../../api/blog_posts/${params.id}`,
        FormdataToSend
      );
      btnRef.current.classList.add("disable");
      if (response.data.status == 200) {
        SweetAlert("Success", response.data.message, "success");
        setFormdata({
          mainTitle: "",
          title: "",
          header: "",
          subheading: "",
          date: "",
          readTime: "",
          blogDetails: "",
        });
        route.push("./list");
      }
      if (response.data.status == 500 || response.data.status == 400) {
        SweetAlert("Error", response.data.message, "error");
      }
    } catch (error) {
      SweetAlert("Error", response.data.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `../../../api/blog_posts/${params.id}`
        );
        setFormdata(response.data.data);
      } catch (error) {
        SweetAlert("Error", "Data not fetched", "error");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header toggleSidebar={toggleSidebar} handleLogout={handleLogout} />

      <div className="flex flex-1 w-full bg-white">
        <Sidebar isSidebarOpen={isSidebarOpen} handleLogout={handleLogout} />

        <main className="flex-1 p-3 pt-4 h-screen  overflow-auto bg-white">
          <div className="mb-8 ml-20 mt-4">
            <h1 className="text-gray-700 font-medium text-2xl ">
              Update Blog Post{" "}
            </h1>
            <p className="font-light text-sm">
              <Link href={"../blog_posts/list"}>Blogs List</Link> / Add
              Blog-Post
            </p>
          </div>

          <form
            className="px-8  pb-8 mb-4 mx-auto max-w-4xl bg-white"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            method="post"
          >
            <h1 className="text-xl text-gray-900 mb-8">Blog Thumbnail Info</h1>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  id="mainTitle"
                  name="mainTitle"
                  value={Formdata.mainTitle}
                  onChange={(e) => handleChange("mainTitle", e.target.value)}
                  className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  placeholder="Thumbnail Title*"
                />
                {errorMessages.mainTitle && (
                  <span className="text-red-500 font-bold text-xs validate">
                    {errorMessages.mainTitle}
                  </span>
                )}
              </div>
            </div>

            <h1 className="text-xl text-gray-900 mb-4 mt-8">Blog-Post Info</h1>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={Formdata.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Blog page title*"
                />
                {errorMessages.title && (
                  <span className="text-red-500 font-bold text-xs validate">
                    {errorMessages.title}
                  </span>
                )}
              </div>

              <div>
                <input
                  type="text"
                  id="header"
                  name="header"
                  value={Formdata.header}
                  onChange={(e) => handleChange("header", e.target.value)}
                  className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Header*"
                />
                {errorMessages.header && (
                  <span className="text-red-500 font-bold text-xs validate">
                    {errorMessages.header}
                  </span>
                )}
              </div>

              <div>
                <input
                  type="text"
                  id="subheading"
                  name="subheading"
                  value={Formdata.subheading}
                  onChange={(e) => handleChange("subheading", e.target.value)}
                  className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Subheading*"
                />
                {errorMessages.subheading && (
                  <span className="text-red-500 font-bold text-xs validate">
                    {errorMessages.subheading}
                  </span>
                )}
              </div>

              <div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={Formdata.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Date*"
                />
                {errorMessages.date && (
                  <span className="text-red-500 font-bold text-xs validate">
                    {errorMessages.date}
                  </span>
                )}
              </div>

              <div>
                <input
                  type="text"
                  id="readTime"
                  name="readTime"
                  value={Formdata.readTime}
                  onChange={(e) => handleChange("readTime", e.target.value)}
                  className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Read Time*"
                />
                {errorMessages.readTime && (
                  <span className="text-red-500 font-bold text-xs validate">
                    {errorMessages.readTime}
                  </span>
                )}
              </div>

              <div>
                <ReactQuill
                  value={Formdata.blogDetails}
                  onChange={handleContentChange}
                  theme="snow"
                  name="blogDetails"
                  placeholder="Write your blog content here..."
                />
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
