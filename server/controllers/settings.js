"use strict";

const express = require("express");
var route = express.Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

route.post("/updateUser", async (req, res) => {
  try {
    const { userId, fullName, email } = req.body;

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        fullName: fullName,
        email: email,
      },
    });

    if (!updated) {
      return res.status(400).send("Updating failed");
    }

    res.status(200).json({
      status: "success",
      message: "Kullanıcı başarıyla güncellendi",
      user: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

route.post("/getUser", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Kullanıcı bulunamadı",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Kullanıcı bulundu.",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = route;
