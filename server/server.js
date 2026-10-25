const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
	const databaseConnected = mongoose.connection.readyState === 1;
	res
		.status(databaseConnected ? 200 : 503)
		.json({ status: databaseConnected ? "ok" : "unavailable" });
});

const seoRoutes = require("./routes/seoRoutes");
app.use("/", seoRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/dist")));
}

// User routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

//Listing routes
const listingRoutes = require("./routes/listingRoutes");
app.use("/api/listings", listingRoutes);

//cart routes
const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);

const commentRoutes = require("./routes/commentRoutes");
app.use("/api/comments", commentRoutes);

const savedRoutes = require("./routes/savedRoutes");
app.use("/api/saved", savedRoutes);

if (process.env.NODE_ENV === "production") {
	app.get("/{*splat}", (req, res) => {
		res.sendFile(path.join(__dirname, "../client/dist/index.html"));
	});
} else {
	app.get("/", (req, res) => {
		res.send("Api running");
	});
}

async function startServer() {
	if (!process.env.MONGO_URI) {
		throw new Error("MONGO_URI must be configured");
	}
	if (!process.env.JWT_SECRET) {
		throw new Error("JWT_SECRET must be configured");
	}

	await mongoose.connect(process.env.MONGO_URI);
	console.log("MongoDB connected");

	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}

startServer().catch((error) => {
	console.error("Failed to start server:", error);
	process.exit(1);
});
