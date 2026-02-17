const Project = require('../models/Project.model');

// CREATE - Add a new project
//TODO: get userId from auth middleware instead of request body
const createProject = async (req, res) => {
    try {
        const { name, color } = req.body;
        const newProject = await Project.create({ name, color, userId: req.user._id });
        res.status(201).json({ statusCode: 201, message: 'Project created successfully', data: newProject });
    } catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message, data: null });
    }
};

// READ - Get all projects
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.user._id }).populate('userId');
        res.status(200).json({ statusCode: 200, message: 'Projects retrieved successfully', data: projects });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message, data: null });
    }
};

// READ - Get project by ID
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('userId');
        if (!project) return res.status(404).json({ statusCode: 404, message: 'Project not found', data: null });
        res.status(200).json({ statusCode: 200, message: 'Project retrieved successfully', data: project });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message, data: null });
    }
};

// UPDATE - Update a project
const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) return res.status(404).json({ statusCode: 404, message: 'Project not found', data: null });
        res.status(200).json({ statusCode: 200, message: 'Project updated successfully', data: project });
    } catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message, data: null });
    }
};

// DELETE - Delete a project
const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ statusCode: 404, message: 'Project not found', data: null });
        res.status(200).json({ statusCode: 200, message: 'Project deleted successfully', data: null });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message, data: null });
    }
};

module.exports = { createProject, getAllProjects, getProjectById, updateProject, deleteProject };