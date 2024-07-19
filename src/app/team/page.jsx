'use client';
import React, { useState, useEffect, useRef} from 'react';
import Footer from '../components/footer/Footer';
import Nav from '../components/navbar/Nav';
import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function Page() {
   
  const images = [
    { src: '/assets/pictures/team1.jpg', alt: 'Image 1' },
    { src: '/assets/pictures/team2.jpg', alt: 'Image 2' },
    { src: '/assets/pictures/team3.jpg', alt: 'Image 3' },
    { src: '/assets/pictures/team4.jpg', alt: 'Image 4' },
    { src: '/assets/pictures/team5.jpg', alt: 'Image 5' },
    // Add more images as needed
  ];
  
  // Team slider
  const scrollRef = useRef(null);
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -scrollRef.current.offsetWidth, // Scroll one container width left
        behavior: 'smooth'
      });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollRef.current.offsetWidth, // Scroll one container width right
        behavior: 'smooth'
      });
    }
  };
  
  // The animation for aside text
  const textRef = useRef(null);
  
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
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const gridRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  
  useEffect(() => {
    const gridElement = gridRef.current;
    let scrollTimeout;
  
    const handleScroll = () => {
      if (isScrolling && gridElement) {
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
      if (gridRef.current) {
        const sectionTop = gridRef.current.getBoundingClientRect().top;
        if (sectionTop <= window.innerHeight / 2 && !isScrolling) {
          setIsScrolling(true);
        }
      }
    };
  
    window.addEventListener('scroll', handleSectionScroll);
  
    return () => {
      window.removeEventListener('scroll', handleSectionScroll);
    };
  }, [isScrolling]);

  return (
    <div>
      <section className="relative bg-gray-100">
        <div className="absolute inset-0 z-0">
          <video
            className="absolute inset-0 w-full object-cover h-screen"
            src="/assets/videos/team.mp4"
            autoPlay
            loop
            muted
          />
        </div>
        <div className="absolute inset-0 bg-gray-100 opacity-0 z-10"></div> {/* Semi-transparent overlay */}
        <div className="relative z-20">
          <Nav />
          <div className="flex flex-col items-start justify-center min-h-screen px-12">
            <h1 className="text-white text-5xl font-semibold pb-8 m-0">Our Team</h1>
            <p className="text-white text-3xl font-light pb-8">Explore our talented team driving innovation</p>
            <button
              onClick={toggleSidebar}
              aria-controls="default-sidebar"
              type="button"
              className="absolute top-8 left-8 md:hidden z-30 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 min-h-screen flex relative z-40">
      <aside
        className={`fixed top-0 left-0 w-full md:w-1/2 h-screen transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:static md:translate-x-0 z-50`}
        aria-label="Sidebar"
      >
        <div className="relative w-full h-full">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20 z-10 m-auto"
            style={{
              backgroundImage: 'url(/assets/pictures/team.png)',
              width: '70%',
              height: '70%',
              left: '0',
              right: '0',
              top: '0',
              bottom: '0',
            }}
          ></div>
          <div className="relative px-8 py-12 text-center transform hover:scale-105 transition-transform duration-500 z-20">
            <h2
              ref={textRef}
              className="text-5xl bg-gradient-to-r text-transparent from-black via-indigo-400 to-black bg-clip-text leading-relaxed mb-4 mt-5"
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
            {[
              'Meet our forward-thinking leaders who drive our innovation and inspire our teams to achieve excellence.',
              'Our development team consists of skilled professionals dedicated to creating cutting-edge software solutions.',
              'Our design team is a group of creative minds who craft intuitive and visually appealing user experiences.',
              'Our support team is always ready to assist you with any questions or issues. They provide exceptional customer service.',
              'Our research team constantly explores new technologies and methodologies to keep us at the forefront of the industry.',
            ].map((text, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-48 rounded bg-gray-50 shadow-lg"
              >
                <p className="text-xl text-black  font-light p-4">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

      <section className="bg-gray-800 min-h-screen flex relative z-40 pb-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-primary pt-16 text-white">Meet Our Team</h2>

                {/* Scrollable container */}
                <div ref={scrollRef} className="flex overflow-hidden pb-8">
                    {/* Individual team member cards */}
                    <div className="flex space-x-8">
                        {/* Cards 1-4 */}
                        <div className="bg-white rounded-lg shadow-md p-6 my-6 text-center w-72">
                            <img src="/assets/pictures/1.jpg" alt="Team Member 1" className="w-full rounded-full mb-4"/>
                            <h3 className="text-xl font-semibold mb-2">Abdul Rafay</h3>
                            <p className="text-gray-700">CEO and Co-Founder</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 my-6 text-center w-72">
                            <img src="/assets/pictures/2.jpg" alt="Team Member 2" className="w-full rounded-full mb-4"/>
                            <h3 className="text-xl font-semibold mb-2">Muhammad Ammar Raza</h3>
                            <p className="text-gray-700">CTO and Co-Founder</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 my-6 text-center w-72">
                            <img src="/assets/pictures/5.jpg" alt="Team Member 3" className="w-full rounded-full mb-4"/>
                            <h3 className="text-xl font-semibold mb-2">Muhammad Danish</h3>
                            <p className="text-gray-700">Full-Stack Developer</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 my-6 text-center w-72">
                            <img src="/assets/pictures/7.jpg" alt="Team Member 4" className="w-full rounded-full mb-4"/>
                            <h3 className="text-xl font-semibold mb-2">Muddasar Shoaib</h3>
                            <p className="text-gray-700">Wordpress Developer</p>
                        </div>
                    </div>

                    {/* Additional set of cards (hidden on initial view) */}
                    <div className="flex space-x-8">
                        {/* Cards 5-8 */}
                        <div className="bg-white rounded-lg shadow-md p-6 my-6 text-center w-72 ml-6">
                            <img src="/assets/pictures/6.jpg" alt="Team Member 5" className="w-full rounded-full mb-4"/>
                            <h3 className="text-xl font-semibold mb-2">Muhammad Ali Usman</h3>
                            <p className="text-gray-700">Frontend Developer</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 my-6 text-center w-72">
                            <img src="/assets/pictures/3.jpg" alt="Team Member 6" className="w-full rounded-full mb-4"/>
                            <h3 className="text-xl font-semibold mb-2 pt-4">Arooba Zaman</h3>
                            <p className="text-gray-700">Full-Stack Developer</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 my-6 text-center w-72">
                            <img src="/assets/pictures/4.jpg" alt="Team Member 7" className="w-full rounded-full mb-4"/>
                            <h3 className="text-xl font-semibold mb-2">Kashmala Aslam</h3>
                            <p className="text-gray-700">Frontend Developer</p>
                        </div>

                    </div>
                </div>

                {/* Scroll buttons */}
                <div className="flex justify-center space-x-4 mt-4">
                    <button onClick={scrollLeft} className=" rounded-full text-white px-4 py-2 hover:bg-none hover:bg-indigo-500 hover:text-none hover:text-white focus:outline-none opacity-50"><FontAwesomeIcon icon={faChevronLeft} className='text-white hover:text-none hover:text-white'></FontAwesomeIcon></button>
                    <button onClick={scrollRight} className=" text-indigo-500 px-4 py-2 rounded-full hover:bg-none hover:bg-indigo-500 hover:text-none hover:text-white focus:outline-none opacity-50"><FontAwesomeIcon icon={faChevronRight} className='text-white hover:text-none hover:text-white'></FontAwesomeIcon></button>
                </div>
            </div>
      </section>

      {/*<section className="bg-gray-500 min-h-screen flex relative z-40">
      <div className="overflow-hidden shadow-md text-center">
        <h1 className="text-4xl font-semibold text-white py-12">Teams Activities</h1>
        <Marquee gradient={false} className='pt-12 shadow-lg'>
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="h-60 rounded-lg object-cover m-2"
            />
          ))}
        </Marquee>
      </div>
    </section>*/}

      <Footer />
    </div>
  );
}

export default Page;
