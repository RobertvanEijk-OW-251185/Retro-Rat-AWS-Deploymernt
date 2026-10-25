const SavedItem = require("../models/SavedItem");

async function getOrCreateSaved(userId) {
  let saved = await SavedItem.findOne({ user: userId });
  if (!saved) {
    saved = await SavedItem.create({ user: userId, items: [] });
  }
  return saved;
}

// GET /saved
exports.getSaved = async (req, res) => {
  try {
    const saved = await SavedItem.findOne({ user: req.user.id }).populate({
      path: "items.listing",
      populate: { path: "seller", select: "name" },
    });

    if (!saved) return res.json([]);

    const listings = saved.items
      .filter((item) => item.listing)
      .map((item) => ({
        ...item.listing.toObject(),
        savedAt: item.savedAt,
      }));

    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /saved/toggle/:listingId
exports.toggleSaved = async (req, res) => {
  try {
    const { listingId } = req.params;
    if (!listingId) {
      return res.status(400).json({ message: "listingId is required" });
    }

    const saved = await getOrCreateSaved(req.user.id);

    const existingIndex = saved.items.findIndex(
      (item) => item.listing.toString() === listingId,
    );

    let action;
    if (existingIndex === -1) {
      saved.items.push({ listing: listingId });
      action = "saved";
    } else {
      saved.items.splice(existingIndex, 1);
      action = "unsaved";
    }

    await saved.save();

    res.status(200).json({
      action,
      count: saved.items.length,
      isSaved: action === "saved",
    });
  } catch (err) {
    console.error("toggleSaved error:", err);
    res.status(500).json({ message: err.message });
  }
};

// GET /saved/ids
exports.getSavedIds = async (req, res) => {
  try {
    const saved = await SavedItem.findOne({ user: req.user.id });
    if (!saved) return res.json([]);
    const ids = saved.items.map((item) => item.listing.toString());
    res.json(ids);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
