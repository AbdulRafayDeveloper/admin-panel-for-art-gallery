'use client'
import Nav from '@/app/components/navbar/Nav'
import React from 'react'
import { useState } from 'react'
import Header from '@/app/components/project_header/Header'
import Footer from '@/app/components/footer/Footer'
import Project from '@/app/components/project_details/Project'

function page() {
	const projectDetails = {
		title: 'Project: Web Appearance and Growth',
		technologyStack: {
		  title: 'Technology Stack',
		  content: `Built using Next.js, Tailwind CSS, MongoDB, and RESTful APIs, this project leverages modern web technologies to enhance the software company's online presence and support its growth strategy. The choice of Next.js ensures server-side rendering for fast performance and SEO optimization, while Tailwind CSS provides a utility-first approach for streamlined styling and maintainability. MongoDB serves as the database for storing and managing dynamic content, and RESTful APIs enable seamless integration with other services and data sources.`,
		},
		documentation: {
		  title: 'Documentation',
		  content: `Comprehensive documentation accompanies the project, detailing its architecture, API endpoints, data schemas, and deployment processes. This documentation ensures transparency, facilitates collaboration among team members, and supports future maintenance and scalability efforts.`,
		},
		achievements: {
		  title: 'Achievements',
		  content: `The project successfully enhanced the software company's web appearance, improving user engagement and conversion rates. It introduced scalable solutions that accommodate increasing traffic and content complexity, laying a robust foundation for future expansions and feature enhancements.`,
		},
	  };

  return (
	<div>

		<Header header={'Web Application'} subheading={'Sleek and Responsive Design'} video={'/assets/videos/project1-header.mp4'} projNum={'Project 1'} />

		<Project video2={'/assets/videos/project1.mp4'} details={projectDetails}/>
		<Footer/>
	</div>
  )
}

export default page