import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsArea from "./component/NewsArea";
import Weather from "./component/Weather/index";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer/index";
import AboutUs from "./component/AboutUs";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path='/' element={<NewsArea />} />
				<Route path='/weather' element={<Weather />} />
				<Route path='/about-us' element={<AboutUs />} />
			</Routes>
		</Router>
	);
}

export default App;
