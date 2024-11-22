# News 24/7
---

**News 24/7** is a utility web portal designed to deliver all the latest news and weather updates on one platform. The portal features customizable news based on user interests, top headlines from around the world, weather forecasts, and more.

## Features
- **Top Headlines:** Displays the top news from around the world.
- **Customizable News Search:** Users can search for news based on their interests.
- **Infinite Scrolling:** Endless news feed to enhance user experience.
- **Weather Tab:** Displays weather details such as precipitation, humidity, wind speed, max/min temperatures, hourly forecasts, 10-day weather forecast, and location-specific weather news.
- **Location-based Weather Search:** Users can search for weather details of any location.
  
## Tech Stack
- **Frontend:**
  - React.js
  - Tailwind CSS
  - Axios (for handling API requests)

- **APIs:**
  - Free News API (for news data)
  - Weather API (for weather-related data)

## Setup & Installation

### Prerequisites
- Node.js (version 14 or higher)
- NPM or Yarn

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/news-247.git
   cd news-247
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up API keys**:
   - Obtain an API key from [News API](https://newsapi.org/) and [Weather API](https://openweathermap.org/).
   - Create a `.env` file in the root directory and add the API keys as follows:
     ```
     REACT_APP_NEWS_API_KEY=your_news_api_key
     REACT_APP_WEATHER_API_KEY=your_weather_api_key
     ```

4. **Run the project**:
   ```bash
   npm start
   ```

   This will start the application locally at [http://localhost:3000](http://localhost:3000).

## Features Breakdown

### 1. **Top Headlines**
   The homepage displays the top news headlines around the world, pulling data from the news API.

### 2. **Customizable News Search**
   - Users can search for news based on their interests.
   - A dynamic search bar allows for filtering news stories by category, keyword, or region.

### 3. **Infinite Scrolling**
   As the user scrolls down the page, additional news articles are loaded automatically, improving the user experience.

### 4. **Weather Tab**
   The weather tab provides a detailed overview of weather conditions in any location. This includes:
   - Current conditions: Precipitation, humidity, wind speed, max/min temperature.
   - Hourly forecast: A graph with temperature variations over the next 24 hours.
   - 10-day forecast: The predicted weather for the next 10 days.
   - Weather-related news for the searched area.

### 5. **Location-based Weather Search**
   Users can search for any location to get the weather data for that specific place.

## Screenshots

(Include any relevant screenshots of your app’s UI here)

## Contributing

If you would like to contribute to the project:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-name`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

