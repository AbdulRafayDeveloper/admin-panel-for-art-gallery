import React, { useState, useEffect } from "react";
import Link from "next/link";

const CustomSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === totalSlides - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  const totalSlides = 2;
  const videoFileNames = ["video2.mp4", "video1.mp4"];
  const slideTexts = [
    { largeText: "Shaping the Future", smallText: "Innovating for Tomorrow" },
    {
      largeText: "Collaborative Minds",
      smallText: "Crafting the next software Solution",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div
      id="slider-container"
      className="absolute inset-0 z-0 overflow-hidden h-screen"
    >
      <div className="relative h-screen">
        <div className="relative h-full">
          {Array.from({ length: totalSlides }, (_, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full ${
                index !== currentSlide ? "hidden" : ""
              }`}
            >
              <video className="w-full h-full object-cover" autoPlay loop muted>
                <source
                  src={`/assets/videos/${videoFileNames[index]}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <div className="absolute top-1/2 left-7 transform -translate-y-1/2 text-white">
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold">
                  {slideTexts[index].largeText}
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-light mt-4">
                  {slideTexts[index].smallText}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex items-center justify-between w-20 sm:w-24 md:w-32">
          <button
            type="button"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white  flex items-center justify-center"
            onClick={prevSlide}
          >
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white  flex items-center justify-center"
            onClick={nextSlide}
          >
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Button over the slider */}
        <div className="absolute bottom-16 left-4 sm:left-8 md:left-16 z-40">
          <Link
            href={"/../contact/"}
            type="button"
            className="px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-white opacity-80 text-gray-700 text-base sm:text-lg md:text-xl font-semibold rounded border border-transparent hover:bg-gray-600 hover:text-white hover:border-white transition"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomSlider;
