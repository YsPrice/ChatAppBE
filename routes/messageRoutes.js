
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');


router.post('/messages', messageController.createMessage);

module.exports = router;
