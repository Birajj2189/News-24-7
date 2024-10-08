import React, { useState, useEffect, useRef } from "react";
import StoryBox from "../StoryBox/index";
import Loader from "../Loader/index";
import "../StoryBox.css";

export default function WeatherArea({
	weatherData,
	loc,
	search,
	selectedDate,
	newsArticles,
	setLoc,
	setNewsArticles,
	loading,
	setSearch,
}) {
	const [suggestions, setSuggestions] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [isInputFocused, setIsInputFocused] = useState(false);

	const inputRef = useRef(null);
	const suggestionsRef = useRef(null);

	useEffect(() => {
		if (search.length > 2) {
			const fetchSuggestions = async () => {
				try {
					const response = await fetch(
						`http://api.weatherapi.com/v1/search.json?key=da7427d643ad4fb1b1781728242808&q=${search}`
					);
					const data = await response.json();
					setSuggestions(data);
				} catch (error) {
					console.error("Error fetching location suggestions:", error);
				}
			};

			fetchSuggestions();
		} else {
			setSuggestions([]);
		}
	}, [search]);

	const handleSearch = (e) => {
		e.preventDefault();
		if (selectedLocation) {
			setLoc(selectedLocation);
			setSearch(selectedLocation.region);
			setNewsArticles([]);
			setSuggestions([]);
		}
	};

	const handleFocus = () => setIsInputFocused(true);

	const handleBlur = () => {
		// Only hide suggestions if clicking outside the input and suggestions
		setTimeout(() => {
			if (
				!inputRef.current.contains(document.activeElement) &&
				!suggestionsRef.current.contains(document.activeElement)
			) {
				setIsInputFocused(false);
			}
		}, 150); // Delay to ensure click event is processed
	};

	const handleSearchInputChange = (e) => {
		setSearch(e.target.value);
	};

	const handleSuggestionSelect = (location) => {
		console.log("click");
		setSelectedLocation(location);
		setSearch(location.url);
		setLoc(location.url);
		setSuggestions([]);
		setIsInputFocused(false);
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				inputRef.current &&
				!inputRef.current.contains(event.target) &&
				suggestionsRef.current &&
				!suggestionsRef.current.contains(event.target)
			) {
				setIsInputFocused(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const { location, current, forecast } = weatherData || {};
	const localTime = new Date(location?.localtime.replace(" ", "T"));
	const formattedTime = localTime?.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});

	return (
		<div className='bg-gray-900 w-full flex flex-wrap justify-evenly px-5 py-12'>
			{/* Weather Search Section */}
			<div className='h-auto flex-col flex-wrap md:mx-4 w-full md:w-1/3'>
				<div className='flex flex-wrap justify-between my-2 md:px-4'>
					<div className='w-full mb-4 flex justify-center'>
						<form onSubmit={handleSearch} className='w-full flex'>
							<div className='relative w-full'>
								<input
									ref={inputRef}
									type='text'
									value={search}
									onChange={handleSearchInputChange}
									onFocus={handleFocus}
									onBlur={handleBlur}
									placeholder='Enter location'
									className='w-full px-4 py-2 border text-gray-400 bg-gray-800 border-blue-700 rounded-l'
								/>
								{isInputFocused && suggestions.length > 0 && (
									<div
										ref={suggestionsRef}
										className='absolute z-10 bg-gray-800 border border-gray-700 rounded w-full mt-1'
									>
										{suggestions.map((suggestion) => (
											<div
												key={suggestion.id}
												onMouseDown={() => handleSuggestionSelect(suggestion)}
												className='px-4 py-2 hover:bg-gray-700 cursor-pointer text-gray-400'
											>
												{suggestion.url}
											</div>
										))}
									</div>
								)}
							</div>
							<button
								type='submit'
								className='px-4 py-2 bg-blue-700 text-white rounded-r'
							>
								Search
							</button>
						</form>
					</div>
					<div className='w-full font-bold text-xl text-center text-slate-300'>
						{new Date().toLocaleDateString("en-US", {
							weekday: "long",
							month: "long",
							day: "numeric",
						})}
					</div>
				</div>
				<div className='bg-gray-800 rounded p-4 md:p-8 lg:p-12 shadow-md'>
					<div className='flex flex-wrap justify-between temperature rounded p-4'>
						<div>
							<div className='text-lg md:text-xl lg:text-2xl font-semibold text-gray-200'>
								{location?.name}
							</div>
							<div className='text-sm ms:text-lg text-gray-400'>
								{formattedTime}
							</div>
							<div className='text-sm ms:text-lg text-gray-400'>
								{current?.condition.text}
							</div>
						</div>

						<div>
							<div className='flex flex-wrap'>
								<img
									src={current?.condition.icon}
									alt='Weather icon'
									className='h-10 w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 mr-2'
								/>
								<div className='text-4xl md:text-5xl lg:text-6xl text-end font-semibold text-gray-200'>
									{current?.temp_c}°
								</div>
							</div>
							<div className='text-end md:mr-6 text-sm ms:text-lg text-gray-400'>
								Feels like {current?.feelslike_c}°
							</div>
						</div>
					</div>
					<div className='flex justify-between text-gray-400'>
						<hr className='my-2 bg-black w-full' />
					</div>
					<div className='flex justify-between text-gray-400'>
						<div>Precipitation</div>
						<div>{current?.precip_mm} mm</div>
					</div>
					<div className='flex justify-between text-gray-400'>
						<hr className='my-2 bg-gray-400 w-full' />
					</div>
					<div className='flex justify-between text-gray-400'>
						<div>Humidity</div>
						<div>{current?.humidity}%</div>
					</div>
					<div className='flex justify-between'>
						<hr className='my-2 bg-black w-full' />
					</div>
					<div className='flex justify-between text-gray-400'>
						<div>Wind</div>
						<div>
							{current?.wind_dir} {current?.wind_kph} KM/H
						</div>
					</div>
					<div className='flex justify-between'>
						<hr className='my-2 bg-black w-full' />
					</div>
					<div className='flex justify-between text-gray-400'>
						<div>Max UV</div>
						<div>{current?.uv}</div>
					</div>
					<div className='flex justify-between'>
						<hr className='my-2 bg-black w-full' />
					</div>
					<div className='flex justify-between text-gray-400'>
						<div>Pressure</div>
						<div>{current?.pressure_mb} mb</div>
					</div>
					<div className='flex justify-between'>
						<hr className='my-2 bg-black w-full' />
					</div>
					<div className='flex justify-between text-gray-400'>
						<div>Visibility</div>
						<div>{current?.vis_km} km</div>
					</div>
					<div className='flex justify-between'>
						<hr className='my-2 bg-black w-full' />
					</div>
					<div className='flex justify-between text-gray-400'>
						<div>Sunrise</div>
						<div>{forecast?.forecastday[0]?.astro.sunrise}</div>
					</div>
					<div className='flex justify-between'>
						<hr className='my-2 bg-black w-full' />
					</div>
					<div className='flex justify-between text-gray-400'>
						<div>Sunset</div>
						<div>{forecast?.forecastday[0]?.astro.sunset}</div>
					</div>
				</div>
			</div>
			{/* News Section */}
			<div className='w-full md:w-1/2 h-auto my-4 md:my-0 flex-col flex-wrap px-5 py-12 md:mx-4 bg-gray-800 shadow-md rounded'>
				<div className='text-4xl font-extrabold mb-4 text-gray-200'>
					Top Stories
				</div>
				<div className='story-box h-[55vh] md:h-[65vh] overflow-y-scroll overflow-x-hidden'>
					<StoryBox articles={newsArticles} />
				</div>
			</div>
		</div>
	);
}
