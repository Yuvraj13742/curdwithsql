const nodemailer = require('nodemailer');
const emails = require('./emaillist.json');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: '13742shyuvraj@gmail.com',
        pass: 'upcl lpqf txlq rdeb',
    },
});

const sendEmails = async () => {
    for (const to of emails) {
        if (!to.email) continue;

        const mailOptions = {
            from: '"hiuhadhi" <13742shyuvraj@gmail.com>',
            to: to.email,
            subject: '',
            text: '......',
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log(`Email sent successfully to ${to.email}:`, info.response);
        } catch (error) {
            console.error(`Error while sending email to ${to.email}:`, error);
        }
    }
};

sendEmails();
