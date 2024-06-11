const express = require('express');
const router = express.Router();
const userAuthMiddleware = require('../Middleware/userAuthMiddleware');
const userAuthController = require('../Controller/userAuthController');

router.post('/login', userAuthMiddleware.Login, userAuthController.userLogin);
router.post('/signup',userAuthMiddleware.Registration, userAuthController.UserRegister);
module.exports = router;
