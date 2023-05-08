const express = require('express');
const multer = require('multer');
const {
	seedUser,
	registerUser,
	loginUser,
	adminLogin,
	logout,
	verifyEmail,
	resendEmailVerificationCode,
	loadUser,
	getUserByPhone,
	getMembers,
	getAllUser,
	getSingleUserAdmin,
	forgotPassword,
	resetPassword,
} = require('../controllers/userController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');
const User = require('../models/userModel');

const router = express.Router();

const upload = multer({});

router.route('/seed/user').get(seedUser);

router.route('/register').post(upload.none(), registerUser);

router.route('/login').post(upload.none(), loginUser);

// admin login
router.route('/admin/login').post(upload.none(), adminLogin);

router.route('/logout').put(logout);

// verify email
router.route('/verify-email/with-code').post(upload.none(), verifyEmail);

// resend email verification code
router
	.route('/resend-email-verification-code')
	.post(resendEmailVerificationCode);

// load user
router.route('/load-user').get(isAuthenticatedUser, loadUser);

// get user by phone
router.route('/user').get(getUserByPhone);

// get members
router.route('/members').get(isAuthenticatedUser, getMembers);

// get all user
router.route('/all-user').get(isAuthenticatedUser, getAllUser);

// get single user admin
router
	.route('/single-user-admin/:id')
	.get(isAuthenticatedUser, authorizeRoles('admin'), getSingleUserAdmin);

// forgot password
router.route('/forgot-password').post(upload.none(), forgotPassword);

// reset password
router.route('/password/reset').post(upload.none(), resetPassword);

module.exports = router;
