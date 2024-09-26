const Joi = require('joi-oid');

const updateComicDTO = Joi.object({
    id: Joi.number(),
    digitalId: Joi.number().optional(),
    title: Joi.string().optional(),
    issueNumber: Joi.number().optional(),
    description: Joi.string(),
    modified: Joi.date().timestamp(),
    isbn: Joi.string().optional(),
    upc: Joi.string(),
    diamondCode: Joi.string(),
    ean: Joi.string(),
    format: Joi.string(),
    pageCount: Joi.number().optional(),
    resourceURI: Joi.string().optional(),
    textObjects: Joi.object().default([]),
    dates: Joi.object().default([]),
    prices: Joi.object().default([]),
    thumbnail: Joi.object({
        path: Joi.string().optional(),
        extension: Joi.string().optional()
    }).optional(),
    images: Joi.object().default([]),
    creators: Joi.array().items(Joi.objectId()).default([]),
    characters: Joi.array().items(Joi.objectId()).default([]),
    stories: Joi.array().items(Joi.objectId()).default([]),
    events: Joi.array().items(Joi.objectId()).default([])
});

export { updateComicDTO };
