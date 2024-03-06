const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		completed: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);

module.exports = new mongoose.model('Goal', goalSchema);