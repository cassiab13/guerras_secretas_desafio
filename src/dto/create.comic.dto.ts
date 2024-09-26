const Joi = require('joi-oid');

const createComicDTO = Joi.object({
    id: Joi.number(),
    digitalId: Joi.number().required(),
    title: Joi.string().required(),
    issueNumber: Joi.number().required(),
    description: Joi.string(),
    modified: Joi.date().timestamp(),
    isbn: Joi.string().required(),
    upc: Joi.string(),
    diamondCode: Joi.string(),
    ean: Joi.string(),
    format: Joi.string(),
    pageCount: Joi.number().required(),
    resourceURI: Joi.string().required(),
    textObjects: Joi.object().default([]),
    dates: Joi.object().default([]),
    prices: Joi.object().default([]),
    thumbnail: Joi.object({
        path: Joi.string().required(),
        extension: Joi.string().required()
    }).required(),
    images: Joi.object().default([]),
    creators: Joi.array().items(Joi.objectId()).default([]),
    characters: Joi.array().items(Joi.objectId()).default([]),
    stories: Joi.array().items(Joi.objectId()).default([]),
    events: Joi.array().items(Joi.objectId()).default([])
});

export { createComicDTO };
