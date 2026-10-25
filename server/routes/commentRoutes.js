const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Reply = require('../models/Reply');
const { protect } = require('../middleware/authMiddleware'); 

// Get all comments for a specific listing
router.get('/listing/:listingId', async (req, res) => {
    try {
        const comments = await Comment.find({ listing: req.params.listingId })
            .populate('author', 'name') // Pulls the author's name so the frontend doesn't just get an ID string
            .sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Post a new comment to a listing
router.post('/listing/:listingId', protect, async (req, res) => {
    try {
        const newComment = new Comment({
            listing: req.params.listingId,
            author: req.user.id,
            text: req.body.text
        });
        await newComment.save();
        await newComment.populate('author', 'name'); // Populate before sending back to frontend
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all replies for a specific comment
router.get('/:commentId/replies', async (req, res) => {
    try {
        const replies = await Reply.find({ comment: req.params.commentId })
            .populate('author', 'name')
            .sort({ createdAt: 1 }); // Oldest first usually makes sense for a reply thread
        res.json(replies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Post a reply to a comment
router.post('/:commentId/replies', protect, async (req, res) => {
    try {
        const newReply = new Reply({
            comment: req.params.commentId,
            author: req.user.id,
            text: req.body.text
        });
        await newReply.save();
        await newReply.populate('author', 'name');
        res.status(201).json(newReply);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;