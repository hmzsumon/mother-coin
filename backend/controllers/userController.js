const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const WithdrawDetails = require('../models/withdrawDetailsModel');
const DepositDetails = require('../models/depositDetails');
const LotteryDetails = require('../models/lotteryDetails');
const ConvertDetails = require('../models/convertDetails');
const SendDetails = require('../models/sendDetails');
const LuckyBox = require('../models/luckyBoxModel');

const sendToken = require('../utils/jwtToken');
const { sendEmail } = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

const getCurrentPrice = require('../utils/currentPrice');

const createTransaction = require('../utils/tnx');
const { v4: uuidv4 } = require('uuid');

const Company = require('../models/companyModel');
const companyId = process.env.COMPANY_ID;

//======================================
//seed user => /api/v1/seed/user
//======================================
const users = [
	{
		name: 'Mother Coin',
		email: 'motherwallet8@gmail.com',
		phone: '+971561791590',
		password: 'Mother2244',
		role: 'user',
		email_verification: true,
	},
	{
		name: 'Zakaria Admin',
		email: 'admin@gamil.com',
		phone: '01757454531',
		password: 'Su112200',
		role: 'admin',
		email_verification: true,
	},
];
exports.seedUser = catchAsyncErrors(async (req, res, next) => {
	// cerate user 12 digit customer id

	for (let i = 0; i < users.length; i++) {
		const random_cid = uuidv4().toString().replace(/-/g, '').substring(0, 12);
		const customer_id = `MID${random_cid}`;

		// create mother coin address
		const random_address1 = uuidv4().toString().replace(/-/g, '');
		const random_address2 = uuidv4()
			.toString()
			.replace(/-/g, '')
			.substring(0, 31);
		const mother_coin_address = `M${random_address1}`;
		const musd_address = `MU${random_address2}`;
		console.log('mc', mother_coin_address.length);
		console.log('mu', musd_address.length);

		const user = await User.create({
			name: users[i].name,
			email: users[i].email,
			phone: users[i].phone,
			password: users[i].password,
			role: users[i].role,
			customer_id,
			mother_coin_address,
			musd_address,
			email_verification: users[i].email_verification,
		});
	}

	res.status(200).json({
		success: true,
		message: 'User created successfully',
	});
});

//======================================
// Register a user => /api/v1/register
//======================================

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
	const referral_id = req.query.referral_id;

	// console.log(req.query);

	// find sponsor
	const sponsor = await User.findById(referral_id);
	if (!sponsor) {
		return next(new ErrorHander('Invalid referral id', 400));
	}

	// find company
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('Company not found', 400));
	}

	// cerate user 12 digit customer id
	function generateUniqueId() {
		const timestamp = new Date().getTime().toString();
		const random = Math.floor(Math.random() * 100000000)
			.toString()
			.padStart(8, '0');
		return timestamp + random;
	}
	const mother_id = generateUniqueId().substring(0, 12);
	// check if mother id already exists

	const random_num2 = uuidv4().toString().replace(/-/g, '').substring(0, 32);
	const mother_coin_address = `M${random_num2}`;

	const random_num3 = uuidv4().toString().replace(/-/g, '').substring(0, 31);
	const musd_address = `MU${random_num3}`;

	const { name, email, password, phone, userId, country } = req.body;

	// unique phone number validation
	const ex_user_phone = await User.findOne({ phone });
	if (ex_user_phone) {
		return next(new ErrorHander('Phone number already exists', 400));
	}

	// check if userid already exists
	// const ex_userId = await User.findOne({ user_id: userId });
	// if (ex_userId) {
	// 	return next(new ErrorHander('User id already exists', 400));
	// }

	// 6 digit verification code
	const verify_code = Math.floor(100000 + Math.random() * 900000);

	const user = await User.create({
		name,
		user_id: userId,
		email,
		phone,
		password,
		sponsor: {
			sponsor_id: sponsor._id,
			sponsor_name: sponsor.name,
		},
		mother_id,
		mother_coin_address,
		musd_address,
		address: {
			country,
		},
		email_verify_code: verify_code,
		signup_bonus: 5,
		usd_balance: 5,
		mc_balance: 5,
	});

	// create withdraw details
	await WithdrawDetails.create({
		user_id: user._id,
		name: user.name,
	});

	// create deposit details
	await DepositDetails.create({
		user_id: user._id,
		name: user.name,
	});

	// update company
	company.users.total_users += 1;
	company.users.new_users += 1;
	await company.save();

	// updae sponsor members
	sponsor.members.push(user._id);
	sponsor.sponsor_bonus += 1;
	sponsor.b_balance += 1;
	await sponsor.save();

	// send verify code to user email
	sendEmail({
		email: user.email,
		subject: 'Mother Coin Verification Code',
		message: `Dear ${user.name},\n\nYour verification code is ${verify_code}`,
	});

	res.status(201).json({
		success: true,
		message: 'User registered successfully',
		user,
	});
});

//======================================
// Login user => /api/v1/login
//======================================

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorHander('Please enter phone number and password', 400));
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorHander('Invalid phone number or password', 401));
	}

	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHander('Invalid phone number or password', 401));
	}
	// check if user is email verified
	if (user.email_verified === false) {
		return next(new ErrorHander('Please verify your email', 405));
	}

	// find company
	const company = await Company.findById(companyId).select(
		'-lottery -convert -withdraw -deposit -lucky_box -cost -income -verify -notifications'
	);
	if (!company) {
		return next(new ErrorHander('Company not found', 400));
	}

	// update company
	company.users.logged_in_users += 1;
	await company.save();

	sendToken(user, 200, res);
});

//======================================
// admin login => /api/v1/admin/login
//======================================

exports.adminLogin = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorHander('Please enter email and password', 400));
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorHander('Invalid email or password', 401));
	}

	// check if user is admin
	if (user.role !== 'admin') {
		return next(new ErrorHander("You're not an admin", 401));
	}

	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return next(new ErrorHander('Invalid email or password', 401));
	}

	sendToken(user, 200, res);
});

//======================================
// Logout User
//======================================
exports.logout = catchAsyncErrors(async (req, res, next) => {
	res.cookie('token', null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	// find company
	const company = await Company.findById(companyId).select(
		'-lottery -convert -withdraw -deposit -lucky_box -cost -income -verify -notifications'
	);

	if (!company) {
		return next(new ErrorHander('Company not found', 400));
	}

	// update company
	if (company.users.logged_in_users > 0) {
		company.users.logged_in_users -= 1;
		await company.save();
	}

	res.status(200).json({
		success: true,
		message: 'Logged Out',
	});
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	// Get ResetPassword Token
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	const resetPasswordUrl = `${req.protocol}://${req.get(
		'host'
	)}/password/reset/${resetToken}`;

	const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'Password Recovery',
			message,
		});

		res.status(200).json({
			success: true,
			message: `Email sent to ${user.email} successfully`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorHander(error.message, 500));
	}
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
	// creating token hash
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.body.token)
		.digest('hex');

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(
			new ErrorHander(
				'Reset Password Token is invalid or has been expired',
				400
			)
		);
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHander('Password does not password', 400));
	}

	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	res.status(200).json({
		success: true,
		user,
	});
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');

	const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

	if (!isPasswordMatched) {
		return next(new ErrorHander('Old password is incorrect', 400));
	}

	if (req.body.newPassword !== req.body.confirmPassword) {
		return next(new ErrorHander('password does not match', 400));
	}

	user.password = req.body.newPassword;

	await user.save();

	sendToken(user, 200, res);
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
	};

	if (req.body.avatar !== '') {
		const user = await User.findById(req.user.id);

		const imageId = user.avatar.public_id;

		await cloudinary.v2.uploader.destroy(imageId);

		const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
			folder: 'avatars',
			width: 150,
			crop: 'scale',
		});

		newUserData.avatar = {
			public_id: myCloud.public_id,
			url: myCloud.secure_url,
		};
	}

	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
	});
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();

	let newUsers = [];
	users.forEach((user) => {
		newUsers.push({
			_id: user._id,
			name: user.name,
			phone: user.phone,
			email: user.email,
			role: user.role,
			createdAt: user.createdAt,
			is_active: user.is_active,
			email_verified: user.email_verified,
			balance: {
				m: user.m_balance,
				b: user.b_balance,
				w: user.w_balance,
			},
		});
	});

	res.status(200).json({
		success: true,
		users: newUsers,
	});
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(
			new ErrorHander(`User does not exist with Id: ${req.params.id}`)
		);
	}

	res.status(200).json({
		success: true,
		user,
	});
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
		active_status: req.body.active_status,
		balance: req.body.balance,
		pxc_balance: req.body.pxc_balance,
	};

	await User.findByIdAndUpdate(req.params.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
	});
});

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(
			new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
		);
	}

	if (user.avatar.public_id) {
		const imageId = user.avatar.public_id;
		await cloudinary.v2.uploader.destroy(imageId);
	}

	await user.remove();

	res.status(200).json({
		success: true,
		message: 'User Deleted Successfully',
	});
});

// find user by phone number
exports.findUserByPhoneNumber = catchAsyncErrors(async (req, res, next) => {
	const user = await User.find({ phone: req.body.phone });

	if (!user) {
		return next(
			new ErrorHander(
				`User does not exist with phone number: ${req.body.phone_number}`,
				400
			)
		);
	}

	res.status(200).json({
		success: true,
		user,
	});
});

// find user by mother_coin_address
exports.findUserByMotherCoinAddress = catchAsyncErrors(
	async (req, res, next) => {
		console.log(req.query);
		const user = await User.find({ mother_coin_address: req.query.address });

		if (!user) {
			return next(
				new ErrorHander(
					`User does not exist with mother coin address: ${req.query}`,
					400
				)
			);
		}

		res.status(200).json({
			success: true,
			user,
		});
	}
);

// verify email address with code
exports.verifyEmail = catchAsyncErrors(async (req, res, next) => {
	// find company
	const company = await Company.findById(companyId);
	if (!company) {
		return next(new ErrorHander('Company not found', 404));
	}
	const { code, email } = req.body;
	console.log(req.body);
	const user = await User.findOne({ email });
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}
	if (user.email_verified === true) {
		return next(new ErrorHander('Email already verified', 400));
	}
	if (user.email_verify_code !== code) {
		return next(new ErrorHander('Invalid code', 400));
	}

	user.email_verified = true;
	user.email_verify_code = null;
	await user.save();
	// console.log(user.is_newUser);
	company.users.email_verified_users += 1;
	await company.save();

	sendToken(user, 200, res);
});

// resend email verification code
exports.resendEmailVerificationCode = catchAsyncErrors(
	async (req, res, next) => {
		const { email } = req.query;
		console.log(email);
		const user = await User.findOne({ email });
		if (!user) {
			return next(new ErrorHander('User not found', 404));
		}

		const code = Math.floor(100000 + Math.random() * 900000);
		user.email_verify_code = code;
		await user.save();

		const message = `Your verification code is ${code}`;
		sendEmail({
			email: user.email,
			subject: 'Email Verification Code',
			message,
		});

		res.status(200).json({
			success: true,
			message: 'Email verification code sent successfully',
		});
	}
);

// get logged in user details
exports.loadUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	res.status(200).json({
		success: true,
		user,
	});
});

// get user by phone
exports.getUserByPhone = catchAsyncErrors(async (req, res, next) => {
	const { phone } = req.query;
	// find user
	const user = await User.findOne({ phone });
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	res.status(200).json({
		success: true,
		user,
	});
});

// get logged in user members
exports.getMembers = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	// find members with sponsor.sponsor_id
	const members = await User.find({ 'sponsor.sponsor_id': user._id });
	if (!members) {
		return next(new ErrorHander('Members not found', 404));
	}
	// console.log(members.length);

	let newMembers = [];
	members.forEach((member) => {
		newMembers.push({
			_id: member._id,
			name: member.name,
			phone: member.phone,
			email: member.email,
			is_active: member.is_active,
			join_date: member.createdAt,
		});
	});

	res.status(200).json({
		success: true,
		members: newMembers,
	});
});

// get single user details for admin
exports.getSingleUserAdmin = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	// find convert details
	const convertDetails = await ConvertDetails.findOne({
		user_id: user._id,
	});

	// find deposit details
	const depositDetails = await DepositDetails.findOne({ user_id: user._id });

	// find withdraw details
	const withdrawDetails = await WithdrawDetails.findOne({ user_id: user._id });

	// find lottery details
	const lotteryDetails = await LotteryDetails.findOne({ user_id: user._id });

	// find send details
	const sendDetails = await SendDetails.findOne({ user_id: user._id });

	res.status(200).json({
		success: true,
		user,
		convertDetails,
		depositDetails,
		withdrawDetails,
		lotteryDetails,
		sendDetails,
	});
});

// send mother coin to user
exports.sendMotherCoin = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}
	const { amount, address } = req.body;
	const numAmount = Number(amount);
	const price = await getCurrentPrice();
	const sender = await User.findById(req.user.id);
	if (!sender) {
		return next(new ErrorHander('User not found', 404));
	}

	// find receiver
	const receiver = await User.findOne({ mother_coin_address: address });
	if (!receiver) {
		return next(new ErrorHander('Receiver not found', 404));
	}

	// check if sender has enough balance
	if (sender.usd_balance < numAmount) {
		return next(new ErrorHander('Insufficient balance', 400));
	}

	const mc = numAmount / price;
	console.log(mc);

	//update sender balance
	sender.usd_balance -= numAmount;
	sender.mc_balance -= mc;
	createTransaction(
		sender._id,
		'cashOut',
		numAmount,
		'Send mother coin',
		`Sent ${numAmount} mother coin to ${receiver.name}`
	);
	await sender.save();

	// update receiver balance
	receiver.usd_balance += numAmount;
	receiver.mc_balance += mc;
	createTransaction(
		receiver._id,
		'cashIn',
		amount,
		'Received mother coin',
		`Received ${numAmount} mother coin from ${sender.name}`
	);
	await receiver.save();

	// send email to receiver
	const message = `You have received ${numAmount} mother coin from ${sender.name}`;

	res.status(200).json({
		success: true,
		message: 'Mother coin sent successfully',
	});
});

//send musd
exports.sendMusd = catchAsyncErrors(async (req, res, next) => {
	const { amount, address } = req.body;
	const numAmount = Number(amount);
	const price = await getCurrentPrice();
	const sender = await User.findById(req.user.id);
	if (!sender) {
		return next(new ErrorHander('User not found', 404));
	}

	// find receiver
	const receiver = await User.findOne({ musd_address: address });
	if (!receiver) {
		return next(new ErrorHander('Receiver not found', 404));
	}

	// check if sender has enough balance
	if (sender.musd_balance < numAmount) {
		return next(new ErrorHander('Insufficient balance', 400));
	}

	//update sender balance
	sender.musd_balance -= numAmount;
	createTransaction(
		sender._id,
		'cashOut',
		numAmount,
		'Send mother coin',
		`Sent ${numAmount} mother coin to ${receiver.name}`
	);
	await sender.save();

	// update receiver balance
	receiver.musd_balance += numAmount;
	createTransaction(
		receiver._id,
		'cashIn',
		amount,
		'Received mother coin',
		`Received ${numAmount} mother coin from ${sender.name}`
	);
	await receiver.save();

	// send email to receiver
	const message = `You have received ${numAmount} mother coin from ${sender.name}`;

	res.status(200).json({
		success: true,
		message: 'Mother coin sent successfully',
	});
});

// update address
exports.updateAddress = catchAsyncErrors(async (req, res, next) => {
	const { address, city, state, zip } = req.body;
	if (!address || !city || !state || !zip) {
		return next(new ErrorHander('Please enter all fields', 400));
	}
	const user = await User.findById(req.user.id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}
	user.address.address_line1 = address;
	user.address.city = city;
	user.address.state = state;
	user.address.postcode = zip;
	user.address.is_full = true;
	await user.save();

	res.status(200).json({
		success: true,
		message: 'Address updated',
		user: user,
	});
});
