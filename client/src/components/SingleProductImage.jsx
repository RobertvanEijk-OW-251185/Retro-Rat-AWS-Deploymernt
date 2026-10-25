import React, { useState, useEffect } from "react";
import { apiGet } from "../client";
import "./SingleProductImage.css";
import SaveButtonComponent from "./SaveButtonComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

function SingleProductImage({ listing }) {
	const [isSaved, setIsSaved] = useState(false);

	useEffect(() => {
		if (!listing?._id) return;
		apiGet("/saved/ids")
			.then((ids) => setIsSaved(ids.includes(listing._id)))
			.catch((err) => console.error("failed to load saved ids:", err));
	}, [listing?._id]);

	if (!listing) return <p>Loading...</p>;

	return (
		<div className="imageBlock">
			<div className="productImage">
				<img src={listing.mainImage} alt="" className="product-image" />
			</div>
			<div className="imageBlockBar">
				<div className="singleProductViewCount">
					<div className="iconClock">
						<FontAwesomeIcon icon={faClock} />
					</div>
					<span className="item-view-count">
						{listing.views} {listing.views === 1 ? "VIEW" : "VIEWS"}
					</span>
				</div>
				<SaveButtonComponent listingId={listing._id} initialSaved={isSaved} />
			</div>
		</div>
	);
}

export default SingleProductImage;
