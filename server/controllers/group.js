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
    const group = await prisma.group.create({
      data: {
        name: name,
        userId: userId,
      },
    });

    await prisma.groupMember.create({
      data: {
        groupId: group.id,
        userId: userId,
        joinedAt: new Date(),
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Grup oluşturuldu",
    });
  }
);

route.post("/all", async function (req, res) {
  const { userId } = req.body;
  const { groupId } = req.body;
  try {
    const groups = await prisma.group.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    let groupsWithMessages = [];

    await Promise.all(
      groups.map(async (group) => {
        try {
          const messages = await prisma.groupMessage.findMany({
            where: {
              groupId: group.id,
            },
            orderBy: {
              createdAt: "desc",
            },
          });

          if (messages.length > 0) {
            groupsWithMessages.push({ ...group, messages: messages });
          } else {
            groupsWithMessages.push({ ...group, messages: [] });
          }
        } catch (err) {
          console.error("Error fetching messages:", err);
          groupsWithMessages.push({ ...group, messages: [] });
        }
      })
    );

    groupsWithMessages.sort(function (a, b) {
      const lastMessageTimeA =
        a.messages.length > 0 ? a.messages[0].createdAt : 0;
      const lastMessageTimeB =
        b.messages.length > 0 ? b.messages[0].createdAt : 0;

      // Daha son mesaj atan grubu önce göstermek için sıralama yap
      return lastMessageTimeB - lastMessageTimeA;
    });

    return res.status(200).json({
      status: "success",
      message: "Gruplar listelendi",
      groups: groupsWithMessages,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Gruplar getirilirken bir hata oluştu",
      error: error.message,
    });
  }
});

route.post("/group", async function (req, res) {
  const { groupId } = req.body;
  try {
    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Grup getirildi",
      group: group,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Grup getirilirken bir hata oluştu",
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

route.post("/invite", async function (req, res) {
  const { groupId, userId } = req.body;

  try {
    const added = await prisma.groupMember.create({
      data: {
        groupId: groupId,
        userId: userId,
      },
    });

    if (added) {
      return res.status(200).json({
        status: "success",
        message: "Kullanıcı davet edildi",
        data: added,
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

route.post("/myGroups", async function (req, res) {
  const { userId } = req.body;
  try {
    const groups = await prisma.groupMember.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        joinedAt: "desc",
      },
      include: {
        group: {
          select: {
            name: true,
          },
        },
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

route.post("/accept", async function (req, res) {
  const { queryId } = req.body;
  try {
    const added = await prisma.groupMember.update({
      where: {
        id: queryId,
      },
      data: {
        joinedAt: new Date(),
      },
      include: {
        group: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Grup daveti kabul edildi.",
      data: added,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Grup daveti kabul edilirken bir hata oluştu",
      error: error.message,
    });
  }
});

route.post("/decline", async function (req, res) {
  const { queryId } = req.body;
  try {
    const deleted = await prisma.groupMember.delete({
      where: {
        id: queryId,
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Grup daveti iptal edildi.",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Grup daveti iptal edilirken bir hata oluştu",
      error: error.message,
    });
  }
});

route.post("/members", async function (req, res) {
  const { groupId } = req.body;
  try {
    const members = await prisma.groupMember.findMany({
      where: {
        groupId: groupId,
      },
      orderBy: {
        joinedAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            picture: true,
          },
        },
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Grup üyeleri listelendi",
      members: members,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Grup üyeleri getirilirken bir hata oluştu",
      error: error.message,
    });
  }
});

route.post("/withoutGroupMembers", async function (req, res) {
  const { groupId, userId } = req.body;

  const members = await prisma.groupMember.findMany({
    where: {
      groupId: groupId
    },
  });

  const user2IdArray = [];

  if (members.length === 0) {
    user2IdArray.push(userId);
  }

  members.forEach((item) => {
    user2IdArray.push(item.userId);
  });

  const cleanedUser2IdArray = user2IdArray.filter((id) => id !== undefined);

  const excludedFriends = await prisma.friend.findMany({
    where: {
      NOT: {
        id: {
          in: cleanedUser2IdArray,
        },
      },
    },
    include: {
      user1: {
        select: {
          fullName: true,
          username: true,
          picture: true,
          status: true,
          id: true,
        },
      },
      user2: {
        select: {
          fullName: true,
          username: true,
          picture: true,
          status: true,
          id: true,
        },
      },
    },
  });

  let filteredMembers = [];

  excludedFriends.forEach(filterMember);

  function filterMember(friend) {
    if (friend.user1Id !== userId) {
      filteredMembers.push(friend.user2);
    } else {
      filteredMembers.push(friend.user1);
    }
  }


  if (!excludedFriends) {
    return res.status(400).json({
      status: "error",
      message: "Kullanıcılar bulunamadı.",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Kullanıılar listelendi",
    users: filteredMembers,
  });
});

module.exports = route;
