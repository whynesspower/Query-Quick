const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use("*", cors());

const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const messageRoutes = require("./routes/message");

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log("Database connection is successfull");
});

const server = app.listen(PORT, () => {
  console.log("listening on port 8080");
});

const io = require("socket.io")(server, {
  pingTimeout: 80000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    if (!chat?.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user?._id == newMessageReceived?.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
});
