const user = require('../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret_key';

// Middleware to verify JWT token
exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access token missing' });
    }
    try {
        const decoded = jwt.verify(token, TOKEN_SECRET);
        const existingUser = await user.findById(decoded.id);
        if (!existingUser) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = existingUser; // Attach user to request object
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};