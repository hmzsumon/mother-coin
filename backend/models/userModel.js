const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { type } = require('os');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please Enter Your Name'],
			maxLength: [30, 'Name cannot exceed 30 characters'],
			minLength: [3, 'Name should have more than 4 characters'],
		},
		email: {
			type: String,
			required: [true, 'Please Enter Your Email'],
			unique: true,
			validate: [validator.isEmail, 'Please Enter a valid Email'],
		},
		phone: {
			type: String,
			unique: true,
			minLength: [10, 'Phone number should have 10 characters'],
			maxLength: [14, 'Phone number should have 10 characters'],
			required: [true, 'Please Enter Your Phone Number'],
			trim: true,
		},
		user_id: {
			type: String,
			unique: true,
			trim: true,
			minLength: [6, 'User Id should have 6 characters'],
		},

		mother_id: {
			type: String,
			trim: true,
		},

		mother_coin_address: {
			type: String,
		},

		musd_address: {
			type: String,
		},

		password: {
			type: String,
			required: [true, 'Please Enter Your Password'],
			minLength: [6, 'Password should be greater than 6 characters'],
			select: false,
		},
		six_digit_pin: {
			type: Number,
			length: [6, 'Pin should be 6 digits'],
		},
		avatar: {
			public_id: {
				type: String,
			},
			url: {
				type: String,
			},
		},
		role: {
			type: String,
			enum: [
				'user',
				'admin',
				'super-admin',
				'moderator',
				'support',
				'agent',
				'manager',
			],
			default: 'user',
		},

		address: {
			address_line1: {
				type: String,
			},
			address_line2: {
				type: String,
			},
			country: {
				type: String,
				trim: true,
			},
			city: {
				type: String,
				trim: true,
			},

			State: {
				type: String,
				trim: true,
			},
			postcode: {
				type: String,
				trim: true,
			},
		},

		// usd balance
		usd_balance: {
			type: Number,
			default: 0,
		},

		// mother coin balance
		mc_balance: {
			type: Number,
			default: 0,
		},

		// musd balance
		musd_balance: {
			type: Number,
			default: 0,
		},
		// withdraw
		w_balance: {
			type: Number,
			default: 0,
		},
		is_withdraw_request: {
			type: Boolean,
			default: false,
		},

		// total bonus
		b_balance: {
			type: Number,
			default: 0,
		},

		// sponsor bonus
		sponsor_bonus: {
			type: Number,
			default: 0,
		},

		//signup bonus
		signup_bonus: {
			type: Number,
			default: 0,
		},

		//winning balance
		winning_balance: {
			type: Number,
			default: 0,
		},

		total_receive_amount: {
			type: Number,
			default: 0,
		},

		referral_code: {
			type: String,
		},

		// email verification
		email_verify_code: {
			type: String,
		},
		email_verified: {
			type: Boolean,
			default: false,
		},
		is_kyc: {
			type: Boolean,
			default: false,
		},
		is_verify_request: {
			type: Boolean,
			default: false,
		},
		is_active: {
			type: Boolean,
			default: true,
		},
		address_verified: {
			type: Boolean,
			default: false,
		},

		sponsor: {
			sponsor_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
			sponsor_name: {
				type: String,
			},
		},
		members: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		notifications: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Notification',
			},
		],
		conversations: [],
		QRCode: {
			type: String,
		},
		is_newUser: {
			type: Boolean,
			default: true,
		},

		resetPasswordToken: String,
		resetPasswordExpire: Date,
	},
	{
		timestamps: true,
	}
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
	// Generating Token
	const resetToken = crypto.randomBytes(20).toString('hex');

	// Hashing and adding resetPasswordToken to userSchema
	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

	return resetToken;
};

module.exports = mongoose.model('User', userSchema);
