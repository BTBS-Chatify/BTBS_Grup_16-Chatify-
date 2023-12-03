'use strict';

const express = require('express');
var route = express.Router();

const { validate } = require("express-validation");

const authValidation = require('../validations/authValidations');

const { PrismaClient } = require('@prisma/client');
const {isEmail} = require("validator");

const prisma = new PrismaClient();

route.post('/register', validate(authValidation.create, {}, {}), async (request, response, next) => {

    try {

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

        const user = await prisma.user.create({
            data: {
                email: request.body.email,
                username: request.body.username,
                password: request.body.password,
                name: "Hosgeldin Muzaffer"
            }
        })

        return response.status(200).json({
            "status": "success",
            "message":"Kayit basarili qral",
            "data": {
                user
            }
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