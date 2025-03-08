const joi = require("joi");

const userSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required()
});

const userMail = joi.object({
    email1: joi.string().email().required(), 
    email2: joi.string().email().required()  
});

// Middleware to validate user
const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message
        });
    }
    next();
};

// Middleware to validate emails
const validateEmail = (req, res, next) => {
    const { error } = userMail.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message
        });
    }
    next();
};


module.exports = {
    validateUser,
    validateEmail
};
