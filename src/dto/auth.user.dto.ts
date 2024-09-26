const Joi = require('joi-oid');

const authUserDTO = Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().required(),
}).or('username', 'email');

export { authUserDTO };
