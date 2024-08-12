"use client";
import React, { useEffect, useState, useRef } from "react";
import Nav from "../components/navbar/Nav";
import Footer from "../components/footer/Footer";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("");
  const sections = [
    "Service Inquiry",
    "Project Scope Assessment",
    "Technical Requirements",
    "Budget and Timeline",
    "Feedback and Improvement",
  ];

  const sectionRefs = useRef({});

  useEffect(() => {
    sections.forEach((section) => {
      sectionRefs.current[section] = document.getElementById(section);
    });

    const handleScroll = () => {
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const sectionRef = sectionRefs.current[sectionId];
        if (
          sectionRef &&
          sectionRef.getBoundingClientRect().top <= window.innerHeight / 2
        ) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const sectionRef = sectionRefs.current[sectionId];
    if (sectionRef) {
      window.scrollTo({
        top: sectionRef.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-black">
      <Nav />
      <div className="flex min-h-screen bg-white">
        {/* Sidebar */}
        <div className="fixed top-0 left-0 h-full bg-white p-4 border-r shadow-lg pt-12 pr-12 rounded-lg mt-[65px]">
          <ul>
            {sections.map((section) => (
              <li
                key={section}
                className={`mb-4 ${
                  activeSection === section
                    ? "text-indigo-500 font-semibold"
                    : "text-gray-800"
                }`}
              >
                <a
                  href={`#${section}`}
                  onClick={() => scrollToSection(section)}
                  className="block py-2 transition-colors duration-300 hover:text-indigo-500"
                >
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="ml-60 p-8 bg-white flex-1">
          {sections.map((section) => (
            <div key={section} className="px-10 sm:px-16" id={section}>
              <div className="py-3 uppercase text-sm text-gray-500 font-medium">
                {section}
              </div>
              {section === "Service Inquiry" && (
                <div className="ml-5">
                  <div className="flex items-start my-8">
                    <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                      <svg
                        width="24px"
                        fill="white"
                        height="24px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g data-name="Layer 2">
                          <g data-name="menu-arrow">
                            <rect
                              width="24"
                              height="24"
                              transform="rotate(180 12 12)"
                              opacity="0"
                            ></rect>
                            <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"></path>
                            <circle cx="12" cy="19" r="1"></circle>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="text-md">
                      <h1 className="text-gray-900 font-semibold mb-2">
                        What specific services are you looking for?
                      </h1>
                      <p className="text-gray-500 text-sm">
                        Please describe the specific services you are interested
                        in. Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Sed gravida ipsum ut justo varius, non ultricies
                        turpis mollis.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start my-8">
                    <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                      <svg
                        width="24px"
                        fill="white"
                        height="24px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g data-name="Layer 2">
                          <g data-name="menu-arrow">
                            <rect
                              width="24"
                              height="24"
                              transform="rotate(180 12 12)"
                              opacity="0"
                            ></rect>
                            <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"></path>
                            <circle cx="12" cy="19" r="1"></circle>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="text-md">
                      <h1 className="text-gray-900 font-semibold mb-2">
                        What challenges are you facing that you need assistance
                        with?
                      </h1>
                      <p className="text-gray-500 text-sm">
                        Describe any challenges or issues you are currently
                        facing that you need assistance with. Lorem ipsum dolor
                        sit amet, consectetur adipiscing elit. Sed gravida ipsum
                        ut justo varius, non ultricies turpis mollis.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {section === "Project Scope Assessment" && (
                <div className="ml-5">
                  <div className="flex items-start my-8">
                    <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                      <svg
                        width="24px"
                        fill="white"
                        height="24px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g data-name="Layer 2">
                          <g data-name="menu-arrow">
                            <rect
                              width="24"
                              height="24"
                              transform="rotate(180 12 12)"
                              opacity="0"
                            ></rect>
                            <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"></path>
                            <circle cx="12" cy="19" r="1"></circle>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="text-md">
                      <h1 className="text-gray-900 font-semibold mb-2">
                        What is the scope of your project?
                      </h1>
                      <p className="text-gray-500 text-sm">
                        Please outline your initial questions or concerns
                        regarding the project scope. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed gravida ipsum ut justo
                        varius, non ultricies turpis mollis.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start my-8">
                    <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                      <svg
                        width="24px"
                        fill="white"
                        height="24px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g data-name="Layer 2">
                          <g data-name="menu-arrow">
                            <rect
                              width="24"
                              height="24"
                              transform="rotate(180 12 12)"
                              opacity="0"
                            ></rect>
                            <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"></path>
                            <circle cx="12" cy="19" r="1"></circle>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="text-md">
                      <h1 className="text-gray-900 font-semibold mb-2">
                        {" "}
                        Do you have any specific requirements or features in
                        mind for your project?
                      </h1>
                      <p className="text-gray-500 text-sm">
                        Please outline your initial questions or concerns
                        regarding the project scope. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed gravida ipsum ut justo
                        varius, non ultricies turpis mollis.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {section === "Technical Requirements" && (
                <div className="ml-5">
                  <div className="flex items-start my-8">
                    <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                      <svg
                        width="24px"
                        fill="white"
                        height="24px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g data-name="Layer 2">
                          <g data-name="menu-arrow">
                            <rect
                              width="24"
                              height="24"
                              transform="rotate(180 12 12)"
                              opacity="0"
                            ></rect>
                            <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"></path>
                            <circle cx="12" cy="19" r="1"></circle>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="text-md">
                      <h1 className="text-gray-900 font-semibold mb-2">
                        {" "}
                        What technologies or platforms are you currently using?
                      </h1>
                      <p className="text-gray-500 text-sm">
                        Specify any technical requirements or specifications
                        needed for the project. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed gravida ipsum ut justo
                        varius, non ultricies turpis mollis.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start my-8">
                    <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                      <svg
                        width="24px"
                        fill="white"
                        height="24px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g data-name="Layer 2">
                          <g data-name="menu-arrow">
                            <rect
                              width="24"
                              height="24"
                              transform="rotate(180 12 12)"
                              opacity="0"
                            ></rect>
                            <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"></path>
                            <circle cx="12" cy="19" r="1"></circle>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="text-md">
                      <h1 className="text-gray-900 font-semibold mb-2">
                        Are there any technical integrations or compatibility
                        requirements?
                      </h1>
                      <p className="text-gray-500 text-sm">
                        Specify any technical requirements or specifications
                        needed for the project. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed gravida ipsum ut justo
                        varius, non ultricies turpis mollis.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {section === "Budget and Timeline" && (
                <div className="ml-5">
                  <div className="flex items-start my-8">
                    <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                      <svg
                        width="24px"
                        fill="white"
                        height="24px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g data-name="Layer 2">
                          <g data-name="menu-arrow">
                            <rect
                              width="24"
                              height="24"
                              transform="rotate(180 12 12)"
                              opacity="0"
                            ></rect>
                            <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"></path>
                            <circle cx="12" cy="19" r="1"></circle>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="text-md">
                      <h1 className="text-gray-900 font-semibold mb-2">
                        What is your expected timeline for project completion?
                      </h1>
                      <p className="text-gray-500 text-sm">
                        Provide details on your budget constraints and desired
                        project timeline. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed gravida ipsum ut justo
                        varius, non ultricies turpis mollis.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start my-8">
                    <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                      <svg
                        width="24px"
                        fill="white"
                        height="24px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g data-name="Layer 2">
                          <g data-name="menu-arrow">
                            <rect
                              width="24"
                              height="24"
                              transform="rotate(180 12 12)"
                              opacity="0"
                            ></rect>
                            <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"></path>
                            <circle cx="12" cy="19" r="1"></circle>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="text-md">
                      <h1 className="text-gray-900 font-semibold mb-2">
                        What is your budget for this project?
                      </h1>
                      <p className="text-gray-500 text-sm">
                        Provide details on your budget constraints and desired
                        project timeline. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed gravida ipsum ut justo
                        varius, non ultricies turpis mollis.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {section === "Feedback and Improvement" && (
                <div className="ml-5">
                  <div className="flex items-start my-8">
                    <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                      <svg
                        width="24px"
                        fill="white"
                        height="24px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g data-name="Layer 2">
                          <g data-name="menu-arrow">
                            <rect
                              width="24"
                              height="24"
                              transform="rotate(180 12 12)"
                              opacity="0"
                            ></rect>
                            <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"></path>
                            <circle cx="12" cy="19" r="1"></circle>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="text-md">
                      <h1 className="text-gray-900 font-semibold mb-2">
                        {" "}
                        Are there any areas of improvement you've identified
                        from previous projects?
                      </h1>
                      <p className="text-gray-500 text-sm">
                        Share any feedback or suggestions for improvement
                        regarding the project. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed gravida ipsum ut justo
                        varius, non ultricies turpis mollis.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start my-8">
                    <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                      <svg
                        width="24px"
                        fill="white"
                        height="24px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g data-name="Layer 2">
                          <g data-name="menu-arrow">
                            <rect
                              width="24"
                              height="24"
                              transform="rotate(180 12 12)"
                              opacity="0"
                            ></rect>
                            <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"></path>
                            <circle cx="12" cy="19" r="1"></circle>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="text-md">
                      <h1 className="text-gray-900 font-semibold mb-2">
                        How do you measure the success of your software
                        projects?
                      </h1>
                      <p className="text-gray-500 text-sm">
                        Share any feedback or suggestions for improvement
                        regarding the project. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed gravida ipsum ut justo
                        varius, non ultricies turpis mollis.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="relative">
        <Footer />
      </div>
    </div>
  );
};

export default Sidebar;
