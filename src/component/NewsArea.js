import React, { Component } from "react";
import NewsBox from "./NewsBox";
import axios from "axios";
import Loader from "./Loader/index";
import MoreLoader from "./MoreLoader/index";
import TopHeadlines from "./TopHeadlines/index";
import "./NewsArea.css";
import Footer from "./Footer/index";

export class NewsArea extends Component {
	constructor(props) {
		super(props);
		this.state = {
			articles: [],
			page: 1,
			loading: false,
			initialLoading: true,
			query: "tesla", // Default search query
		};
		this.loaderRef = React.createRef(); // Create ref for loader
	}

	componentDidMount() {
		this.fetchArticles();

		// Create IntersectionObserver instance
		this.observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !this.state.loading) {
					console.log("Loader is in view, fetching more articles...");
					this.fetchMoreArticles();
				}
			},
			{
				root: null, // Observe relative to the viewport
				rootMargin: "0px",
				threshold: 0.1, // Trigger when 10% of the loader is visible
			}
		);

		// Start observing the loader div
		if (this.loaderRef.current) {
			this.observer.observe(this.loaderRef.current);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		// Re-observe the loader div after updating the state
		if (
			this.loaderRef.current &&
			!this.state.loading &&
			prevState.articles.length !== this.state.articles.length
		) {
			this.observer.observe(this.loaderRef.current);
		}
	}

	componentWillUnmount() {
		if (this.observer) {
			this.observer.disconnect();
		}
	}

	fetchArticles = () => {
		this.setState({ loading: true });
		const apiKey = "421d8016b77948e48ee66ec00b73ed7e";
		const { query, page } = this.state;
		const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
			query
		)}&sortBy=publishedAt&apiKey=${apiKey}&page=${page}&pageSize=12&language=en`;

		axios
			.get(url)
			.then((response) => {
				this.setState((prevState) => ({
					articles:
						page === 1
							? response.data.articles
							: [...prevState.articles, ...response.data.articles],
					loading: false,
					initialLoading: false,
				}));
			})
			.catch((error) => {
				console.error("Error fetching news articles:", error);
				this.setState({ loading: false, initialLoading: false });
			});
	};

	fetchMoreArticles = () => {
		this.setState(
			(prevState) => ({ page: prevState.page + 1 }),
			this.fetchArticles
		);
	};

	handleSearchChange = (event) => {
		this.setState({ query: event.target.value });
	};

	handleSearchSubmit = (event) => {
		event.preventDefault(); // Prevent form from reloading the page
		this.setState({ page: 1 }, this.fetchArticles); // Reset page to 1 and fetch articles
	};

	render() {
		const { articles, loading, initialLoading, query } = this.state;

		if (initialLoading) {
			return <Loader />;
		}

		return (
			<>
				<section className='text-gray-400 body-font bg-gray-900'>
					{/* Search box */}
					<div className='search-box flex-col text-center w-full h-auto p-12'>
						<div className='mb-10 font-extrabold text-6xl'>
							Search for your personalised interest
						</div>
						<form
							className='max-w-md mx-auto'
							onSubmit={this.handleSearchSubmit}
						>
							<label
								htmlFor='default-search'
								className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
							>
								Search
							</label>
							<div className='relative'>
								<div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
									<svg
										className='w-4 h-4 text-gray-500 dark:text-gray-400'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 20 20'
									>
										<path
											stroke='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
										/>
									</svg>
								</div>
								<input
									type='search'
									id='default-search'
									value={query}
									onChange={this.handleSearchChange}
									className='pl-12 block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
									placeholder='Search for news...'
									required
								/>
								<button
									type='submit'
									className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
								>
									Search
								</button>
							</div>
						</form>
					</div>
					<div className='container px-5 pt-12 mx-auto'>
						<div className='lg:w-1/2 w-full mb-6 lg:mb-0'>
							<h1 className='sm:text-3xl text-2xl font-medium title-font mb-2 text-white'>
								Top Headlines
							</h1>
							<div className='h-1 w-20 bg-blue-500 rounded'></div>
						</div>
					</div>
					<TopHeadlines />
					<div className='container px-5 py-12 mx-auto'>
						<div className='flex flex-wrap w-full mb-12'>
							<div className='lg:w-1/2 w-full mb-6 lg:mb-0'>
								<h1 className='sm:text-3xl text-2xl font-medium title-font mb-2 text-white'>
									News 24/7 - Search results
								</h1>
								<div className='h-1 w-20 bg-blue-500 rounded'></div>
							</div>
						</div>
						{articles.length === 0 ? (
							<div className='flex-col justify-center items-center text-4xl text-center font-extrabold'>
								No results found
								<img
									src='/no-data-bro.png'
									alt='No content available'
									className='w-1/3 mx-auto'
								/>
							</div>
						) : (
							<div className='flex flex-wrap -m-4'>
								{articles.map((article, index) => (
									<NewsBox key={index} article={article} />
								))}
							</div>
						)}
						<div
							ref={this.loaderRef}
							style={{ height: "40px", margin: "20px 0" }} // Adjusted height and margin for better visibility
						>
							{loading && <MoreLoader />}
						</div>
					</div>
				</section>
				<Footer />
			</>
		);
	}
}

export default NewsArea;
