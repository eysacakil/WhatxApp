const express = require('express');
const router = express.Router();
const { createMessage,getChatDetails ,getAllUsersWithMessages } = require('../controller/messageController');

// Create a new message
router.post('/', createMessage);

router.get('/:userId/', getChatDetails);
router.get("/:userId/users",getAllUsersWithMessages );
// Get all messages between two users
router.get('/:userId/:contactId', getChatDetails);

module.exports = router;
