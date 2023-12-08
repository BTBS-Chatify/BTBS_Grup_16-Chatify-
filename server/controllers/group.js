'use strict';

const express = require('express');
var route = express.Router();

const { validate } = require("express-validation");
const groupValidation = require('../validations/groupValidations');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

route.post('/create', validate(groupValidation.create, {}, {}), async function (req, res)
{
    const { name, userId } = req.body;
    await prisma.group.create({
        data: {
            name: name,
            userId: userId
        }
    })
    return res.status(200).json({
        status: "success",
        message: "Grup oluşturuldu",
    })
})

module.exports = route;