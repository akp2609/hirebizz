import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const BREVO_API_KEY = process.env.BREVO_API_KEY;

const headers = {
  'api-key': BREVO_API_KEY,
  'Content-Type': 'application/json',
};

export const sendVerificationEmail = async (to, token) => {
  const url = `http://localhost:3000/verify-email/${token}`;
  try {
    await axios.post(
      BREVO_API_URL,
      {
        sender: { name: process.env.BREVO_SENDER_NAME, email: process.env.BREVO_SENDER_EMAIL },
        to: [{ email: to }],
        subject: 'Verify Your Email',
        htmlContent: `<p>Click <a href="${url}">here</a> to verify your email. This link expires in 1 hour.</p>`,
      },
      { headers }
    );
  } catch (err) {
    console.error("❌ Verification email failed (Brevo API):", err.response?.data || err.message);
  }
};

export const sendResetPasswordEmail = async (email, token) => {
  const resetURL = `http://localhost:3000/reset-password?token=${token}`;
  try {
    await axios.post(
      BREVO_API_URL,
      {
        sender: { name: process.env.BREVO_SENDER_NAME, email: process.env.BREVO_SENDER_EMAIL },
        to: [{ email }],
        subject: 'Reset Your Password',
        htmlContent: `
          <h3>Password Reset Request</h3>
          <p>Click the link below to reset your password. This link is valid for 15 minutes:</p>
          <a href="${resetURL}">${resetURL}</a>`,
      },
      { headers }
    );
  } catch (err) {
    console.error("❌ Reset email failed (Brevo API):", err.response?.data || err.message);
  }
};

export const sendUnseenMessagesEmail = async (email, employer) => {
  try {
    await axios.post(
      BREVO_API_URL,
      {
        sender: { name: process.env.BREVO_SENDER_NAME, email: process.env.BREVO_SENDER_EMAIL },
        to: [{ email }],
        subject: 'You have unseen messages',
        htmlContent: `
          <h3>You have unseen messages from ${employer} based on your applications and interests.</h3>
          <p>Kindly login to your dashboard to reply and not miss any opportunity.</p>`,
      },
      { headers }
    );
  } catch (err) {
    console.error("❌ Unseen message alert failed (Brevo API):", err.response?.data || err.message);
  }
};
