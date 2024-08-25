import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import StoryBox from "../StoryBox/index";
import Loader from "../Loader/index";
import "../StoryBox.css";

export default function WeatherArea() {
	const [weatherData, setWeatherData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [loc, setLoc] = useState("guwahati");
	const [search, setSearch] = useState("");
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [newsArticles, setNewsArticles] = useState([]);

	useEffect(() => {
		const fetchWeatherData = async () => {
			try {
				const dateStr = selectedDate.toISOString().split("T")[0];
				const response = await axios.get(
					`http://api.weatherapi.com/v1/current.json?key=18e6ef3a35554b87bc850404242508&q=${loc}&aqi=yes&dt=${dateStr}`
				);
				setWeatherData(response.data);
				console.log(response.data);
			} catch (error) {
				console.error("Error fetching weather data:", error);
			} finally {
				setLoading(false);
			}
		};

		const fetchNewsArticles = async () => {
			try {
				const apiKey = "421d8016b77948e48ee66ec00b73ed7e";
				const newsResponse = await axios.get(
					`https://newsapi.org/v2/everything?q=weather+${loc}&sortBy=publishedAt&apiKey=${apiKey}`
				);
				setNewsArticles(newsResponse.data.articles);
			} catch (error) {
				console.error("Error fetching news articles:", error);
			}
		};

		fetchWeatherData();
		fetchNewsArticles();
	}, [loc]);

	const handleSearch = (e) => {
		e.preventDefault();
		setLoc(search);
		setNewsArticles([]); // Clear articles on new search
	};

	if (loading) {
		return <Loader />;
	}

	const { location, current } = weatherData;

	const localTime = new Date(location.localtime.replace(" ", "T"));
	const formattedTime = localTime.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});

	return (
		<div className='bg-gray-900 w-full flex flex-wrap justify-evenly px-5 py-12'>
			<div className='h-auto flex-col flex-wrap md:mx-4 w-full md:w-1/3'>
				<div className='flex flex-wrap justify-between my-2 md:px-4'>
					<div className='w-full mb-4 flex justify-center'>
						<form onSubmit={handleSearch} className='w-full flex'>
							<input
								type='text'
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder='Enter location'
								className='w-full px-4 py-2 border bg-gray-800 border-blue-700 rounded-l'
							/>
							<button
								type='submit'
								className='px-4 py-2 bg-blue-700 text-white rounded-r'
							>
								Search
							</button>
						</form>
					</div>

					<div>
						<ArrowLeftIcon className='h-8 w-8' />
					</div>
					<div className='font-bold text-xl text-slate-300'>
						{new Date().toLocaleDateString("en-US", {
							weekday: "long",
							month: "long",
							day: "numeric",
						})}
					</div>
					<div>
						<ArrowRightIcon className='h-8 w-8' />
					</div>
				</div>
				<div className='bg-gray-800 rounded p-4 md:p-8 lg:p-12 shadow-md'>
					<div className='flex flex-wrap justify-between temperature rounded p-4'>
						<div>
							<div className='text-lg md:text-xl lg:text-2xl font-semibold text-gray-200'>
								{location.name}
							</div>
							<div className='text-sm ms:text-lg text-gray-400'>
								{formattedTime}
							</div>
							<div className='text-sm ms:text-lg text-gray-400'>
								{current.condition.text}
							</div>
						</div>

						<div>
							<div className='flex flex-wrap'>
								<img
									src={current.condition.icon}
									alt='Weather icon'
									className='h-10 w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 mr-2'
								/>
								<div className='text-4xl md:text-5xl lg:text-6xl text-end font-semibold text-gray-200'>
									{current.temp_c}°
								</div>
							</div>
							<div className='text-end md:mr-6 text-sm ms:text-lg text-gray-400'>
								Feels like {current.feelslike_c}°
							</div>
						</div>
					</div>
					<div className='flex justify-between text-gray-400'>
						<hr className='my-2 bg-black w-full' />
					</div>
					<div className='flex justify-between text-gray-400'>
						<div>Precipitation</div>
						<div>{current.precip_mm} mm</div>
					</div>
					<div className='flex justify-between text-gray-400'>
						<hr className='my-2 bg-gray-400 w-full' />
					</div>
					<div className='flex justify-between text-gray-400'>
						<div>Humidity</div>
						<div>{current.humidity}%</div>
					</div>
					<div className='flex justify-between'>
						<hr className='my-2 bg-black w-full' />
					</div>
					<div className='flex justify-between text-gray-400'>
						<div>Wind</div>
						<div>
							{current.wind_dir} {current.wind_kph} KM/H
						</div>
					</div>
					<div className='flex justify-between'>
						<hr className='my-2 bg-black w-full' />
					</div>
					<div className='flex justify-between text-gray-400'>
						<div>Max UV</div>
						<div>{current.uv}</div>
					</div>
					<div className='flex justify-between'>
						<hr className='my-2 bg-black w-full' />
					</div>
					<div className='flex justify-between text-gray-400'>
						<div>Pressure</div>
						<div>{current.pressure_mb} mb</div>
					</div>
					<div className='flex justify-between'>
						<hr className='my-2 bg-black w-full' />
					</div>
					<div className='flex justify-between text-gray-400'>
						<div>Visibility</div>
						<div>{current.vis_km} km</div>
					</div>
				</div>
			</div>
			<div className='w-full md:w-1/2 h-auto my-4 md:my-0 flex-col flex-wrap px-5 py-12 md:mx-4 bg-gray-800 shadow-md rounded'>
				<div className='text-4xl font-extrabold mb-4 text-gray-200'>
					Top Stories
				</div>
				<div className='story-box h-[55vh] overflow-y-scroll overflow-x-hidden'>
					<StoryBox articles={newsArticles} />
				</div>
			</div>
		</div>
	);
}
