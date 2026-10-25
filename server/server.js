const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());

const seoRoutes = require("./routes/seoRoutes");
app.use("/", seoRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));
}

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

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
		res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
	});
} else {
	app.get("/", (req, res) => {
		res.send("Api running");
	});
}

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
