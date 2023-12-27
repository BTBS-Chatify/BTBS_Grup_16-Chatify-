"use strict";
const express = require("express");
var route = express.Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

route.post("/friends", async function (req, res) {
  const { userId } = req.body;
  const friends = await prisma.friend.findMany({
    where: {
      OR: [
        {
          user1Id: userId,
        },
        {
          user2Id: userId,
        },
      ],
    },
    include: {
      user1: {
        select: {
          fullName: true,
          username: true,
          picture: true,
          status: true,
        },
      },
      user2: {
        select: {
          fullName: true,
          username: true,
          picture: true,
          status: true,
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

route.post("/acceptedFriends", async function (req, res) {
  const { userId } = req.body;
  const friends = await prisma.friend.findMany({
    where: {
      OR: [
        {
          user1Id: userId,
        },
        {
          user2Id: userId,
        },
      ],
      status: 1,
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

  let filteredFriends = [];

  friends.forEach(filterFriend);

  function filterFriend(friend) {
    if (friend.user1Id === userId) {
      filteredFriends.push(friend.user2);
    } else {
      filteredFriends.push(friend.user1);
    }
  }

  if (!friends) {
    return res.status(400).json({
      status: "error",
      message: "Friends not found",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Friends listelendi",
    friends: filteredFriends,
  });
});

route.post("/withoutFriends", async function (req, res) {
  const { userId } = req.body;

  const friends = await prisma.friend.findMany({
    where: {
      OR: [
        {
          user1Id: userId,
        },
        {
          user2Id: userId,
        },
      ],
    },
  });

  const user2IdArray = [];

  if (friends.length === 0) {
    user2IdArray.push(userId);
  }

  friends.forEach((item) => {
    user2IdArray.push(item.user1Id, item.user2Id);
  });

  const cleanedUser2IdArray = user2IdArray.filter((id) => id !== undefined);

  console.log(friends);

  const excludedFriends = await prisma.user.findMany({
    where: {
      NOT: {
        id: {
          in: cleanedUser2IdArray,
        },
      },
    },
  });

  if (!excludedFriends) {
    return res.status(400).json({
      status: "error",
      message: "Users not found",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Users listelendi",
    users: excludedFriends,
  });
});

// Simdi arkadas eklemek icin endpoint tanimlayalim
route.post("/add", async function (req, res) {
  const { userId, id } = req.body;

  const friendData = await prisma.friend.create({
    data: {
      user1Id: userId,
      user2Id: id,
    },
    include: {
      user2: {
        select: {
          fullName: true,
          username: true,
          picture: true,
          status: true,
        },
      },
    },
  });

  if (!friendData) {
    return res.status(400).json({
      status: "error",
      message: "Friend not added",
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Friend added",
    friend: friendData,
  });
});

route.post("/accept", async function (req, res) {
  const { id } = req.body;

  const friendData = await prisma.friend.update({
    where: {
      id,
    },
    data: {
      status: 1,
    },
    include: {
      user2: {
        select: {
          fullName: true,
          username: true,
          picture: true,
          status: true,
        },
      },
    },
  });

  if (!friendData) {
    return response.status(400).json({
      name: "ValidationError",
      message: "Validation Failed",
      statusCode: 400,
      error: "Bad Request",
      details: {
        body: [
          {
            message: "Friend not added",
          },
        ],
      },
    });
  }

  return res.status(200).json({
    status: "success",
    message: "Friend accepted",
    friend: friendData,
  });
});

route.post("/friend", async function (req, res) {
  const { userId, friendId } = req.body;

  prisma.friend
    .findFirst({
      where: {
        id: parseInt(friendId),
      },
    })
    .then(async (friend) => {
      if (friend.length === 0) {
        return res.status(200).json({
          status: "success",
          message: "Friend not found",
          user: friend,
        });
      } else {
        var user = null;

        if (friend.user1Id === parseInt(userId)) {
          user = await prisma.user.findFirst({
            where: {
              id: friend.user2Id,
            },
          });
        }

        if (friend.user2Id === parseInt(userId)) {
          user = await prisma.user.findFirst({
            where: {
              id: friend.user1Id,
            },
          });
        }

        return res.status(200).json({
          status: "success",
          message: "Friend found",
          user: user,
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        status: "error",
        message: "Friend not found",
        error: err,
      });
    });
});

module.exports = route;
