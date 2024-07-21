
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { authRequired } = require('../utils/jwtUtils');


router.post('/new', authRequired, messageController.createMessage);
router.post('/edit', authRequired, messageController.editMessage);
router.delete('/', authRequired, messageController.deleteMessage)

module.exports = router;
