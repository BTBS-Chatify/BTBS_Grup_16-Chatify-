"use strict";

const express = require("express");
const bcrypt = require("bcrypt");
const route = express.Router();

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
      return res.status(400).json({ status: "error", message: "Güncelleme başarısız" });
    }

    res.status(200).json({
      status: "success",
      message: "Kullanıcı başarıyla güncellendi",
      user: updated,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

route.post("/getUser", async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    if (!user) {
      return res.status(400).json({ status: "error", message: "Kullanıcı bulunamadı" });
    }
    res.status(200).json({
      status: "success",
      message: "Kullanıcı bulundu.",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

route.post("/checkPassword", async (req, res) => {
  try {
    const { userId, currentPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(400).json({ status: "error", message: "Kullanıcı bulunamadı" });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ status: "error", message: "Mevcut şifre doğru değil" });
    }

    res.status(200).json({ status: "success", message: "Mevcut şifre doğru" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

route.post("/updatePassword", async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const updated = await prisma.user.update({
      where: { id: userId},
      data: {
        password: hashedNewPassword,
      },
    });

    if (!updated) {
      return res.status(400).json({ status: "error", message: "Şifre güncelleme başarısız" });
    }

    res.status(200).json({ status: "success", message: "Şifre başarıyla güncellendi" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = route;
