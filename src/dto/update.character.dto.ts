const Joi = require('joi');
const JoiId = require('joi-oid');

const updateCharacterDTO = Joi.object({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    modified: Joi.date().timestamp(),
    thumbnail: Joi.object({
        path: Joi.string().required(),
        extension: Joi.string().required()
    }).optional(),
    comics: Joi.array().items(JoiId.objectId()).optional(),
    stories: Joi.array().items(JoiId.objectId()).optional(),
    events: Joi.array().items(JoiId.objectId()).optional(),
    series: Joi.array().items(JoiId.objectId()).optional()
});

export { updateCharacterDTO };
