const express = require("express");
const router = express.Router();
const { sendMessage, getAllMessages } = require("../controllers/message");

router.post("/sendmessage", sendMessage);
router.get("/getmessages/:chatId", getAllMessages);

module.exports = router;
