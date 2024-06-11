const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../Middleware/adminAuthMiddleware');
const adminAuthController = require('../Controller/adminAuthController');

router.post('/login', adminAuthMiddleware, adminAuthController.adminLogin);

module.exports = router;
