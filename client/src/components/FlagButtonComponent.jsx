import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function FlagButtonComponent({ listingId }) {
	return (
		<Link to={`/sell/${listingId}`} className="flagIconBtn">
			<FontAwesomeIcon icon={faPenToSquare} />
		</Link>
	);
}

export default FlagButtonComponent;
