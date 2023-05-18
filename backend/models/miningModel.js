const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const miningSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			require: true,
		},
		mining_id: {
			type: String,
		},
		mining_profit: {
			type: Number,
			default: 0,
		},
		free_mining_profit: {
			type: Number,
			default: 0,
		},
		status: {
			type: String,
			default: 'free',
		},
		is_free: {
			type: Boolean,
			default: false,
		},
		is_active: {
			type: Boolean,
			default: false,
		},
		created_at: {
			type: Date,
			default: Date.now,
		},
		end_at: {
			type: Date,
		},
		is_started: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const Mining = mongoose.model('Mining', miningSchema);

module.exports = Mining;
