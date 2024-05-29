const mongoose = require('mongoose');
const Joi = require('joi');

const GodsSchema = new mongoose.Schema({
    TempleName: String,
    Location: String,
    ERA: String,
    ArchietechturalStyle: String,
    State: String,
});


// Define Joi schema for validation
const GodsSchemaValidation = Joi.object({
    TempleName: Joi.string().required(),
    Location: Joi.string().required(),
    ERA: Joi.string().required(),
    ArchietechturalStyle: Joi.string().required(),
    State: Joi.string().required(),
});

// Function to validate data against the schema
function validateGodsSchema(data) {
    return GodsSchemaValidation.validate(data);
}

const TempleModal = mongoose.model("temples", GodsSchema);
module.exports = {
    TempleModal: TempleModal,
    validateGodsSchema: validateGodsSchema
};
