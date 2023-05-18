const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Mining = require('../models/miningModel');
const User = require('../models/userModel');
var crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const cron = require('node-cron');

// Create new mining => /api/v1/mining/new
exports.startMining = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		return next(new ErrorHander('User not found', 404));
	}

	let id = crypto.randomBytes(13).toString('hex');
	const miningId = `M${id}`;

	const mining = await Mining.create({
		name: user.name,
		email: user.email,
		user_id: user._id,
		mining_id: miningId,
		is_free: true,
		is_active: true,
		is_started: true,
	});

	res.status(201).json({
		success: true,
		mining,
	});
});

// get logged in user mining details => /api/v1/mining/me
exports.getMyMining = catchAsyncErrors(async (req, res, next) => {
	const mining = await Mining.findOne({ user_id: req.user.id });
	// console.log(mining);
	res.status(200).json({
		success: true,
		mining,
	});
});

// call corn job every 30 seconds
cron
	.schedule('*/1 * * * *', async () => {
		const minings = await Mining.find({
			is_active: true,
		});

		for (let i = 0; i < minings.length; i++) {
			// find mining
			const mining = await Mining.findOne({ _id: minings[i]._id });
			mining.mining_profit += 0.000347222222;
			mining.free_mining_profit += 0.000347222222;
			await mining.save();
		}

		//console.log('cron job',);
	})
	.start();
