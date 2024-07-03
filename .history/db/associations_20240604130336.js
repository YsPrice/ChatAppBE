const User = require('../Models/User.js');
const Message = require('../Models/Message.js');

Message.belongsTo(User, { as: 'sender', foreignKey: 'fromUserId' });
Message.belongsTo(User, { as: 'receiver', foreignKey: 'toUserId' });
User.hasMany(Message, { as: 'sentMessages', foreignKey: 'fromUserId' });
User.hasMany(Message, { as: 'receivedMessages', foreignKey: 'toUserId' });

module.exports = { User, Message };
