import Approach from '@/app/components/approach/Approach'
import Footer from '@/app/components/footer/Footer'
import Service from '@/app/components/serviceheader/Service'
import List from '@/app/components/servicelist/List'
import React from 'react'

function page() {
  return (
	<div>
		<Service videoSrc={'/assets/videos/seo.mp4'} title={'Search Engine Optimization'} subtitle={'Discover how our tailored SEO strategies'}/>
		<Approach/>
		<section id="seo-services" className="container mx-auto px-4 space-y-6 bg-slate-800 py-8 md:py-12 lg:py-20">

	<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">

		<h2 className="font-bold text-xl leading-[1.1] sm:text-3xl md:text-4xl text-white">Our SEO Services</h2>

		<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
			We offer comprehensive SEO services designed to boost your online presence and drive organic traffic to your website.
		</p>

	</div>

	<div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">

		<div className="relative overflow-hidden rounded-lg bg-gray-700 select-none hover:shadow hover:shadow-teal-200 p-2">
			<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
				
				<div className="space-y-2">
					<h3 className="font-bold">Keyword Research</h3>
					<p className="text-sm text-muted-foreground">Comprehensive keyword analysis to target the right audience.</p>
				</div>
			</div>
		</div>

		<div className="relative overflow-hidden rounded-lg bg-gray-700 select-none hover:shadow hover:shadow-teal-200 p-2">
			<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
				
				<div className="space-y-2">
					<h3 className="font-bold">On-Page SEO</h3>
					<p className="text-sm text-muted-foreground">Optimizing your website’s structure and content for better search engine visibility.</p>
				</div>
			</div>
		</div>

		<div className="relative overflow-hidden rounded-lg bg-gray-700 select-none hover:shadow hover:shadow-teal-200 p-2">
			<div className="flex h-[180px] flex-col justify-between rounded-md p-6">
				
				<div className="space-y-2">
					<h3 className="font-bold">SEO Audits</h3>
					<p className="text-sm text-muted-foreground">Comprehensive audits to identify opportunities for SEO improvement.</p>
				</div>
			</div>
		</div>

	</div>

</section>

		<List servicesList={['Keyword Research and Analysis',
							 'On-Page SEO Optimization',
							 'Off-Page SEO Optimization',
							 'Technical SEO Audits',
							 'Content Optimization and Creation',
							 'SEO Consulting and Training',
							 'Website Speed and Performance Optimization'
		]}/>
		
		<Footer/>
	</div>
  )
}

export default page