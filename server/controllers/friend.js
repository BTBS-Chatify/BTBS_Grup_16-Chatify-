"use strict";
const express = require("express");
var route = express.Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

route.post("/friends", async function (req, res) {
  const { userId } = req.body;
  const friends = await prisma.friend.findMany({
    where: {
      user1Id: userId,
    },
    include: {
      user2: {
        select: {
          fullName: true,
          username: true,
          picture: true,
        },
      },
    },
  });

  if (!friends) {
    return res.status(400).json({
      status: "error",
      message: "Friends not found",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Friends listelendi",
    friends: friends,
  });
});

module.exports = route;
