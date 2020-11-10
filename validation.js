const Joi = require('@hapi/joi');

const userSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).lowercase().required().email(),
    password: Joi.string().min(9).required()
});

module.exports = {
    userSchema
}