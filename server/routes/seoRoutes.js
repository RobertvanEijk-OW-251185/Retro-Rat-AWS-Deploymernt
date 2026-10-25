const express = require("express");
const Listing = require("../models/Listing");

const router = express.Router();

function getSiteOrigin() {
	const configuredUrl = process.env.SITE_URL;
	if (!configuredUrl) {
		throw new Error("SITE_URL must be configured to serve SEO routes");
	}

	const siteUrl = new URL(configuredUrl);
	if (siteUrl.protocol !== "https:" && siteUrl.protocol !== "http:") {
		throw new Error("SITE_URL must use HTTP or HTTPS");
	}

	return siteUrl.origin;
}

function escapeXml(value) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");
}

router.get("/sitemap.xml", async (req, res) => {
	try {
		const siteOrigin = getSiteOrigin();
		const listings = await Listing.find({ status: "approved" })
			.select("_id updatedAt")
			.lean();

		const urls = [
			`${siteOrigin}/`,
			`${siteOrigin}/browse`,
			...listings.map((listing) => `${siteOrigin}/product/${listing._id}`),
		];
		const lastmodByUrl = new Map(
			listings.map((listing) => [
				`${siteOrigin}/product/${listing._id}`,
				listing.updatedAt?.toISOString().slice(0, 10),
			]),
		);
		const entries = urls
			.map((url) => {
				const lastmod = lastmodByUrl.get(url);
				return `<url><loc>${escapeXml(url)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`;
			})
			.join("");

		res
			.type("application/xml")
			.send(
				`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`,
			);
	} catch (error) {
		console.error("Failed to generate sitemap:", error);
		res.status(500).type("text/plain").send("Unable to generate sitemap");
	}
});

router.get("/robots.txt", (req, res) => {
	try {
		const siteOrigin = getSiteOrigin();
		res
			.type("text/plain")
			.send(
				`User-agent: *\nDisallow: /admin\nDisallow: /api\nSitemap: ${siteOrigin}/sitemap.xml\n`,
			);
	} catch (error) {
		console.error("Failed to generate robots.txt:", error);
		res.status(500).type("text/plain").send("Unable to generate robots.txt");
	}
});

module.exports = router;
