const mongoose = require('mongoose');
const Joi = require('joi');

const godsSchema = new mongoose.Schema({
    TempleName: String,
    Location: String,
    ERA: String,
    ArchietechturalStyle: String,
    State: String,
});
// Define Joi schema for validation
const godsSchemaValidation = Joi.object({
    TempleName: Joi.string().required(),
    Location: Joi.string().required(),
    Era: Joi.string().required(),
    ArchitecturalStyle: Joi.string().required(),
    State: Joi.string().required()
});

// Function to validate data against the schema
function validateGodsSchema(data) {
    return godsSchemaValidation.validate(data);
}

const TempleModel = mongoose.model("temples", godsSchema);
module.exports = {
    TempleModel: TempleModel,
    validateGodsSchema: validateGodsSchema
};
