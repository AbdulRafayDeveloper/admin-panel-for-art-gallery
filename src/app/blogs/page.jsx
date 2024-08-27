"use client";
import React, { useEffect, useRef, useState } from "react";
import Header from "@/app/components/project_header/Header";
import Footer from "../components/footer/Footer";
import Link from "next/link";
import axios from "axios";

const useIntersectionObserver = (refs) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [refs]);
};

function Page() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/blog_posts");
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.log("api not hit");
      }
    };
    fetchData();
  }, []);

  const refs = useRef(data.map(() => React.createRef())).current;
  useIntersectionObserver(refs);

  return (
    <div>
      <Header
        header={"Tech experts' latest"}
        subheading={"Innovations in digital enterprise"}
        projNum={"Blogs"}
        video={"/assets/videos/blogs.mp4"}
      />

      <section className="bg-white min-h-screen flex flex-col justify-center items-center p-8 pt-12">
        <h1 className="text-3xl font-light mb-8">Our Blog Posts</h1>
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 max-w-screen-lg">
          {data &&
            data.map((item, index) => (
              <div className="max-w-lg" ref={refs[index]} key={item.id}>
                <Link href={`../blogs/${item._id}`}>
                  <img
                    className="rounded-t-lg w-full object-cover"
                    src={item.mainImage}
                    alt={item.blogImage.alt}
                  />
                </Link>
                <div className="p-4">
                  <p className="mb-4 font-light text-gray-700 text-xl">
                    {item.mainTitle}
                  </p>
                  <Link
                    href={`../blogs/${item._id}`}
                    className="relative text-indigo-700 flex items-center group"
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-4 h-4 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-1/4 transition-all duration-300 ease-in-out"></span>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Page;
