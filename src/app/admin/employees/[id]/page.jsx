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
import Sidebar from "../../components/sidebar/Sidebarr";
import Header from "../../components/header/Header";
import SweetAlert from "@/app/components/alert/SweetAlert";
import Cookies from "js-cookie";

function page({ params }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
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
    date_of_join_of_join: "",
    job_type: "",
    picture: null,
    gender: "",
  });

  const handleLogout = (e) => {
    e.preventDefault();
    Cookie.remove("authToken");
    router.push("/auth/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("authToken");
        const response = await axios.get(`../../../api/employee/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormdata(response.data.data);
      } catch (error) {
        console.log("data not fetched");
      }
    };
    fetchData();
  }, [params.id]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [errorMessages, setErrorMessages] = useState({
    number: "",
    city: "",
    position: "",
    salary: "",
    job_type: "",
    picture: null,
  });

  const validate_of_joinForm = () => {
    const { email, number, city, position, salary, job_type, picture, gender } =
      Formdata;
    const cityRegex = /^[a-zA-Z\s]*$/;

    let valid = true;

    setErrorMessages({
      number: "",
      city: "",
      position: "",
      salary: "",
      job_type: "",
      picture: null,
    });

    if (isNaN(salary) || salary === "" || salary <= 0) {
      setErrorMessages((prevState) => ({
        ...prevState,
        salary: "Salary must be a positive number",
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

    if (position === "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        position: "Position is required",
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

    if (job_type === "") {
      setErrorMessages((prevState) => ({
        ...prevState,
        job_type: "Job-type is required",
      }));
      valid = false;
    } else if (job_type === "Job-Type") {
      setErrorMessages((prevState) => ({
        ...prevState,
        job_type: "Job-type is required",
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

    if (name === "number" && countryData) {
      const countryCode = countryData.countryCode;
      const countryName = getName(countryCode) || "Unknown Country";
      setCountry(countryName);
    }

    if (name === "city") {
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
    } else if (name === "position") {
      if (value.trim() === "") {
        setErrorMessages((prevState) => ({
          ...prevState,
          position: "Position is required",
        }));
      } else {
        setErrorMessages((prevState) => ({ ...prevState, position: "" }));
      }
    } else if (name === "salary") {
      if (isNaN(value) || value === "" || value <= 0) {
        setErrorMessages((prevState) => ({
          ...prevState,
          salary: "Salary must be a positive number",
        }));
      } else {
        setErrorMessages((prevState) => ({ ...prevState, salary: "" }));
      }
    } else if (name === "job_type") {
      if (value.trim() === "" || value === "Job-Type") {
        setErrorMessages((prevState) => ({
          ...prevState,
          job_type: "Job-type is required",
        }));
      } else {
        setErrorMessages((prevState) => ({ ...prevState, job_type: "" }));
      }
    }
  };

  const route = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      Formdata.number === "" &&
      Formdata.city === "" &&
      Formdata.position === "" &&
      Formdata.salary === 0 &&
      Formdata.job_type === "" &&
      Formdata.picture === null
    ) {
      validate_of_joinForm();
      return;
    }

    if (!validate_of_joinForm()) {
      SweetAlert("Validation Error", "Enter valid values", "error");
      return;
    }
    setIsSubmitting(true);

    const FormdataToSend = new FormData();
    FormdataToSend.append("number", Formdata.number);
    FormdataToSend.append("city", Formdata.city);
    FormdataToSend.append("position", Formdata.position);
    FormdataToSend.append("salary", Formdata.salary);
    FormdataToSend.append("job_type", Formdata.job_type);
    FormdataToSend.append("picture", Formdata.picture);
    FormdataToSend.append("country", country);

    try {
      const token = Cookies.get("authToken");
      const response = await axios.put(
        `../../../api/employee/${params.id}`,
        FormdataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      btnRef.current.classList.add("disable");
      if (response.data.status == 200) {
        SweetAlert("Success", response.data.message, "success");
        setFormdata({
          name: "",
          email: "",
          number: "",
          city: "",
          position: "",
          salary: 0,
          date_of_join: "",
          job_type: "",
          file: null,
          picture: null,
          gender: null,
        });
        route.push("./list");
      }
      if (response.data.status == 500) {
        SweetAlert("Error", response.data.message, "error");
      }
    } catch (error) {
      SweetAlert("Error", "Server Error", "error");
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
              Update Employee Data{" "}
            </h1>
            <p className="font-light text-sm">
              <Link href={"../employees/list"}>Employees</Link> / Update
              Employee
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
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="City*"
                />
                {errorMessages.city && (
                  <span className="text-red-500 font-bold text-xs validate_of_join">
                    {errorMessages.city}
                  </span>
                )}
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={Formdata.email}
                  className="text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-400 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email*"
                  readOnly={true}
                />
              </div>

              <div>
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
                  <span className="text-red-500 font-bold text-xs validate_of_join">
                    {errorMessages.number}
                  </span>
                )}
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
                  onChange={(e) => handleChange("position", e.target.value)}
                  className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-500 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  placeholder="Position*"
                />
                {errorMessages.position && (
                  <span className="text-red-500 font-bold text-xs validate_of_join">
                    {errorMessages.position}
                  </span>
                )}
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
                  <span className="text-red-500 font-bold text-xs validate_of_join">
                    {errorMessages.salary}
                  </span>
                )}
              </div>

              <div>
                <input
                  type="date_of_join"
                  id="date_of_join"
                  name="date_of_join"
                  value={Formdata.date_of_join}
                  className="text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-transparent border-gray-400 border-[0.5px] dark:placeholder-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  readOnly={true}
                />
              </div>

              <div>
                <select
                  id="job_type"
                  value={Formdata.job_type}
                  onChange={(e) => handleChange("job_type", e.target.value)}
                  name="job_type"
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
                {errorMessages.job_type && (
                  <span className="text-red-500 font-bold text-xs validate_of_join">
                    {errorMessages.job_type}
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
                    <span className="text-red-500 font-bold text-xs validate_of_join">
                      {errorMessages.picture}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs leading-5 text-gray-600">
                  Only JPG, JPEG, and PNG files are allowed
                </p>
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
