'use strict';

const express = require('express');
var route = express.Router();

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

route.post('/register',  async (req, res, next) => {

    const users = await prisma.user.findMany()

    console.log(users)

});

module.exports = route;