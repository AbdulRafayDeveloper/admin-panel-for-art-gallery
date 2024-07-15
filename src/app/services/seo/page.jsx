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