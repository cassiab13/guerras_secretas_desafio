const Joi = require('joi-oid');

const CreateSerieDTO = Joi.object({
    id: Joi.number(),
    title: Joi.string().required(),
    description: Joi.string(),
    resourceURI: Joi.string().required(),
    startYear: Joi.number().integer().required(),
    endYear: Joi.number().integer(),
    rating: Joi.string(),
    thumbnail: Joi.object({
        path: Joi.string().required(),
        extension: Joi.string().required()
    }).required(),
    comics: Joi.array().items(Joi.objectId()).default([]),
    stories: Joi.array().items(Joi.objectId()).default([]),
    events: Joi.array().items(Joi.objectId()).default([]),
    characters: Joi.array().items(Joi.objectId()).default([]),
    creators: Joi.array().items(Joi.objectId()).default([])
});

export { CreateSerieDTO };
