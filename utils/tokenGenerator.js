const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET || 'access_secret_key',
        { expiresIn: '3d' }
    );
}

module.exports = generateToken;