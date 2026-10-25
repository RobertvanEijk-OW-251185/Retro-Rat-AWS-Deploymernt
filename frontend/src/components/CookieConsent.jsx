import { useState } from "react";
import "./CookieConsent.css";

const CONSENT_KEY = "retro-rat-analytics-consent";

function CookieConsent() {
	const [isVisible, setIsVisible] = useState(() => {
		const consent = localStorage.getItem(CONSENT_KEY);
		return consent !== "granted" && consent !== "denied";
	});

	function chooseConsent(consent) {
		localStorage.setItem(CONSENT_KEY, consent);
		window.gtag("consent", "update", { analytics_storage: consent });
		setIsVisible(false);
	}

	if (!isVisible) return null;

	return (
		<section className="cookie-consent" aria-label="Cookie consent">
			<div className="cookie-consent__copy">
				<h2>Analytics cookies</h2>
				<p>
					This website is for a University project where our task is to track
					and write up a research report based on Search Engine Optimisation and
					tracking wherever the user's of this site fails to accomplish a task
					or backs out of a task. For this use, I request that you please allow
					the use of cookies. This information will only be used for academic
					purposes and the site's deployment will end on 6 November 2026. We use
					Google Analytics to understand how the site is used. You can choose
					whether to allow analytics cookies.
				</p>
			</div>
			<div className="cookie-consent__actions">
				<button
					className="cookie-consent__button cookie-consent__button--reject"
					type="button"
					onClick={() => chooseConsent("denied")}>
					Reject
				</button>
				<button
					className="cookie-consent__button cookie-consent__button--accept"
					type="button"
					onClick={() => chooseConsent("granted")}>
					Accept analytics
				</button>
			</div>
		</section>
	);
}

export default CookieConsent;
