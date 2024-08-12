"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import SweetAlert from "@/app/components/alert/SweetAlert";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

function page() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const btnRef = useRef(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/admin", formData);
      btnRef.current.classList.add("disabled");

      if (response.data.statusCode === 200) {
        Cookie.set("authToken", response.data.token, { expires: 1 });
        const data = Cookie.get("authToken");
        SweetAlert("Success", response.data.message, "success");

        setFormData({
          name: "",
          password: "",
        });
        router.push("/admin/dashboard");
      } else if (response.data.statusCode === 400) {
        SweetAlert("Error", response.data.message, "error");
      } else {
        SweetAlert("Error", response.data.message, "error");
      }
    } catch (error) {
      SweetAlert("Error", error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="lg:w-1/2 bg-gray-900 h-full flex items-center justify-center w-full">
        <div className="text-white font-xl lg:w-[400px] lg:md:p-0 max-w-lg md:w-[400px] sm:w-[400px] w-full p-6">
          <span className="font-light text-3xl">LOGIN</span>
          <div>
            <form
              className="space-y-4 md:space-y-6 pt-6 w-full max-w-2xl mx-auto"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm md:text-base font-light text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-transparent border border-gray-300 text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 text-sm md:text-base "
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm md:text-base font-light text-white dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-transparent border border-gray-300 text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 text-sm md:text-base"
                />
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
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-indigo-700 h-full pt-10 pb-16 pl-12 lg:block md:block hidden">
        <div className="flex flex-col">
          <img
            src="/assets/pictures/cyverix.svg"
            alt="Company Logo"
            className="w-52 h-52"
          />
          <h1 className="text-white font-normal text-4xl pl-4 pb-2">
            Reliable partner for
          </h1>
          <h1 className="text-white font-normal text-4xl pl-4 pb-2">
            Innovative software solutions
          </h1>
          <p className="text-white font-light pl-4 pb-2 pt-6">
            Log in to access your admin panel.
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
