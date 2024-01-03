"use strict";

const express = require("express");
var route = express.Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

route.post('/updateUser', async (req, res) => {
    try {
        const { userId, fullName, email } = req.body;
   
       const updated = await prisma.user.update({
        where: { id: parseInt(userId) },
        data:{
            fullname: fullName,
            email: email
        }
       });
       if(!updated){
        return res.status(400).send('Updating failed');
       }
   
       res.status(200).json({ 
        status: "success",
        message: 'User updated successfully' });
    } catch (error) {
       res.status(500).json({ message: 'Server error: Failed to update user' });
    }
   });

   module.exports = route;