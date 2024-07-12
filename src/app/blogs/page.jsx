import React from 'react'
import Header from '@/app/components/project_header/Header'
import Footer from '../components/footer/Footer'
import Link from 'next/link'

function page() {
  return (
	<div>
		<Header header={"Tech experts' latest"} subheading={"Innovations in digital enterprise"} projNum={"Blogs"} video={"/assets/videos/blogs.mp4"}/>

		<section className="bg-gray-100 min-h-screen flex justify-center items-center p-8 pt-12">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-16 max-w-screen-lg">

				<div className="max-w-lg">
				<Link href="#">
					<img className="rounded-t-lg w-full object-cover" src="/assets/pictures/ai_blog.jpg" alt="Portfolio" />
				</Link>
				<div className="p-4">
					<p className="mb-4 font-light text-gray-700 text-xl">
					Exploring Generative AI: Redefining Human Creativity
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

			</div>
		</section>

		<Footer/>
	</div>
  )
}

export default page