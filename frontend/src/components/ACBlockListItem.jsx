import "./ACBlockListItem.css";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPenToSquare,
	faEye,
	faTrashCan,
	faCheckSquare,
	faXmarkCircle,
} from "@fortawesome/free-regular-svg-icons";

function ACBlockListItem({ listing, onApprove, onDeny }) {
	// console.log(listing); // temp check

	const navigate = useNavigate();

	const { _id, productName, price, mainImage, seller } = listing;

	return (
		<div className="ac-list-item">
			<div className="ac-list-item-image">
				<img src={mainImage} alt={productName} />
			</div>
			<div className="ac-list-item-information">
				<div className="ac-info-top">
					<div className="top-info">
						<span className="prod-name">{productName}</span>
						<span className="prod-price">R{Number(price).toFixed(2)}</span>
					</div>
					<div className="pending-tag">
						<span className="tag-text">Pending Review</span>
					</div>
				</div>

				<div className="ac-info-bot">
					<div className="ac-bot-info">
						<button
							className="ac-view-item-btn"
							onClick={() => navigate(`/product/${_id}`)}>
							<FontAwesomeIcon icon={faEye} />
							{/* <span className="ac-view-item">View Item</span> */}
							View Item
						</button>
						<button
							className="ac-approve-item-btn"
							onClick={() => onApprove(_id)}>
							{/* onClick={() => handleApprove(_id)}> */}
							<FontAwesomeIcon icon={faCheckSquare} />
							{/* <span className="ac-approve-item">Approve</span> */}
							Approve
						</button>
						{/* <button className="ac-delete-item-btn" onClick={() => onDeny(_id)}> */}
						<button className="ac-delete-item-btn" onClick={() => onDeny(_id)}>
							{/* onClick={() => handleDeny(_id)}> */}
							<FontAwesomeIcon icon={faXmarkCircle} />
							{/* <span className="ac-delete-item">Deny</span> */}
							Deny
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ACBlockListItem;
