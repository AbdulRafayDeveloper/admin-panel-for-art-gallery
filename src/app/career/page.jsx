"use client";
import React, { useState, useEffect, useRef } from "react";
import Nav from "../components/navbar/Nav";
import SweetAlert from "../components/alert/SweetAlert";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getCountryCallingCode, getName } from "country-list";

function JobApplicationForm({ jobTitle, onClose }) {
  const [country, setCountry] = useState("");
  const btnRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [Formdata, setFormdata] = useState({
    name: "",
    email: "",
    number: "",
    city: "",
    gender: "",
    file: null,
  });

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    email: "",
    number: "",
    city: "",
    gender: "",
    file: null,
  });

  const validateForm = () => {
    const { name, email, number, city, file, gender } = Formdata;
    const nameRegex = /^[a-zA-Z\s]*$/;
    const cityRegex = /^[a-zA-Z\s]*$/;

    let valid = true;

    setErrorMessages({
      name: "",
      email: "",
      number: "",
      city: "",
      gender: "",
      file: null,
    });

    if (name === "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        name: "Name is required",
      }));
      valid = false;
    } else if (!nameRegex.test(name)) {
      setErrorMessages((prevState) => ({
        ...prevState,
        name: "Name should not contain numbers or special characters",
      }));
      valid = false;
    }
    if (gender === "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        gender: "Gender is required",
      }));
      valid = false;
    }

    if (email === "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        email: "Email is required",
      }));
      valid = false;
    }

    if (number === "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        number: "Email is required",
      }));
      valid = false;
    }

    if (city === "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        city: "City is required",
      }));
      valid = false;
    } else if (!cityRegex.test(city)) {
      setErrorMessages((prevState) => ({
        ...prevState,
        city: "City should not contain numbers or special characters",
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

    if (name === "number" && countryData) {
      const countryCode = countryData.countryCode;
      const countryName = getName(countryCode) || "Unknown Country";
      setCountry(countryName);
    }

    if (name === "name") {
      if (value.trim() === "") {
        setErrorMessages((prevState) => ({
          ...prevState,
          name: "Name is required",
        }));
      } else if (!/^[a-zA-Z\s]*$/.test(value)) {
        setErrorMessages((prevState) => ({
          ...prevState,
          name: "Name should not contain numbers or special characters",
        }));
      } else {
        setErrorMessages((prevState) => ({ ...prevState, name: "" }));
      }
    } else if (name === "email") {
      if (value.trim() === "") {
        setErrorMessages((prevState) => ({
          ...prevState,
          email: "Email is required",
        }));
      } else {
        setErrorMessages((prevState) => ({ ...prevState, email: "" }));
      }
    } else if (name === "gender") {
      if (value.trim() === "") {
        setErrorMessages((prevState) => ({
          ...prevState,
          gender: "Gender is required",
        }));
      } else {
        setErrorMessages((prevState) => ({ ...prevState, gender: "" }));
      }
    } else if (name === "city") {
      if (value.trim() === "") {
        setErrorMessages((prevState) => ({
          ...prevState,
          city: "City is required",
        }));
      } else if (!/^[a-zA-Z\s]*$/.test(value)) {
        setErrorMessages((prevState) => ({
          ...prevState,
          city: "City should not contain numbers or special characters",
        }));
      } else {
        setErrorMessages((prevState) => ({ ...prevState, city: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      Formdata.name === "" &&
      Formdata.email === "" &&
      Formdata.number === "" &&
      Formdata.city === "" &&
      Formdata.file === null &&
      Formdata.gender === ""
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

    FormdataToSend.append("name", Formdata.name);
    FormdataToSend.append("email", Formdata.email);
    FormdataToSend.append("number", Formdata.number);
    FormdataToSend.append("city", Formdata.city);
    FormdataToSend.append("file", Formdata.file);
    FormdataToSend.append("country", country);
    FormdataToSend.append("jobTitle", jobTitle);
    FormdataToSend.append("gender", Formdata.gender);

    try {
      const response = await axios.post("/api/applicant", FormdataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onClose();
      btnRef.current.classList.add("disable");
      if (response.data.statusCode == 200) {
        SweetAlert("Success", response.data.message, "success");
        setFormdata({
          name: "",
          email: "",
          number: "",
          city: "",
          file: null,
          jobTitle: "",
          gender: null,
        });
      }
      if (response.data.statusCode == 500) {
        SweetAlert("Error", response.data.message, "error");
      }
    } catch (error) {
      SweetAlert("Error", response.data.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 border-2 border-gray-200 bg-white shadow-lg rounded-lg text-gray-700">
      <h2 className={`text-xl font-semibold mb-4 `}>{jobTitle} Application</h2>
      <form encType="multipart/form-data" onSubmit={handleSubmit} method="post">
        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={Formdata.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            placeholder="Your name*"
          />
          {errorMessages.name && (
            <span className="text-red-500 font-bold text-xs validate">
              {errorMessages.name}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            id="city"
            name="city"
            value={Formdata.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="City*"
          />
          {errorMessages.city && (
            <span className="text-red-500 font-bold text-xs validate">
              {errorMessages.city}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={Formdata.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email*"
          />
          {errorMessages.email && (
            <span className="text-red-500 font-bold text-xs validate">
              {errorMessages.email}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <PhoneInput
            country={"pk"}
            id="number"
            value={Formdata.number}
            onChange={(value, countryData) =>
              handleChange("number", value, countryData)
            }
            name="number"
            className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-[2px] bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Contact no. (optional)"
          />
          {errorMessages.number && (
            <span className="text-red-500 font-bold text-xs validate">
              {errorMessages.number}
            </span>
          )}
        </div>
        <div className="col-span-2">
          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-light leading-7 text-gray-700 mb-2">
              Gender
            </legend>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={Formdata.gender === "male"}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="male" className="text-gray-900 text-sm">
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={Formdata.gender === "female"}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="female" className="text-gray-900 text-sm">
                  Female
                </label>
              </div>
            </div>
            {errorMessages.gender && (
              <span className="text-red-500 font-bold text-xs validate mt-2">
                {errorMessages.gender}
              </span>
            )}
          </fieldset>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Resume (PDF or Word)</label>
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
                  CV or Resume
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
        <button
          type="submit"
          ref={btnRef}
          className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm md:text-base px-4 py-2 ${
            isSubmitting
              ? "disabled bg-gray-600"
              : "bg-indigo-600 hover:bg-indigo-800"
          }`}
          disabled={isSubmitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function Page() {
  // Example job data with filled descriptions
  const jobs = [
    {
      id: 1,
      title: "Web Developer",
      location: "Remote",
      easyApplyLink: "/apply/web-developer",
      content: `Join our team as a Remote Web Developer! We're looking for a skilled developer proficient in modern web technologies. You will collaborate with cross-functional teams to design and develop responsive web applications. Experience with front-end frameworks like React and back-end technologies such as Node.js is preferred.`,
    },
    {
      id: 2,
      title: "Mobile App Developer",
      location: "Remote",
      easyApplyLink: "/apply/mobile-app-developer",
      content: `Are you a Mobile App Developer interested in working remotely? We're seeking a talented developer to create intuitive mobile applications for iOS and Android platforms. Your role will involve designing user interfaces, implementing application features, and ensuring high performance and responsiveness of mobile apps.`,
    },
    {
      id: 3,
      title: "AI Engineer",
      location: "Remote",
      easyApplyLink: "/apply/ai-engineer",
      content: `We're hiring a Remote AI Engineer to drive innovation in artificial intelligence. You will develop machine learning models, optimize algorithms, and deploy AI solutions that address complex business challenges. Experience in deep learning frameworks such as TensorFlow or PyTorch is essential.`,
    },
    {
      id: 4,
      title: "Deployment Engineer",
      location: "Remote",
      easyApplyLink: "/apply/cloud-deployment-engineer",
      content: `Seeking a Cloud Deployment Engineer to join our remote team! You will be responsible for designing, deploying, and maintaining cloud infrastructure. Experience with cloud platforms like AWS, Azure, or Google Cloud, along with proficiency in infrastructure-as-code tools such as Terraform or CloudFormation, is required.`,
    },
    {
      id: 5,
      title: "UX/UI Designer",
      location: "Remote",
      easyApplyLink: "/apply/ux-ui-designer",
      content: `We are looking for a talented UX/UI Designer to create amazing user experiences. The ideal candidate should have an eye for clean and artful design, possess superior UI skills, and be able to translate high-level requirements into interaction flows and artifacts. ... (content truncated for brevity)`,
    },
  ];

  // State for selected job post and form visibility
  const [selectedJob, setSelectedJob] = useState(null); // Default to null for career introduction
  const [showForm, setShowForm] = useState(false);
  const sidebarRef = useRef(null);

  // Function to handle job click
  const handleJobClick = (jobId) => {
    setSelectedJob(jobId === selectedJob ? null : jobId);
    setShowForm(false); // Close form when a new job is selected
  };

  // Function to toggle form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    sidebarRef.current.classList.toggle("-translate-x-full");
  };

  return (
    <div className="bg-black">
      <Nav />
      <section className="bg-gray-200">
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          id="sidebar-multi-level-sidebar"
          className="fixed top-0 left-0 z-80 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 pt-16"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-white shadow-lg">
            <ul className="space-y-2 font-medium">
              {jobs.map((job) => (
                <li key={job.id}>
                  <button
                    type="button"
                    onClick={() => handleJobClick(job.id)}
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-900 hover:bg-gray-200 dark:hover:bg-gray-200 group ${
                      selectedJob === job.id
                        ? "bg-gray-100 dark:bg-gray-200"
                        : ""
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-200 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 21"
                    >
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                    </svg>
                    <span className="ms-3">{job.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Job Details and Form Section */}
        <div className="ml-64 flex-grow bg-gray-200">
          <div className="h-screen p-4 overflow-y-auto max-w-3xl mx-auto">
            {selectedJob === null ? (
              <div className="career-intro p-6 border-2 border-gray-200 bg-white shadow-lg rounded-lg text-gray-800">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  Careers at Our Company
                </h2>

                <section>
                  <h3 className="text-xl font-semibold mb-2">
                    Welcome Message
                  </h3>
                  <p className="mb-4 leading-relaxed">
                    We are from the people. We are a team of 6500+ people – with
                    a purpose to thrive in our value-driven culture and make a
                    real and lasting difference to the organization and their
                    careers.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2">Career Tracks</h3>
                  <p className="mb-4 leading-relaxed">
                    Techies, innovators, developers, and free-thinkers… you’ve
                    come to the right place. Whether you’re an experienced
                    professional or a recent graduate, working with Systems will
                    give you opportunities to excel and achieve the global
                    recognition that you deserve!
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2">
                    Welcome Message Continued
                  </h3>
                  <p className="mb-4 leading-relaxed">
                    Welcome to our careers page! We are thrilled that you are
                    considering joining our dynamic and innovative team. At our
                    company, we foster a culture of creativity, collaboration,
                    and growth. We offer a wide range of exciting career
                    opportunities across various departments and locations.
                    Whether you are a seasoned professional or just starting
                    out, we have something for everyone.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2">
                    Employee Support and Benefits
                  </h3>
                  <p className="mb-4 leading-relaxed">
                    We are committed to providing our employees with the
                    resources and support they need to succeed. From
                    comprehensive training programs to competitive benefits, we
                    invest in our team members to help them reach their full
                    potential. Join us and be part of a company that values
                    innovation, integrity, and excellence.
                  </p>
                </section>
              </div>
            ) : (
              <>
                {jobs.map(
                  (job) =>
                    selectedJob === job.id && (
                      <div
                        key={job.id}
                        className="p-4 border-2 border-gray-200 shadow-lg bg-white rounded-lg text-gray-700 mb-4"
                      >
                        <h2 className="text-xl font-semibold mb-2">
                          {job.title}
                        </h2>
                        <p className="text-gray-600 font-semibold">
                          {job.location}
                        </p>
                        <div
                          className="text-gray-700"
                          dangerouslySetInnerHTML={{ __html: job.content }}
                        />
                        <button
                          type="button"
                          onClick={toggleForm}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
                        >
                          {showForm ? "Close Application Form" : "Apply Now"}
                        </button>
                      </div>
                    )
                )}
                {showForm && (
                  <JobApplicationForm
                    jobTitle={jobs.find((job) => job.id === selectedJob)?.title}
                    onClose={toggleForm}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page;
