const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { verifyToken } = require('../middlewares/authenticate.middleware');
const authorizeRoles = require('../middlewares/authorize.middleware');
const isActiveUser = require('../middlewares/isActiveUser.middleware');

router.use(verifyToken);
router.use(authorizeRoles('user', 'pro', 'admin')); // Allow all authenticated users to access project routes
router.use(isActiveUser);

// Create new project
router.post('/', projectController.createProject);
// Get all projects
router.get('/', projectController.getAllProjects);
// Get project by ID
router.get('/:id', projectController.getProjectById);
// Update project
router.put('/:id', projectController.updateProject);
// Delete project
router.delete('/:id', projectController.deleteProject);

module.exports = router;