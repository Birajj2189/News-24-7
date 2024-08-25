import React from "react";
import Footer from "../Footer/index";
export default function AboutUs() {
	return (
		<>
			<section class='bg-gray-900 text-gray-600 body-font'>
				<div class='container mx-auto flex px-5 py-24 items-center justify-center flex-col'>
					<img
						class='lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded'
						alt='hero'
						src='https://dummyimage.com/720x600'
					/>
					<div class='text-center lg:w-2/3 w-full'>
						<h1 class='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
							Microdosing synth tattooed vexillologist
						</h1>
						<p class='mb-8 leading-relaxed'>
							Welcome to <strong>News 24/7</strong>, your personalized gateway
							to the latest news and weather updates from around the globe. We
							believe in delivering information that matters most to you,
							tailored to your interests and location.
						</p>
						<p>What We Offer :</p>
						<p>
							<strong>Personalized News Search:</strong> Stay informed on the
							topics that interest you most. Whether it's technology, sports,
							politics, or entertainment, our advanced search feature allows you
							to explore news stories on any subject, giving you control over
							the information you consume.
						</p>
						<p>
							<strong>Top Headlines:</strong> Get a snapshot of the most
							important news from around the world. Our top headlines section
							ensures you're always in the loop with what's happening globally,
							keeping you updated with breaking news and major events.
						</p>
						<p>
							<strong>Weather Insights:</strong> Plan your day with confidence.
							Our weather section provides real-time updates for any location
							you choose. Search for detailed weather conditions, forecasts, and
							top weather stories relevant to your area or any place you're
							interested in.
						</p>
						<p>
							At <strong>News 24/7</strong>, we strive to provide a seamless
							experience that keeps you connected with the world, whether you're
							looking for the latest news or preparing for the day ahead. Your
							information, your way.
						</p>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
}
