import Joi, { ObjectSchema } from 'joi';

const addPlaceSchema: ObjectSchema = Joi.object().keys({
    title: Joi.string().trim().required().min(3).max(100).messages({
        'string.base': 'Title must be of type string',
        'string.min': 'Title too short, at least 3 characters required',
        'string.max': 'Title too long, maximum 100 characters allowed',
        'string.empty': 'Title is a required field'
    }),
    description: Joi.string().trim().required().min(7).max(500).messages({
        'string.base': 'Description must be of type string',
        'string.min': 'Description too short, at least 7 characters required',
        'string.max': 'Description too long, maximum 500 characters allowed',
        'string.empty': 'Description is a required field'
    }),
    address: Joi.string().trim().required().messages({
        'string.base': 'Address must be of type string',
        'any.required': 'Address is required'
    }),
    image: Joi.string().trim().required().messages({
        'string.base': 'Image must be of type string',
        'any.required': 'Image url is required'
    }),
    creator: Joi.string().trim().required().messages({
        'string.base': 'Creator must be of type string',
        'any.required': 'Creator is required'
    })
});


const updatePlaceSchema: ObjectSchema = Joi.object().keys({
    title: Joi.string().trim().required().min(3).max(100).messages({
        'string.base': 'Title must be of type string',
        'string.min': 'Title too short, at least 3 characters required',
        'string.max': 'Title too long, maximum 100 characters allowed',
        'string.empty': 'Title is a required field'
    }),
    description: Joi.string().trim().required().min(7).max(500).messages({
        'string.base': 'Description must be of type string',
        'string.min': 'Description too short, at least 7 characters required',
        'string.max': 'Description too long, maximum 500 characters allowed',
        'string.empty': 'Description is a required field'
    }),
});

export { addPlaceSchema, updatePlaceSchema };