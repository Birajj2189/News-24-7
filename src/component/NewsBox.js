import React, { Component } from "react";

export class NewsBox extends Component {
	render() {
		const { article } = this.props; // Destructure the article prop
		const trimmedTitle = article.title.slice(0, 30) + "...";
		const trimmedDescription = article.description.slice(0, 70) + "...";
		console.log(article.urlToImage);

		return (
			<div className='xl:w-1/4 md:w-1/2 p-4 h-full'>
				<div className='bg-gray-800 bg-opacity-40 p-6 rounded-lg'>
					<img
						className='h-40 rounded w-full object-cover object-center mb-6'
						src={article.urlToImage || "https://dummyimage.com/723x403"}
					/>
					<h3 className='tracking-widest text-blue-400 text-xs font-medium title-font'>
						{article.source.name || "Source"}
					</h3>
					<h2 className='text-lg text-white font-medium title-font mb-4'>
						{trimmedTitle || "Title"}
					</h2>
					<p className='leading-relaxed text-base'>
						{trimmedDescription || "Description not available."}
					</p>
					<a
						href={article.url}
						className='mt-3 text-indigo-500 inline-flex items-center'
						target='_blank'
						rel='noopener noreferrer'
					>
						Learn More
						<svg
							fill='none'
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							className='w-4 h-4 ml-2'
							viewBox='0 0 24 24'
						>
							<path d='M5 12h14M12 5l7 7-7 7'></path>
						</svg>
					</a>
				</div>
			</div>
		);
	}
}

export default NewsBox;
