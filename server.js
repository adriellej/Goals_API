// Import necessary modules
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const goalRoutes = require('./routes/goalRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

// Function to connect to MongoDB database
const connectDB = async () => {
    try {
        // Connect to MongoDB using the provided URI
		const conn = await mongoose.connect(process.env.MONGO_URI);
		// Log a successful connection
		console.log(`MongoDB Connected: ${conn.connection.host}`);

		// Start the server listening on the specified port
		app.listen(PORT, () => {
			console.log(`Server is running on port: ${PORT}`);
		});
	}
	catch (error){
		// Log any errors that occur during database connection
		console.error(`Error: ${error.message}`);
		// Exit the process with a non-zero status code to indicate failure
		process.exit(1);
	}
};

app.use(express.json());
app.use('/api/goals', goalRoutes);

// Call the function
connectDB();