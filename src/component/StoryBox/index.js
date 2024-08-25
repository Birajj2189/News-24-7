import React from "react";

export default function StoryBox({ articles }) {
	return (
		<div className='space-y-4'>
			{articles.length === 0 ? (
				<div className='flex-col justify-center items-center text-4xl text-center font-extrabold'>
					<img
						src='/no-data-bro.png' // Image path in the public folder
						alt='No content available'
						className='w-1/3 mx-auto'
					/>
					No results found
				</div>
			) : (
				articles.map((article, index) => (
					<div
						key={index}
						className='p-4 bg-gray-700 shadow-md mb-2 rounded flex items-center'
					>
						{article.urlToImage && (
							<img
								alt={article.title}
								className='flex-shrink-0 rounded-lg w-20 h-20 object-cover object-center mr-4'
								src={article.urlToImage}
							/>
						)}
						<div className='flex-grow'>
							<h2 className='title-font font-medium text-sm text-gray-200'>
								{article.title}
							</h2>
							<h3 className='text-blue-500 mb-3 text-sm'>
								{article.source.name}
							</h3>
							<p className='mb-4 text-xs text-gray-400'>
								{article.description}
							</p>
							<a
								href={article.url}
								className='text-blue-500 text-xs'
								target='_blank'
								rel='noopener noreferrer'
							>
								Read more
							</a>
						</div>
					</div>
				))
			)}
		</div>
	);
}
