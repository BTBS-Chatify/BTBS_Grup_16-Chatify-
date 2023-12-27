"use strict";

const express = require("express");
var route = express.Router();

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
      orderBy: {
        createdAt: "desc",
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

route.post("/messages", async function (req, res) {
  const { groupId } = req.body;
  try {
    const groupMessages = await prisma.groupMessage.findMany({
      where: {
        groupId: groupId,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        user: {
          select: {
            username: true,
            picture: true,
          },
        },
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Mesajlar listelendi",
      messages: groupMessages,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Mesajlar getirilirken bir hata oluştu",
      error: error.message,
    });
  }
});

route.post("/message/add", async function (req, res) {
  const { groupId, userId, message } = req.body;
  try {
    await prisma.groupMessage.create({
      data: {
        userId: userId,
        groupId: groupId,
        message: message,
      },
    });
    return res.status(200).json({
      status: "success",
      message: "Mesaj eklendi",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Mesaj eklenirken bir hata oluştu",
      error: error.message,
    });
  }
});

route.post('/add', async function (req, res) {
    const { groupId, userId } = req.body;

    try {

      const added = await prisma.groupMember.create({
        data: {
          groupId: groupId,
          userId: userId,
        }
      });

      if (added) {
        return res.status(200).json({
          status: "success",
          message: "Kullanıcı davet edildi",
          data: added
        });
      } else {
        return res.status(500).json({
          status: "error",
          message: "Kullanıcı davet edilirken hata oluştu",
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Kullanıcı davet edilirken hata oluştu",
        error: error.message,
      });
    }

});

module.exports = route;
