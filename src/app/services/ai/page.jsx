import Approach from '@/app/components/approach/Approach'
import Footer from '@/app/components/footer/Footer'
import Service from '@/app/components/serviceheader/Service'
import List from '@/app/components/servicelist/List'
import React from 'react'

function page() {
  return (
	<div>
		<Service videoSrc={'/assets/videos/ai.mp4'} title={'Advanced AI Solutions'} subtitle={'Cutting-edge artificial intelligence services '}/>
		<Approach/>
		<section id="features" className="container mx-auto px-4 space-y-6 bg-slate-800 py-8 md:py-12 lg:py-20">

		<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">

		<h2 className="font-bold text-xl leading-[1.1] sm:text-3xl md:text-4xl text-white">Technologies We Use</h2>

		<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 text-white">
			We specialize in famous Libraries like Keras, Tensorflow and applications like  PowerBI, Tableau and more. This enables us to create dynamic, scalable, and high-performance applications tailored to meet your business needs.
		</p>


		</div>

		<div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">


			<div className="relative overflow-hidden rounded-lg bg-gray-700 select-none hover:shadow hover:shadow-teal-200 p-2">
			<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
				<div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
				<img
					src="/assets/pictures/tensorflow-icon.svg"
					alt="MongoDB Icon"
					className="h-12 w-12 text-indigo-400 grayscale"
					style={{ filter: 'grayscale(80%)' }} // Applying grayscale filter
				/>
				</div>
				<div className="space-y-2">
				<h3 className="font-bold text-white">TensorFlow</h3>
				<p className="text-sm text-white">A famous python library</p>
				</div>
			</div>
			</div>

			<div className="relative overflow-hidden rounded-lg bg-gray-700 select-none hover:shadow hover:shadow-teal-200 p-2">
			<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
				<div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
				<img
					src="/assets/pictures/bi.svg"
					alt="MongoDB Icon"
					className="h-12 w-12 text-indigo-400 grayscale"
					style={{ filter: 'grayscale(80%)' }} // Applying grayscale filter
				/>
				</div>
				<div className="space-y-2">
				<h3 className="font-bold text-white">Power BI</h3>
				<p className="text-sm text-white">Graph plotting and reports making</p>
				</div>
			</div>
			</div>

			<div className="relative overflow-hidden rounded-lg bg-gray-700 select-none hover:shadow hover:shadow-teal-200 p-2">
			<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
				<div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
				<img
					src="/assets/pictures/tableau.svg"
					alt="MongoDB Icon"
					className="h-12 w-12 text-indigo-400 grayscale"
					style={{ filter: 'grayscale(80%)' }} // Applying grayscale filter
				/>
				</div>
				<div className="space-y-2">
				<h3 className="font-bold text-white">Tableau</h3>
				<p className="text-sm text-white">Graph plotting and reports making</p>
				</div>
			</div>
			</div>

			<div className="relative overflow-hidden rounded-lg bg-gray-700 select-none hover:shadow hover:shadow-teal-200 p-2">
			<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
				<div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
				<img
					src="/assets/pictures/Keras.svg"
					alt="MongoDB Icon"
					className="h-12 w-12 text-indigo-400 grayscale"
					style={{ filter: 'grayscale(100%)' }} // Applying grayscale filter
				/>
				</div>
				<div className="space-y-2">
				<h3 className="font-bold text-white">Keras</h3>
				<p className="text-sm text-white">Famous python Library</p>
				</div>
			</div>
			</div>

		</div>

		</section>
		<List servicesList={['Machine Learning Development',
							 'Deep Learning Solutions',
							 'AI Consulting and Strategy',
							 'Data Science Services',
							 'AI-Powered Automation',
							 'Computer Vision Solutions',
							 'AI Chatbots and Virtual Assistants'
		]}/>
		
		<Footer/>
	</div>
  )
}

export default page