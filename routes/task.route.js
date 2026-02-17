const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { verifyToken } = require('../middlewares/authenticate.middleware');
const authorizeRoles = require('../middlewares/authorize.middleware');
const isActiveUser = require('../middlewares/isActiveUser.middleware');

router.use(verifyToken);
router.use(authorizeRoles('user', 'pro', 'admin')); // Allow all authenticated users to access task routes
router.use(isActiveUser);

// Create new task
router.post('/', taskController.createTask);
// Get all tasks
router.get('/', taskController.getAllTasks);
// Get task by ID
router.get('/:id', taskController.getTaskById);
// Update task
router.put('/:id', taskController.updateTask);
// Delete task
router.delete('/:id', taskController.deleteTask);

module.exports = router;