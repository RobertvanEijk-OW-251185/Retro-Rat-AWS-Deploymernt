const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
	// Pull location from req.body (or it will just be undefined)
	const { name, email, password, location } = req.body;

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = new User({
			name: name,
			email: email,
			musicalHash: hashedPassword,
			location: location || "Gauteng", // Hardcoded fallback to pass Mongoose validation for now
		});

		await user.save();

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			location: user.location,
		});
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Find the user, but MUST explicitly ask Mongoose to return the musicalHash field since we set select: false in the schema for security reasons
		const user = await User.findOne({ email }).select("+musicalHash");

		// Compare against musicalHash
		if (user && (await bcrypt.compare(password, user.musicalHash))) {
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
				expiresIn: "30d",
			});

			res.status(200).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: token,
			});
		} else {
			res.status(401).json({ error: "Invalid email or password" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

// test stuff from robert...
const getMe = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		if (!user) return res.status(404).json({ error: "User not found" });
		res.json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// module.exports = { registerUser, loginUser, getUsers, getMe };
module.exports = { registerUser, loginUser, getUsers, getMe };
