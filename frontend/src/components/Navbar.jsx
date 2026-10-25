import React, { useState, useEffect } from "react"; // ADDED useEffect HERE TO SPY ON THE DATABASE
import {
	BrowserRouter,
	Routes,
	Route,
	Link,
	useLocation,
} from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";

import "./Navbar.css";
import bootRatWhite from "../assets/bootRatWhite.svg";

// BACKEND HOOK: Stealing the API client so we can extract listings without asking permission
import { apiGet } from "../client";

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();

	// CHAOTIC SEARCH STATES: Tracking what the user types before they break something
	const [allProducts, setAllProducts] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredResults, setFilteredResults] = useState([]);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	const isLoggedIn = !!localStorage.getItem("token");
	const isAdmin = localStorage.getItem("isAdmin") === "true";

	// DATA HOARDING SYSTEM: Silently downloading the whole marketplace layout on mount
	// so we can filter locally on the frontend because server queries are scary.
	// useEffect(() => {
	// 	apiGet("/listings")
	// 		.then((data) => setAllProducts(data))
	// 		.catch((err) =>
	// 			console.error("Search system broke, blame the server:", err),
	// 		);
	// }, []);

	const fetchLatestListings = () => {
		apiGet("/listings")
			.then((data) => setAllProducts(data))
			.catch((err) =>
				console.error("Search system broke, blame the server:", err),
			);
	};

	useEffect(() => {
		fetchLatestListings();
	}, []);

	// THE MATCHMAKER: Checking if whatever garbage the user typed matches titles or sellers.
	// Uses optional chaining (?.) everywhere because null pointer errors are the enemy.
	const handleSearch = (e) => {
		const query = e.target.value;
		setSearchQuery(query);

		if (query.trim().length > 0) {
			const results = allProducts.filter(
				(listing) =>
					listing.productName?.toLowerCase().includes(query.toLowerCase()) ||
					listing.seller?.name?.toLowerCase().includes(query.toLowerCase()),
			);
			setFilteredResults(results);
		} else {
			setFilteredResults([]); // Wipes the screen clear if they backspace everything
		}
	};

	return (
		<>
			<nav className="custom-navbar">
				<div className="nav-container">
					{/* HEADER: Always visible, holds Logo + Burger */}
					<div className="nav-header">
						<Link className="navbar-brand" to="/">
							<img src={bootRatWhite} width="40" height="40" alt="Logo" />
							<span>Retro Rat</span>
						</Link>

						<button className="hamburger" onClick={toggleMenu}>
							{isMenuOpen ? "✖" : "☰"}
						</button>
					</div>

					<div className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
						{/* ATTENTION DEVS: Wrapped in a relative container to absolute-anchor the retro dropdown */}
						<div className="search-container">
							<Form
								id="search-bar"
								role="search"
								onSubmit={(e) => e.preventDefault()}>
								<input
									type="search"
									placeholder="Search..."
									aria-label="Search"
									value={searchQuery}
									onChange={handleSearch}
									onFocus={fetchLatestListings}
								/>
							</Form>

							{/* DROPDOWN MANIFESTATION AREA */}
							{searchQuery.length > 0 && (
								<div className="search-dropdown">
									{filteredResults.length > 0 ? (
										filteredResults.map((listing) => (
											<Link
												to={`/product/${listing._id}`}
												className="search-result-item"
												key={listing._id}
												onClick={() => {
													setSearchQuery(""); // Auto-collapses the dropdown menu on click
													setIsMenuOpen(false); // Closes mobile  too if they're on a phone
												}}>
												<div className="search-result-img">
													<img
														src={listing.mainImage}
														alt={listing.productName}
													/>
												</div>

												<div className="search-result-details">
													<div className="search-title">
														{listing.productName}
													</div>
													<div className="search-user">
														BY {listing.seller?.name || "unknown"}
													</div>
													<div className="search-badges">
														<span className="search-badge condition-badge">
															{listing.condition}
														</span>
														<span className="search-badge year-badge">
															{listing.era}
														</span>
													</div>
												</div>

												<div className="search-result-price">
													R{listing.price ? listing.price.toFixed(2) : "0.00"}
												</div>
											</Link>
										))
									) : (
										<div className="search-no-results">
											No retro goods found for "{searchQuery}"
										</div>
									)}
								</div>
							)}
						</div>

						<div className="nav-links">
						    <Link
						        to="/"
						        className={location.pathname === "/" ? "active" : ""}
						        onClick={() => setIsMenuOpen(false)}>
						        Home
						    </Link>

						    <Link
						        to="/browse"
						        className={location.pathname === "/browse" ? "active" : ""}
						        onClick={() => setIsMenuOpen(false)}>
						        Browse
						    </Link>

						    {/* SELL: Only visible if logged in AND NOT an admin */}
						    {isLoggedIn && !isAdmin && (
						        <Link
						            to="/sell"
						            className={location.pathname === "/sell" ? "active" : ""}
						            onClick={() => setIsMenuOpen(false)}>
						            Sell
						        </Link>
						    )}

						    {/* CART: Visible to everyone so they can view the basket... */}
						    <Link
						        to="/cart"
						        className={location.pathname === "/cart" ? "active" : ""}
						        onClick={() => setIsMenuOpen(false)}>
						        Cart
						    </Link>
						
						    {/* ACCOUNT: Only visible to regular logged-in users (NOT big scary admin) */}
						    {isLoggedIn && !isAdmin && (
						        <Link
						            to="/account"
						            className={location.pathname === "/account" ? "active" : ""}
						            onClick={() => setIsMenuOpen(false)}>
						            Account
						        </Link>
						    )}

						    {/* ADMIN: Only visible if the user holds the admin badge */}
						    {isAdmin && (
						        <Link
						            to="/admin"
						            className={location.pathname.startsWith("/admin") ? "active" : ""}
						            onClick={() => setIsMenuOpen(false)}>
						            Admin
						        </Link>
						    )}

						    {/* LOGIN: Only visible if the user is logged out */}
						    {!isLoggedIn && (
						        <Link
						            to="/login"
						            className={location.pathname.startsWith("/login") ? "active" : ""}
						            onClick={() => setIsMenuOpen(false)}>
						            Login
						        </Link>
						    )}
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}
