'use strict';

var express = require('express');

var route = express.Router();

route.use(express.json()) // for parsing application/json
route.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

route.post('/register', function (req, res, next) {
    console.log(req.body);
    res.send(req.body);
});

module.exports = route;