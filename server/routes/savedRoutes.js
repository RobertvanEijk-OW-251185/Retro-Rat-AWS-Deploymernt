const express = require('express');
const router = express.Router();
const savedController = require('../controllers/savesController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, savedController.getSaved);
router.get('/ids', protect, savedController.getSavedIds);
router.post('/toggle/:listingId', protect, savedController.toggleSaved);

module.exports = router;