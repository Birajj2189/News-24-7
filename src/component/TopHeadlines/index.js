import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HeadlineCarousel() {
	const [headlines, setHeadlines] = useState([]);

	useEffect(() => {
		const fetchHeadlines = async () => {
			try {
				const apiKey = "421d8016b77948e48ee66ec00b73ed7e"; // Replace with your News API key
				const response = await axios.get(
					`https://newsapi.org/v2/everything?q=top-headlines&sortBy=publishedAt&apiKey=${apiKey}&pageSize=15&language=en`
				);
				setHeadlines(response.data.articles);
				console.log(headlines);
			} catch (error) {
				console.error("Error fetching headlines:", error);
			}
		};

		fetchHeadlines();
	}, []);

	return (
		<section className='text-gray-600 body-font'>
			<div className='container px-5 pt-4 mx-auto flex flex-wrap'>
				<Swiper
					spaceBetween={30}
					pagination={{ clickable: true }}
					navigation={true}
					autoplay={{
						delay: 3000, // Adjust delay as needed
						disableOnInteraction: false,
						pauseOnMouseEnter: true, // Optional: Pause on hover
					}}
					modules={[Pagination, Navigation, Autoplay]}
					className='mySwiper'
				>
					{headlines.map((article, index) => (
						<SwiperSlide key={index}>
							<div className='p-4'>
								<div className='headline-box flex rounded-lg bg-gray-800 shadow-md p-8 px-16 sm:flex-row flex-col'>
									<div className='flex-grow'>
										<h2 className='text-gray-200 text-lg title-font font-medium mb-3'>
											{article.title}
										</h2>
										<p className='leading-relaxed text-base text-gray-500'>
											{article.description.slice(0, 300) + "..."}
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
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
