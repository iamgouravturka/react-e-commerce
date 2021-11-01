const nodeMailer = require("nodemailer");

const sendMail = async (options) => {
    const transportOption = {
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    };

    const transporter = nodeMailer.createTransport(transportOption);

    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions);
}

module.exports = sendMail;