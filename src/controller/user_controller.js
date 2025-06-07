const User = require('../model/user_schema'); // Importing the User model
const bcrypt = require('bcrypt'); // Importing bcrypt for password hashing

// Function to register a new user
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body; // Destructure request body

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        // Check password strength
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, one uppercase, one lowercase, and one number

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: 'user' // Default role
        });

        // Save the new user to the database
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully', user: { username, email } }); // Return user details excluding password
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; // Destructure request body
        console.log('Login attempt received for:', email);

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email }).lean(); // Use lean() to return a plain JavaScript object instead of a Mongoose document
        if (!user || user.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        console.log('User found:', user.username);

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Invalid password for user:', user.username);
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        console.log('Password is valid for user:', user.username);
        // If login is successful, return user details (excluding password)
        const { password: _, ...userDetails } = user //toObject();
        res.status(200).json({ message: 'Login successful', user: userDetails });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Make a user an admin
const makeAdmin = async (req, res) => {
    try {
        const { userId } = req.params; // Get user ID from request parameters

        // Find the user by ID and update their role to 'admin'
        const updatedUser = await User.findByIdAndUpdate(userId, { role: 'admin' }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User role updated to admin', user: updatedUser });
    } catch (error) {
        console.error('Error updating user role:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Exporting the functions to be used in routes
module.exports = {
    registerUser,
    loginUser,
    makeAdmin
};
