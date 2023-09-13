const mongoose = require("mongoose");

const Message = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", Message);
