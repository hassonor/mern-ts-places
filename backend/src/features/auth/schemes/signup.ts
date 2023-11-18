import Joi, { ObjectSchema } from 'joi';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const signupSchema: ObjectSchema = Joi.object().keys({
    username: Joi.string().required().min(4).max(8).messages({
        'string.base': 'Username must be of type string',
        'string.min': 'Invalid username',
        'string.max': 'Invalid username',
        'string.empty': 'Username is a required field'
    }),
    password: Joi.string().required().min(4).max(8).messages({
        'string.base': 'Password must be of type string',
        'string.min': 'Invalid password',
        'string.max': 'Invalid password',
        'string.empty': 'Password is a required field'
    }),
    email: Joi.string().required().email().messages({
        'string.base': 'Email must be of type string',
        'string.email': 'Email must be valid',
        'string.empty': 'Email is a required field'
    }),
    places: Joi.array().items(Joi.string().regex(objectIdRegex)).messages({
        'array.base': 'Places must be an array',
        'string.pattern.base': 'Each place must be a valid ObjectId'
    })
});

export { signupSchema };
