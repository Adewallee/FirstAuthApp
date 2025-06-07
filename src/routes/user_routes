const express = require('express'); // Importing the express module
const { registerUser, loginUser, makeAdmin } = require('../controller/user_controller.js'); // Importing user controller functions
const router = express.Router(); // Creating a new router instance

// Route for user registration
router.post('/register', registerUser); // POST request to /register for user registration

// Route for user login
router.post('/login', loginUser); // POST request to /login for user login

// Route for making a user an admin
router.patch('/make-admin/:userId', makeAdmin); // PUT request to /make-admin/:userId to update user role to admin



// Exporting the router to be used in the main application
module.exports = router; // Exporting the router instance for use in other files