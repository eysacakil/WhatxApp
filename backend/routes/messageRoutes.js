const express = require('express');
const router = express.Router();
const { createMessage,getChatDetails ,getAllUsersWithMessages,deleteMessage,searchMessages } = require('../controller/messageController');

// Create a new message
router.post('/', createMessage);

router.get('/:userId/', getChatDetails);
router.get("/:userId/users",getAllUsersWithMessages );
// Get all messages between two users
router.get('/:userId/:contactId', getChatDetails);
router.get('/search/:searchText/:currentUserId', searchMessages);
router.delete('/:messageId', deleteMessage);

module.exports = router;
