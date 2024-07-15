'use client'
import React, { useState, useEffect, useRef } from 'react';
import Nav from '../components/navbar/Nav';

function JobApplicationForm({ jobTitle, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to backend)
    console.log('Form data:', formData);
    onClose(); // Close the form after submission
  };

  useEffect(() => {
    function show() {
      // Your side effect code here
    }
    show();
  }, []);

  return (
    <div className="p-4 border-2 border-gray-200 bg-white shadow-lg rounded-lg text-gray-700">
      <h2 className="text-xl font-semibold mb-4">{jobTitle} Application</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-1 w-full bg-gray-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-3 py-1 w-full bg-gray-200"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Resume (PDF or Word)</label>
          <input
            type="file"
            name="resume"
            onChange={handleChange}
            accept=".pdf,.doc,.docx"
            className="border border-gray-300 rounded-md px-3 py-1 w-full bg-gray-200"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-4 rounded-md hover:bg-blue-600"
        >
          Submit Application
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
      title: 'Business Analyst',
      location: 'Austin, TX',
      easyApplyLink: '/apply/bi-analyst',
      content: `We’re looking for a highly motivated, detail-oriented, insightful, creative, and experienced analyst with a proven ability to deliver value through analytics. ... (content truncated for brevity)`,
    },
    {
      id: 2,
      title: 'Software Engineer',
      location: 'Remote',
      easyApplyLink: '/apply/software-engineer',
      content: `We are seeking a passionate Software Engineer to join our remote team. As a Software Engineer, you will be responsible for designing, developing, and maintaining high-quality software solutions that meet customer needs and company objectives. ... (content truncated for brevity)`,
    },
    {
      id: 3,
      title: 'UX/UI Designer',
      location: 'San Francisco, CA',
      easyApplyLink: '/apply/ux-ui-designer',
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
    sidebarRef.current.classList.toggle('-translate-x-full');
  };

  return (
    <div className='bg-black'>
      <Nav />
      <section className="bg-gray-200">
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
                      selectedJob === job.id ? 'bg-gray-100 dark:bg-gray-200' : ''
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
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Careers at Our Company</h2>

                <section>
                  <h3 className="text-xl font-semibold mb-2">Welcome Message</h3>
                  <p className="mb-4 leading-relaxed">
                    We are from the people. We are a team of 6500+ people – with a purpose to thrive in our value-driven culture and make a real and lasting difference to the organization and their careers.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2">Career Tracks</h3>
                  <p className="mb-4 leading-relaxed">
                    Techies, innovators, developers, and free-thinkers… you’ve come to the right place. Whether you’re an experienced professional or a recent graduate, working with Systems will give you opportunities to excel and achieve the global recognition that you deserve!
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2">Welcome Message Continued</h3>
                  <p className="mb-4 leading-relaxed">
                    Welcome to our careers page! We are thrilled that you are considering joining our dynamic and innovative team. At our company, we foster a culture of creativity, collaboration, and growth. We offer a wide range of exciting career opportunities across various departments and locations. Whether you are a seasoned professional or just starting out, we have something for everyone.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2">Employee Support and Benefits</h3>
                  <p className="mb-4 leading-relaxed">
                    We are committed to providing our employees with the resources and support they need to succeed. From comprehensive training programs to competitive benefits, we invest in our team members to help them reach their full potential. Join us and be part of a company that values innovation, integrity, and excellence.
                  </p>
                </section>
              </div>
            ) : (
              <>
                {jobs.map((job) => (
                  selectedJob === job.id && (
                    <div key={job.id} className="p-4 border-2 border-gray-200 shadow-lg bg-white rounded-lg text-gray-700 mb-4">
                      <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                      <p className="text-gray-600 font-semibold">{job.location}</p>
                      <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: job.content }} />
                      <button
                        type="button"
                        onClick={toggleForm}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
                      >
                        {showForm ? 'Close Application Form' : 'Apply Now'}
                      </button>
                    </div>
                  )
                ))}
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
