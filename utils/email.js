const nodemailer = require("nodemailer");

async function sendEmail({ to, subject, html }) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.gmail, // sender email address
                pass: process.env.gmailPass, // sender email password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"Route Academy" <${process.env.gmail}>`, // sender address
            to: to, // recipient email address
            subject: subject, // email subject
            html: html, // email content in HTML format
        });

        console.log("Email sent:", info.response);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
}

async function sendVerificationEmail(to, verificationToken) {
    const verificationLink = `http://localhost:4000/auth/verify-email/${verificationToken}`;

    const htmlContent = `
        <p>Dear User,</p>
        <p>Please click the following link to verify your email:</p>
        <a href="${verificationLink}">${verificationLink}</a>
    `;

    const subject = 'Email Verification';

    return await sendEmail({ to, subject, html: htmlContent });
}

async function sendPasswordResetEmail(to, resetToken) {
    const resetLink = `http://localhost:4000/auth/reset-password/${resetToken}`;

    const htmlContent = `
        <p>Dear User,</p>
        <p>Please click the following link to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
    `;

    const subject = 'Password Reset';

    return await sendEmail({ to, subject, html: htmlContent });
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail };
