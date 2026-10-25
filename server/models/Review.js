const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  reviewer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  seller: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: 'Rating must be a whole number 1-5'
    }
  },
  text: { 
    type: String, 
    trim: true, 
    maxlength: 1000,
    default: ''
  },
}, { timestamps: true });

//no spam reviews
ReviewSchema.index({ reviewer: 1, seller: 1 }, { unique: true });

//prevent self-reviews (you should probably do this on the frontend but ima do it here again too)
ReviewSchema.pre('validate', function(next) {
  if (this.reviewer.equals(this.seller)) {
    return next(new Error('Cannot review yourself'));
  }
  next();
});

module.exports = mongoose.model('Review', ReviewSchema);