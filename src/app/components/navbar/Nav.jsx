import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsNavVisible(scrollPosition <= 0 || scrollPosition < prevScrollPos);
      setIsNavScrolled(scrollPosition > 50);
      if (scrollPosition > 0 && scrollPosition > prevScrollPos) {
        setIsMobileMenuOpen(false);
      }

      prevScrollPos = scrollPosition;
    };

    let prevScrollPos = 0;
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && event.target.closest(".mobile-menu") === null) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);
  const handleNavItemSelect = (label) => {
    setSelectedNavItem(label);
  };

  return (
    <nav
      className={`sticky top-0 z-10 transition-all duration-300 ease-in-out ${
        isNavScrolled
          ? "bg-white text-gray-900 font-medium shadow-md"
          : "bg-transparent text-white bg-opacity-10"
      }`}
      style={{
        visibility: isNavVisible ? "visible" : "hidden",
        opacity: isNavVisible ? 1 : 0,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 bg-none">
        <div className="flex items-center justify-between h-16 bg-none relative ">
          {isNavScrolled ? (
            <img
              src="/assets/pictures/cy.svg"
              alt="Scrolled Logo"
              className="w-36 h-36 object-cover"
            />
          ) : (
            <img
              src="/assets/pictures/cyverix.svg"
              alt="Logo"
              className="w-36 h-36 object-cover"
            />
          )}
          <div className="hidden md:flex space-x-8">
            <NavItem
              label="Home"
              url="/"
              isSelected={selectedNavItem === "Home"}
              onSelect={handleNavItemSelect}
            />
            <DropdownMenu
              label="Services"
              items={servicesItems}
              isSelected={selectedNavItem === "Services"}
              onSelect={handleNavItemSelect}
            />
            <DropdownMenu
              label="Insight"
              items={insightItems}
              isSelected={selectedNavItem === "Insight"}
              onSelect={handleNavItemSelect}
            />
            <NavItem
              label="Career"
              url="/../career/"
              isSelected={selectedNavItem === "Career"}
              onSelect={handleNavItemSelect}
            />
            <NavItem
              label="Contact"
              url="/../contact/"
              isSelected={selectedNavItem === "Contact"}
              onSelect={handleNavItemSelect}
            />
            <NavItem
              label="Request a Quote"
              url="/../quote/"
              isSelected={selectedNavItem === "Request a Quote"}
              onSelect={handleNavItemSelect}
            />
          </div>
          <div className="md:hidden">
            <button
              className={` ${isNavScrolled ? "text-black" : "text-white"}`}
              onClick={toggleMobileMenu}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-gray-300"></div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div
          className={`pl-12 pr-6 flex flex-col items-center justify-center md:hidden fixed top-0 left-0 h-screen w-full bg-gray-800 mobile-menu transform transition-transform ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col space-y-2 w-full">
            <div className="flex justify-end pr-4">
              <button
                className="text-white focus:outline-none"
                onClick={toggleMobileMenu}
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <NavItem
              label="Home"
              url="/../home/"
              isSelected={selectedNavItem === "Home"}
              onSelect={handleNavItemSelect}
            />
            <DropdownMenu
              label="Services"
              items={servicesItems}
              isSelected={selectedNavItem === "Services"}
              onSelect={handleNavItemSelect}
              closeMenu={closeMobileMenu}
            />
            <DropdownMenu
              label="Insight"
              items={insightItems}
              isSelected={selectedNavItem === "Insight"}
              onSelect={handleNavItemSelect}
              closeMenu={closeMobileMenu}
            />
            <NavItem
              label="Career"
              url="/../career/"
              isSelected={selectedNavItem === "Career"}
              onSelect={handleNavItemSelect}
            />
            <NavItem
              label="Contact"
              url="/../contact/"
              isSelected={selectedNavItem === "Contact"}
              onSelect={handleNavItemSelect}
            />
            <NavItem
              label="Request a Quote"
              url="/../quote/"
              isSelected={selectedNavItem === "Request a Quote"}
              onSelect={handleNavItemSelect}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ label, url, isSelected, onSelect, isNavScrolled }) => (
  <Link href={url}>
    <div
      className={`text-lg font-medium hover:text-indigo-300 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer py-2 ${
        isSelected || isNavScrolled ? "text-white" : ""
      }`}
      onClick={() => onSelect(label)}
    >
      {label}
    </div>
  </Link>
);

const DropdownMenu = ({
  label,
  items,
  isSelected,
  onSelect,
  closeMenu,
  isNavScrolled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className={`text-lg font-medium flex items-center justify-between hover:text-indigo-300 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer py-2 ${
          isSelected || isNavScrolled ? "text-white" : ""
        }`}
      >
        {label}{" "}
        <svg
          className={`w-4 h-4 inline-block transform ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 flex flex-row z-20 mt-16 text-black">
          <div className="flex-1 bg-gray-200 p-4 flex flex-col items-center justify-center">
            <h1 className="text-2xl text-black font-semibold ">{label}</h1>
            {label === "Services" && (
              <img
                src="/assets/pictures/services.jpg"
                alt="Services Dropdown Image"
                className="w-full h-auto object-cover rounded-lg max-h-[360px]"
              />
            )}
            {label === "Insight" && (
              <img
                src="/assets/pictures/insights.jpg"
                alt="Insight Dropdown Image"
                className="w-full h-auto object-cover rounded-lg max-h-[360px]"
              />
            )}
            <div className="mt-4 text-center">
              {label === "Services" && <div className="mt-4"></div>}
              {label === "Insight" && <></>}
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center p-10 text-gray-900">
            {/* Navigation items for the right column */}
            {items.map((item, index) => (
              <NavItem
                key={index}
                label={item.label}
                url={item.url}
                isSelected={isSelected}
                onSelect={onSelect}
                onClick={closeMenu}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const servicesItems = [
  { label: "Web Development", url: "/services/web" },
  { label: "Cloud Deployment Services", url: "/services/cloud" },
  { label: "AI Solutions", url: "/services/ai" },
  { label: "Mobile App Development", url: "/services/mob" },
  //{ label: 'SEO Services', url: '/services/seo' },
];
const insightItems = [
  { label: "Portfolio", url: "/../portfolio/" },
  { label: "Blogs", url: "/../blogs/" },
  { label: "FAQs", url: "/../faq/" },
  { label: "Terms of Service", url: "/../terms/" },
  { label: "Our Team", url: "/../team/" },
];

export default Nav;
