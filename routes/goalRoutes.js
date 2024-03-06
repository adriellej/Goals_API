
const router = require('express').Router();

// Import the functions from controllers
const { createGoal, getGoals, getSpecificGoal, updateGoal, deleteGoal } = require ('../controllers/goalControllers');

// router to create a goal
router.post('/create', createGoal);

// router to retrieve all the goals
router.get('/allGoals', getGoals);

// router to retrieve a specific goal, update, and delete
router.route('/goal/:id').get(getSpecificGoal).put(updateGoal).delete(deleteGoal);


// Export the router
module.exports = router;