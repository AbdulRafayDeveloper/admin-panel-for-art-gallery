'use client'
import React, { useState, useEffect } from 'react';
import Nav from '../components/navbar/Nav';
import Footer from '../components/footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


const MapContainer = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    email: '',
    number: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const apiKey = 'AIzaSyB5epiSWC9Z6HiRNpuzfq_mEXNrBZ7r05I'; // Replace with your Google Maps API key
  const address = 'Dzone Technologies,C3XX+85C, Ashrafabad, Faisalabad'; // Replace with the desired location

  useEffect(() => {
    setLoading(false); // Simulate loading completion
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.number) {
      newErrors.number = 'Contact number is required';
    } else if (!/^\d+$/.test(formData.number)) {
      newErrors.number = 'Contact number must be numeric';
    }
    if (!formData.message) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      // Submit form data
      console.log('Form submitted', formData);
    } else {
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    setLoading(false); // Simulate loading completion
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-white dark:bg-gray-600">
        {/* Loading spinner or indicator */}
        <div className="flex space-x-2 justify-center items-center">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce animation-delay--0.3s"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce animation-delay--0.15s"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <div className="h-screen">
        {/* Replace YOUR_API_KEY with your actual API key */}
        <iframe
          title="Google Map"
          width="100%"
          height="100%"
          frameBorder="0"
          src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(address)}`}
          allowFullScreen
        />
      </div>

      <section className="bg-white dark:bg-gray-600 min-h-screen flex flex-col md:flex-row justify-center items-center">
        <div className="md:w-1/2 p-8 md:pl-16">
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <h1 className="text-3xl text-gray-900 dark:text-white mb-4">Please fill the form</h1>
            <div className="mb-4">
              <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Your name*"
                  required
                />
            </div>
            <div className="mb-4">
              <input
                  type="text"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`bg-gray-50 border ${errors.city ? 'border-red-500' : 'border-gray-300'}  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="City*"
                  required
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
            <div className="mb-4">
              <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'}  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Email*"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <input
                  type="text"
                  id="number"
                  value={formData.number}
                  onChange={handleChange}
                  className={`bg-gray-50 border ${errors.number ? 'border-red-500' : 'border-gray-300'}  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Contact no.*"/>
            </div>
            <div className="mb-4">
                <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-300'}  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    cols={4}
                    rows={5}
                    placeholder="Please tell us a bit about what you are looking for*"
                    required
                  />
            </div>
              <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
              Submit
            </button>
          </form>
        </div>

        <div className="md:w-1/2 p-8 md:pr-16 lg:ml-32">
          <div className="mb-8">
            <FontAwesomeIcon icon={faAddressBook} className="text-white w-8 h-8" />
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Reach Out to Us</h2>
            <p className="text-base text-gray-800 dark:text-gray-300">
              ABC, Faisalabad,<br />
            </p>
            <p className="text-base text-gray-800 dark:text-gray-300">
              Information Center: <a href="#" className="text-indigo-400 hover:underline">support@DevWays.com</a>
            </p>
            <p className="text-base text-gray-800 dark:text-gray-300">
              Verification of Employment: <a href="#" className="text-indigo-400 hover:underline">hr@DevWays.com</a>
            </p>
            <p className="text-base text-gray-800 dark:text-gray-300">
              Contact no.: <a href="#" className="text-indigo-400 hover:underline">+92-----------</a>
            </p>
          </div>

          <div>
            <FontAwesomeIcon icon={faLocationDot} className="text-white w-8 h-8" />
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Our Offices around the Country</h2>
            <p className="text-base text-gray-800 dark:text-gray-300">
              <strong>Faisalabad</strong><br />
              5333 Avenue Casgrain #1201,<br />
              Montréal, QC H2T 1X3
            </p>
            <br />
            <p className="text-base text-gray-800 dark:text-gray-300">
              <strong>Lahore</strong><br />
              Neue Schönhauser Str. 3-5,<br />
              10178 Berlin
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MapContainer;
