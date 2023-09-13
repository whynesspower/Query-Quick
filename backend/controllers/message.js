const Message = require("../models/message");
const User = require("../models/user");
const Chat = require("../models/chat");

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "userId isAgent")
      .populate("chat")
      .sort({ timestamp: 1 });

    return res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

exports.sendMessage = async (req, res) => {
  const { content, chatId, userId } = req.body;
  var newMessage = {
    sender: userId,
    content: content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "userId isAgent");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "userId isAgent",
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    return res.send(message);
  } catch (error) {
    res.status(400)
    throw new Error(error.message);
  }
};

