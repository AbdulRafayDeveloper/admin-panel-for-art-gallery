'use client'
import React, { useRef, useState, useEffect } from 'react';

const List = ({ servicesList }) => {
  
  const textRef = useRef(null);
  const gridRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (textRef.current) {
        const gradientPosition = (scrollTop % window.innerHeight) / window.innerHeight * 100;
        textRef.current.style.backgroundPosition = `${gradientPosition}% 0%`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

 
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const gridElement = gridRef.current;
    let scrollTimeout;

    const handleScroll = () => {
      if (isScrolling) {
        const maxScrollTop = gridElement.scrollHeight - gridElement.clientHeight;
        if (gridElement.scrollTop >= maxScrollTop) {
          setIsScrolling(false);
        } else {
          gridElement.scrollTop += 10; // Adjust scroll speed here
        }
      }
    };

    if (isScrolling) {
      scrollTimeout = setInterval(handleScroll, 100); // Adjust scroll interval here
    }

    return () => clearInterval(scrollTimeout);
  }, [isScrolling]);

  useEffect(() => {
    const handleSectionScroll = () => {
      const sectionTop = gridRef.current.getBoundingClientRect().top;
      if (sectionTop <= window.innerHeight / 2 && !isScrolling) {
        setIsScrolling(true);
      }
    };

    window.addEventListener('scroll', handleSectionScroll);

    return () => {
      window.removeEventListener('scroll', handleSectionScroll);
    };
  }, [isScrolling]);

  return (
    <div>
      <section className="bg-gray-900 min-h-screen flex relative z-40">
        <aside
          className={`fixed top-0 left-0 w-full md:w-1/2 h-screen transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:static md:translate-x-0 z-50`}
          aria-label="Sidebar"
        >
          <div className="relative w-full h-full">
            <div className="relative px-8 py-12 text-center transform hover:scale-105 transition-transform duration-500 z-20">
              <p className="font-light text-white flex justify-start items-start ml-[15.9px]">OUR SERVICES</p>

              <h2
                ref={textRef}
                className="text-5xl bg-gradient-to-r text-transparent from-white via-indigo-400 to-white bg-clip-text leading-relaxed mb-4 mt-5"
                style={{ backgroundPosition: '50% 0%', backgroundSize: '200%' }}
              >
                Empowering our global clientele to embrace modern technology, rethink processes, and elevate experiences
              </h2>
            </div>
          </div>
        </aside>

        <div className="p-4 ml-auto w-full md:w-1/2">
          <div className="p-4 rounded-lg h-screen overflow-y-auto">
            <div ref={gridRef} className="grid grid-cols-1 gap-4 mb-4">
              {servicesList.map((text, index) => (
                <div key={index} className="bg-gray-800">
                  <p className="text-xl text-white font-light p-4">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default List;
