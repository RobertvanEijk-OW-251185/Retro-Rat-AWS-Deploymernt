import "../pages/AdminConsolePage.css";
import ACBlockPastRevItem from "./ACBlockPastRevItem";
import { useEffect, useState } from "react";
import { apiGet } from "../client";

function ACReviewBlockPast() {
	const [pastListings, setPastListings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		apiGet("/listings/past")
			.then((data) => {
				setPastListings(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	return (
		<div className="ac-main-block">
			<div className="ac-tab-title">
				<span className="tab-title">Past Reviewed Products</span>
			</div>

			<div className="ac-block-items-list">
				{loading && <p>Loading...</p>}
				{error && <p style={{ color: "red" }}>{error}</p>}
				{!loading && pastListings.length === 0 && (
					<p>No past listings on record.</p>
				)}
				{pastListings.map((listing) => (
					<ACBlockPastRevItem key={listing._id} listing={listing} />
				))}
			</div>
		</div>
	);
}

export default ACReviewBlockPast;
