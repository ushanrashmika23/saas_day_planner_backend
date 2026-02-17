const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/authenticate.middleware');
const authorizeRoles = require('../middlewares/authorize.middleware');
const isActiveUser = require('../middlewares/isActiveUser.middleware');

router.use(verifyToken);
router.use(authorizeRoles('admin')); // Only allow admin users to access user routes
router.use(isActiveUser);

// Create new user
router.post('/', userController.createUser);
// Get all users
router.get('/', verifyToken, userController.getAllUsers);
// Get user by ID
router.get('/:id', userController.getUserById);
// Update user
router.put('/:id', userController.updateUser);
// Delete user
router.delete('/:id', userController.deleteUser);

module.exports = router;
