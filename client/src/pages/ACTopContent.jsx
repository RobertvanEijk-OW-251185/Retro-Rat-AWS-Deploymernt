import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { apiGet } from "../client";

import LogoutBtnComp from "../components/LogOutBtnComponent";

function ACTopContentComp() {
	const [adminUser, setAdminUser] = useState(null);
	const [pendingCount, setPendingCount] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		apiGet("/users/me")
			.then((data) => setAdminUser(data))
			.catch((err) => {
				console.error("Auth failed:", err);
				localStorage.removeItem("token");
				localStorage.removeItem("isAdmin");
				navigate("/login");
			});

		apiGet("/listings/pending")
			.then((data) => {
				setPendingCount(data.length);
			})
			.catch((err) => console.error("Failed to fetch listings", err));
	}, [navigate]);

	function handleLogout() {
		localStorage.removeItem("token");
		localStorage.removeItem("isAdmin");
		window.location.href = "/";
	}

	return (
		<div className="ac-user-row">
			<div className="ac-user-card">
				{/* notee: i changed <container> to <div> here, as <container> is not a valid HTML tag... some error hinted it */}
				<div className="ac-user-info">
					<div className="ac-user-icon">
						<span className="ac-ui-text">
							{adminUser?.name?.[0]?.toUpperCase() || "?"}
						</span>
					</div>
					<div className="ac-user-information">
						<span className="ac-user-name">
							{adminUser?.name || "Loading..."}
						</span>
						<span className="ac-user-account">Administrator</span>
						<span className="ac-user-pending-list">
							{pendingCount} Pending Listings
						</span>
					</div>
				</div>
				<LogoutBtnComp onLogout={handleLogout} />
			</div>

			<div className="ac-user-actions">
				<NavLink
					to="/admin/pending"
					className={({ isActive }) =>
						isActive ? "ac-pending ac-active" : "ac-pending"
					}>
					View Pending Listings
				</NavLink>
				<NavLink
					to="/admin/past-requests"
					className={({ isActive }) =>
						isActive ? "ac-past-req ac-active" : "ac-past-req"
					}>
					View Past Requests
				</NavLink>
			</div>
		</div>
	);
}

export default ACTopContentComp;