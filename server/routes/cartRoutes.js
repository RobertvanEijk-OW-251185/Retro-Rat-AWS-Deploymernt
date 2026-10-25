const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, cartController.getCart);
router.post("/", protect, cartController.addToCart);
router.delete("/:listingId", protect, cartController.removeFromCart);
router.post("/checkout", protect, cartController.checkout);

module.exports = router;
