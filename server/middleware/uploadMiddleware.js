const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Hand Cloudinary API keys to account for the upload destination and authentication
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Routing rules
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'retro_rat_listings', // From what i know, Cloudinary will create this folder to keep things organized
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'], // Reject any other file types (like .exe or whatever)
        transformation: [{ width: 800, height: 800, crop: 'limit' }] // Compresses massive files automatically
    },
});

// Multer interceptor
const upload = multer({ storage: storage });

module.exports = upload;