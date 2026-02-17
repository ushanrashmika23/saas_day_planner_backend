const Task = require('../models/Task.model');

// CREATE - Add a new task
const createTask = async (req, res) => {
    try {
        const { title, description, completed, priority, tags, dueDate, dueTime, recurring, projectId } = req.body;
        const newTask = await Task.create({ title, description, completed, priority, tags, dueDate, dueTime, recurring, projectId, userId: req.user._id });
        res.status(201).json({ statusCode: 201, message: 'Task created successfully', data: newTask });
    } catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message, data: null });
    }
};

// READ - Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id }).populate('tags').populate('projectId').populate('userId');
        res.status(200).json({ statusCode: 200, message: 'Tasks retrieved successfully', data: tasks });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message, data: null });
    }
};

// READ - Get task by ID
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user._id }).populate('tags').populate('projectId').populate('userId');
        if (!task) return res.status(404).json({ statusCode: 404, message: 'Task not found', data: null });
        res.status(200).json({ statusCode: 200, message: 'Task retrieved successfully', data: task });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message, data: null });
    }
};

// UPDATE - Update a task
const updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, { new: true });
        if (!task) return res.status(404).json({ statusCode: 404, message: 'Task not found', data: null });
        res.status(200).json({ statusCode: 200, message: 'Task updated successfully', data: task });
    } catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message, data: null });
    }
};

// DELETE - Delete a task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!task) return res.status(404).json({ statusCode: 404, message: 'Task not found', data: null });
        res.status(200).json({ statusCode: 200, message: 'Task deleted successfully', data: null });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message, data: null });
    }
};

module.exports = { createTask, getAllTasks, getTaskById, updateTask, deleteTask };