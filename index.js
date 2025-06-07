const express = require('express'); // Importing the express module
const dotenv = require('dotenv'); // Importing the dotenv module to load environment variables
const mongoose = require('mongoose'); // Importing mongoose for MongoDB interactions
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/user_routes'); // Importing user routes for handling user-related requests

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an instance of express
app.use(express.json()); // Middleware to parse JSON request bodies

connectDB(); // Call the connectDB function to establish a connection to MongoDB


app.use('/', userRoutes); // Use the user routes for handling user-related requests


const port = process.env.PORT




// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log the server URL to the console
})