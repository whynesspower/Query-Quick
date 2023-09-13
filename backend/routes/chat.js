const express = require('express');
const router = express.Router();

const {raiseQuery,addAgentToChat, fetchChatList} = require('../controllers/chat')


router.post('/raisequery',raiseQuery);
router.post('/addagent',addAgentToChat)
router.get('/chatlist',fetchChatList)

module.exports = router;