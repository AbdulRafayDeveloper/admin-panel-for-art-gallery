'use client'

import React from 'react'


function Project({video2, details}) {
  return (
	<div>
		<section className="bg-gray-100 min-h-screen flex justify-center items-center p-8">
			<div class="font-sans">
				<div class="p-4 lg:max-w-7xl max-w-4xl mx-auto">
					<div class="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6 rounded-lg">
						<div class="lg:col-span-3 w-full lg:sticky top-0 text-center">
						<video
						className="w-full h-full object-cover"
						src={video2}
						autoPlay
						loop
						muted
						/>
						</div>

						<div class="lg:col-span-2">
							<section className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-8">
								<div className="max-w-3xl mx-auto text-center">
									<h1 className="text-4xl font-semibold text-gray-800 mb-6">{details.title}</h1>

									<div className="mb-12 text-left">
										<h2 className="text-3xl font-semibold text-indigo-700 mb-4">{details.technologyStack.title}</h2>
										<p className="text-lg text-gray-700 leading-relaxed">
										{details.technologyStack.content}
										</p>
									</div>

									<div className="mb-12 text-left">
										<h2 className="text-3xl font-semibold text-indigo-700 mb-4">{details.documentation.title}</h2>
										<p className="text-lg text-gray-700 leading-relaxed">
										{details.documentation.content}
										</p>
									</div>

									<div className="mb-12 text-left">
										<h2 className="text-3xl font-semibold text-indigo-700 mb-4">{details.achievements.title}</h2>
										<p className="text-lg text-gray-700 leading-relaxed">
										{details.achievements.content}
										</p>
									</div>
									</div>
								</section>
							</div>
						</div>
					</div>
				</div>
		</section>
	</div>
  )
}

export default Project