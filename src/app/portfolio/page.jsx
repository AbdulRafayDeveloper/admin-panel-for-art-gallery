'use client'
import React from 'react'
import Nav from '../components/navbar/Nav'
import { useState } from 'react';
import Link from 'next/link';
import Footer from '../components/footer/Footer';

function page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
	<div>
		<section className="relative bg-gray-100 h-screen">
			<div className="absolute inset-0 z-0">
				<video
				className="w-full h-full object-cover"
				src="/assets/videos/portfolio.mp4"
				autoPlay
				loop
				muted
				/>
			</div>
			<div className="absolute inset-0 bg-gray-100 opacity-0 z-10"></div> {/* Semi-transparent overlay */}
			<div className="relative z-20">
				<Nav/>
				<div className="flex flex-col items-start justify-center h-full px-12 pt-36">
				<p className='font-extralight pb-6'>Portfolio</p>
				<h1 className="text-white text-5xl font-light pb-8 m-0 ">Empowering Through Technology</h1>
				<p className="text-white text-3xl font-light pb-8">Delivering cutting-edge solutions with expertise</p>
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

		<section className="bg-gray-100 min-h-screen flex justify-center items-center p-8 pt-12">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-16 max-w-screen-lg">

				<div className="max-w-lg">
				<Link href="#">
					<img className="rounded-t-lg w-full object-cover" src="/assets/pictures/portfolio.png" alt="Portfolio" />
				</Link>
				<div className="p-4">
					<p className="mb-4 font-light text-gray-700 text-xl">
					We recently developed an advanced AI-powered analytics dashboard designed to revolutionize how businesses interpret and utilize their data.
					</p>
					<Link href="/../portfolio/project1" className="relative text-indigo-700 flex items-center group">
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


		<section className="bg-gray-100 min-h-screen flex justify-center items-center p-8">
			<div className="flex flex-col justify-center items-center space-y-6">
				<h1 className="font-light text-5xl text-gray-700 text-center">
				How can we help you?
				</h1>
				<p className="font-light text-3xl text-gray-700 text-center">
				Are you ready to push boundaries and explore new frontiers of innovation?
				</p>
				<Link href="/../quote/" className="text-white p-4 rounded-md bg-gray-600 hover:bg-none hover:bg-gray-950">
				LET'S WORK TOGETHER
				</Link>
			</div>
		</section>

		<Footer/>
	</div>
  )
}

export default page