import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: true,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendVerificationEmail = async (to,token) => {
    const url = `http://localhost:3000/verify-email/${token}`;

    await transporter.sendMail({
        from: `"HireBizz" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Verify Your Email',
        html: `<p>Click <a href = "${url}">here</a> to verify your email. This link expires in 1 hour.</p>`
    });
};

export const sendResetPasswordEmail = async(email,token) => {
    const resetURL = `http://localhost:3000/reset-password?token=${token}`;

    await transporter.sendMail({
        from: `"HireBizz" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Reset Your Password',
        html: `
        <h3>Password Reset Request</h3>
        <p>Click the link below to reset your password. The link is valid for 15 minutes:</p>
        <a href="${resetURL}">${resetURL}</a>
        `,
    })

};

export const sendUnseenMessagesEmail = async(email,employer)=>{

    transporter.sendMail({
        from: `"HireBizz" <${process.env.EMAIL_USER}`,
        to: email,
        subjec: `You have unseen messages from`,
        html: `
        <h3>You have unseen messages from ${employer} based on your applications and interests. </h3>
        <p>Kindly login to your dashboard to reply and not miss any opportunity to your dream job.</p>`
    })
}