const Joi = require('joi-oid');

const CreateStorieDTO = Joi.object({
    id: Joi.number(),
    title: Joi.string().required(),
    description: Joi.string(),
    resourceURI: Joi.string().required(),
    type: Joi.string(),
    modified: Joi.date().timestamp(),
    thumbnail: Joi.object({
        path: Joi.string().required(),
        extension: Joi.string().required()
    }).required(),
    comics: Joi.array().items(Joi.objectId()).default([]),
    series: Joi.array().items(Joi.objectId()).default([]),
    events: Joi.array().items(Joi.objectId()).default([]),
    characters: Joi.array().items(Joi.objectId()).default([]),
    creators: Joi.array().items(Joi.objectId()).default([])
});

export { CreateStorieDTO };
