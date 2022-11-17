const express = require('express');
const authController = require('../controller/authController');
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authenticate, authController.getMe);
// router.patch(
//   '/updateUser',
//   authenticate,
//   upload.single('profileImage'),
//   authController.updateUser
// );

module.exports = router;
