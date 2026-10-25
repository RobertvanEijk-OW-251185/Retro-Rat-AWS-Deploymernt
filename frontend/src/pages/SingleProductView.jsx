import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import SingleProductImage from "../components/SingleProductImage";
import SingleProductInformation from "../components/SingleProductInformation";
import CommentSectionComponent from "../components/CommentSectionComponent";

import { apiGet } from "../client";

// Google Analytics
import { toAnalyticsItem, trackEvent } from "../analytics";

import "../pages/SingleProductView.css";
import "./SingleProductView.css";
import "../components/SingleProductImage.css";
import "../components/SingleProductInformation.css";

function SingleProductView() {
	const { id } = useParams();
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const lastViewedListingId = useRef(null);

	useEffect(() => {
		apiGet(`/listings/${id}`)
			.then((data) => setListing(data))
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, [id]);

	useEffect(() => {
		if (!listing || lastViewedListingId.current === listing._id) return;

		lastViewedListingId.current = listing._id;
		trackEvent("view_item", {
			currency: "ZAR",
			value: Number(listing.price),
			items: [toAnalyticsItem(listing)],
		});
	}, [listing]);

	if (loading) return <p>Loading product...</p>;
	if (error) return <p>Couldn't load product: {error}</p>;
	if (!listing) return <p>Product not found.</p>;

	return (
		<div className="singleProductView">
			<div className="mainContent">
				{/* <div className="breadcrumbs"></div> */}
				<div className="productDetails">
					<SingleProductImage listing={listing} />
					<SingleProductInformation listing={listing} />
				</div>
				<CommentSectionComponent listingId={listing._id} />
			</div>
		</div>
	);
}

export default SingleProductView;
