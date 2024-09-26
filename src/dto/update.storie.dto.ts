const Joi = require('joi-oid');

const UpdateStorieDTO = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    type: Joi.string().optional(),
    modified: Joi.date().timestamp(),
    thumbnail: Joi.object({
        path: Joi.string().required(),
        extension: Joi.string().required()
    }).optional(),
    comics: Joi.array().items(Joi.objectId()).optional(),
    series: Joi.array().items(Joi.objectId()).optional(),
    events: Joi.array().items(Joi.objectId()).optional(),
    characters: Joi.array().items(Joi.objectId()).optional(),
    creators: Joi.array().items(Joi.objectId()).optional()
});

export { UpdateStorieDTO };
