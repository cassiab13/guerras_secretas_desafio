const Joi = require('joi-oid');

const UpdateSerieDTO = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string(),
    startYear: Joi.number().integer().optional(),
    endYear: Joi.number().integer(),
    rating: Joi.string(),
    thumbnail: Joi.object({
        path: Joi.string().optional(),
        extension: Joi.string().optional()
    }).optional(),
    comics: Joi.array().items(Joi.objectId()).optional(),
    stories: Joi.array().items(Joi.objectId()).optional(),
    events: Joi.array().items(Joi.objectId()).optional(),
    characters: Joi.array().items(Joi.objectId()).optional(),
    creators: Joi.array().items(Joi.objectId()).optional()
});

export { UpdateSerieDTO };
