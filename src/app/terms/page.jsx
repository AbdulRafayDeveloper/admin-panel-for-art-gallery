"use client";
import React, { useEffect, useState } from "react";
import Nav from "../components/navbar/Nav";
import Footer from "../components/footer/Footer";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("");
  const handleScroll = () => {
    const sections = [
      "terms-of-service",
      "privacy-policy",
      "cookie-policy",
      "copyright-notice",
      "disclaimers",
    ];

    for (let i = sections.length - 1; i >= 0; i--) {
      const sectionId = sections[i];
      const section = document.getElementById(sectionId);
      if (
        section &&
        section.getBoundingClientRect().top <= window.innerHeight / 2
      ) {
        setActiveSection(sectionId);
        break;
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-black">
      <Nav />
      <div className="flex bg-white min-h-screen">
        {/* Sidebar */}
        <div className="fixed top-0 left-0 h-full bg-white p-4 border-r shadow-lg pt-12 pr-12 rounded-lg mt-[65px]">
          <ul>
            <li
              className={`mb-4 ${
                activeSection === "terms-of-service"
                  ? "text-indigo-500 font-semibold"
                  : "text-gray-800"
              }`}
            >
              <a
                href="#terms-of-service"
                className="block py-2 transition-colors duration-300 hover:text-indigo-500"
              >
                Terms of Service
              </a>
            </li>
            <li
              className={`mb-4 ${
                activeSection === "privacy-policy"
                  ? "text-indigo-500 font-semibold"
                  : "text-gray-800"
              }`}
            >
              <a
                href="#privacy-policy"
                className="block py-2 transition-colors duration-300 hover:text-indigo-500"
              >
                Privacy Policy
              </a>
            </li>
            <li
              className={`mb-4 ${
                activeSection === "cookie-policy"
                  ? "text-indigo-500 font-semibold"
                  : "text-gray-800"
              }`}
            >
              <a
                href="#cookie-policy"
                className="block py-2 transition-colors duration-300 hover:text-indigo-500"
              >
                Cookie Policy
              </a>
            </li>
            <li
              className={`mb-4 ${
                activeSection === "copyright-notice"
                  ? "text-indigo-500 font-semibold"
                  : "text-gray-800"
              }`}
            >
              <a
                href="#copyright-notice"
                className="block py-2 transition-colors duration-300 hover:text-indigo-500"
              >
                Copyright Notice
              </a>
            </li>
            <li
              className={`mb-4 ${
                activeSection === "disclaimers"
                  ? "text-indigo-500 font-semibold"
                  : "text-gray-800"
              }`}
            >
              <a
                href="#disclaimers"
                className="block py-2 transition-colors duration-300 hover:text-indigo-500"
              >
                Disclaimers
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="ml-60 p-8 bg-white flex-1">
          <section id="terms-of-service" className="mb-16">
            <h2
              className={`text-3xl font-bold ${
                activeSection === "terms-of-service"
                  ? "text-indigo-500"
                  : "text-gray-900"
              }`}
            >
              Terms of Service
            </h2>
            <ul className="list-disc ml-6 mt-4 leading-7 text-gray-900">
              <li>Clarify key terms used throughout the document.</li>
              <li>
                Establish the terms of the agreement between the user and the
                company.
              </li>
              <li>
                Outline how users accept the terms, such as by accessing or
                using the website or services.
              </li>
              <li>
                Describe the responsibilities and obligations of users while
                interacting with the website or services.
              </li>
              <li>
                Detail the obligations of the company in providing the services.
              </li>
            </ul>
          </section>

          <section id="privacy-policy" className="mb-16">
            <h2
              className={`text-3xl font-bold ${
                activeSection === "privacy-policy"
                  ? "text-indigo-500"
                  : "text-gray-900"
              }`}
            >
              Privacy Policy
            </h2>
            <ul className="list-disc ml-6 mt-4 leading-7 text-gray-900">
              <li>
                Explain what personal information is collected from users and
                how it's used.
              </li>
              <li>
                Describe the use of cookies and tracking technologies on the
                website.
              </li>
              <li>
                Detail measures taken to protect users' personal information.
              </li>
              <li>
                Explain circumstances under which personal data may be shared
                with third parties.
              </li>
              <li>
                Inform users of their rights regarding their personal data, such
                as access, correction, or deletion.
              </li>
            </ul>
          </section>

          <section id="cookie-policy" className="mb-16">
            <h2
              className={`text-3xl font-bold ${
                activeSection === "cookie-policy"
                  ? "text-indigo-500"
                  : "text-gray-900"
              }`}
            >
              Cookie Policy
            </h2>
            <ul className="list-disc ml-6 mt-4 leading-7 text-gray-900">
              <li>
                Define what cookies are and how they're used on the website.
              </li>
              <li>
                Describe the different types of cookies used, such as
                functional, analytical, and third-party cookies.
              </li>
              <li>
                Provide information on how users can manage their cookie
                preferences.
              </li>
              <li>
                Explain how users consent to the use of cookies by continuing to
                browse the website.
              </li>
            </ul>
          </section>

          <section id="copyright-notice" className="mb-16">
            <h2
              className={`text-3xl font-bold ${
                activeSection === "copyright-notice"
                  ? "text-indigo-500"
                  : "text-gray-900"
              }`}
            >
              Copyright Notice
            </h2>
            <ul className="list-disc ml-6 mt-4 leading-7 text-gray-900">
              <li>
                Declare the ownership of website content, including text,
                images, and multimedia.
              </li>
              <li>
                Specify permitted and prohibited uses of website content, such
                as reproduction or distribution.
              </li>
              <li>
                Provide information on how to report copyright infringement in
                compliance with the DMCA.
              </li>
              <li>
                Declare the ownership of website content, including text,
                images, and multimedia.
              </li>
              <li>
                Specify permitted and prohibited uses of website content, such
                as reproduction or distribution.
              </li>
              <li>
                Provide information on how to report copyright infringement in
                compliance with the DMCA.
              </li>
            </ul>
          </section>

          <section id="disclaimers" className="mb-16">
            <h2
              className={`text-3xl font-bold ${
                activeSection === "disclaimers"
                  ? "text-indigo-500"
                  : "text-gray-900"
              }`}
            >
              Disclaimers
            </h2>
            <ul className="list-disc ml-6 mt-4 leading-7 text-gray-900">
              <li>
                Clarify that information provided on the website is for
                informational purposes only and not legal advice.
              </li>
              <li>
                State that the company does not warrant the accuracy or
                completeness of information provided on the website.
              </li>
              <li>
                Disclaim responsibility for the content of external websites
                linked from the website.
              </li>
              <li>
                Declare the ownership of website content, including text,
                images, and multimedia.
              </li>
              <li>
                Specify permitted and prohibited uses of website content, such
                as reproduction or distribution.
              </li>
              <li>
                Provide information on how to report copyright infringement in
                compliance with the DMCA.
              </li>
              <li>
                The Parties agree that any rights or obligations under the
                Licensing Agreement or the Licensing Agreement in its entirety
                may be assigned or transferred to a third party by the Company,
                to which the Customer expresses its prior consent. The Customer
                may assign or transfer any of its rights or obligations under
                the Licensing Agreement or the Licensing Agreement in its
                entirety to a third party only with the prior written consent of
                the Company.
              </li>
              <li>
                The Parties agree to a limitation period for the rights arising
                from the Licensing Agreement to the benefit of the Company of
                ten (10) years from the day on which the right could be
                exercised for the first time.
              </li>
              <li>
                The Parties exclude the possibility that, beyond the scope of
                the express provisions of the Licensing Agreement, any of the
                rights and obligations are drawn from practice established by
                the Parties or from generally accepted commercial practices
                relating to the subject matter of the Licensing Agreement.
              </li>
            </ul>
          </section>
        </div>
      </div>
      <div className="relative">
        <Footer />
      </div>
    </div>
  );
};

export default Sidebar;
