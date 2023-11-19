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
        'any.required': 'Address is required',
        'string.empty': 'Address is a required field'
    }),
    image: Joi.string().trim().messages({
        'string.base': 'Image must be of type string',
        'any.required': 'Image url is required',
        'string.empty': 'Image is a required field'
    }),
    creator: Joi.string().trim().messages({
        'string.base': 'Creator must be of type string',
        'string.empty': 'Creator is a required field'
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