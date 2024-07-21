
const express = require('express');
const router = express.Router();
const conversationsController = require('../controllers/conversationController');
const messageController = require('../controllers/messageController')
const { authRequired } = require('../utils/jwtUtils');

router.get('/:id', authRequired, conversationsController.getConversation);
router.get('/:conversationId/messages', authRequired, messageController.fetchMessages);
router.post('/', authRequired, conversationsController.createConversation);
router.post('/participants', authRequired, conversationsController.addParticipantsToConversations);
router.delete('/:id', authRequired, conversationsController.deleteConversation);

module.exports = router;