import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendResetPasswordEmail, sendVerificationEmail } from '../utils/mailer.js';

const createToken = (userId, expiresIn = '1h', jwt_secret = process.env.JWT_SECRET) => {
    return jwt.sign({ id: userId }, jwt_secret, { expiresIn });
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password, role });
        const token = createToken(user._id);
        await sendVerificationEmail(email, token);

        res.status(201).json({ user: { id: user._id, name: user.name, email: user.email }, token });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        if (!decoded.id) {
            return res.status(400).json({ message: 'Malformed token' });
        }
        res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
        console.error(err);
        res.status(301).json({ error: 'Invalid or expired token' });
    }
}

export const getProfile = async (req, res) => {
    res.status(200).json({ message: 'Protected route accessed', user: req.user });
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(password);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = createToken(user._id, '7d');

        const { password: pwd, ...userWithoutPassword } = user.toObject();

        res.status(200).json({
            user:userWithoutPassword,
            token
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(200).json({ messgae: 'If email exits,password reset sent' });

        const token = createToken(user._id, '15m', process.env.JWT_RESET_SECRET);

        await sendResetPasswordEmail(email, token);

        res.status(200).json({ message: 'Password reset email sent' });

    } catch (error) {
        res.status(500).json({ message: 'Error requesting reset', error });
    }
};

export const resetPassword = async (req, res) => {

    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) return res.status(200).json({ message: 'User not found' });

        user.password = newPassword;

        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};
