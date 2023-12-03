'use strict';

const express = require('express');
var route = express.Router();

const { validate } = require("express-validation");

const authValidation = require('../validations/authValidations');

const { PrismaClient } = require('@prisma/client');
const {isEmail} = require("validator");

const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

route.post('/register', validate(authValidation.create, {}, {}), async (request, response, next) => {

    try {

        if (request.body.password !== request.body.passwordConfirmation)
        {
            return response.status(400).json({
                "error": "Invalid password"
            })
        }

        const emailExists = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: request.body.email },
                    { username: request.body.username }
                ]
            },
        })

        if (emailExists) {
            return response.status(400).json({
                "error":"User already registered"
            })
        }

        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const user = await prisma.user.create({
            data: {
                email: request.body.email,
                username: request.body.username,
                password: hashedPassword,
                name: request.body.name
            }
        })

        return response.status(200).json({
            "status": "success",
            "message": "Kayıt başarılı, giriş yapabilirsiniz...",
        })

    } catch (err) {
        return response.status(400).json({
            status: 'error',
            message: err,
        })
    }

});

route.post('/login', validate(authValidation.login, {}, {}), async (request, response, next) => {

    var emailOrUsername = true;
    var userExists = null;

    if (!isEmail(request.body.email)) {
        emailOrUsername = false;
    }

    try {

        if (emailOrUsername == true) {
            var userExists = await prisma.user.findFirst({
                where: {
                    email: request.body.email,
                    password: request.body.password
                }
            })
        } else {
            var userExists = await prisma.user.findFirst({
                where: {
                    username: request.body.email,
                    password: request.body.password
                }
            })
        }

        if (!userExists)
        {
            return response.status(400).json({
                "error":"User does not exist"
            })
        }

        return response.status(200).json({
            "status": "success",
            "message":"giris basarili",
            "data": {
                userExists
            }
        })

    } catch (err) {
        return response.status(400).json({
            status: 'error',
            message: err,
        })
    }

});

module.exports = route;