const express = require("express");
const bodyParser = require("body-parser");

const { Server } = require('socket.io');
const { ValidationError } = require("express-validation");
const { createServer } = require('node:http');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

io.on('connection', (socket) => {
  console.log('a user connected');
});



app.use("/auth", require("./controllers/auth"));
app.use("/group", require("./controllers/group"));
app.use("/friend", require("./controllers/friend"));

// app.use(function (err, req, res) {
//   if (err instanceof ValidationError) {
//     return res.status(err.statusCode).json(err);
//   }
//   return res.status(400).json(err);
// });

const port = 3005;

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
