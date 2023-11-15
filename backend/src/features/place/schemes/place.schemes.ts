import Joi, { ObjectSchema } from 'joi';

const addPlaceSchema: ObjectSchema = Joi.object().keys({
    title: Joi.string().required().messages({
        'any.required': 'Title is required'
    }),
    description: Joi.string().required().messages({
        'any.required': 'Description is required'
    }),
    coordinates: Joi.object().keys({
        lat: Joi.number().required().messages({
            'any.required': 'Latitude is required'
        }),
        lng: Joi.number().required().messages({
            'any.required': 'Longitude is required'
        })
    }).required().messages({
        'any.required': 'Location is required'
    }),
    address: Joi.string().required().messages({
        'any.required': 'Address is required'
    }),
    creator: Joi.string().required().messages({
        'any.required': 'Creator is required'
    })
});


const updatePlaceSchema: ObjectSchema = Joi.object().keys({
    title: Joi.string().required().messages({
        'any.required': 'Title is required'
    }),
    description: Joi.string().required().messages({
        'any.required': 'Description is required'
    }),
});

export { addPlaceSchema, updatePlaceSchema };