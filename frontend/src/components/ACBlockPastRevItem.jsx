import "./ACBlockPastRevItem.css";

// function ACBlockPastRevItem() {
function ACBlockPastRevItem({ listing }) {
	// console.log(listing); // temp check
	const { _id, productName, price, mainImage, status } = listing;

	return (
		<div className="ac-list-item">
			<div className="ac-list-item-image">
				<img src={mainImage} alt={productName} />
			</div>
			<div className="ac-list-item-information">
				<div className="ac-info-top">
					<div className="top-info">
						<span className="prod-name">{productName}</span>
						{/* <span className="seller-name">{seller}</span> */}
						<span className="prod-price">R{Number(price).toFixed(2)}</span>
					</div>
				</div>

				<div className="ac-info-bot">
					<div className="ac-bot-info">
						<div
							className={status === "approved" ? "approved-tag" : "denied-tag"}>
							<span
								className={
									status === "approved"
										? "approved-tag-text"
										: "denied-tag-text"
								}>
								{status}
							</span>
						</div>
						{/* <div className="denied-tag">
							<span className="denied-tag-text">Denied</span>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ACBlockPastRevItem;
