const User = require("../models/user");
const Chat = require("../models/chat");

exports.addAgentToChat = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    const chat = await Chat.findById(chatId).populate("users");

    if (!chat) {
      res.status(404);
      throw new Error("Chat Not Found");
    }

    // Check if the userId is already present in the users array
    const isUserAlreadyInChat = chat.users.some((user) =>
      user._id.equals(userId)
    );

    if (isUserAlreadyInChat) {
      res.json(chat); // Return the chat as it is
      return;
    }

    // If the userId is not present, add it to the users array
    const added = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    ).populate("users");

    res.json(added);
  } catch (err) {
    console.log(err);
  }
};
