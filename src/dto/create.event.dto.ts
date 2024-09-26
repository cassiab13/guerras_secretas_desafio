const Joi = require('joi-oid');

const CreateEventDTO = Joi.object({
    id: Joi.number(),
    title: Joi.string().required(),
    description: Joi.string(),
    resourceURI: Joi.string().required(),
    modified: Joi.date().timestamp(),
    start: Joi.number().integer().required(),
    end: Joi.number().integer(),
    thumbnail: Joi.object({
        path: Joi.string().required(),
        extension: Joi.string().required()
    }).required(),
    comics: Joi.array().items(Joi.objectId()).default([]),
    stories: Joi.array().items(Joi.objectId()).default([]),
    series: Joi.array().items(Joi.objectId()).default([]),
    characters: Joi.array().items(Joi.objectId()).default([]),
    creators: Joi.array().items(Joi.objectId()).default([])
});

export { CreateEventDTO };
