const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: subject,
            text: text,
            html: html,
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.log("Email not sent");
        console.log(error);
        return error;
    }
};

module.exports = sendEmail;
