import "../pages/AdminConsolePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

function ACBanner() {
	return (
		<div className="ac-banner">
			<div className="ac-banner-icon">
				<FontAwesomeIcon icon={faTriangleExclamation} />
			</div>
			<div>
				<p className="ac-banner-title">
					YOU ARE AN ADMIN — AND THIS IS YOUR CONSOLE!!
				</p>
				<p className="ac-banner-subtitle">
					This is where you can manage the listing requests of others... You can
					either deny their product submission, or approve their product and
					send it to the MARKETPLACE!!
				</p>
			</div>
		</div>
	);
}

export default ACBanner;
