const user = require('../models/User.model');
const generateToken = require('../utils/tokenGenerator');
const bcrypt = require('bcryptjs');
const { encode, decode } = require('../utils/verificationEncryptation');
const sendEmail = require('../utils/sendEmail');
const verificationTemplate = require('../utils/templates/verification');

const TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret_key';

//TODO: get user id to logout from the middleware

// User registration
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ statusCode: 400, message: 'Email already in use', data: null });
        }

        const existingUsername = await user.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ statusCode: 400, message: 'Username already in use', data: null });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const newUser = new user({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ statusCode: 201, message: 'User registered successfully', data: null });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
    }
}

// Validate token
exports.validateToken = async (req, res) => {
    try {
        // If the request reaches here, the token is valid (verified by middleware)
        res.status(200).json({
            statusCode: 200,
            message: 'Token is valid',
            isValid: true,
            user: {
                id: req.user._id,
                email: req.user.email,
                username: req.user.username,
                firstName: req.user.firstName,
                lastName: req.user.lastName
            }
        });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: 'Internal server error', isValid: false });
    }
}

// User login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await user.findOne({ email }).select('+password +accessToken');
        if (!existingUser) {
            return res.status(401).json({ statusCode: 401, message: 'Invalid email or password', data: null });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ statusCode: 401, message: 'Invalid email or password', data: null });
        }

        const token = generateToken(existingUser);

        existingUser.accessToken = token;
        existingUser.lastLogin = new Date();
        await existingUser.save();

        res.status(200).json({ statusCode: 200, message: 'Login successful', data: { token, user: existingUser } });

    } catch (error) {
        res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
    }
}

// set user active
//TODO: verify the otp and instant null the field after verification
exports.setActive = async (req, res) => {
    try {
        const userId = req.user.id;
        const otp = req.body.otp;
        const existingUser = await user.findById(userId).select('+otp');
        if (!existingUser) {
            return res.status(404).json({ statusCode: 404, message: 'User not found', data: null });
        }
        if (!existingUser.otp || otp !== existingUser.otp) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid OTP', data: null });
        }

        existingUser.otp = null;
        existingUser.isActive = true;
        await existingUser.save();
        res.status(200).json({ statusCode: 200, message: 'User set to active successfully', data: null });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
    }
}

// set user inactive
exports.setInactive = async (req, res) => {
    try {
        const userId = req.user.id;
        const existingUser = await user.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ statusCode: 404, message: 'User not found', data: null });
        }
        existingUser.isActive = false;
        await existingUser.save();
        res.status(200).json({ statusCode: 200, message: 'User set to inactive successfully', data: null });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
    }
}

// Check username availability
exports.checkUsername = async (req, res) => {
    try {
        const { username } = req.query;
        const existingUser = await user.findOne({ username });
        if (existingUser) {
            return res.status(200).json({ statusCode: 200, message: 'Username is already taken', data: { available: false } });
        }
        res.status(200).json({ statusCode: 200, message: 'Username is available', data: { available: true } });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
    }
}

// User logout
exports.logout = async (req, res) => {
    try {
        const userId = req.user.id;
        const existingUser = await user.findById(userId).select('+accessToken');
        if (!existingUser) {
            return res.status(404).json({ statusCode: 404, message: 'User not found', data: null });
        }
        existingUser.accessToken = null;
        await existingUser.save();
        res.status(200).json({ statusCode: 200, message: 'User logged out successfully', data: null });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
    }
}

// Generate new otp
//TODO: send otp to user email instead of response
exports.sendOtp = async (req, res) => {
    try {
        const userEmail = req.body.email;
        const existingUser = await user.findOne({ email: userEmail });
        if (!existingUser) {
            return res.status(404).json({ statusCode: 404, message: 'User not found', data: null });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        existingUser.otp = otp;
        existingUser.otpExpiry = Date.now() + 10 * 60 * 1000;
        await existingUser.save();
        const data = { email: existingUser.email, otp };
        const encryptedData = encode(data);
        await sendEmail(existingUser.email, 'Verify Your Email', '', verificationTemplate(existingUser.firstName, `${process.env.FRONTEND_URL}/?code=${encryptedData}`));
        res.status(200).json({ statusCode: 200, message: 'OTP generated and sent successfully', data: { otp } });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
    }
}

exports.verifyEmail = async (req, res) => {
    try {
        const { code } = req.query;
        const decryptedData = decode(code);
        const existingUser = await user.findOne({ email: decryptedData.email }).select('+otp +otpExpiry');
        if (!existingUser) {
            return res.status(404).json({ statusCode: 404, message: 'User not found', data: null });
        }
        if (existingUser.otp !== decryptedData.otp) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid or expired OTP', data: null });
        }

        const token = generateToken(existingUser);

        existingUser.accessToken = token;
        existingUser.lastLogin = new Date();

        existingUser.otp = null;
        existingUser.otpExpiry = null;
        existingUser.isActive = true;
        await existingUser.save();
        res.status(200).json({ statusCode: 200, message: 'Email verified successfully', data: { user: existingUser } });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: 'Internal server error', data: null });
    }
}