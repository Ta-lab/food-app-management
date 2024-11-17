const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const dotenv = require('dotenv');

dotenv.config();

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await userModel.createUser({
      username,
      email,
      password: hashedPassword,
      role: '2',
    });

    // Send a JSON response with the created user info
    res.status(200).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });

  } catch (error) {
    // Handle any errors during registration
    res.status(500).json({
      message: 'Error registering user',
      error: error.message,
      // success: false,
    });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch user by email
    const user = await userModel.getUserByEmail(email);

    if (user && await bcrypt.compare(password, user.password)) {
      // Generate JWT token
      const token = jwt.sign(
        { user_id: user.id, user_name: user.name, email: user.email, role: user.role_id },
        process.env.JWT_SECRET, 
        { expiresIn: '3h' }
      );

      // Send success response with token and user details
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          user_id: user.id,
          name: user.name,
          email: user.email,
          role: user.role_id,
        },
      });
    } else {
      // Invalid credentials response
      res.status(401).json({
        message: 'Invalid credentials',
      });
    }

  } catch (error) {
    // Handle server errors
    res.status(500).json({
      message: 'Error logging in',
      error: error.message,
    });
  }
};
