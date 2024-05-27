const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    password: String // Add the password field
});

const userValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(0),
    password: Joi.string().required()
});
const UserModal = mongoose.model("users", UserSchema);
module.exports = {UserModal,
    userValidationSchema};