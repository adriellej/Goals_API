
// Import the goal Schema
const Goal = require('../Models/goalModels');

// Import mongoose library
const mongoose = require('mongoose');


// Function to create a goal
const createGoal = async (req, res) => {
	try{
		// Destruct/Extract the title and description from the request body
		const { title, description } = req.body;

		// Check if the goal exists
		const goalExists = await Goal.findOne({ title: title });

		// Return an error message if the goal already exists
		if (goalExists) {
			return res.status(409).jsonp({ error: 'This goal alreaady exists.' });
		}

		// If not,
		// Create a goal
		const goal = await Goal.create({
			title: title,
			description: description
		})

		// Return and Display the details
		return res.status(200).json({
			_id: goal.id,
			title: goal.title,
			description: goal.description
		})
	}
	// Return the error if there is any
	catch (error) {
		return res.status(500).json({
			message: error.message,
			stack: error.stack
		})
	}
}

// Function to retrieve all the goals
const getGoals = async (req, res) => {

	try {
		// Retrieve all the goals
		// Exclude the specified elements through select()
		// Sort the goals in descending order
        const goals = await Goal.find({}).select('-createdAt -updatedAt -__v').sort({ createdAt: -1 });

        // Return an error if there are no goals found
        if (!goals) {
        	return res.status(400).json({ error: 'No goals found.' });
        }

        return res.status(200).json(goals);
	}
	catch (error) {
		return res.status(500).json({
			message: error.message,
			stack: error.stack
		})
	}

}

const getSpecificGoal = async (req, res) => {
	try {
		const { id } = req.params;

		// Check if the goal id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        const goal = await Goal.findById(id).select('-createdAt -updatedAt -__v');

        if (!goal) {
        	return res.status(400).json({ error: 'Goal not found' });
        }

        return res.status(200).json(goal);
	}
	catch (error) {
		return res.status(500).json({
			message: error.message,
			stack: error.stack
		})
	}
}

const updateGoal = async (req, res) => {
	try {
		const { id } = req.params;

		// Check if the goal id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        const updatedGoal = await Goal.findByIdAndUpdate(
        	{ _id: id },
        	{ ...req.body },
        	{ new: true }
        ).select('-createdAt -updatedAt -__v');

        if (!updatedGoal) {
        	return res.status(400).json({ error: 'Update failed' })
        }

        return res.status(200).json(updatedGoal);
	}
	catch (error) {
		return res.status(500).json({
			message: error.message,
			stack: error.stack
		})
	}
}

const deleteGoal = async (req, res) => {
	try {
		const { id } = req.params;

		// Check if the goal id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }

        const deletedGoal = await Goal.findByIdAndDelete(id).select('-createdAt -updatedAt -__v');

        if (!deletedGoal) {
        	return res.status(400).json({ error: 'Goal not found' })
        }

        return res.status(200).json({ message: 'The item is deleted successfully.' });
	}
	catch (error) {
		return res.status(500).json({
			message: error.message,
			stack: error.stack
		})
	}
}

module.exports = {
	createGoal,
	getGoals,
	getSpecificGoal,
	updateGoal,
	deleteGoal
}