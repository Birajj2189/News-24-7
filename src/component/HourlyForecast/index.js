import React, { useRef, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import "./index.css";
export default function HourlyForecast({ hourlyData }) {
	// Extract times and temperatures from hourlyData
	const times = hourlyData.map((hour) =>
		new Date(hour.time).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		})
	);

	const temperatures = hourlyData.map((hour) => hour.temp_c);

	return (
		<div className='w-full bg-gray-900 px-5 md:px-10 lg:px-16 '>
			<div className='hourly-forecast bg-gray-800 rounded shadow-md w-full p-4'>
				<h2 className='text-2xl font-semibold text-gray-200 mb-4'>
					Today's Hourly Weather
				</h2>
				<div className='graph-box w-full overflow-x-scroll'>
					<LineChart
						xAxis={[
							{
								scaleType: "band",
								data: [
									"12:00 AM",
									"01:00 AM",
									"02:00 AM",
									"03:00 AM",
									"04:00 AM",
									"05:00 AM",
									"06:00 AM",
									"07:00 AM",
									"08:00 AM",
									"09:00 AM",
									"10:00 AM",
									"11:00 AM",
									"12:00 PM",
									"01:00 PM",
									"02:00 PM",
									"03:00 PM",
									"04:00 PM",
									"05:00 PM",
									"06:00 PM",
									"07:00 PM",
									"08:00 PM",
									"09:00 PM",
									"10:00 PM",
									"11:00 PM",
								],

								disableLine: true, // Hide the x-axis line
								disableTicks: true,
								tickLabelStyle: {
									fontSize: 10,
									fill: "rgba(255, 255, 255, 0.8)",
								},
							},
						]}
						yAxis={[
							{
								disableLine: true, // Hide the y-axis line
								disableTicks: true, // Hide the y-axis ticks
								disableTickLabels: true,
								tickLabelStyle: {
									fontSize: 10,
									fill: "rgba(255, 255, 255, 0.8)",
								},
							},
						]}
						series={[
							{
								data: temperatures,
								area: true,
							},
						]}
						width={1500}
						height={300}
					/>
				</div>
				<div className='hour-box flex overflow-x-scroll'>
					{hourlyData.map((hour, index) => (
						<div key={index} className='hourly-item text-xs h-56'>
							<div className='mx-4 text-gray-400 my-2 text-center'>
								{new Date(hour.time).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
									hour12: true,
								})}
							</div>
							<div className='mx-4 my-2 '>
								<img className='h-6 w-6' src={hour.condition.icon} />
							</div>
							<div className='mx-4 my-2 text-center text-gray-400'>
								{hour.temp_c}°
							</div>
							<div className='mx-4 my-2 text-center text-gray-400'>
								<img src='./water-droplet.png' className='h-4 w-4 mx-auto' />
							</div>
							<div className='mx-4 my-2 text-center text-gray-400'>
								{hour.chance_of_rain}%
							</div>
							<div className='mx-4 my-2 text-center text-gray-400'>
								<img src='./wind.png' className='h-4 w-4 mx-auto' />
							</div>
							<div className='mx-4 my-2 text-center text-gray-400'>
								{hour.wind_kph} km/h
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
