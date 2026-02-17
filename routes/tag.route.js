const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag.controller');
const { verifyToken } = require('../middlewares/authenticate.middleware');
const authorizeRoles = require('../middlewares/authorize.middleware');
const isActiveUser = require('../middlewares/isActiveUser.middleware');

router.use(verifyToken);
router.use(authorizeRoles('user', 'pro', 'admin')); // Allow all authenticated users to access tag routes
router.use(isActiveUser);

// Create new tag
router.post('/', tagController.createTag);
// Get all tags
router.get('/', tagController.getAllTags);
// Get tag by ID
router.get('/:id', tagController.getTagById);
// Update tag
router.put('/:id', tagController.updateTag);
// Delete tag
router.delete('/:id', tagController.deleteTag);

module.exports = router;