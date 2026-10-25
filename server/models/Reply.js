const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true }, // Connection to the parent comment
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true, trim: true, maxlength: 500 }
}, { timestamps: true });

module.exports = mongoose.model('Reply', ReplySchema);