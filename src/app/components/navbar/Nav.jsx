import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsNavVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  // Function to close mobile menu on item click or outside click
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle outside click to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && event.target.closest('.mobile-menu') === null) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className={`sticky top-0 z-10 text-white bg-white bg-opacity-10 transition-all duration-300 ease-in-out ${isNavVisible ? 'opacity-100' : 'opacity-0 -translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 bg-none">
        <div className="flex items-center justify-between h-16 bg-none relative">
          <NavItem label="DevWays" url="/../home/" />
          <div className="hidden md:flex space-x-8">
            <NavItem label="Home" url="/../home/" />
            <DropdownMenu label="Services" items={servicesItems} />
            <DropdownMenu label="Insight" items={insightItems} />
            <NavItem label="Career" url="/../career/" />
            <NavItem label="Contact" url="/../contact/" />
            <NavItem label="Request a Quote" url="/../quote/" />
          </div>
          <div className="md:hidden">
            <button className="text-white focus:outline-none" onClick={toggleMobileMenu}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-gray-300"></div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className={`pl-12 pr-6 flex flex-col items-center justify-center md:hidden fixed top-0 left-0 h-screen w-full bg-gray-800 mobile-menu transform transition-transform ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col space-y-2 w-full">
            <div className="flex justify-end pr-4">
              <button className="text-white focus:outline-none" onClick={toggleMobileMenu}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <NavItem label="Home" url="/../home/" onClick={closeMobileMenu} />
            <DropdownMenu label="Services" items={servicesItems} closeMenu={closeMobileMenu} />
            <DropdownMenu label="Insight" items={insightItems} closeMenu={closeMobileMenu} />
            <NavItem label="Career" url="/../career/" onClick={closeMobileMenu} />
            <NavItem label="Contact" url="/../contact/" onClick={closeMobileMenu} />
            <NavItem label="Request a Quote" url="/../quote/" onClick={closeMobileMenu} />
          </div>
        </div>      
      )}
    </nav>
  );
};

const NavItem = ({ label, url, onClick }) => (
  <Link href={url}>
    <div className="text-lg font-light hover:text-indigo-300 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer py-2" onClick={onClick}>
      {label}
    </div>
  </Link>
);

const DropdownMenu = ({ label, items, closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="text-lg font-light
       text-white flex items-center justify-between hover:text-indigo-500 transition duration-300 ease-in-out transform hover:scale-110 cursor-pointer py-2">
        {label}{' '}
        <svg
          className={`w-4 h-4 inline-block transform ${isOpen ? 'rotate-0' : '-rotate-90'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-row z-20 mt-16">
          <div className="flex-1 bg-gray-200 p-4 flex flex-col items-center justify-center">
            <h1 className='text-2xl text-black font-semibold '>{label}</h1>
            {label === 'Services' && (
              <img src="/assets/pictures/services.jpg" alt="Services Dropdown Image" className="w-full h-auto object-cover rounded-lg max-h-[360px]" />
            )}
            {label === 'Insight' && (
              <img src="/assets/pictures/insights.jpg" alt="Insight Dropdown Image" className="w-full h-auto object-cover rounded-lg max-h-[360px]" />
            )}
            <div className="mt-4 text-center">
              {label === 'Services' && (
                <div className="mt-4">
                  
                </div>
              )}
              {label === 'Insight' && (
                <></>
              )}
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center p-10 text-gray-900">
            {/* Navigation items for the right column */}
            {items.map((item, index) => (
              <NavItem key={index} label={item.label} url={item.url} onClick={closeMenu} />
            ))}
          </div>
        </div>       
      )}  
    </div>
  );
};

// Example items for dropdowns
const servicesItems = [
  { label: 'Web Development', url: '/services/web' },
  { label: 'Cloud Services', url: '/services/cloud' },
  { label: 'AI Solutions', url: '/services/ai' },
  { label: 'Mobile App Development', url: '/services/mob' },
  { label: 'SEO Services', url: '/services/seo' },
];
const insightItems = [
  { label: 'Portfolio', url: '/../portfolio/' },
  { label: 'Blogs', url: '/../blogs/' },
  { label: 'FAQs', url: '/../faq/' },
  { label: 'Terms of Service', url: '/../terms/' },
  { label: 'Our Team', url: '/../team/' }
];

export default Nav;
