const User = require('../models/User.model');

// Create new user
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json({ statusCode: 201, message: 'User created successfully', data: savedUser });
    } catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message, data: null });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ statusCode: 200, message: 'Users retrieved successfully', data: users });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message, data: null });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ statusCode: 404, message: 'User not found', data: null });
        }
        res.status(200).json({ statusCode: 200, message: 'User retrieved successfully', data: user });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message, data: null });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ statusCode: 404, message: 'User not found', data: null });
        }
        res.status(200).json({ statusCode: 200, message: 'User updated successfully', data: user });
    } catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message, data: null });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ statusCode: 404, message: 'User not found', data: null });
        }
        res.status(200).json({ statusCode: 200, message: 'User deleted successfully', data: null });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message, data: null });
    }
};
