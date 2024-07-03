const User = require('../Models/User.js');
const Message = require('../Models/Message.js');
const Conversation = require('../Models/Conversation.js');

User.belongsToMany(Conversation, {through: 'UserConversations'});
User.hasMany(Message, { as: 'sentMessages', foreignKey: 'fromUserId'});

Message.belongsTo(User, { as: 'sender', foreignKey: 'fromUserId' });
Message.belongsTo(Conversation, { foreignKey: 'conversationId' });

Conversation.belongsToMany(User, {through: 'UserConversations'});
Conversation.hasMany(Message, {foreignKey: 'conversationId'})


module.exports = { User, Message };
