import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendResetPasswordEmail, sendVerificationEmail } from '../utils/mailer.js';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import { generateFirebaseCustomToken } from '../utils/generateFirebaseToken.js';


const createToken = (userId, expiresIn = '1h', jwt_secret = process.env.JWT_SECRET) => {
    return jwt.sign({ id: userId }, jwt_secret, { expiresIn });
};

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID_AUTH);

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const isEmailVerified = false;

        const user = await User.create({ name, email, password, role, isEmailVerified });
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

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isEmailVerified) {
            return res.status(200).json({ message: 'Email already verified' });
        }

        user.isEmailVerified = true;
        await user.save();

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

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (!user.isEmailVerified) {
            const token = createToken(user._id);
            await sendVerificationEmail(email, token);
            return res.status(400).json({ message: 'email not verified. Email verification link resent to your email please verify and login' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = createToken(user._id, '7d');
        const firebaseToken = await generateFirebaseCustomToken(user._id.toString(), {
            email: user.email,
            role: user.role
        });

        const { password: pwd, ...userWithoutPassword } = user.toObject();

        res.status(200).json({
            user: userWithoutPassword,
            firebaseToken,
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


export const googleLogin = async (req, res) => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return res.status(400).json({ error: 'Missing ID token' });
        }

        const ticket = await googleClient.verifyIdToken({
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID_AUTH
        });

        const { email, name, picture } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                password: '',
                role: 'candidate',
                isEmailVerified: true,
                profilePicture: picture
            })
        }

        const token = createToken(user._id, '7d');
        const { password, ...userWithoutPassword } = user.toObject();

        res.status(200).json({
            user: userWithoutPassword,
            token
        });

    } catch (err) {
        console.error('Google login error:', err);
        res.status(500).json({ message: 'Google login failed' });
    }
}

export const githubLogin = async (req, res) => {
    try {
        const { code } = req.body;

        const params = {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code
        };


        const tokenRes = await axios.post(
            'https://github.com/login/oauth/access_token',
            params,
            {
                headers: {
                    Accept: 'application/json'
                }
            }
        );

        const accessToken = tokenRes.data.access_token;
        if (!accessToken) {
            return res.status(400).json({ message: 'Access token not received' });
        }


        const { data } = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const { login, email, name, avatar_url } = data;

        let finalEmail = email;
        if (!finalEmail) {
            const emailRes = await axios.get('https://api.github.com/user/emails', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const primaryEmailObj = emailRes.data.find(e => e.primary && e.verified);
            finalEmail = primaryEmailObj?.email;
        }

        if (!finalEmail) {
            return res.status(400).json({ message: 'Email not found in GitHub account' });
        }

        let user = await User.findOne({ email: finalEmail });

        if (!user) {
            user = await User.create({
                name: name || login,
                email: finalEmail,
                password: '',
                role: 'candidate',
                isEmailVerified: true,
                profilePic: avatar_url
            });
        }

        const token = createToken(user._id, '7d');
        const { password, ...userWithoutPassword } = user.toObject();

        res.status(200).json({
            user: userWithoutPassword,
            token
        });

    } catch (err) {
        console.error('GitHub login error:', err);
        res.status(500).json({ message: 'GitHub login failed' });
    }
};
