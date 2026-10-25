const express = require("express");
const router = express.Router();
const {
	registerUser,
	getUsers,
	loginUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware"); // Validation middleware to protect routes

// @desc    Register a new user
// @route   POST /api/users/register

router.post("/register", registerUser);
router.post("/login", loginUser);

// @desc    Get all users
// @route   GET /api/users
// The 'protect' middleware checks for a valid JWT token before allowing access to the getUsers route.
router.get("/", protect, getUsers);

// testing route from robert...
const { getMe } = require("../controllers/userController");

router.get("/me", protect, getMe);

module.exports = router;
