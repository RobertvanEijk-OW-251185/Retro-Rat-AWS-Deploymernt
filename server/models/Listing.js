/*Notes:
This is just a fancy blueprint fr.
Sets the rules for how everything should be structured and also sets some defaults for us
Enum - basically a list of acceptable values, if not in there then it tells it to get lost
mongoose is basically just a helper thingy, makes life easier by talking to mongo for us
*/

const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		text: {
			type: String,
			required: true,
			trim: true,
			maxlength: 500,
		},
	},
	{ timestamps: true },
);

const CommentSchema = new mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		text: {
			type: String,
			required: true,
			trim: true,
			maxlength: 500,
		},
		replies: [ReplySchema],
	},
	{ timestamps: true },
);

const ListingSchema = new mongoose.Schema(
	{
		seller: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		productName: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
			maxlength: 500,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		condition: {
			type: String,
			required: true,
			enum: ["Excellent", "Great", "Moderate", "Low", "Poor"],
		},
		era: {
			type: String,
			required: true,
			enum: ["70s", "80s", "90s", "2000s"],
		},
		category: {
			type: String,
			required: true,
			enum: [
				"Computers",
				"Gaming",
				"Audio",
				"Mobile",
				"Video",
				"Cameras",
				"Other",
			],
		},
		location: {
			type: String,
			enum: [
				"Eastern Cape",
				"Free State",
				"Gauteng",
				"KwaZulu-Natal",
				"Limpopo",
				"Mpumalanga",
				"Northern Cape",
				"North West",
				"Western Cape",
			],
			required: true,
		},
		mainImage: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "approved", "rejected", "sold"],
			default: "pending",
		},
		views: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("Listing", ListingSchema);
