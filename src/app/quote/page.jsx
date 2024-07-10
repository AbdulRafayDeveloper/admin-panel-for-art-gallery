'use client'
import Footer from '../components/footer/Footer'
import Nav from '../components/navbar/Nav'
import React from 'react'

function page() {
  return (
	<div>
		<Nav/>
		<section className="bg-gray-800 min-h-screen flex md:flex-row justify-center items-center">
			<video 
				className="absolute inset-0 w-full h-full object-cover z-0" 
				src="/assets/videos/quote3.mp4" 
				autoPlay 
				loop 
				muted	
			>
			</video>

			<div className="absolute inset-0 flex flex-col items-start justify-center ">
				<div>
					<h1 className="text-white text-5xl font-semibold pl-12 pb-8 m-0">Request a Quote</h1>
				</div>
				<div>
					<p className="text-white text-3xl font-light  pl-12 pb-8">Get a personalized quote tailored just for you</p>
				</div>
			</div>
        </section>
		<section className="bg-white dark:bg-gray-800 min-h-screen flex md:flex-row pl-5 md:pl-20 pb-12">
			<div className="relative z-10 text-white p-4 mx-auto max-w-4xl">
				<form className="mx-auto md:w-[600px] w-full">
					<h1 className="text-3xl text-gray-900 dark:text-white mb-4">Project Details</h1>
					<div className="mb-4">
						<input
							type="text"
							id="projectName"
							className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Project Name*"
							required
						/>
					</div>
					<div className="mb-4">
						<select
							id="customerType"
							className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Are you an existing customer or a new"
							required
						>
							<option value="" className="text-gray-400">Are you an existing customer or a new one?</option>
							<option value="new">New Customer</option>
							<option value="existing">Existing Customer</option>
						</select>
					</div>
					<div className="mb-4">
						<select
							id="projectCategory"
							className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
						>
							<option value="" className="text-gray-400">Project Category</option>
							<option value="web">Web Development</option>
							<option value="mobile">Mobile App Development</option>
							<option value="ai">AI/ML</option>
							<option value="other">Other</option>
						</select>
					</div>
					<div className="mb-4">
						<select
							id="projectTimeline"
							className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
						>
							<option value="" className="text-gray-400">Project Timeline</option>
							<option value="urgent">Urgent (within 1 month)</option>
							<option value="moderate">Moderate (1-3 months)</option>
							<option value="flexible">Flexible (more than 3 months)</option>
						</select>
					</div>
					<div className="mb-4">
						<select
							id="projectBudget"
							className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
						>
							<option value="" className="text-gray-400">Project Budget</option>
							<option value="less1k">Less than $1000</option>
							<option value="1k-5k">$1000 - $5000</option>
							<option value="5k-10k">$5000 - $10000</option>
							<option value="more10k">More than $10000</option>
						</select>
					</div>
					<h1 className="text-3xl text-gray-900 dark:text-white mb-4 pt-20">Contact Information</h1>
					<div className="mb-4">
						<input
							type="text"
							id="name"
							className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Your name*"
							required
						/>
					</div>
					<div className="mb-4">
						<input
							type="text"
							id="city"
							className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="City*"
							required
						/>
					</div>
					<div className="mb-4">
						<input
							type="email"
							id="email"
							className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Email*"
							required
						/>
					</div>
					<div className="mb-4">
						<input
							type="text"
							id="number"
							className="bg-gray-600 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Contact no."
						/>
					</div>
					<h1 className="text-3xl text-gray-900 dark:text-white mb-4 pt-20">Project Description</h1>
					<div className="mb-4">
						<textarea
							id="message"
							className="text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							cols={4}
							rows={5}
							placeholder="Please tell us a bit about what you are looking for*"
							required
						/>
					</div>
					<div className="mb-4">
						<h2 className="text-base font-semibold leading-7 text-white">Upload Files</h2>
						<div className="mt-6">
							<div className="mt-2 flex items-center gap-x-3">
								<div className="relative">
									<input id="file-upload" name="file-upload" type="file" accept=".pdf" className="sr-only" />
									<label htmlFor="file-upload" className="rounded-md bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer">Choose a PDF file</label>
									<span className="ml-3 text-gray-600">or drag and drop</span>
								</div>
							</div>
							<p className="mt-2 text-xs leading-5 text-gray-600">Only PDF files are allowed</p>
						</div>
					</div>
					<button
						type="submit"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Submit
					</button>
				</form>
			</div>
		</section>
		<Footer/>
	</div>
  )
}

export default page