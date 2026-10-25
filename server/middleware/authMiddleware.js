const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check if the request has an authorization header formatted as "Bearer <token>"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Split "Bearer sf83j..." to grab just the token string
            token = req.headers.authorization.split(' ')[1];

            // Verify the token's signature using your secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // (!!! TEMPORARY !!!) Fetch the user from the database (minus the password) and attach it to the request 
            req.user = await User.findById(decoded.id).select('-password');

            // Move on to the actual controller
            next();
        } catch (error) {
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ error: 'Not authorized, no token provided' });
    }
};

module.exports = { protect };