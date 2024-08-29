import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherArea from "./WeatherArea";
import Footer from "../Footer/index";
import FutureForecast from "../FutureForecast/index";
import Loader from "../Loader/index";
import HourlyForecast from "../HourlyForecast";

export default function WeatherIndex() {
	const [weatherData, setWeatherData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [loc, setLoc] = useState("guwahati");
	const [search, setSearch] = useState("");
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [newsArticles, setNewsArticles] = useState([]);

	// Individual functions to handle state updates
	const handleSetWeatherData = (data) => setWeatherData(data);
	const handleSetLoading = (status) => setLoading(status);
	const handleSetLoc = (location) => setLoc(location);
	const handleSetSearch = (searchTerm) => setSearch(searchTerm);
	const handleSetSelectedDate = (date) => setSelectedDate(date);
	const handleSetNewsArticles = (articles) => setNewsArticles(articles);

	useEffect(() => {
		const fetchWeatherData = async () => {
			try {
				const dateStr = selectedDate.toISOString().split("T")[0];
				const response = await axios.get(
					`http://api.weatherapi.com/v1/forecast.json?key=da7427d643ad4fb1b1781728242808&q=${loc}&days=10&aqi=no&alerts=no`
				);
				setWeatherData(response.data);
			} catch (error) {
				console.error("Error fetching weather data:", error);
			} finally {
				handleSetLoading(false);
			}
		};

		const fetchNewsArticles = async () => {
			try {
				const apiKey = "421d8016b77948e48ee66ec00b73ed7e";
				const newsResponse = await axios.get(
					`https://newsapi.org/v2/everything?q=${loc}+weather&sortBy=publishedAt&apiKey=${apiKey}`
				);
				handleSetNewsArticles(newsResponse.data.articles);
			} catch (error) {
				console.error("Error fetching news articles:", error);
			}
		};

		fetchWeatherData();
		fetchNewsArticles();
	}, [loc]);

	if (loading) {
		return <Loader />;
	}

	return (
		<>
			<WeatherArea
				weatherData={weatherData}
				loc={loc}
				search={search}
				selectedDate={selectedDate}
				newsArticles={newsArticles}
				setLoc={handleSetLoc}
				setNewsArticles={handleSetNewsArticles}
				loading={loading}
				setSearch={handleSetSearch}
				setSelectedDate={handleSetSelectedDate}
			/>
			<HourlyForecast hourlyData={weatherData.forecast.forecastday[0].hour} />
			<FutureForecast weatherData={weatherData.forecast.forecastday} />
			<Footer />
		</>
	);
}
