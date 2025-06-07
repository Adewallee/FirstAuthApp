const mongoose = require('mongoose'); // Importing mongoose for MongoDB interactions

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure username is unique
    trim : true, // Remove whitespace from both ends
  },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        trim : true, // Remove whitespace from both ends
        lowercase: true, // Convert email to lowercase
    },
    password: {
        type: String,
        required: true,
        minlength: 8, // Minimum length for password
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Define allowed roles
        default: 'user' // Default role is 'user'
        },
    }, {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
        versionKey: false // Disable versioning
    })

// Create a User model based on the user schema
const User = mongoose.model('User', userSchema);


// Export the User model for use in other parts of the application
module.exports = User;