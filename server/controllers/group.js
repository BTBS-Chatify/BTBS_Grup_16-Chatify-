"use strict";

const express = require("express");
let route = express.Router();

const { validate } = require("express-validation");
const groupValidation = require("../validations/groupValidations");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

route.post(
  "/create",
  validate(groupValidation.create, {}, {}),
  async function (req, res) {
    const { name, userId } = req.body;

    await prisma.group.create({
      data: {
        name: name,
        userId: userId,
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Grup oluşturuldu",
    });
  }
);

route.post("/all", async function (req, res) {
  const { userId } = req.body; // userId'yi doğrudan req.body'den almalısınız, destructuring kullanımı yanlış
  try {
    const groups = await prisma.group.findMany({
      where: {
        userId: userId,
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Gruplar listelendi",
      groups: groups,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Gruplar getirilirken bir hata oluştu",
      error: error.message,
    });
  }
});

module.exports = route;
