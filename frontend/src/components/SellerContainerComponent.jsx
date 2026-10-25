import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "./SellerContainerComponent.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
// import {}

function SellerContainerComponent({ seller }) {
	return (
		<div className="sellerContainer">
			<div className="container">
				<div className="sellerInfo">
					<div className="sellerImage">
						<div className="sellerIcon">
							<FontAwesomeIcon className="seller-icon" icon={faUser} />
						</div>
					</div>
					<div className="sellerNameRating">
						<div className="sellerName">
							<h1 className="blackText">
								{seller?.name?.toUpperCase() || "UNKNOWN SELLER"}
							</h1>
						</div>
						<div className="sellerRating">
							<div className="starIcon">
								<FontAwesomeIcon className="star-icon" icon={faStar} />
							</div>
							<span className="ratingText">4.9 Rating</span>
						</div>
					</div>
				</div>
				{/* <div className="viewShopBtn">
					<span className="viewShopBtnText">View Shop</span>
				</div> */}
			</div>
		</div>
	);
}

export default SellerContainerComponent;
