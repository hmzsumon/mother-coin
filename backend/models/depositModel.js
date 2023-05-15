const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		name: {
			type: String,
		},
		phone: {
			type: String,
		},
		amount: {
			type: Number,
			required: [true, 'Amount is required'],
		},

		coin: {
			type: String,
			required: [true, 'Coin is required'],
			enum: ['mother', 'musd'],
		},

		method: {
			type: String,
		},

		wallet: {
			type: String,
			required: [true, 'Wallet is required'],
		},

		wallet_address: {
			type: String,
			required: [true, 'Wallet address is required'],
		},

		transactionId: {
			type: String,
		},
		status: {
			type: String,
			enum: ['pending', 'approved', 'rejected'],
			default: 'pending',
		},
		approvedAt: {
			type: Date,
		},
		approved_by: {
			type: String,
		},
		// rejected
		rejectedAt: {
			type: Date,
		},
		reason: {
			type: String,
		},
		rejected_by: {
			type: String,
		},
		update_by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Update',
		},
		is_rejected: {
			type: Boolean,
			default: false,
		},
		is_approved: {
			type: Boolean,
			default: false,
		},
		comment: {
			type: String,
			default: 'No comment',
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Deposit', depositSchema);
