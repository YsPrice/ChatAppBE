const User = require('../Models/User');
const Message = require('../Models/Message');
const Conversation = require('../Models/Conversation');
const UserConversations = require('../Models/UserConversations');



User.belongsToMany(Conversation, {
    through: UserConversations,
    as: 'conversations',
    foreignKey: 'user_id',
    otherKey: 'conversation_id'
});


Conversation.belongsToMany(User, {
    through: UserConversations,
    as: 'participants',
    foreignKey: 'conversation_id',
    otherKey: 'user_id'
});


User.hasMany(Message, {
    as: 'sentMessages',
    foreignKey: 'from_user_id'
});


Message.belongsTo(User, {
    as: 'sender',
    foreignKey: 'from_user_id'
});

Message.belongsTo(User, {
    as: 'receiver',
    foreignKey: 'to_user_id'
});


Conversation.hasMany(Message, {
    foreignKey: 'conversation_id',
    as: 'messages'
});

Message.belongsTo(Conversation, {
    foreignKey: 'conversation_id'
});

module.exports = { User, Message, Conversation, UserConversations };
