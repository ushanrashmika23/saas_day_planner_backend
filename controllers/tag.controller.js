const Tags = require('../models/Tags.model');

// CREATE - Add a new tag
const createTag = async (req, res) => {
    try {
        const { name, color } = req.body;
        const newTag = await Tags.create({ name, color, userId: req.user._id });
        res.status(201).json({ statusCode: 201, message: 'Tag created successfully', data: newTag });
    } catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message, data: null });
    }
};

// READ - Get all tags
const getAllTags = async (req, res) => {
    try {
        const tags = await Tags.find({ userId: req.user._id }).populate('userId');
        // const tags = await Tags.find({ userId: req.user._id }).populate({ path: 'userId', select: '+password' });
        res.status(200).json({ statusCode: 200, message: 'Tags retrieved successfully', data: tags });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message, data: null });
    }
};

// READ - Get tag by ID
const getTagById = async (req, res) => {
    try {
        const tag = await Tags.findById(req.params.id).populate('userId');
        if (!tag) return res.status(404).json({ statusCode: 404, message: 'Tag not found', data: null });
        res.status(200).json({ statusCode: 200, message: 'Tag retrieved successfully', data: tag });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message, data: null });
    }
};

// UPDATE - Update a tag
const updateTag = async (req, res) => {
    try {
        const tag = await Tags.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tag) return res.status(404).json({ statusCode: 404, message: 'Tag not found', data: null });
        res.status(200).json({ statusCode: 200, message: 'Tag updated successfully', data: tag });
    } catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message, data: null });
    }
};

// DELETE - Delete a tag
const deleteTag = async (req, res) => {
    try {
        const tag = await Tags.findByIdAndDelete(req.params.id);
        if (!tag) return res.status(404).json({ statusCode: 404, message: 'Tag not found', data: null });
        res.status(200).json({ statusCode: 200, message: 'Tag deleted successfully', data: null });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message, data: null });
    }
};

module.exports = { createTag, getAllTags, getTagById, updateTag, deleteTag };