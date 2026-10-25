const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  recipient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    index: true  // we gonna query by recipient constantly
  },
  type: { 
    type: String, 
    required: true,
    enum: [
      'listing_approved',     // admin approved your listing
      'listing_rejected',     // admin rejected your listing
      'new_comment',          // someone commented on your listing
      'new_review',           // someone reviewed you as a seller
      'listing_sold'          // idk if we will get around to this ngl but we gonna have this in case
    ]
  },
  message: { 
    type: String, 
    required: true, 
    maxlength: 200 
  },
  link: { 
    type: String,
    default: ''  // reference to a certain product the notification is tied to
  },
  relatedListing: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Listing'
    // OPTIONAL : NOT EVERY NOTI HAS A LISTING
  },
  triggeredBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
    // OPTIONAL : who caused the notification (the commenter or reviewer or whatever)
  },
  isRead: { 
    type: Boolean, 
    default: false,
    index: true  // for the number badge on the accounts text in the navbar
  },
}, { timestamps: true });

// COMPOUND INDEX
NotificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 }); // we want the unread first by newest noti

module.exports = mongoose.model('Notification', NotificationSchema);