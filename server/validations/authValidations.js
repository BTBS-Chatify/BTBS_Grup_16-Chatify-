'use strict';

const { Joi } = require('express-validation')

const { PrismaClient } = require('@prisma/client');

const prismaClient = new PrismaClient();

module.exports = {
    create: {
        body: Joi.object({
            email: Joi.string()
                // .custom(async value => {
                //     const exists = await prismaClient.user.findUnique({
                //         where: {
                //             email: value
                //         }
                //     });
                //
                //     if (exists) {
                //         throw new Error('E-mail already in use');
                //     }
                //
                // })
                .required(),
            name: Joi.string()
                .required(),
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required(),
            passwordConfirmation: Joi.string()
                // .custom((value, { req }) => {
                //     return value === req.body.password
                // })
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                .required()
        })
    },
    login: {
        body: Joi.object({
            email: Joi.string()
                .required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        })
    }
}