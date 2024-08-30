"use client";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-toastify/dist/ReactToastify.css";
import { getCountryCallingCode, getName } from "country-list";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import Link from "next/link";
import Sidebar from "@/app/admin/components/sidebar/Sidebarr";
import Header from "@/app/admin/components/header/Header";
import SweetAlert from "@/app/components/alert/SweetAlert";
import Cookies from "js-cookie";

function page({ params }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const [data, setData] = useState([]);
  const [country, setCountry] = useState("");
  const btnRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [Formdata, setFormdata] = useState({
    name: "",
    email: "",
    number: "",
    city: "",
    position: "",
    salary: 0,
    date: "",
    jobType: "",
    picture: null,
    file: null,
    gender: "",
    country: "",
    _id: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`../../../api/applicant/${params.id}`);
        console.log(response.data.data);
        setFormdata({
          name: response.data.data.name,
          email: response.data.data.email,
          number: response.data.data.number,
          city: response.data.data.city,
          position: response.data.data.jobTitle,
          gender: response.data.data.gender,
          file: response.data.data.file,
          country: response.data.data.country,
        });
      } catch (error) {
        console.log("Api not hit");
      }
    };
    fetchData();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    Cookie.remove("authToken");
    router.push("/auth/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [errorMessages, setErrorMessages] = useState({
    salary: "",
    date: "",
    jobType: "",
    picture: null,
    gender: "",
  });

  const validateForm = () => {
    const { salary, date, jobType, picture, gender } = Formdata;

    let valid = true;

    setErrorMessages({
      salary: "",
      date: "",
      jobType: "",
      picture: null,
      gender: "",
    });

    if (isNaN(salary) || salary === "" || salary <= 0) {
      setErrorMessages((prevState) => ({
        ...prevState,
        salary: "Salary must be a positive number",
      }));
      valid = false;
    }

    if (salary === 0) {
      setErrorMessages((prevState) => ({
        ...prevState,
        salary: "Salary is required",
      }));
      valid = false;
    }

    if (date === "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        date: "Date is required",
      }));
      valid = false;
    }

    if (jobType === "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        jobType: "Job-type is required",
      }));
      valid = false;
    } else if (jobType === "Job-Type") {
      setErrorMessages((prevState) => ({
        ...prevState,
        jobType: "Job-type is required",
      }));
      valid = false;
    }

    if (!picture) {
      setErrorMessages((prevState) => ({
        ...prevState,
        picture: "Picture is required",
      }));
      valid = false;
    }

    return valid;
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];

    if (!file) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        picture: "No file selected.",
      }));
      setFormdata((prevData) => ({
        ...prevData,
        picture: null,
      }));
      return;
    }

    if (!allowedFormats.includes(file.type)) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        picture: "File format must be JPG, JPEG, or PNG",
      }));
      setFormdata((prevData) => ({
        ...prevData,
        picture: null,
      }));
    } else {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        picture: "",
      }));
      setFormdata((prevData) => ({
        ...prevData,
        picture: file,
      }));
    }
  };

  const handleChange = (name, value, countryData) => {
    setFormdata({ ...Formdata, [name]: value });

    if (name === "salary") {
      if (isNaN(value) || value === "" || value <= 0) {
        setErrorMessages((prevState) => ({
          ...prevState,
          salary: "Salary must be a positive number",
        }));
      } else {
        setErrorMessages((prevState) => ({ ...prevState, salary: "" }));
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
    } else if (name === "jobType") {
      if (value.trim() === "" || value === "Job-Type") {
        setErrorMessages((prevState) => ({
          ...prevState,
          jobType: "Job-type is required",
        }));
      } else {
        setErrorMessages((prevState) => ({ ...prevState, jobType: "" }));
      }
    }
  };

  const route = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      Formdata.salary === 0 &&
      Formdata.date === "" &&
      Formdata.jobType === "" &&
      Formdata.picture === null
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
    FormdataToSend.append("position", Formdata.position);
    FormdataToSend.append("salary", Formdata.salary);
    FormdataToSend.append("date", Formdata.date);
    FormdataToSend.append("job_type", Formdata.jobType);
    FormdataToSend.append("file", Formdata.file);
    FormdataToSend.append("picture", Formdata.picture);
    FormdataToSend.append("country", Formdata.country);
    FormdataToSend.append("gender", Formdata.gender);
    FormdataToSend.append("id", params.id);
    try {
      const token = Cookies.get("authToken");
      const response = await axios.post(
        "../../../api/applicant/employee",
        FormdataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(FormdataToSend.position);
      console.log("position: ", Formdata.position);
      console.log("salary: ", Formdata.salary);
      console.log("date: ", Formdata.date);
      console.log("job Type: ", Formdata.jobType);
      btnRef.current.classList.add("disable");
      if (response.data.status == 200 || response.data.status == 201) {
        SweetAlert("Success", response.data.message, "success");

        //route.push("../list");
      }
      if (response.data.status === 500 || response.data.status === 400) {
        SweetAlert("Error", response.data.message, "error");
      }
    } catch (error) {
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

        <main className="flex-1 p-3 pt-4 h-screen bg-white overflow-y-auto z-1 lg:ml-64 lg:mt-20 ">
          <div className="mb-8 lg:ml-20 ml-8 mt-4 ">
            <h1 className="text-gray-700 font-medium text-2xl ">
              Employee Information Form{" "}
            </h1>
            <p className="font-light text-sm">
              <Link href={"../list"}>Applicants</Link> / Add Employee Info
            </p>
          </div>

          <form
            className="px-8  pb-8 mb-4 mx-auto max-w-4xl bg-white"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            method="post"
          >
            <h1 className="text-xl text-gray-900 mb-8">Contact Information</h1>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={Formdata.name}
                  className="text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-400 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  readOnly={true}
                />
              </div>

              <div>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={Formdata.city}
                  className="text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-400 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  readOnly={true}
                />
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={Formdata.email}
                  className="text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-400 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  readOnly={true}
                />
                {errorMessages.email && (
                  <span className="text-red-500 font-bold text-xs validate">
                    {errorMessages.email}
                  </span>
                )}
              </div>

              <div>
                <input
                  id="number"
                  value={Formdata.number}
                  name="number"
                  className="text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-400 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  readOnly={true}
                />
              </div>
            </div>

            <h1 className="text-xl text-gray-900 mb-4 mt-8">Position</h1>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={Formdata.position}
                  className="text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-400 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  readOnly={true}
                />
              </div>

              <div>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  value={Formdata.salary}
                  onChange={(e) => handleChange("salary", e.target.value)}
                  className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  placeholder="Salary*"
                />
                {errorMessages.salary && (
                  <span className="text-red-500 font-bold text-xs validate">
                    {errorMessages.salary}
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
                  className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  placeholder="Date of Joining*"
                />
                {errorMessages.date && (
                  <span className="text-red-500 font-bold text-xs validate">
                    {errorMessages.date}
                  </span>
                )}
              </div>

              <div>
                <select
                  id="jobType"
                  value={Formdata.jobType}
                  onChange={(e) => handleChange("jobType", e.target.value)}
                  name="jobType"
                  typeof="text"
                  className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                >
                  <option value="" className="text-gray-400">
                    Job-Type
                  </option>
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="internee">Internee</option>
                </select>
                {errorMessages.jobType && (
                  <span className="text-red-500 font-bold text-xs validate">
                    {errorMessages.jobType}
                  </span>
                )}
              </div>

              <div className="col-span-2">
                <fieldset className="flex flex-col gap-2">
                  <legend className="text-sm font-light leading-7 text-gray-400 mb-2">
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
                        className="mr-2"
                        readOnly={true}
                      />
                      <label htmlFor="male" className="text-gray-400 text-sm">
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
                        className="mr-2"
                      />
                      <label htmlFor="female" className="text-gray-400 text-sm">
                        Female
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>

            <div>
              <h2 className="text-base font-semibold leading-7 text-white">
                Upload Picture
              </h2>
              <div className="mt-6">
                <div className="mt-2 flex items-center gap-x-3">
                  <div className="relative">
                    <input
                      id="file-upload2"
                      name="picture"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      className="sr-only"
                      onChange={handlePictureChange}
                    />
                    <label
                      htmlFor="file-upload2"
                      className="rounded-md bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
                    >
                      Upload Picture
                    </label>
                    <span className="ml-3 text-gray-600">or drag and drop</span>
                  </div>
                  {errorMessages.picture && (
                    <span className="text-red-500 font-bold text-xs validate">
                      {errorMessages.picture}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs leading-5 text-gray-600">
                  Only JPG, JPEG, and PNG files are allowed
                </p>
                {Formdata.picture && (
                  <p className="mt-2 text-xs leading-5 text-gray-600">
                    Selected file: {Formdata.picture.name}
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
