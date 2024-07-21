const User = require('../Models/User.js');
const Message = require('../Models/Message.js');
const Conversation = require('../Models/Conversation.js');
const UserConversations = require('../Models/UserConversation.js')

User.belongsToMany(Conversation, {
    through: UserConversations,
    as: 'conversations',
    foreignKey: 'userId',
    otherKey: 'conversationId'
});
User.hasMany(Message, {
    as: 'sentMessages',
    foreignKey: 'fromUserId'
});

Conversation.belongsToMany(User, {
    through: UserConversations,
    foreignKey: 'conversationId',
    otherKey: 'userId'
});
Conversation.hasMany(Message, {
    foreignKey: 'conversationId'
});


module.exports = { User, Message, Conversation };
