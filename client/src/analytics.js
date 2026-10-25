export function trackEvent(eventName, parameters = {}) {
	if (typeof window !== "undefined" && typeof window.gtag === "function") {
		window.gtag("event", eventName, parameters);
	}
}

export function toAnalyticsItem(listing) {
	return {
		item_id: listing._id,
		item_name: listing.productName,
		item_category: listing.category,
		price: Number(listing.price),
		quantity: 1,
	};
}
