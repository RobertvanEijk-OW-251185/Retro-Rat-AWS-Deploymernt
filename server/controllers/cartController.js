const Cart = require("../models/Cart");

//find the cart or make a new one if its not there for some reason
async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
}

// GET /cart: returns the cart listings
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate({
      path: "items.listing",
      populate: { path: "seller", select: "name" }, // makes listing.seller.name a thing
    });

    // empty/no cart= empty array
    if (!cart) return res.json([]);

    const listings = cart.items
      .filter((item) => item.listing)
      .map((item) => ({
        ...item.listing.toObject(),
        addedAt: item.addedAt,
      }));

    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /cart: add a listing to the cart. Body: {listingId}
exports.addToCart = async (req, res) => {
  try {
    const { listingId } = req.body;
    if (!listingId) {
      return res.status(400).json({ message: "listingId is required" });
    }

    const cart = await getOrCreateCart(req.user.id);

    // don't add the same listing twice (the button might run twice cause dev mode or smth)
    const alreadyIn = cart.items.some(
      (item) => item.listing.toString() === listingId,
    );
    if (!alreadyIn) {
      cart.items.push({ listing: listingId });
      await cart.save();
    }

    res
      .status(200)
      .json({ message: "Added to cart", count: cart.items.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error("addToCart error:", err);
  }
};

// DELETE /cart/:listingId :remove a listing from the cart
exports.removeFromCart = async (req, res) => {
  try {
    const { listingId } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.listing.toString() !== listingId,
    );
    await cart.save();

    res.json({ message: "Removed from cart", count: cart.items.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /cart/checkout — mark all cart items as sold and clear the cart
exports.checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const listingIds = cart.items.map((item) => item.listing);

    // mark listings as sold
    const Listing = require("../models/Listing");
    await Listing.updateMany(
      { _id: { $in: listingIds } },
      { $set: { status: "sold" } },
    );

    // remove them from all carts cause like its gone man you cant buy it anymore
    await Cart.updateMany(
      {},
      { $pull: { items: { listing: { $in: listingIds } } } },
    );

    // remove them from everyone's saved items too
    const SavedItem = require("../models/SavedItem");
    await SavedItem.updateMany(
      {},
      { $pull: { items: { listing: { $in: listingIds } } } },
    );

    res.json({ message: "Checkout complete", soldCount: listingIds.length });
  } catch (err) {
    console.error("checkout error:", err);
    res.status(500).json({ message: err.message });
  }
};
