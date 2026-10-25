const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");
const Cart = require("../models/Cart");
const SavedItem = require("../models/SavedItem");

// Controller function for creating a listing... yes
const {
	createListing,
	addComment,
} = require("../controllers/listingController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Basically: protect -> upload to Cloudinary -> save to DB
router.post("/", protect, upload.single("image"), createListing);

// For Comment
// POST http://localhost:5001/api/listings/<LISTING_ID>/comments
router.post("/:id/comments", protect, addComment);

// =====================================================================
// TROY'S CODE BELOWWWWW.
// =====================================================================

// GET /api/listings/ — get all approved listings
router.get("/", async (req, res) => {
	const listings = await Listing.find({ status: "approved" })
		.populate("seller", "name")
		.sort({ createdAt: -1 }); // newest first
	res.json(listings);
});

//GET /api/listings/pending — get all pending listings (admin only) --robert's code
router.get("/pending", async (req, res) => {
	try {
		const listings = await Listing.find({ status: "pending" })
			.populate("seller", "name")
			.sort({ createdAt: -1 }); // sorts them newest first
		res.json(listings);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// GET /api/listings/past — get all approved and rejected listings --robert too
router.get("/past", async (req, res) => {
	try {
		const listings = await Listing.find({
			status: { $in: ["approved", "rejected"] },
		})
			.populate("seller", "name")
			.sort({ createdAt: -1 });
		res.json(listings);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Another TestRoute by rob for getting the user's listings
// GET /api/listings/my — get all listings for the logged-in user
router.get("/my", protect, async (req, res) => {
	try {
		const listings = await Listing.find({ seller: req.user.id }).sort({
			createdAt: -1,
		});
		res.json(listings);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// GET /api/listings/:id — get one listing (and increment views)
router.get("/:id", async (req, res) => {
	try {
		const listing = await Listing.findByIdAndUpdate(
			req.params.id,
			{ $inc: { views: 1 } },
			{ returnDocument: "after" },
		).populate("seller", "name");
		if (!listing) return res.status(404).json({ error: "Listing not found" });
		res.json(listing);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// PUT /listings/:id — update an existing listing
router.put("/:id", protect, async (req, res) => {
	try {
		const listing = await Listing.findById(req.params.id);
		if (!listing) {
			return res.status(404).json({ error: "Listing not found" });
		}

		// only the seller can update their own listing
		if (
			listing.seller.toString() !== req.user.id &&
			req.user.isAdmin !== true
		) {
			return res
				.status(403)
				.json({ error: "Not authorized to update this listing" });
		}

		const updated = await Listing.findByIdAndUpdate(req.params.id, req.body, {
			returnDocument: "after",
			runValidators: true,
		});
		res.json(updated);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// DELETE /api/listings/:id delete a listing (owner or admin)
router.delete("/:id", protect, async (req, res) => {
	try {
		const listing = await Listing.findById(req.params.id);
		if (!listing) {
			return res.status(404).json({ error: "Listing not found" });
		}

		// owner or admin can delete
		const isOwner = listing.seller.toString() === req.user.id;
		const isAdmin = req.user.isAdmin;

		if (!isOwner && !isAdmin) {
			return res
				.status(403)
				.json({ error: "Not authorized to delete this listing" });
		}

		await listing.deleteOne();

		// clean up references in carts and saved items
		await Cart.updateMany({}, { $pull: { items: { listing: req.params.id } } });
		await SavedItem.updateMany(
			{},
			{ $pull: { items: { listing: req.params.id } } },
		);

		res.json({ message: "Listing deleted", id: req.params.id });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
