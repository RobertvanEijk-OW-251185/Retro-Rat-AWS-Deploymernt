// import React, { useState } from "react";
// import "./LoginPage.css";
// import { Container, Row, Col } from "react-bootstrap";
// import TunePassword from "../components/TunePassword";

// export default function LoginPage() {
// //start login mode as true (i have an acoount, LET ME IIIIIIIIIN)
// const [isLogin, setIsLogin] = useState(true);

// // State to hold all our form data
// const [email, setEmail] = useState("");
// const [username, setUsername] = useState("");
// const [tunePassword, setTunePassword] = useState("--------"); // Default 8 rests
// const [errorMessage, setErrorMessage] = useState("");

// // The main function that fires when you click "Submit"
// const handleSubmit = async (e) => {
// 	e.preventDefault(); // Stops the page from refreshing
// 	setErrorMessage("");

// 	// Determine which URL to hit based on the toggle
// 	const url = isLogin
// 		? "http://localhost:5001/api/users/login"
// 		: "http://localhost:5001/api/users/register";

// 	// Build the payload (Note: your backend model expects 'name', so we map username to name)
// 	const payload = isLogin
// 		? { email, password: tunePassword }
// 		: { name: username, email, password: tunePassword };

// 	try {
// 		const response = await fetch(url, {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify(payload),
// 		});

// 		const data = await response.json();

// 		if (!response.ok) {
// 			// If your backend threw a 400 or 401 error, show it
// 			setErrorMessage(data.error || "Something went wrong");
// 			return;
// 		}

// 		// SUCCESS!
// 		if (isLogin) {
// 			// Save the JWT token (the digital passport) to the browser's local storage
// 			localStorage.setItem("token", data.token);
// 			alert("Logged in successfully! Token saved to LocalStorage.");
// 			// Here is where you would redirect them to the User Console later
// 		} else {
// 			alert("Account created! Please log in.");
// 			setIsLogin(true); // Switch them over to the login tab
// 		}
// 	} catch (error) {
// 		console.error("Fetch error:", error);
// 		setErrorMessage("Failed to connect to the server.");
// 	}
// };

// 	return (
// 		<div className="login-sign-up-page">
// 			<div className="login-sign-up-container">
// 				{/* Banner for log in and sign up */}
// 				<div className="login-sign-up-header">
// 					{isLogin ? (
// 						<div className="login-header">
// 							<h1 style={{ marginBottom: 0 }}>ALREADY HAVE AN ACCOUNT?</h1>
// 							<p style={{ color: "#FFE500" }}>
// 								Log-in to continue where you left off
// 							</p>
// 						</div>
// 					) : (
// 						<div className="sign-up-header">
// 							<h1 style={{ marginBottom: 0 }}> DON'T HAVE AN ACCOUNT YET?</h1>
// 							<p style={{ color: "#FFE500" }}>Sign-up to get started!!</p>
// 						</div>
// 					)}
// 				</div>

// 				{/* login in and sign up panel switching buttons */}
// 				<Container fluid className="login-sign-up-button-container">
// 					<Row className="login-sign-up-buttons">
// 						<Col md={4} className="login-button">
// 							<button
// 								className={isLogin ? "active" : ""}
// 								onClick={() => setIsLogin(true)}>
// 								Log-in
// 							</button>
// 						</Col>
// 						<Col md={4} className="sign-up-button">
// 							<button
// 								className={!isLogin ? "active" : ""}
// 								onClick={() => setIsLogin(false)}>
// 								Sign-Up
// 							</button>
// 						</Col>
// 					</Row>
// 				</Container>

// 				{/* log in sign up block */}
// 				<Container fluid className="account-details-main-container">
// 					<Row className="account-details-container">
// 						<Col className="account-details">
// 							<h1> Account Details</h1>

// 							{/* Show errors in red if the backend rejects them */}
// 							{errorMessage && (
// 								<p style={{ color: "red", fontWeight: "bold" }}>
// 									{errorMessage}
// 								</p>
// 							)}

// 							<form id="auth-form" onSubmit={handleSubmit}>
// 								{/* Only show Username field if they are signing up */}
// 								{!isLogin && (
// 									<div className="input-container">
// 										<label htmlFor="username">Username</label>
// 										<input
// 											type="text"
// 											id="username"
// 											value={username}
// 											onChange={(e) => setUsername(e.target.value)}
// 											placeholder="e.g. RetroRat123"
// 											required={!isLogin}
// 										/>
// 									</div>
// 								)}

// 								<div className="input-container">
// 									<label htmlFor="email">Email</label>
// 									<input
// 										type="email"
// 										id="email"
// 										value={email}
// 										onChange={(e) => setEmail(e.target.value)}
// 										placeholder="e.g. leeBernersTimCERN@hotmail.com"
// 										required
// 									/>
// 								</div>
// 							</form>

// 							{/* Pass our new state-updating function down into the Tune component */}
// 							<TunePassword
// 								onPasswordChange={(newPassword) => setTunePassword(newPassword)}
// 							/>
// 						</Col>
// 					</Row>
// 				</Container>

// 				{/* final step log in or sign up button */}
// 				<Container fluid className="login-sign-up-submit-button-container">
// 					<Row className="login-sign-up-submit-button">
// 						<Col className="login-submit-button">
// 							{/* 'form="auth-form"' tells this button to trigger the form submission above */}
// 							<button type="submit" form="auth-form">
// 								Submit
// 							</button>
// 						</Col>
// 					</Row>
// 				</Container>
// 			</div>
// 		</div>
// 	);
// }

import React from "react";
import "./LoginPage.css";
import { NavLink, Outlet, useMatch } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export default function LoginPage() {
	const isLogin = useMatch("/login");

	return (
		<div className="login-sign-up-page">
			<div className="login-sign-up-container">
				{/* Banner — same content, driven by URL now instead of state */}
				<div className="login-sign-up-header">
					{isLogin ? (
						<div className="login-header">
							<h1 style={{ marginBottom: 0 }}>ALREADY HAVE AN ACCOUNT?</h1>
							<p style={{ color: "#FFE500" }}>
								Log-in to continue where you left off
							</p>
						</div>
					) : (
						<div className="sign-up-header">
							<h1 style={{ marginBottom: 0 }}>DON'T HAVE AN ACCOUNT YET?</h1>
							<p style={{ color: "#FFE500" }}>Sign-up to get started!!</p>
						</div>
					)}
				</div>

				{/* Tab buttons — NavLink applies "active" class automatically */}
				<Container fluid className="login-sign-up-button-container">
					<Row className="login-sign-up-buttons">
						<Col md={4} className="login-button">
							<NavLink
								to="/login"
								end
								className={({ isActive }) =>
									`nav-tab-btn${isActive ? " nav-tab-btn-active" : ""}`
								}>
								Log-in
							</NavLink>
						</Col>
						<Col md={4} className="sign-up-button">
							<NavLink
								to="/login/signup"
								className={({ isActive }) =>
									`nav-tab-btn${isActive ? " nav-tab-btn-active" : ""}`
								}>
								Sign-Up
							</NavLink>
						</Col>
					</Row>
				</Container>

				{/* Child route renders here */}
				<Outlet />
			</div>
		</div>
	);
}
