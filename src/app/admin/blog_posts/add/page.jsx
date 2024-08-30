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

function page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const btnRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [videoPreview, setVideoPreview] = useState(null);
  const [imagePreview, setimagePreview] = useState(null);
  const [imagePreview2, setimagePreview2] = useState(null);
  const handleLogout = (e) => {
    e.preventDefault();
    Cookie.remove("authToken");
    router.push("/auth/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [Formdata, setFormdata] = useState({
    mainImage: null,
    mainTitle: "",
    title: "",
    header: "",
    subheading: "",
    date: "",
    readTime: "",
    video: null,
    source: null,
    alt: "",
    caption: "",
    blogDetails: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    mainImage: "",
    mainTitle: "",
    title: "",
    header: "",
    subheading: "",
    date: "",
    readTime: "",
    video: "",
    source: "",
    alt: "",
    caption: "",
    blogDetails: "",
  });

  const validateForm = () => {
    const {
      mainImage,
      mainTitle,
      title,
      header,
      subheading,
      date,
      readTime,
      video,
      source,
      alt,
      caption,
    } = Formdata;

    let valid = true;

    setErrorMessages({
      mainImage: "",
      mainTitle: "",
      title: "",
      header: "",
      subheading: "",
      date: "",
      readTime: "",
      video: "",
      source: "",
      alt: "",
      caption: "",
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

    if (!alt.trim()) {
      setErrorMessages((prevState) => ({
        ...prevState,
        alt: "Alternative image caption is required",
      }));
      valid = false;
    }

    if (!caption.trim()) {
      setErrorMessages((prevState) => ({
        ...prevState,
        caption: "Caption is required",
      }));
      valid = false;
    }

    if (!mainImage) {
      setErrorMessages((prevState) => ({
        ...prevState,
        mainImage: "Main image is required",
      }));
      valid = false;
    }

    if (!source) {
      setErrorMessages((prevState) => ({
        ...prevState,
        source: "Source image is required",
      }));
      valid = false;
    }

    if (!video) {
      setErrorMessages((prevState) => ({
        ...prevState,
        video: "Video is required",
      }));
      valid = false;
    }

    return valid;
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    const allowedFormats = ["video/mp4", "video/webm", "video/ogg"];

    if (!allowedFormats.includes(file.type)) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        video: "Video format must be MP4, WEBM, or OGG",
      }));
      Formdata.video == null;
      setVideoPreview(null);
    } else {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        video: "",
      }));
      setFormdata((prevData) => ({
        ...prevData,
        video: file,
      }));
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);
    }
  };
  const handlePictureChange = (field, e) => {
    const file = e.target.files[0];
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];

    if (!file) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [field]: "No file selected.",
      }));
      setFormdata((prevData) => ({
        ...prevData,
        [field]: null,
      }));
      if (field == "source") {
        setimagePreview2(null);
      } else {
        setimagePreview(null);
      }
      return;
    }

    if (!allowedFormats.includes(file.type)) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [field]: "File format must be JPG, JPEG, or PNG",
      }));
      setFormdata((prevData) => ({
        ...prevData,
        [field]: null,
      }));
      if (field == "source") {
        setimagePreview2(null);
      } else {
        setimagePreview(null);
      }
    } else {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
      setFormdata((prevData) => ({
        ...prevData,
        [field]: file,
      }));
      const imageUrl = URL.createObjectURL(file);
      if (field == "source") {
        setimagePreview2(imageUrl);
      } else {
        setimagePreview(imageUrl);
      }
    }
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
      Formdata.video === null &&
      Formdata.mainImage === null &&
      Formdata.source === null &&
      Formdata.alt === "" &&
      Formdata.caption === "" &&
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
    FormdataToSend.append("mainImage", Formdata.mainImage);
    FormdataToSend.append("video", Formdata.video);
    FormdataToSend.append("source", Formdata.source);
    FormdataToSend.append("alt", Formdata.alt);
    FormdataToSend.append("caption", Formdata.caption);
    FormdataToSend.append("blogDetails", Formdata.blogDetails);

    console.log(FormdataToSend);
    try {
      //const token = Cookies.get("authToken");
      const response = await axios.post(
        "../../../api/blog_posts",
        FormdataToSend
      );
      btnRef.current.classList.add("disable");
      if (response.data.status == 200) {
        SweetAlert("Success", response.data.message, "success");
        setFormdata({
          mainImage: null,
          mainTitle: "",
          title: "",
          header: "",
          subheading: "",
          date: "",
          readTime: "",
          video: null,
          source: null,
          alt: "",
          caption: "",
          blogDetails: "",
        });
        setVideoPreview(null);
        setimagePreview(null);
        setimagePreview2(null);
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

  const handleCancel = () => {
    setFormdata((prevData) => ({
      ...prevData,
      video: null,
    }));
    setVideoPreview(null);
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      video: "",
    }));
  };

  const handleImageCancel = (field) => {
    setFormdata((prevData) => ({
      ...prevData,
      [field]: null,
    }));
    if (field == "source") {
      setimagePreview2(null);
    } else {
      setimagePreview(null);
    }
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header toggleSidebar={toggleSidebar} handleLogout={handleLogout} />

      <div className="flex flex-1 w-full bg-white">
        <div className="fixed">
          <Sidebar isSidebarOpen={isSidebarOpen} handleLogout={handleLogout} />
        </div>

        <main className="flex-1 p-3 pt-4 h-screen bg-white overflow-y-auto z-1 lg:ml-64 lg:mt-20 ">
          <div className="mb-8 lg:ml-20 ml-8 mt-4 ">
            <h1 className="text-gray-700 font-medium text-2xl ">
              Add Blog Post{" "}
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
              <div>
                <div className="mt-2 flex items-center gap-x-3">
                  <div className="relative">
                    <input
                      id="file-upload2"
                      name="mainImage"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="sr-only"
                      onChange={(e) => handlePictureChange("mainImage", e)}
                    />
                    <label
                      htmlFor="file-upload2"
                      className="rounded-md bg-white px-[152px] py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-[0.5px] ring-inset ring-gray-500 hover:bg-gray-50 cursor-pointer"
                    >
                      Upload Image
                    </label>
                  </div>
                  {errorMessages.mainImage && (
                    <span className="text-red-500 font-bold text-xs validate">
                      {errorMessages.mainImage}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs leading-5 text-gray-600">
                  Only JPG, JPEG, and PNG files are allowed
                </p>
                {imagePreview && (
                  <div className="relative mt-2">
                    <p className="text-xs leading-5 text-gray-600">
                      Selected file: {Formdata.mainImage.name}
                    </p>
                    <img
                      src={imagePreview}
                      className="mt-2 max-w-md w-20 h-20"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageCancel("mainImage")}
                      className="absolute top-2 right-0 p-1 bg-white  hover:bg-gray-200"
                    >
                      <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                    </button>
                  </div>
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
                <input
                  type="text"
                  id="alt"
                  name="alt"
                  value={Formdata.alt}
                  onChange={(e) => handleChange("alt", e.target.value)}
                  className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Alt Text for image*"
                />
                {errorMessages.alt && (
                  <span className="text-red-500 font-bold text-xs validate">
                    {errorMessages.alt}
                  </span>
                )}
              </div>

              <div>
                <input
                  type="text"
                  id="caption"
                  name="caption"
                  value={Formdata.caption}
                  onChange={(e) => handleChange("caption", e.target.value)}
                  className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Caption*"
                />
                {errorMessages.caption && (
                  <span className="text-red-500 font-bold text-xs validate">
                    {errorMessages.caption}
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

            <div>
              <h2 className="text-base font-semibold leading-7 text-white">
                Upload Video
              </h2>
              <div className="mt-6">
                <div className="mt-2 flex items-center gap-x-3">
                  <div className="relative">
                    <input
                      id="video-upload"
                      name="video"
                      type="file"
                      accept="video/*"
                      className="sr-only"
                      onChange={handleVideoChange}
                    />
                    <label
                      htmlFor="video-upload"
                      className="rounded-md bg-white px-[155px] py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-[0.5px] ring-inset ring-gray-500 hover:bg-gray-50 cursor-pointer"
                    >
                      Upload Video
                    </label>
                  </div>
                  {errorMessages.video && (
                    <span className="text-red-500 font-bold text-xs validate">
                      {errorMessages.video}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs leading-5 text-gray-600">
                  Only MP4, WEBM, and OGG files are allowed
                </p>
                {videoPreview && (
                  <div className="relative mt-2">
                    <p className="text-xs leading-5 text-gray-600">
                      Selected file: {Formdata.video.name}
                    </p>
                    <video
                      controls
                      src={videoPreview}
                      className="mt-2 w-60 h-60 max-w-md"
                    >
                      Your browser does not support the video tag.
                    </video>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-200"
                    >
                      <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <div className="mt-2 flex items-center gap-x-3">
                <div className="relative">
                  <input
                    id="file-upload"
                    name="source"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="sr-only"
                    onChange={(e) => handlePictureChange("source", e)}
                  />
                  <label
                    htmlFor="file-upload"
                    className="rounded-md bg-white px-[110px] py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-[0.5px] ring-inset ring-gray-500 hover:bg-gray-50 cursor-pointer"
                  >
                    Upload Image for Blog post
                  </label>
                </div>
                {errorMessages.source && (
                  <span className="text-red-500 font-bold text-xs validate">
                    {errorMessages.source}
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs leading-5 text-gray-600">
                Only JPG, JPEG, and PNG files are allowed
              </p>
              {imagePreview2 && (
                <div className="relative mt-2">
                  <p className="text-xs leading-5 text-gray-600">
                    Selected file: {Formdata.source.name}
                  </p>
                  <img
                    src={imagePreview2}
                    className="mt-2 w-40 h-40 max-w-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageCancel("source")}
                    className="absolute top-2 right-0 p-1 bg-white rounded-full shadow-md hover:bg-gray-200"
                  >
                    <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                  </button>
                </div>
              )}
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
