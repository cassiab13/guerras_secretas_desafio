const Joi = require('joi-oid');

const updateCreatorDTO = Joi.object({
    firstName: Joi.string().optional(),
    middleName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    suffix: Joi.string().optional(),
    role: Joi.string().optional(),
    modified: Joi.date().timestamp(),
    resourceURI: Joi.string().optional(),
    thumbnail: Joi.object({
        path: Joi.string().required(),
        extension: Joi.string().required()
    }).optional(),
    comics: Joi.array().items(Joi.objectId()).optional(),
    stories: Joi.array().items(Joi.objectId()).optional(),
    events: Joi.array().items(Joi.objectId()).optional(),
    series: Joi.array().items(Joi.objectId()).optional()
});

export { updateCreatorDTO };
