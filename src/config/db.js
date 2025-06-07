const mongoose = require('mongoose'); // Importing mongoose for MongoDB interactions
const dotenv = require('dotenv'); // Importing the dotenv module to load environment variables

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from environment variables
    await mongoose.connect(process.env.MONGODB_URL, {
    });
    console.log('MongoDB connected successfully'); // Log success message
  } catch (error) {
    console.error('MongoDB connection failed:', error.message); // Log error message
    process.exit(1); // Exit the process with failure code
  }
}

module.exports = connectDB; // Export the connectDB function for use in other files