import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./AdminConsolePage.css";
import Img1 from "../assets/product-img.png";
import Img2 from "../assets/Image (Classic Game Console Controller).png";
import Img3 from "../assets/Image (Sony Walkman Cassette Player).png";

import ACBanner from "../components/AdminConsoleBanner";
import ACTopContentComp from "./ACTopContent";
import ACBlockComponent from "../components/ACReviewBlockPending";

import ACReviewBlockPending from "../components/ACReviewBlockPending";
import ACReviewBlockPast from "../components/ACReviewBlockPast";
// import ACReviewBlockNotify from "../components/ACReviewBlockNotify";

function AdminConsolePage() {
	return (
		<div className="ac-page">
			{/* Admin Banner */}
			<ACBanner />

			<div className="ac-content">
				{/* Top Section: Profile + Nav Buttons */}
				<ACTopContentComp />

				{/* Main Panel */}
				{/* <div className="ac-content">
					{activeView === "pending" && renderPending()}
					{activeView === "past" && renderPastRequests()}
					{activeView === "inbox" && renderInbox()}
				</div> */}
				{/* <ACBlockComponent /> */}

				<Routes>
					<Route index element={<Navigate to="pending" replace />} />
					<Route path="pending" element={<ACReviewBlockPending />} />
					<Route path="past-requests" element={<ACReviewBlockPast />} />
					{/* <Route path="inbox" element={<ACReviewBlockNotify />} /> */}
				</Routes>
			</div>
		</div>
	);
}

export default AdminConsolePage;
