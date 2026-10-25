import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TunePassword from "../components/TunePassword";
import { useToast } from "./ToastContext";
import { apiPost } from "../client";

// Google Analytics
import { trackEvent } from "../analytics";

import "../pages/LoginPage.css";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [tunePassword, setTunePassword] = useState("--------");
	const navigate = useNavigate();

	const { showRetroToast, showErrorToast } = useToast();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = await apiPost("/users/login", {
				email,
				password: tunePassword,
			});

			trackEvent("login", { method: "email" });
			localStorage.setItem("token", data.token);
			localStorage.setItem("isAdmin", data.isAdmin);
			// alert("Logged in successfully!"); UGLY LOCAL HOST TOAST
			showRetroToast("Logged in Successfully!");

			// navigate("/console"); // ← uncomment when ready
			navigate("/browse");
		} catch (error) {
			const failureMessage =
				error.message === "Failed to fetch"
					? "Failed to connect to the server."
					: error.message;
			showErrorToast(failureMessage);
		}
	};

	return (
		<Container fluid className="account-details-main-container">
			<Row className="account-details-container">
				<Col className="account-details">
					<h1>Account Details</h1>
					{/* {errorMessage && (
						<p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
					)} */}

					<form id="auth-form" onSubmit={handleSubmit}>
						<div className="input-container">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="e.g. leeBernersTimCERN@hotmail.com"
								required
							/>
						</div>
					</form>

					<TunePassword onPasswordChange={(pw) => setTunePassword(pw)} />
				</Col>
			</Row>

			<Container fluid className="login-sign-up-submit-button-container">
				<Row className="login-sign-up-submit-button">
					<Col className="login-submit-button">
						<button type="submit" form="auth-form">
							Log In Now!!
						</button>
					</Col>
				</Row>
			</Container>
		</Container>
	);
}
