import React from "react";

export default function Forecast({ weatherData }) {
	const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

	return (
		<div className='w-full bg-gray-900 px-5 md:px-10 lg:px-16 py-4'>
			<div className='bg-gray-800 rounded shadow-md w-full p-4'>
				<h2 className='text-2xl font-semibold text-gray-200 mb-4'>
					10 days Weather Forecast
				</h2>
				{weatherData.map((day, index) => {
					// Assuming day.date is a string in 'YYYY-MM-DD' format
					const date = new Date(day.date);
					const formattedDay = weekdays[date.getDay()];
					const formattedDate = `${("0" + (date.getMonth() + 1)).slice(-2)}/${(
						"0" + date.getDate()
					).slice(-2)}`;

					return (
						<>
							<hr className='border-[1px]' />

							<div
								key={index}
								className='mb-2 py-4 grid grid-cols-3 md:grid-cols-6 gap-1'
							>
								<div className='text-gray-400 col-span-1 my-auto'>
									<div className='text-md '>
										{index === 0 ? "TODAY" : formattedDay}
									</div>
									<div className='text-xs '>{formattedDate}</div>
								</div>
								<div className='text-gray-400 col-span-1 md:col-span-2 flex'>
									<div className='text-md'>
										<img src={day.day.condition.icon} className='h-8 w-8 ' />
									</div>
									<div className='text-xs flex-col items-center'>
										<p className='font-bold text-sm md:text-xl'>
											{day.day.maxtemp_c}°
										</p>
										<p>{day.day.mintemp_c}°</p>
									</div>
								</div>
								<div className='text-gray-400 hidden md:block col-span-2 my-auto'>
									<div className='text-md'>{day.day.condition.text}</div>
								</div>
								<div className='text-gray-400 col-span-1 my-auto flex justify-end md:justify-start'>
									<div className='text-md my-auto'>
										<img
											src='./water-droplet.png'
											className='h-4 w-4 md:h-8 md:w-8 '
										/>
									</div>
									<div className='text-xs my-auto'>
										{day.day.daily_chance_of_rain}%
									</div>
								</div>
							</div>
						</>
					);
				})}
			</div>
		</div>
	);
}
