import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "../analytics";

export default function AnalyticsPageView() {
	const location = useLocation();
	const lastTrackedLocation = useRef(null);

	useEffect(() => {
		const currentLocation = `${location.pathname}${location.search}${location.hash}`;
		if (lastTrackedLocation.current === currentLocation) return;

		lastTrackedLocation.current = currentLocation;
		trackEvent("page_view", {
			page_path: location.pathname,
			page_location: `${window.location.origin}${location.pathname}`,
			page_title: document.title,
		});
	}, [location]);

	return null;
}
