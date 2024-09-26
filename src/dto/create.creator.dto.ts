const Joi = require('joi-oid');

const createCreatorDTO = Joi.object({
    id: Joi.number(),
    firstName: Joi.string().required(),
    middleName: Joi.string(),
    lastName: Joi.string().required(),
    suffix: Joi.string(),
    role: Joi.string(),
    modified: Joi.date().timestamp(),
    resourceURI: Joi.string().required(),
    thumbnail: Joi.object({
        path: Joi.string().required(),
        extension: Joi.string().required()
    }).required(),
    comics: Joi.array().items(Joi.objectId()).default([]),
    stories: Joi.array().items(Joi.objectId()).default([]),
    events: Joi.array().items(Joi.objectId()).default([]),
    series: Joi.array().items(Joi.objectId()).default([])
});

export { createCreatorDTO };
