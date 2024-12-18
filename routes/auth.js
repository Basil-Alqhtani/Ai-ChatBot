import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Auth routes are working!' });
});

// Register route
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Registration attempt for email:', email);

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if user exists with detailed logging
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        console.log('Existing user check:', existingUser);
        
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create new user
        const user = new User({
            email: email.toLowerCase(),
            password
        });

        await user.save();
        console.log('User registered successfully:', { email: user.email });

        // Create token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token
        });

    } catch (error) {
        console.error('Registration error details:', {
            error: error,
            code: error.code,
            keyPattern: error.keyPattern,
            keyValue: error.keyValue
        });
        
        // Handle duplicate key error specifically
        if (error.code === 11000) {
            const duplicateKey = Object.keys(error.keyPattern)[0];
            return res.status(400).json({ 
                message: `${duplicateKey} already exists`,
                details: error.keyValue
            });
        }
        
        res.status(500).json({ 
            message: 'Error registering user',
            details: error.message
        });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt:', { email });

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
});

// Debug route to check users and their password hashes
router.get('/check-users', async (req, res) => {
    try {
        const users = await User.find({});
        const userInfo = users.map(user => ({
            email: user.email,
            passwordHashLength: user.password.length,
            passwordHashPreview: user.password.substring(0, 10) + '...',
            isHashed: user.password.length > 50 // bcrypt hashes are typically longer than 50 chars
        }));

        console.log('Users in database:', userInfo);
        res.json({ users: userInfo });
    } catch (error) {
        console.error('Error checking users:', error);
        res.status(500).json({ error: error.message });
    }
});

// Debug route to check users (for debugging)
router.get('/check-users-original', async (req, res) => {
    try {
        const users = await User.find({}, { email: 1, password: 1 });
        console.log('All users:', users);
        res.json({ users: users.map(u => ({ email: u.email })) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get user profile route (protected)
router.get('/profile', async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
});

// User info route
router.get('/user-info', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            email: user.email
        });
    } catch (error) {
        console.error('Error getting user info:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
});

export default router;
