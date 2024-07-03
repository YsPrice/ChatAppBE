const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/database.js');

class Conversation extends Model {}
Conversation.init({
content: DataTypes.STRING,
fromUserId: DataTypes.INTEGER,
conversationId: DataTypes.INTEGER

},{sequelize});

module.exports = Conversation;