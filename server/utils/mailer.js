import nodemailer from 'nodemailer';

console.log({
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS ? "✅ Loaded" : "❌ Missing"
});

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    requireTLS: true,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendVerificationEmail = async (to,token) => {
    const url = `http://localhost:3000/verify-email/${token}`;

    try {
  await transporter.sendMail({
        from: `"HireBizz" <${process.env.EMAIL_USER}>`,
        to,
        subject: 'Verify Your Email',
        html: `<p>Click <a href = "${url}">here</a> to verify your email. This link expires in 1 hour.</p>`
    });
} catch (err) {
  console.error(`❌ Email send failed: ${process.env.EMAIL_HOST}`, err);
}
    
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

    await transporter.sendMail({
        from: `"HireBizz" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `You have unseen messages from`,
        html: `
        <h3>You have unseen messages from ${employer} based on your applications and interests. </h3>
        <p>Kindly login to your dashboard to reply and not miss any opportunity to your dream job.</p>`
    })
}