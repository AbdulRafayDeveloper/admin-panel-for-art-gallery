import Approach from '@/app/components/approach/Approach'
import Footer from '@/app/components/footer/Footer'
import Service from '@/app/components/serviceheader/Service'
import List from '@/app/components/servicelist/List'
import React from 'react'

function page() {
  return (
	<div>
		<Service videoSrc={'/assets/videos/mob.mp4'} title={'Mobile Application Development'} subtitle={'Explore our comprehensive solutions '}/>
		<Approach/>
		<section id="features" className="container mx-auto px-4 space-y-6 bg-slate-800 py-8 md:py-12 lg:py-20">

		<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">

		<h2 className="font-bold text-xl leading-[1.1] sm:text-3xl md:text-4xl">Technologies We Use</h2>

		<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
		We specialize in leveraging industry-leading technologies such as Swift, Kotlin, React Native, and Flutter to deliver robust and scalable mobile app development solutions
		</p>


		</div>

		<div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">


			<div className="relative overflow-hidden rounded-lg bg-gray-700 select-none hover:shadow hover:shadow-teal-200 p-2">
			<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
				<div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
				<img
					src="/assets/pictures/swift.svg"
					alt="MongoDB Icon"
					className="h-12 w-12 text-indigo-400 grayscale"
					style={{ filter: 'grayscale(80%)' }} // Applying grayscale filter
				/>
				</div>
				<div className="space-y-2">
				<h3 className="font-bold text-white">Swift</h3>
				<p className="text-sm text-white">Programming language</p>
				</div>
			</div>
			</div>

			<div className="relative overflow-hidden rounded-lg bg-gray-700 select-none hover:shadow hover:shadow-teal-200 p-2">
			<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
				<div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
				<img
					src="/assets/pictures/ios.svg"
					alt="MongoDB Icon"
					className="h-12 w-12 text-indigo-400 grayscale"
					style={{ filter: 'grayscale(80%)' }} // Applying grayscale filter
				/>
				</div>
				<div className="space-y-2">
				<h3 className="font-bold text-white">IOS</h3>
				<p className="text-sm text-white">IOS apps </p>
				</div>
			</div>
			</div>

			<div className="relative overflow-hidden rounded-lg bg-gray-700 select-none hover:shadow hover:shadow-teal-200 p-2">
			<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
				<div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
				<img
					src="/assets/pictures/flutterio-icon.svg"
					alt="MongoDB Icon"
					className="h-12 w-12 text-indigo-400 grayscale"
					style={{ filter: 'grayscale(80%)' }} // Applying grayscale filter
				/>
				</div>
				<div className="space-y-2">
				<h3 className="font-bold text-white">Flutter</h3>
				<p className="text-sm text-white">Off the self making apps</p>
				</div>
			</div>
			</div>

			<div className="relative overflow-hidden rounded-lg bg-gray-700 select-none hover:shadow hover:shadow-teal-200 p-2">
			<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
				<div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
				<img
					src="/assets/pictures/firebase.svg"
					alt="MongoDB Icon"
					className="h-12 w-12 text-indigo-400 grayscale"
					style={{ filter: 'grayscale(100%)' }} // Applying grayscale filter
				/>
				</div>
				<div className="space-y-2">
				<h3 className="font-bold text-white">Firebase</h3>
				<p className="text-sm text-white">Database for rapis access</p>
				</div>
			</div>
			</div>

		</div>

		</section>
		<List servicesList={['Native App Development',
							 'Cross-Platform App Development',
							 'iOS App Development',
							 'Android App Development',
							 'UI/UX Design for Mobile Apps',
							 'Mobile App Strategy and Consulting',
							 'Mobile App Maintenance and Support'
		]}/>
		
		<Footer/>
	</div>
  )
}

export default page