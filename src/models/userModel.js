const pool = require("../config/db");
const nodemailer = require('nodemailer');
const emails = require('./emaillist.json');

const getAllUsersService = async () => {
    try {
        const result = await pool.query("SELECT * FROM users");
        return result.rows;
    } catch (error) {
        throw error;
    }
};

const getUserByIdService = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const updateUserService = async (id, name, email) => {
    try {
        const result = await pool.query(
            "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
            [name, email, id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};


const deleteUserService = async (id) => {
    try {
        const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const createUserService = async (name, email) => {
    try {
        const result = await pool.query(
            "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
            [name, email]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};


const sendEmailService = async (text) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: '13742shyuvraj@gmail.com',
            pass: 'upcl lpqf txlq rdeb', // Use environment variables for credentials in production
        },
    });

    const emailResults = [];

    for (const to of emails) {
        if (!to.email) continue;

        const mailOptions = {
            from: '"Life flow" <13742shyuvraj@gmail.com>',
            to: to.email,
            subject: 'Testing',
            text: `${text}`,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log(`Email sent successfully to ${to.email}:`, info.response);
            emailResults.push({ email: to.email, status: 'Success', response: info.response });
        } catch (error) {
            console.error(`Error while sending email to ${to.email}:`, error);
            emailResults.push({ email: to.email, status: 'Failed', error: error.message });
        }
    }

    return emailResults; // Return an array of results for all emails
};






module.exports = {
    getAllUsersService,
    getUserByIdService,
    updateUserService,
    deleteUserService,
    createUserService,
    sendEmailService
};
