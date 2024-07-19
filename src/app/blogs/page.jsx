'use client'
import React, { useEffect, useRef } from 'react';
import Header from '@/app/components/project_header/Header';
import Footer from '../components/footer/Footer';
import Link from 'next/link';

const useIntersectionObserver = (setRefs) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    setRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      setRefs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [setRefs]);
};

function Page() {
  const refs = [useRef(null), useRef(null)];
  useIntersectionObserver(refs);

  return (
    <div>
      <Header header={"Tech experts' latest"} subheading={"Innovations in digital enterprise"} projNum={"Blogs"} video={"/assets/videos/blogs.mp4"} />

      <section className="bg-white min-h-screen flex flex-col justify-center items-center p-8 pt-12">
        <h1 className="text-3xl font-light mb-8">Our Blog Posts</h1>
        <br />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 max-w-screen-lg">
          <div className="max-w-lg" ref={refs[0]}>
            <Link href="#">
              <img className="rounded-t-lg w-full object-cover" src="/assets/pictures/ai_blog.jpg" alt="Portfolio" />
            </Link>
            <div className="p-4">
              <p className="mb-4 font-light text-gray-700 text-xl">
                Exploring Generative AI: Redefining Human Creativity Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quisquam recusandae, non saepe illum
              </p>
              <Link href="/../blogs/blog1" className="relative text-indigo-700 flex items-center group">
                Read more
                <svg className="rtl:rotate-180 w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-1/4 transition-all duration-300 ease-in-out"></span>
              </Link>
            </div>
          </div>

          <div className="max-w-lg" ref={refs[1]}>
            <Link href="#">
              <img className="rounded-t-lg w-full object-cover" src="/assets/pictures/vr.jpg" alt="Portfolio" />
            </Link>
            <div className="p-4">
              <p className="mb-4 font-light text-gray-700 text-xl">
                The Immersive World of Virtual Reality: Transforming Reality and Beyond Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quisquam recusandae, non saepe illum
              </p>
              <Link href="/../blogs/blog2" className="relative text-indigo-700 flex items-center group">
                Read more
                <svg className="rtl:rotate-180 w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-1/4 transition-all duration-300 ease-in-out"></span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Page;
