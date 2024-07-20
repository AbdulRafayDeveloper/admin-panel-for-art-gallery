'use client'
import React, { useState, useEffect, useRef } from 'react';
import Nav from '../components/navbar/Nav';
import Footer from '../components/footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import SweetAlert from '../components/alert/SweetAlert'
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'


const MapContainer = () => {

  const [count, setCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const btnRef = useRef(null);
  const [Formdata, setFormdata] = useState({
    name: '',
    city: '',
    email: '',
    number: '',
    message: '',
  });

  const [errorMessages, setErrorMessages] = useState({
		name: '',
		email: '',
		number: '',
		city: '',
    message:''})

  const validateForm = () => {
      const { name, email, number, city, message } = Formdata;
      const nameRegex = /^[a-zA-Z\s]*$/;
      const cityRegex = /^[a-zA-Z\s]*$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    
      let valid = true;
    
      setErrorMessages({
        name: '',
        email: '',
        number: '',
        city: '',
        message:''  
      });
    
      if (name ==="") {
        
        setErrorMessages(prevState => ({ ...prevState, name: 'Name is required' }));
        valid = false;
      } else if (!nameRegex.test(name)) {
        
        setErrorMessages(prevState => ({ ...prevState, name: 'Name should not contain numbers or special characters' }));
        valid = false;
      }
    
      if (email==="") {
        setErrorMessages(prevState => ({ ...prevState, email: 'Email is required' }));
        valid = false;
      } else if (!emailRegex.test(email)) {
        setErrorMessages(prevState => ({ ...prevState, email: 'Email should be a valid Gmail address' }));
        valid = false;
      }
    
      if (number.length == "") {
        setErrorMessages(prevState => ({ ...prevState, number: 'Enter mobile numbers' }));
        valid = false;
      }
    
      if (city==="") {
        setErrorMessages(prevState => ({ ...prevState, city: 'City is required' }));
        valid = false;
      } else if (!cityRegex.test(city)) {
        setErrorMessages(prevState => ({ ...prevState, city: 'City should not contain numbers or special characters' }));
        valid = false;
      }
    
      if (message === "")
      {
        setErrorMessages(prevState => ({ ...prevState, message: 'Message is required' }));
        valid = false;
      }else if (message.split(/\s+/).length > 200) {
        setErrorMessages(prevState => ({ ...prevState, message: 'Message should not exceed 200 words' }));
        valid = false;
      }
    
      return valid;
    };
  
    const handleChange = (name, value) => {
      setFormdata({ ...Formdata, [name]: value });
        
        // Validation checks and updating error messages accordingly
        if (name === 'name') {
          if (value === '') 
          {
            setErrorMessages(prevState => ({ ...prevState, name: 'Name is required' }));
          } 
          else if (!/^[a-zA-Z\s]*$/.test(value)) 
          {
            setErrorMessages(prevState => ({ ...prevState, name: 'Name should not contain numbers or special characters' }));
          } 
          else 
          {
            setErrorMessages(prevState => ({ ...prevState, name: '' }));
          }
        } 
        else if (name === 'number') {
          if (value.trim() === '') 
          {
            setErrorMessages(prevState => ({ ...prevState, name: 'Number is required' }));
          } 
          else 
          {
            setErrorMessages(prevState => ({ ...prevState, name: '' }));
          }
        }
        else if (name === 'email') 
        {
          if (value.trim() === '') 
          {
            setErrorMessages(prevState => ({ ...prevState, email: 'Email is required' }));
          }
          else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) 
          {
            setErrorMessages(prevState => ({ ...prevState, email: 'Email should be a valid Gmail address' }));
          } 
          else 
          {
            setErrorMessages(prevState => ({ ...prevState, email: '' }));
          }
        } 
         
        else if (name === 'city') 
        {
          if (value.trim() === '') 
          {
            setErrorMessages(prevState => ({ ...prevState, city: 'City is required' }));
          } 
          else if (!/^[a-zA-Z\s]*$/.test(value)) 
          {
            setErrorMessages(prevState => ({ ...prevState, city: 'City should not contain numbers or special characters' }));
          } 
          else 
          {
            setErrorMessages(prevState => ({ ...prevState, city: '' }));
          }
        } 
        else if (name === 'message') 
        {
          const words = value.trim().split(/\s+/).filter(Boolean);
          const wordCount = words.length;
          if (value.trim() === '') 
          {
            setErrorMessages(prevState => ({ ...prevState, message: 'Message is required' }));
          } 
          else if(wordCount > 200) {
            setErrorMessages(prevState => ({ ...prevState, message: 'You have reached the word limit of 200 words.' }));
          }
          else 
          {
            setErrorMessages(prevState => ({ ...prevState, message: '' }));
            setCount(wordCount)
          }
        } 
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (
          Formdata.name === '' &&
          Formdata.email === '' &&
          Formdata.number === '' &&
          Formdata.city === '' &&
          Formdata.message === '' 
          ) {
            SweetAlert('Validation Error', 'Complete all the required fields', 'error');
            validateForm()
            return;
        }
        
          // Validate form fields
        if (!validateForm()) {
          SweetAlert('Validation Error', 'Enter valid values', 'error')
          return;
        }
    
        setIsSubmitting(true);
        const FormdataToSend = new FormData()
    
        FormdataToSend.append('name', Formdata.name);
        FormdataToSend.append('email', Formdata.email);
        FormdataToSend.append('number', Formdata.number);
        FormdataToSend.append('city', Formdata.city);
        FormdataToSend.append('description', Formdata.message);
        
        try {
          console.log("Data sent: ", FormdataToSend);
          await axios.post('/api/contact', FormdataToSend);
          btnRef.current.classList.add('disable');

          SweetAlert('Success', 'File uploaded successfully!', 'success');
          setCount(0)
          setFormdata({
            name: '',
            email: '',
            number: '',
            city: '',
            message: '',
           
          });
        } catch (error) {
          console.error('Error:', error);
          SweetAlert('Error', error.response?.data?.message || 'Form not submitted', 'error');
        }finally{
          setIsSubmitting(false);
        }
      };

  const [loading, setLoading] = useState(true);
  
  
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  console.log(apiKey)
  const address = 'Dzone Technologies,C3XX+85C, Ashrafabad, Faisalabad'; // Replace with the desired location

  useEffect(() => {
    setLoading(false); // Simulate loading completion
  }, []);

  

  useEffect(() => {
    setLoading(false); // Simulate loading completion
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-gray-600">
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
    <div className='bg-black'>
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

      <section className="bg-white min-h-screen flex flex-col md:flex-row justify-center items-center">
        <div className="md:w-1/2 p-8 md:pl-16">
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit} method='post'>
            <h1 className="text-3xl text-gray-900 dark:text-white mb-4">Please fill the form</h1>
            <div className="mb-4">
              <input
                  type="text"
                  id="name"
                  value={Formdata.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  name='name'
                  className={`bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-transparent border placeholder-gray-400 dark:text-white  focus:border-blue-500 border-gray-600`}
                  placeholder="Your name*"
                />
                {errorMessages.name && <span className='text-red-500 font-bold text-xs validate'>{errorMessages.name}</span>}
            </div>
            <div className="mb-4">
              <input
                  type="text"
                  id="city"
                  value={Formdata.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  name='city'
                  className={`bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-transparent border placeholder-gray-400 dark:text-white  focus:border-blue-500 border-gray-600`}
                  placeholder="City*"
                  
                />
                {errorMessages.city && <span className='text-red-500 font-bold text-xs validate'>{errorMessages.city}</span>}
            </div>
            <div className="mb-4">
              <input
                  type="email"
                  id="email"
                  value={Formdata.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  name='email'
                  className={`bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-transparent border placeholder-gray-400 dark:text-white  focus:border-blue-500 border-gray-600`}
                  placeholder="Email*"
                  
                />
                {errorMessages.email && <span className='text-red-500 font-bold text-xs validate'>{errorMessages.email}</span>}
            </div>
            <div className="mb-4">
              <PhoneInput
                country={'pk'}
                id="number"
                value={Formdata.number}
                onChange={(value) => handleChange('number', value)} // Pass value directly
                className={`bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-transparent placeholder-gray-400 dark:text-white focus:border-blue-500 border border-gray-600 custom-phone-input`}
                
                placeholder="Contact no.*"/>
                {errorMessages.number && <span className='text-red-500 font-bold text-xs validate'>{errorMessages.number}</span>}
            </div>
            <div className="mb-4">
                <p className='font-light text-gray-700 text-sm flex justify-end'>{count}/200</p>
                <textarea
                    id="message"
                    value={Formdata.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    name='message'
                    className={`bg-gray-50  text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 bg-transparent border placeholder-gray-400 dark:text-white  focus:border-blue-500 border-gray-600`}
                    cols={4}
                    rows={5}
                    placeholder="Please tell us a bit about what you are looking for*"
                    
                  />
                  {errorMessages.message && <span className='text-red-500 font-bold text-xs validate'>{errorMessages.message}</span>}
            </div>
            <div className="text-right">
              <button
                type="submit"
                ref={btnRef}
                disabled={isSubmitting}
                name="button"
                className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-300 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-indigo-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
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
