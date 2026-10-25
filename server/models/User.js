const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //hashing things

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 50,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			match: [/^\S+@\S+\.\S+$/, "Invalid email format"], //ensure correct email format
		},
		musicalHash: {
			type: String,
			required: true,
			select: false, // never returned in queries unless we specifically ask it to (security stuff)
		},
		profilePicture: {
			type: String,
			default: "", //empty string = use default avatar on frontend
		},
		isAdmin: {
			type: Boolean,
			default: false,
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
		shippingOptions: {
			type: [String],
			enum: ["local_pickup", "domestic", "international"],
			default: [],
		},
	},
	{ timestamps: true },
);

//hash password automatically before saving
//only runs if passwordHash was modified (so when updating other fields doesn't re-hash)
// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('passwordHash')) return next();
//   this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
//   next();
// });

// //compare a plaintext password against the stored hash
// UserSchema.methods.comparePassword = function(plainPassword) {
//   return bcrypt.compare(plainPassword, this.passwordHash);
// };

module.exports = mongoose.model("User", UserSchema);
